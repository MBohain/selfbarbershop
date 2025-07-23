'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
  };
}

interface CartContextType {
  cartItems: CartItem[];
  items: CartItem[]; // Alias pour cartItems
  cartCount: number;
  total: number; // Total calculé
  isLoading: boolean;
  loading: boolean; // Alias pour isLoading
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Générer un ID de session unique pour le guest
function getSessionId() {
  if (typeof window === 'undefined') return 'guest';
  
  let sessionId = localStorage.getItem('cart_session_id');
  if (!sessionId) {
    sessionId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('cart_session_id', sessionId);
  }
  return sessionId;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sessionId = getSessionId();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Charger le panier depuis l'API
  const refreshCart = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/cart?sessionId=${sessionId}`);
      const data = await response.json();
      
      if (data.success) {
        setCartItems(data.cartItems || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement du panier:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Ajouter au panier
  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity, sessionId }),
      });

      const data = await response.json();
      
      if (data.success) {
        await refreshCart();
        // Afficher une notification de succès
        if (typeof window !== 'undefined') {
          const event = new CustomEvent('cart:added', { 
            detail: { message: data.message, product: data.cartItem.product }
          });
          window.dispatchEvent(event);
        }
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
      // Afficher une notification d'erreur
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('cart:error', { 
          detail: { message: 'Erreur lors de l\'ajout au panier' }
        });
        window.dispatchEvent(event);
      }
    }
  };

  // Mettre à jour la quantité
  const updateQuantity = async (cartItemId: string, quantity: number) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItemId, quantity, sessionId }),
      });

      const data = await response.json();
      
      if (data.success) {
        await refreshCart();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  // Supprimer du panier
  const removeFromCart = async (cartItemId: string) => {
    try {
      const response = await fetch(`/api/cart?cartItemId=${cartItemId}&sessionId=${sessionId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        await refreshCart();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  // Vider le panier
  const clearCart = async () => {
    try {
      for (const item of cartItems) {
        await removeFromCart(item.id);
      }
    } catch (error) {
      console.error('Erreur lors du vidage du panier:', error);
    }
  };

  // Charger le panier au démarrage
  // Calculer le total
  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{
      cartItems,
      items: cartItems, // Alias
      cartCount,
      total,
      isLoading,
      loading: isLoading, // Alias
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      refreshCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
