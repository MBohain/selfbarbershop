'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';
import { 
  HeartIcon, 
  ShoppingCartIcon, 
  BookOpenIcon,
  UserIcon,
  AcademicCapIcon,
  ScissorsIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon,
  PlayIcon,
  UserGroupIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

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

const selfCutTips = [
  {
    title: 'Commencez avec un miroir de qualité',
    description: 'Un bon miroir 3 faces est essentiel pour voir tous les angles',
    icon: ScissorsIcon
  },
  {
    title: 'Investissez dans un kit complet',
    description: 'Un kit professionnel vous donne tous les outils nécessaires',
    icon: UserIcon
  },
  {
    title: 'Apprenez les techniques',
    description: 'Notre guide exclusif vous enseigne les secrets des barbiers',
    icon: AcademicCapIcon
  }
];

export default function SelfCutPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [guideInfo] = useState({
    title: 'Guide Self-Cut Premium',
    price: 29,
    originalPrice: 79,
    discount: 63,
    totalPages: 85,
    videoCount: 12,
    rating: 4.9,
    reviewCount: 2847,
    salesCount: 10247
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?category=self-cut');
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
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-16"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Self-Cut Professionnel</h1>
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
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Self-Cut Professionnel
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Maîtrisez l'art de vous couper les cheveux comme un pro
          </p>
          
          {/* Guide Premium Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 max-w-3xl mx-auto mb-8">
            <BookOpenIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-blue-900 mb-3">
              Guide Complet Self-Cut Premium
            </h3>
            <p className="text-blue-800 mb-6 text-lg">
              Apprenez 50+ techniques professionnelles avec notre guide exclusif de 120 pages
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center justify-center text-blue-700">
                <ScissorsIcon className="h-5 w-5 mr-2" />
                <span className="text-sm">Techniques avancées</span>
              </div>
              <div className="flex items-center justify-center text-blue-700">
                <UserIcon className="h-5 w-5 mr-2" />
                <span className="text-sm">Guides visuels</span>
              </div>
              <div className="flex items-center justify-center text-blue-700">
                <AcademicCapIcon className="h-5 w-5 mr-2" />
                <span className="text-sm">Secrets de pros</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowGuideModal(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center"
              >
                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                Télécharger le Guide - 29.99€
              </button>
              <button
                onClick={() => setShowGuideModal(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center"
              >
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                Recevoir par Email
              </button>
            </div>
          </div>
        </div>

        {/* Produits Self-Cut */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Équipement Professionnel
          </h2>
          
          {products.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">✂️</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit self-cut disponible</h3>
              <p className="text-gray-600 mb-6">
                Les produits pour se couper les cheveux soi-même seront bientôt disponibles.
              </p>
              <Link
                href="/admin/products/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Ajouter des produits self-cut
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
                        className="w-full h-48 object-cover"
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
                      
                      <div className="flex items-center justify-between mb-4">
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
                      
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Conseils Self-Cut */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Conseils pour Réussir votre Self-Cut
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {selfCutTips.map((tip, index) => (
              <div key={index} className="text-center">
                <tip.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {tip.title}
                </h3>
                <p className="text-gray-600">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Découvrez toutes nos techniques avancées dans notre guide exclusif
            </p>
            <button
              onClick={() => setShowGuideModal(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <BookOpenIcon className="h-5 w-5 mr-2" />
              Voir le Guide Complet
            </button>
          </div>
        </div>

        {/* Guide Premium Section */}
        <div className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.2),transparent_50%)]"></div>
          </div>
          
          <div className="relative bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl shadow-2xl p-12 text-white border border-white border-opacity-10">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full text-sm font-bold mb-6">
                  🏆 BEST-SELLER #1 - Plus de 10,000 clients satisfaits
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white drop-shadow-lg">
                  Maîtrisez le Self-Cut comme un Pro
                </h2>
                <p className="text-xl lg:text-2xl mb-4 text-white max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                  Le guide complet qui transforme n'importe qui en expert de la coupe à domicile
                </p>
                <div className="flex items-center justify-center gap-6 text-sm text-white font-medium">
                  <div className="flex items-center bg-white bg-opacity-20 px-3 py-2 rounded-full backdrop-blur-sm border border-white border-opacity-30">
                    <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                    <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                    <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                    <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                    <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
                    4.9/5 (2,847 avis)
                  </div>
                  <div className="bg-white bg-opacity-20 px-3 py-2 rounded-full backdrop-blur-sm border border-white border-opacity-30">✓ Garantie satisfait ou remboursé 30 jours</div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Guide Preview */}
                <div className="space-y-8">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-white to-gray-100 rounded-xl p-8 shadow-2xl transform rotate-1">
                      <div className="text-gray-800">
                        <h3 className="text-2xl font-bold mb-4">Table des Matières</h3>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-center"><span className="w-6 h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center mr-3">1</span>Préparation et outils essentiels</li>
                          <li className="flex items-center"><span className="w-6 h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center mr-3">2</span>Techniques de base pour débutants</li>
                          <li className="flex items-center"><span className="w-6 h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center mr-3">3</span>Dégradés et finitions professionnelles</li>
                          <li className="flex items-center"><span className="w-6 h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center mr-3">4</span>Correction des erreurs communes</li>
                          <li className="flex items-center"><span className="w-6 h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center mr-3">5</span>Styles avancés et tendances</li>
                        </ul>
                      </div>
                    </div>
                    <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold transform -rotate-12">
                      NOUVEAU 2025
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm border border-white border-opacity-30 shadow-lg">
                      <BookOpenIcon className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                      <div className="text-2xl font-bold text-white">{guideInfo.totalPages}</div>
                      <div className="text-xs text-gray-100 font-semibold">Pages détaillées</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm border border-white border-opacity-30 shadow-lg">
                      <PlayIcon className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                      <div className="text-2xl font-bold text-white">{guideInfo.videoCount}</div>
                      <div className="text-xs text-gray-100 font-semibold">Vidéos HD</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm border border-white border-opacity-30 shadow-lg">
                      <UserGroupIcon className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                      <div className="text-2xl font-bold text-white">24/7</div>
                      <div className="text-xs text-gray-100 font-semibold">Support expert</div>
                    </div>
                  </div>
                </div>

                {/* Right: Pricing and CTA */}
                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-2xl text-gray-800">
                    <div className="text-center mb-6">
                      <div className="text-sm text-gray-600 mb-2">Prix habituel : <span className="line-through">{guideInfo.originalPrice}€</span></div>
                      <div className="text-5xl font-bold text-blue-600 mb-2">{guideInfo.price}€</div>
                      <div className="text-green-600 font-semibold">✓ Économisez {guideInfo.originalPrice - guideInfo.price}€ aujourd'hui seulement</div>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center text-sm">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">✓</div>
                        Accès immédiat après paiement
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">✓</div>
                        Mises à jour gratuites à vie
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">✓</div>
                        Compatible tous appareils
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">✓</div>
                        Garantie remboursement 30j
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => setShowGuideModal(true)}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        🚀 Télécharger Maintenant
                      </button>
                      <button
                        onClick={() => setShowGuideModal(true)}
                        className="w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                      >
                        📧 Recevoir par Email
                      </button>
                    </div>
                  </div>

                  <div className="text-center text-sm text-white font-medium">
                    <div className="flex items-center justify-center gap-4">
                      <span>🔒 Paiement 100% sécurisé</span>
                      <span>⚡ Téléchargement instantané</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonials */}
              <div className="mt-16 text-center">
                <h3 className="text-2xl font-bold mb-8 text-white">Ce que disent nos clients</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm border border-white border-opacity-30 shadow-lg">
                    <div className="flex justify-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-white mb-3 font-medium">&quot;Incroyable ! J'ai économisé des centaines d'euros chez le coiffeur grâce à ce guide.&quot;</p>
                    <div className="text-xs text-gray-100 font-semibold">- Marc L., Paris</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm border border-white border-opacity-30 shadow-lg">
                    <div className="flex justify-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-white mb-3 font-medium">&quot;Les techniques sont clairement expliquées. Même ma femme me complimente maintenant !&quot;</p>
                    <div className="text-xs text-gray-100 font-semibold">- Thomas K., Lyon</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm border border-white border-opacity-30 shadow-lg">
                    <div className="flex justify-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-white mb-3 font-medium">&quot;Le meilleur investissement que j'ai fait. ROI en 2 coupes seulement !&quot;</p>
                    <div className="text-xs text-gray-100 font-semibold">- Julie M., Marseille</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Guide Premium */}
        {showGuideModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-95vh overflow-y-auto shadow-2xl">
              <div className="relative">
                {/* Header with gradient */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white rounded-t-2xl">
                  {/* Bouton de fermeture amélioré */}
                  <button
                    onClick={() => setShowGuideModal(false)}
                    className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 text-white hover:text-gray-200 transition-all duration-200 backdrop-blur-sm border border-white border-opacity-30 shadow-lg z-10"
                    aria-label="Fermer"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-yellow-400 text-black rounded-full text-sm font-bold mb-4">
                      🔥 OFFRE LIMITÉE - Plus que 24h
                    </div>
                    <h3 className="text-3xl font-bold mb-2">Guide Self-Cut Premium</h3>
                    <p className="text-blue-100 text-lg">La méthode complète pour maîtriser la coupe à domicile</p>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left: Content Details */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-4">Contenu Complet du Guide</h4>
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                            <div>
                              <h5 className="font-semibold text-gray-900">Préparation & Outils (15 pages)</h5>
                              <p className="text-gray-600 text-sm">Choisir les bons outils, préparer l'espace de coupe, techniques de sécurité</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                            <div>
                              <h5 className="font-semibold text-gray-900">Techniques de Base (20 pages)</h5>
                              <p className="text-gray-600 text-sm">Coupes simples, égalisation, techniques pour débutants avec illustrations</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                            <div>
                              <h5 className="font-semibold text-gray-900">Dégradés Professionnels (25 pages)</h5>
                              <p className="text-gray-600 text-sm">Maîtrisez les dégradés parfaits, finitions nettes, styles modernes</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                            <div>
                              <h5 className="font-semibold text-gray-900">Correction d'Erreurs (15 pages)</h5>
                              <p className="text-gray-600 text-sm">Comment rattraper les erreurs, techniques de réparation</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                            <div>
                              <h5 className="font-semibold text-gray-900">Styles Avancés (10 pages)</h5>
                              <p className="text-gray-600 text-sm">Coupes tendances 2025, styles personnalisés, maintenance</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Pricing */}
                    <div className="lg:sticky lg:top-8">
                      <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
                        <div className="text-center mb-6">
                          <div className="text-sm text-gray-500 mb-1">Prix habituel</div>
                          <div className="text-2xl text-gray-400 line-through mb-2">{guideInfo.originalPrice}€</div>
                          <div className="text-5xl font-bold text-blue-600 mb-2">{guideInfo.price}€</div>
                          <div className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                            🔥 -{guideInfo.discount}% aujourd'hui seulement
                          </div>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center text-sm text-gray-700">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Téléchargement immédiat
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Accès à vie + mises à jour gratuites
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Compatible tous appareils (PDF, mobile, tablette)
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            Garantie satisfait ou remboursé 30 jours
                          </div>
                        </div>

                        <div className="space-y-3">
                          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            <ArrowDownTrayIcon className="h-6 w-6 inline mr-2" />
                            Acheter & Télécharger Maintenant
                          </button>
                          <button className="w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                            <EnvelopeIcon className="h-5 w-5 inline mr-2" />
                            Recevoir par Email
                          </button>
                        </div>

                        <div className="text-center mt-4 text-xs text-gray-500">
                          🔒 Paiement sécurisé SSL • ⚡ Téléchargement instantané
                        </div>
                      </div>

                      {/* Countdown Timer */}
                      <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                        <div className="text-red-800 font-semibold text-sm mb-2">⏰ Offre limitée - Plus que :</div>
                        <div className="text-2xl font-bold text-red-600">23:42:17</div>
                        <div className="text-red-600 text-xs">Heures : Minutes : Secondes</div>
                      </div>
                    </div>
                  </div>

                  {/* Social Proof */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="text-center mb-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Déjà adopté par 10,000+ personnes</h4>
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} className="h-6 w-6 text-yellow-400" />
                        ))}
                        <span className="text-gray-600 ml-2">(4.9/5 sur 2,847 avis)</span>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 text-sm italic mb-2">&quot;Ce guide a changé ma vie ! Plus jamais de rendez-vous chez le coiffeur. J'ai récupéré mon investissement dès la 2ème coupe.&quot;</p>
                        <div className="text-xs text-gray-600">⭐⭐⭐⭐⭐ - Alexandre M., 32 ans</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 text-sm italic mb-2">&quot;Instructions ultra claires, même pour un débutant comme moi. Ma femme pensait que j'étais allé chez un pro !&quot;</p>
                        <div className="text-xs text-gray-600">⭐⭐⭐⭐⭐ - David L., 28 ans</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
