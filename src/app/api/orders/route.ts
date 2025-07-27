import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { aliExpressService } from '@/lib/aliexpress';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(request: NextRequest) {
  try {
    // Vérifier si les paiements sont activés
    const paymentsEnabledSetting = await prisma.settings.findUnique({
      where: { key: 'payments_enabled' }
    });

    if (paymentsEnabledSetting?.value !== 'true') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Les paiements sont temporairement désactivés. Veuillez réessayer plus tard.',
          code: 'PAYMENTS_DISABLED'
        },
        { status: 503 }
      );
    }
    const body = await request.json();
    const {
      items, // Array of {productId, quantity}
      shippingAddress,
      billingAddress,
      paymentMethodId
    } = body;

    // Validate required fields
    if (!items || !items.length || !shippingAddress || !paymentMethodId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get products with AliExpress info
    const productIds = items.map((item: any) => item.productId);
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds }
      }
    });

    if (products.length !== items.length) {
      return NextResponse.json(
        { success: false, error: 'Some products not found' },
        { status: 400 }
      );
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems = items.map((item: any) => {
      const product = products.find(p => p.id === item.productId);
      if (!product) throw new Error('Product not found');
      
      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;
      
      return {
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
        product
      };
    });

    // Récupérer les paramètres de livraison
    const shippingThresholdSetting = await prisma.settings.findUnique({
      where: { key: 'free_shipping_threshold' }
    });
    const shippingCostSetting = await prisma.settings.findUnique({
      where: { key: 'shipping_cost' }
    });

    const freeShippingThreshold = parseFloat(shippingThresholdSetting?.value || '60');
    const shippingCost = parseFloat(shippingCostSetting?.value || '4.99');

    const shipping = subtotal >= freeShippingThreshold ? 0 : shippingCost; // Livraison gratuite selon seuil configuré
    const tax = subtotal * 0.2; // 20% VAT
    const total = subtotal + shipping + tax;

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Convert to cents
      currency: 'eur',
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/order-confirmation`,
      metadata: {
        type: 'product_purchase'
      }
    });

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { success: false, error: 'Payment failed' },
        { status: 400 }
      );
    }

    // Generate order number
    const orderNumber = `CMD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Create order in database
    const order = await prisma.order.create({
      data: {
        orderNumber,
        status: 'CONFIRMED',
        userId: 'guest', // For now, we'll handle guest orders
        shippingAddress,
        billingAddress: billingAddress || shippingAddress,
        subtotal,
        shipping,
        tax,
        total,
        paymentMethod: 'stripe',
        paymentStatus: 'PAID',
        stripeSessionId: paymentIntent.id,
        orderItems: {
          create: orderItems.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    // Process AliExpress orders automatically
    const aliexpressOrders = [];
    
    for (const orderItem of order.orderItems) {
      try {
        console.log(`Processing AliExpress order for product: ${orderItem.product.name}`);
        
        const aliexpressOrder = await aliExpressService.createOrder({
          aliexpressId: orderItem.product.aliexpressId,
          quantity: orderItem.quantity,
          shippingAddress: {
            name: shippingAddress.firstName + ' ' + shippingAddress.lastName,
            street: shippingAddress.street,
            city: shippingAddress.city,
            state: shippingAddress.state || '',
            zipCode: shippingAddress.zipCode,
            country: shippingAddress.country || 'FR',
            phone: shippingAddress.phone || ''
          }
        });

        if (aliexpressOrder.success) {
          // Update order item with AliExpress order ID
          await prisma.orderItem.update({
            where: { id: orderItem.id },
            data: {
              aliexpressOrderId: aliexpressOrder.orderId,
              trackingNumber: aliexpressOrder.trackingNumber
            }
          });

          aliexpressOrders.push({
            orderItemId: orderItem.id,
            aliexpressOrderId: aliexpressOrder.orderId,
            trackingNumber: aliexpressOrder.trackingNumber,
            estimatedDelivery: aliexpressOrder.estimatedDelivery
          });

          console.log(`✅ AliExpress order created: ${aliexpressOrder.orderId}`);
        } else {
          console.error(`❌ AliExpress order failed for ${orderItem.product.name}:`, aliexpressOrder.error);
          
          // Handle failed AliExpress order
          // You might want to refund the customer or find alternative suppliers
          await prisma.orderItem.update({
            where: { id: orderItem.id },
            data: {
              aliexpressOrderId: 'FAILED'
            }
          });
        }
      } catch (error) {
        console.error('Error processing AliExpress order:', error);
      }
    }

    // Update order with AliExpress order info
    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: 'PROCESSING',
        aliexpressOrders: JSON.stringify(aliexpressOrders)
      }
    });

    // Send confirmation email (would be implemented)
    // await sendOrderConfirmationEmail(order);

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        total: order.total,
        estimatedDelivery: aliExpressService.getEstimatedDelivery(shippingAddress.country || 'FR'),
        aliexpressOrders: aliexpressOrders.filter(o => o.aliexpressOrderId !== 'FAILED')
      }
    });

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
