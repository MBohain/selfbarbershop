'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image?: string;
  featured: boolean;
  bestseller: boolean;
  inStock: boolean;
  stockQuantity: number;
  features?: string;
  aliexpressId: string;
  aliexpressPrice: number;
  aliexpressUrl?: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

export default function AccessoiresPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?category=accessoires');
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products || []);
        } else {
          setError('Erreur lors du chargement des produits');
        }
      } catch (err) {
        setError('Erreur de connexion');
        console.error('Erreur fetch produits:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-96 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Accessoires</h1>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Accessoires de Barbier</h1>
              <p className="text-gray-600 mt-2">Complétez votre équipement avec nos accessoires professionnels</p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Trier par popularité</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
                <option>Meilleures notes</option>
              </select>
              <div className="text-sm text-gray-600">
                {products.length} produit{products.length > 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">✂️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun accessoire trouvé</h3>
            <p className="text-gray-600">
              Les accessoires de cette catégorie seront bientôt disponibles.
            </p>
            <Link
              href="/admin/products/new"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Ajouter des produits
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const discount = product.originalPrice 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;
              const features = product.features ? JSON.parse(product.features) : [];
              
              return (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={product.image || '/placeholder-product.jpg'}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    {discount > 0 && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                        -{discount}%
                      </div>
                    )}
                    {product.featured && (
                      <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                        Populaire
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                        <HeartIcon className="h-5 w-5 text-gray-600" />
                      </button>
                      <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                        <ShoppingCartIcon className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        {product.rating} ({product.reviewCount} avis)
                      </span>
                    </div>
                    
                    {features.length > 0 && (
                      <ul className="text-sm text-gray-600 mb-4 space-y-1">
                        {features.slice(0, 3).map((feature: string, index: number) => (
                          <li key={index} className="flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">
                          {product.price.toFixed(2)}€
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {product.originalPrice.toFixed(2)}€
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        Stock: {product.stockQuantity}
                      </div>
                    </div>
                    
                    <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
