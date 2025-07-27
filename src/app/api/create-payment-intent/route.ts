import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Vérification de la clé Stripe avec fallback pour le build
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_for_build';

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(request: NextRequest) {
  try {
    // Vérifier que la vraie clé Stripe est disponible en runtime
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Configuration Stripe manquante' },
        { status: 500 }
      );
    }

    const { amount, currency = 'eur', items } = await request.json();

    if (!amount || amount < 50) { // Minimum 50 centimes
      return NextResponse.json(
        { error: 'Montant invalide' },
        { status: 400 }
      );
    }

    // Créer le PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: {
        items: JSON.stringify(items),
        source: 'selfbarbershop-pro'
      }
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error: unknown) {
    console.error('Erreur création PaymentIntent:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur lors de la création du paiement' },
      { status: 500 }
    );
  }
}
