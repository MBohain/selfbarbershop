import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Calculer les frais de livraison pour un montant donné
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subtotal = parseFloat(searchParams.get('subtotal') || '0');

    if (isNaN(subtotal) || subtotal < 0) {
      return NextResponse.json(
        { success: false, error: 'Montant invalide' },
        { status: 400 }
      );
    }

    // Récupérer les paramètres de livraison
    const [shippingThresholdSetting, shippingCostSetting] = await Promise.all([
      prisma.settings.findUnique({ where: { key: 'free_shipping_threshold' } }),
      prisma.settings.findUnique({ where: { key: 'shipping_cost' } })
    ]);

    const freeShippingThreshold = parseFloat(shippingThresholdSetting?.value || '60');
    const shippingCost = parseFloat(shippingCostSetting?.value || '4.99');

    const shipping = subtotal >= freeShippingThreshold ? 0 : shippingCost;
    const remainingForFreeShipping = subtotal >= freeShippingThreshold ? 0 : freeShippingThreshold - subtotal;

    return NextResponse.json({
      success: true,
      shipping,
      shippingCost,
      freeShippingThreshold,
      remainingForFreeShipping,
      isFreeShipping: shipping === 0,
      message: shipping === 0 
        ? '🎉 Livraison gratuite !' 
        : `📦 Livraison: ${shipping.toFixed(2)}€ (Gratuite dès ${freeShippingThreshold}€)`
    });
  } catch (error) {
    console.error('Erreur lors du calcul des frais de livraison:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur serveur',
        // Valeurs par défaut en cas d'erreur
        shipping: 4.99,
        shippingCost: 4.99,
        freeShippingThreshold: 60,
        isFreeShipping: false
      },
      { status: 500 }
    );
  }
}
