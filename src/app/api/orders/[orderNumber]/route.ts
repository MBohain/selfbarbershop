import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { aliExpressService } from '@/lib/aliexpress';

export async function GET(
  request: NextRequest,
  { params }: { params: { orderNumber: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: {
        orderNumber: params.orderNumber
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Get updated tracking info from AliExpress
    const trackingInfo = [];
    
    for (const orderItem of order.orderItems) {
      if (orderItem.aliexpressOrderId && orderItem.aliexpressOrderId !== 'FAILED') {
        try {
          const status = await aliExpressService.getOrderStatus(orderItem.aliexpressOrderId);
          trackingInfo.push({
            productName: orderItem.product.name,
            aliexpressOrderId: orderItem.aliexpressOrderId,
            trackingNumber: orderItem.trackingNumber,
            status: status.success ? status.status : 'unknown',
            trackingUrl: status.success ? status.trackingUrl : null
          });
        } catch (error) {
          console.error('Error getting tracking info:', error);
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        order: {
          ...order,
          aliexpressOrders: order.aliexpressOrders ? JSON.parse(order.aliexpressOrders as string) : []
        },
        trackingInfo
      }
    });

  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}
