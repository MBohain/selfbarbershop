'use client';

import { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/contexts/CartContext';

interface AddToCartButtonProps {
  productId: string;
  quantity?: number;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export default function AddToCartButton({ 
  productId, 
  quantity = 1, 
  className = '', 
  children,
  disabled = false 
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (disabled || isAdding) return;
    
    setIsAdding(true);
    try {
      await addToCart(productId, quantity);
      
      // Ouvrir automatiquement le panier après ajout
      window.dispatchEvent(new CustomEvent('cart:open-drawer'));
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={disabled || isAdding}
      className={`
        flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold
        transition-all duration-200 transform hover:scale-105
        ${disabled || isAdding 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
        }
        text-white shadow-md hover:shadow-lg
        ${className}
      `}
    >
      {isAdding ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          Ajout...
        </>
      ) : (
        <>
          <ShoppingCartIcon className="h-5 w-5" />
          {children || 'Ajouter au panier'}
        </>
      )}
    </button>
  );
}
