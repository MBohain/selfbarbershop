'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/contexts/CartContext';
import { useEffect, useState } from 'react';

interface ShippingInfo {
  cost: number;
  freeThreshold: number;
  description: string;
}

export default function PanierPage() {
  const { cartItems, updateQuantity, removeFromCart, total, isLoading } = useCart();
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

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement du panier...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900">Panier</h1>
          <p className="text-gray-600 mt-2">{cartItems.length} article(s) dans votre panier</p>
        </div>

        {cartItems.length === 0 ? (
          // Empty cart
          <div className="bg-white rounded-lg shadow-lg p-8 mt-8 text-center">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Votre panier est vide</h2>
              <p className="text-gray-600 mb-8">Découvrez nos produits et ajoutez-les à votre panier</p>
              <Link 
                href="/produits"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Découvrir nos produits
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 border-b border-gray-200 pb-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.product.image || '/placeholder.jpg'}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.product.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-lg font-bold text-blue-600">
                            {item.product.price.toFixed(2)}€
                          </span>
                          {item.product.originalPrice > item.product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              {item.product.originalPrice.toFixed(2)}€
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center py-2 border border-gray-300 rounded-lg">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                      
                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          {(item.product.price * item.quantity).toFixed(2)}€
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800 text-sm mt-1 flex items-center"
                        >
                          <TrashIcon className="h-4 w-4 mr-1" />
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Récapitulatif</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} articles)</span>
                    <span className="font-semibold">{total.toFixed(2)}€</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Livraison</span>
                    <span className="font-semibold">
                      {shippingInfo.cost === 0 ? 'Gratuite' : `${shippingInfo.cost.toFixed(2)}€`}
                    </span>
                  </div>
                  
                  {shippingInfo.description && (
                    <p className="text-sm text-gray-500">{shippingInfo.description}</p>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-bold text-blue-600">{finalTotal.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>

                <Link 
                  href="/checkout"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold mt-6 transition-colors text-center"
                >
                  Passer la commande
                </Link>
                
                <Link 
                  href="/produits"
                  className="block text-center text-blue-600 hover:text-blue-700 mt-4"
                >
                  Continuer mes achats
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
