'use client';

import { useState, useEffect } from 'react';
import { StarIcon, EyeIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  images: string[];
  category: {
    name: string;
  };
  isFeatured?: boolean;
  featuredOrder?: number | null;
  isActive?: boolean;
}

export default function FeaturedProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      if (data.success) {
        const allProducts = data.products.map((product: { id: string; name: string; price: number; originalPrice: number; images: string | string[]; category: { name: string; }; }) => ({
          ...product,
          images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images || []
        }));
        setProducts(allProducts);
        
        const featured = allProducts
          .filter((p: Product) => p.isFeatured)
          .sort((a: Product, b: Product) => (a.featuredOrder || 999) - (b.featuredOrder || 999));
        setFeaturedProducts(featured);
      }
    } catch (error) {
      console.error('Erreur chargement produits:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFeaturedProduct = async (productId: string, position: number | null) => {
    setUpdating(true);
    try {
      const response = await fetch('/api/admin/products/featured', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          position
        }),
      });

      const data = await response.json();
      if (data.success) {
        await fetchProducts(); // Refresh data
      }
    } catch (error) {
      console.error('Erreur mise à jour produit populaire:', error);
    } finally {
      setUpdating(false);
    }
  };

  const removeFeaturedProduct = async (productId: string) => {
    await updateFeaturedProduct(productId, null);
  };

  const addFeaturedProduct = async (productId: string) => {
    // Trouver la prochaine position disponible (1, 2, ou 3)
    const usedPositions = featuredProducts.map(p => p.featuredOrder).filter(Boolean);
    const nextPosition = [1, 2, 3].find(pos => !usedPositions.includes(pos));
    
    if (nextPosition && featuredProducts.length < 3) {
      await updateFeaturedProduct(productId, nextPosition);
    }
  };

  const availableProducts = products.filter(p => !p.isFeatured && p.isActive);

  if (isLoading) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Produits Populaires Actuels */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <StarIcon className="h-5 w-5 text-yellow-500 mr-2" />
          Produits Populaires sur l&apos;Accueil ({featuredProducts.length}/3)
        </h2>

        {featuredProducts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <StarIconOutline className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Aucun produit populaire configuré</p>
            <p className="text-sm">Sélectionnez jusqu'à 3 produits ci-dessous</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(position => {
              const product = featuredProducts.find(p => p.featuredOrder === position);
              return (
                <div key={position} className="border-2 border-dashed border-gray-200 rounded-lg p-4 min-h-[200px] flex flex-col">
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    Position {position}
                  </div>
                  
                  {product ? (
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center space-x-3 flex-1">
                        <img
                          src={product.images[0] || '/placeholder.jpg'}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm text-gray-900">{product.name}</h3>
                          <p className="text-xs text-gray-500">{product.category.name}</p>
                          <p className="text-sm font-bold text-blue-600">{product.price.toFixed(2)}€</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFeaturedProduct(product.id)}
                        disabled={updating}
                        className="mt-3 w-full bg-red-50 hover:bg-red-100 text-red-700 py-2 px-3 rounded-lg text-sm transition-colors disabled:opacity-50"
                      >
                        Retirer
                      </button>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <StarIconOutline className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">Position libre</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Ajouter des Produits */}
      {featuredProducts.length < 3 && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ajouter un Produit Populaire
          </h3>
          
          {availableProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Aucun produit disponible</p>
              <p className="text-sm">Créez d'abord des produits depuis "Nouveau Produit"</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {availableProducts.map(product => (
                <div key={product.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.images[0] || '/placeholder.jpg'}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-500">{product.category.name} • {product.price.toFixed(2)}€</p>
                    </div>
                  </div>
                  <button
                    onClick={() => addFeaturedProduct(product.id)}
                    disabled={updating}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
                  >
                    Ajouter
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Aperçu */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <EyeIcon className="h-5 w-5 text-gray-500 mr-2" />
          Aperçu sur l&apos;Accueil
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(position => {
              const product = featuredProducts.find(p => p.featuredOrder === position);
              return (
                <div key={position} className="bg-white rounded-lg shadow p-4">
                  {product ? (
                    <>
                      <div className="h-32 bg-gray-200 rounded mb-3 flex items-center justify-center overflow-hidden">
                        {product.images[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-gray-400 text-sm">Image produit</span>
                        )}
                      </div>
                      <h4 className="font-semibold text-sm mb-2">{product.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 font-bold">{product.price.toFixed(2)}€</span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs text-gray-500 line-through">{product.originalPrice.toFixed(2)}€</span>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="h-32 bg-gray-100 rounded mb-3 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Produit {position}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
