'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AddToCartButton from '@/components/AddToCartButton';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  ScissorsIcon, 
  SparklesIcon, 
  TruckIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Expédition Soignée',
    description: 'Livraison avec suivi complet de votre commande et emballage protégé.',
    icon: TruckIcon,
  },
  {
    name: 'Qualité Garantie',
    description: 'Tous nos produits sont testés et certifiés pour une qualité professionnelle.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Style Professionnel',
    description: 'Des outils de barbier utilisés par les professionnels du monde entier.',
    icon: ScissorsIcon,
  },
  {
    name: 'Service Premium',
    description: 'Support client 7j/7 et garantie satisfaction ou remboursé.',
    icon: SparklesIcon,
  },
];

interface FeaturedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  images: string[];
  category: {
    name: string;
  };
}

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('/api/products/featured');
        const data = await response.json();
        if (data.success) {
          setFeaturedProducts(data.products);
        }
      } catch (error: unknown) {
        console.error('Erreur chargement produits populaires:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-700">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              SelfBarberShop
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Découvrez notre collection exclusive de produits professionnels pour barbiers et amateurs passionnés
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/produits"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                Voir tous les produits
              </Link>
              <Link
                href="/tondeuses"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                Tondeuses populaires
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Produits populaires</h2>
          <p className="text-lg text-gray-600">Découvrez nos meilleures ventes avec des prix exceptionnels</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading state
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))
          ) : featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {product.images && product.images.length > 0 ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500">Image produit</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-blue-600">{product.price.toFixed(2)}€</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice.toFixed(2)}€</span>
                      )}
                    </div>
                    {product.originalPrice > product.price && (
                      <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>
                  <AddToCartButton
                    productId={product.id}
                    className="w-full"
                  />
                </div>
              </div>
            ))
          ) : (
            // Empty state
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500 text-lg">Aucun produit populaire configuré.</p>
              <p className="text-gray-400 text-sm mt-2">Ajoutez des produits populaires depuis l'admin.</p>
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir SelfBarberShop ?</h2>
            <p className="text-lg text-gray-600">Nous nous engageons à vous offrir la meilleure expérience d&apos;achat</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.name} className="text-center">
                <div className="flex justify-center mb-4">
                  <feature.icon className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
