'use client';

import { useEffect, useState } from 'react';
import { TruckIcon } from '@heroicons/react/24/outline';

interface ShippingInfo {
  shipping: number;
  shippingCost: number;
  freeShippingThreshold: number;
  remainingForFreeShipping: number;
  isFreeShipping: boolean;
  message: string;
}

interface ShippingCalculatorProps {
  subtotal: number;
  className?: string;
}

export default function ShippingCalculator({ subtotal, className = '' }: ShippingCalculatorProps) {
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShippingInfo = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/shipping?subtotal=${subtotal}`);
        if (response.ok) {
          const data = await response.json();
          setShippingInfo(data);
        }
      } catch (error) {
        console.error('Erreur lors du calcul des frais de livraison:', error);
        // Valeurs par défaut en cas d'erreur
        setShippingInfo({
          shipping: subtotal >= 60 ? 0 : 4.99,
          shippingCost: 4.99,
          freeShippingThreshold: 60,
          remainingForFreeShipping: subtotal >= 60 ? 0 : 60 - subtotal,
          isFreeShipping: subtotal >= 60,
          message: subtotal >= 60 ? '🎉 Livraison gratuite !' : '📦 Livraison: 4.99€'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchShippingInfo();
  }, [subtotal]);

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  if (!shippingInfo) return null;

  return (
    <div className={className}>
      <div className="flex items-center space-x-2">
        <TruckIcon className="h-5 w-5 text-gray-600" />
        <span className="text-sm text-gray-700">
          {shippingInfo.message}
        </span>
      </div>
      
      {!shippingInfo.isFreeShipping && shippingInfo.remainingForFreeShipping > 0 && (
        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            💡 Ajoutez encore <span className="font-semibold">{shippingInfo.remainingForFreeShipping.toFixed(2)}€</span> pour bénéficier de la livraison gratuite !
          </p>
        </div>
      )}
      
      {shippingInfo.isFreeShipping && (
        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800">
            ✅ Félicitations ! Vous bénéficiez de la livraison gratuite.
          </p>
        </div>
      )}
    </div>
  );
}
