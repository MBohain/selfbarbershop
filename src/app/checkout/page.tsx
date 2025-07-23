'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import Navigation from '@/components/Navigation';
import { useCart } from '@/contexts/CartContext';
import { LockClosedIcon } from '@heroicons/react/24/outline';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface ShippingInfo {
  cost: number;
  freeThreshold: number;
  description: string;
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems, total, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    cost: 0,
    freeThreshold: 60,
    description: ''
  });

  // Calculer les frais de port
  useEffect(() => {
    const fetchShipping = async () => {
      try {
        const response = await fetch(`/api/shipping?amount=${total}`);
        const data = await response.json();
        if (data.success) {
          setShippingInfo(data.shipping);
        }
      } catch (error) {
        console.error('Erreur calcul livraison:', error);
      }
    };

    if (total > 0) {
      fetchShipping();
    }
  }, [total]);

  const finalTotal = total + shippingInfo.cost;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Créer le PaymentIntent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(finalTotal * 100), // Stripe attend les centimes
          currency: 'eur',
          items: cartItems.map(item => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity
          }))
        }),
      });

      const { clientSecret, error: serverError } = await response.json();

      if (serverError) {
        throw new Error(serverError);
      }

      // Confirmer le paiement
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error('Élément de carte non trouvé');
      }

      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: 'Client SelfBarberShop Pro',
            },
          },
        }
      );

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        setSuccess(true);
        // Vider le panier après paiement réussi
        await clearCart();
      }

    } catch (error: any) {
      setError(error.message || 'Une erreur est survenue lors du paiement');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Paiement réussi !</h1>
            <p className="text-gray-600 mb-8">
              Votre commande a été traitée avec succès. Vous recevrez bientôt un email de confirmation.
            </p>
            <div className="space-y-4">
              <a
                href="/"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Retour à l'accueil
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="px-8 py-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Finaliser la commande</h1>
            <p className="text-gray-600 mt-2">
              Paiement sécurisé avec Stripe
            </p>
          </div>

          <div className="p-8">
            {/* Récapitulatif commande */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Récapitulatif de la commande</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.product.name} x {item.quantity}</span>
                      <span>{(item.product.price * item.quantity).toFixed(2)}€</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between text-sm">
                      <span>Sous-total</span>
                      <span>{total.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Livraison</span>
                      <span>{shippingInfo.cost === 0 ? 'Gratuite' : `${shippingInfo.cost.toFixed(2)}€`}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg mt-2 pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span className="text-blue-600">{finalTotal.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire de paiement */}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <LockClosedIcon className="h-4 w-4 inline mr-1" />
                  Informations de paiement
                </label>
                <div className="border border-gray-300 rounded-lg p-4 bg-white">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#424770',
                          '::placeholder': {
                            color: '#aab7c4',
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={!stripe || isLoading || cartItems.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Traitement en cours...
                  </>
                ) : (
                  <>
                    <LockClosedIcon className="h-4 w-4 mr-2" />
                    Payer {finalTotal.toFixed(2)}€
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-500">
              <p>Paiement sécurisé par Stripe. Vos informations sont protégées.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { cartItems } = useCart();

  // Rediriger si le panier est vide
  useEffect(() => {
    if (cartItems.length === 0) {
      window.location.href = '/panier';
    }
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <p className="text-gray-600">Redirection vers le panier...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
