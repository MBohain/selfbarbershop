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
    title: &apos;Commencez avec un miroir de qualité&apos;,
    description: &apos;Un bon miroir 3 faces est essentiel pour voir tous les angles&apos;,
    icon: ScissorsIcon
  },
  {
    title: &apos;Investissez dans un kit complet&apos;,
    description: &apos;Un kit professionnel vous donne tous les outils nécessaires&apos;,
    icon: UserIcon
  },
  {
    title: &apos;Apprenez les techniques&apos;,
    description: &apos;Notre guide exclusif vous enseigne les secrets des barbiers&apos;,
    icon: AcademicCapIcon
  }
];

export default function SelfCutPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [guideInfo] = useState({
    title: &apos;Guide Self-Cut Premium&apos;,
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
        const response = await fetch(&apos;/api/products?category=self-cut&apos;);
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products || []);
        } else {
          setError(&apos;Erreur lors du chargement des produits&apos;);
        }
      } catch (err) {
        setError(&apos;Erreur de connexion&apos;);
        console.error(&apos;Erreur fetch produits:&apos;, err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className=&quot;min-h-screen bg-gray-50&quot;>
        <Navigation />
        <div className=&quot;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16&quot;>
          <div className=&quot;animate-pulse&quot;>
            <div className=&quot;h-12 bg-gray-200 rounded w-1/2 mx-auto mb-8&quot;></div>
            <div className=&quot;h-6 bg-gray-200 rounded w-1/3 mx-auto mb-16&quot;></div>
            <div className=&quot;grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8&quot;>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className=&quot;h-96 bg-gray-200 rounded-lg&quot;></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className=&quot;min-h-screen bg-gray-50&quot;>
        <Navigation />
        <div className=&quot;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16&quot;>
          <div className=&quot;text-center&quot;>
            <h1 className=&quot;text-3xl font-bold text-gray-900 mb-4&quot;>Self-Cut Professionnel</h1>
            <p className=&quot;text-red-600 mb-4&quot;>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className=&quot;bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700&quot;
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=&quot;min-h-screen bg-gray-50&quot;>
      <Navigation />
      
      <div className=&quot;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16&quot;>
        {/* Header */}
        <div className=&quot;text-center mb-16&quot;>
          <h1 className=&quot;text-4xl font-bold text-gray-900 mb-4&quot;>
            Self-Cut Professionnel
          </h1>
          <p className=&quot;text-xl text-gray-600 mb-8&quot;>
            Maîtrisez l&apos;art de vous couper les cheveux comme un pro
          </p>
          
          {/* Guide Premium Section */}
          <div className=&quot;bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 max-w-3xl mx-auto mb-8&quot;>
            <BookOpenIcon className=&quot;h-12 w-12 text-blue-600 mx-auto mb-4&quot; />
            <h3 className=&quot;text-2xl font-bold text-blue-900 mb-3&quot;>
              Guide Complet Self-Cut Premium
            </h3>
            <p className=&quot;text-blue-800 mb-6 text-lg&quot;>
              Apprenez 50+ techniques professionnelles avec notre guide exclusif de 120 pages
            </p>
            <div className=&quot;grid grid-cols-1 md:grid-cols-3 gap-4 mb-6&quot;>
              <div className=&quot;flex items-center justify-center text-blue-700&quot;>
                <ScissorsIcon className=&quot;h-5 w-5 mr-2&quot; />
                <span className=&quot;text-sm&quot;>Techniques avancées</span>
              </div>
              <div className=&quot;flex items-center justify-center text-blue-700&quot;>
                <UserIcon className=&quot;h-5 w-5 mr-2&quot; />
                <span className=&quot;text-sm&quot;>Guides visuels</span>
              </div>
              <div className=&quot;flex items-center justify-center text-blue-700&quot;>
                <AcademicCapIcon className=&quot;h-5 w-5 mr-2&quot; />
                <span className=&quot;text-sm&quot;>Secrets de pros</span>
              </div>
            </div>
            <div className=&quot;flex flex-col sm:flex-row gap-4 justify-center&quot;>
              <button
                onClick={() => setShowGuideModal(true)}
                className=&quot;bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center&quot;
              >
                <ArrowDownTrayIcon className=&quot;h-5 w-5 mr-2&quot; />
                Télécharger le Guide - 29.99€
              </button>
              <button
                onClick={() => setShowGuideModal(true)}
                className=&quot;bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center&quot;
              >
                <EnvelopeIcon className=&quot;h-5 w-5 mr-2&quot; />
                Recevoir par Email
              </button>
            </div>
          </div>
        </div>

        {/* Produits Self-Cut */}
        <div className=&quot;mb-16&quot;>
          <h2 className=&quot;text-3xl font-bold text-gray-900 mb-8 text-center&quot;>
            Équipement Professionnel
          </h2>
          
          {products.length === 0 ? (
            <div className=&quot;text-center py-16&quot;>
              <div className=&quot;text-gray-400 text-6xl mb-4&quot;>✂️</div>
              <h3 className=&quot;text-lg font-medium text-gray-900 mb-2&quot;>Aucun produit self-cut disponible</h3>
              <p className=&quot;text-gray-600 mb-6&quot;>
                Les produits pour se couper les cheveux soi-même seront bientôt disponibles.
              </p>
              <Link
                href=&quot;/admin/products/new&quot;
                className=&quot;inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700&quot;
              >
                Ajouter des produits self-cut
              </Link>
            </div>
          ) : (
            <div className=&quot;grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8&quot;>
              {products.map((product) => {
                const discount = product.originalPrice 
                  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                  : 0;
                const features = product.features ? JSON.parse(product.features) : [];
                
                return (
                  <div key={product.id} className=&quot;bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300&quot;>
                    <div className=&quot;relative&quot;>
                      <img
                        src={product.image || &apos;/placeholder-product.jpg&apos;}
                        alt={product.name}
                        className=&quot;w-full h-48 object-cover&quot;
                      />
                      {discount > 0 && (
                        <div className=&quot;absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold&quot;>
                          -{discount}%
                        </div>
                      )}
                      {product.featured && (
                        <div className=&quot;absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-sm font-bold&quot;>
                          Populaire
                        </div>
                      )}
                      <div className=&quot;absolute bottom-4 right-4 flex gap-2&quot;>
                        <button className=&quot;p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors&quot;>
                          <HeartIcon className=&quot;h-5 w-5 text-gray-600&quot; />
                        </button>
                        <button className=&quot;p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors&quot;>
                          <ShoppingCartIcon className=&quot;h-5 w-5 text-gray-600&quot; />
                        </button>
                      </div>
                    </div>
                    
                    <div className=&quot;p-6&quot;>
                      <h3 className=&quot;text-lg font-semibold text-gray-900 mb-2 line-clamp-2&quot;>
                        {product.name}
                      </h3>
                      
                      <div className=&quot;flex items-center mb-3&quot;>
                        <div className=&quot;flex items-center&quot;>
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) ? &apos;text-yellow-400&apos; : &apos;text-gray-300&apos;
                              }`}
                            />
                          ))}
                        </div>
                        <span className=&quot;text-sm text-gray-600 ml-2&quot;>
                          {product.rating} ({product.reviewCount} avis)
                        </span>
                      </div>
                      
                      {features.length > 0 && (
                        <ul className=&quot;text-sm text-gray-600 mb-4 space-y-1&quot;>
                          {features.slice(0, 3).map((feature: string, index: number) => (
                            <li key={index} className=&quot;flex items-center&quot;>
                              <span className=&quot;w-2 h-2 bg-blue-500 rounded-full mr-2&quot;></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      <div className=&quot;flex items-center justify-between mb-4&quot;>
                        <div>
                          <span className=&quot;text-2xl font-bold text-gray-900&quot;>
                            {product.price.toFixed(2)}€
                          </span>
                          {product.originalPrice && (
                            <span className=&quot;text-sm text-gray-500 line-through ml-2&quot;>
                              {product.originalPrice.toFixed(2)}€
                            </span>
                          )}
                        </div>
                        <div className=&quot;text-sm text-gray-500&quot;>
                          Stock: {product.stockQuantity}
                        </div>
                      </div>
                      
                      <button className=&quot;w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium&quot;>
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
        <div className=&quot;bg-white rounded-lg shadow-md p-8&quot;>
          <h2 className=&quot;text-2xl font-bold text-gray-900 mb-8 text-center&quot;>
            Conseils pour Réussir votre Self-Cut
          </h2>
          
          <div className=&quot;grid md:grid-cols-3 gap-8&quot;>
            {selfCutTips.map((tip, index) => (
              <div key={index} className=&quot;text-center&quot;>
                <tip.icon className=&quot;h-12 w-12 text-blue-600 mx-auto mb-4&quot; />
                <h3 className=&quot;text-lg font-semibold text-gray-900 mb-2&quot;>
                  {tip.title}
                </h3>
                <p className=&quot;text-gray-600&quot;>
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className=&quot;text-center mt-8&quot;>
            <p className=&quot;text-gray-600 mb-4&quot;>
              Découvrez toutes nos techniques avancées dans notre guide exclusif
            </p>
            <button
              onClick={() => setShowGuideModal(true)}
              className=&quot;inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700&quot;
            >
              <BookOpenIcon className=&quot;h-5 w-5 mr-2&quot; />
              Voir le Guide Complet
            </button>
          </div>
        </div>

        {/* Guide Premium Section */}
        <div className=&quot;relative overflow-hidden&quot;>
          {/* Background Pattern */}
          <div className=&quot;absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900&quot;>
            <div className=&quot;absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]&quot;></div>
            <div className=&quot;absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.2),transparent_50%)]&quot;></div>
          </div>
          
          <div className=&quot;relative bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl shadow-2xl p-12 text-white border border-white border-opacity-10&quot;>
            <div className=&quot;max-w-6xl mx-auto&quot;>
              {/* Header */}
              <div className=&quot;text-center mb-12&quot;>
                <div className=&quot;inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full text-sm font-bold mb-6&quot;>
                  🏆 BEST-SELLER #1 - Plus de 10,000 clients satisfaits
                </div>
                <h2 className=&quot;text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent&quot;>
                  Maîtrisez le Self-Cut comme un Pro
                </h2>
                <p className=&quot;text-xl lg:text-2xl mb-4 text-gray-100 max-w-3xl mx-auto leading-relaxed&quot;>
                  Le guide complet qui transforme n&apos;importe qui en expert de la coupe à domicile
                </p>
                <div className=&quot;flex items-center justify-center gap-6 text-sm text-white font-medium&quot;>
                  <div className=&quot;flex items-center bg-white bg-opacity-10 px-3 py-2 rounded-full&quot;>
                    <StarIcon className=&quot;h-5 w-5 text-yellow-400 mr-1&quot; />
                    <StarIcon className=&quot;h-5 w-5 text-yellow-400 mr-1&quot; />
                    <StarIcon className=&quot;h-5 w-5 text-yellow-400 mr-1&quot; />
                    <StarIcon className=&quot;h-5 w-5 text-yellow-400 mr-1&quot; />
                    <StarIcon className=&quot;h-5 w-5 text-yellow-400 mr-2&quot; />
                    4.9/5 (2,847 avis)
                  </div>
                  <div className=&quot;bg-white bg-opacity-10 px-3 py-2 rounded-full&quot;>✓ Garantie satisfait ou remboursé 30 jours</div>
                </div>
              </div>

              <div className=&quot;grid lg:grid-cols-2 gap-12 items-center&quot;>
                {/* Left: Guide Preview */}
                <div className=&quot;space-y-8&quot;>
                  <div className=&quot;relative&quot;>
                    <div className=&quot;bg-gradient-to-br from-white to-gray-100 rounded-xl p-8 shadow-2xl transform rotate-1&quot;>
                      <div className=&quot;text-gray-800&quot;>
                        <h3 className=&quot;text-2xl font-bold mb-4&quot;>Table des Matières</h3>
                        <ul className=&quot;space-y-3 text-sm&quot;>
                          <li className=&quot;flex items-center&quot;><span className=&quot;w-6 h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center mr-3&quot;>1</span>Préparation et outils essentiels</li>
                          <li className=&quot;flex items-center&quot;><span className=&quot;w-6 h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center mr-3&quot;>2</span>Techniques de base pour débutants</li>
                          <li className=&quot;flex items-center&quot;><span className=&quot;w-6 h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center mr-3&quot;>3</span>Dégradés et finitions professionnelles</li>
                          <li className=&quot;flex items-center&quot;><span className=&quot;w-6 h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center mr-3&quot;>4</span>Correction des erreurs communes</li>
                          <li className=&quot;flex items-center&quot;><span className=&quot;w-6 h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center mr-3&quot;>5</span>Styles avancés et tendances</li>
                        </ul>
                      </div>
                    </div>
                    <div className=&quot;absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold transform -rotate-12&quot;>
                      NOUVEAU 2025
                    </div>
                  </div>

                  <div className=&quot;grid grid-cols-3 gap-4 text-center&quot;>
                    <div className=&quot;bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm border border-white border-opacity-30 shadow-lg&quot;>
                      <BookOpenIcon className=&quot;h-8 w-8 mx-auto mb-2 text-blue-200&quot; />
                      <div className=&quot;text-2xl font-bold text-white&quot;>{guideInfo.totalPages}</div>
                      <div className=&quot;text-xs text-gray-100 font-semibold&quot;>Pages détaillées</div>
                    </div>
                    <div className=&quot;bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm border border-white border-opacity-30 shadow-lg&quot;>
                      <PlayIcon className=&quot;h-8 w-8 mx-auto mb-2 text-blue-200&quot; />
                      <div className=&quot;text-2xl font-bold text-white&quot;>{guideInfo.videoCount}</div>
                      <div className=&quot;text-xs text-gray-100 font-semibold&quot;>Vidéos HD</div>
                    </div>
                    <div className=&quot;bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm border border-white border-opacity-30 shadow-lg&quot;>
                      <UserGroupIcon className=&quot;h-8 w-8 mx-auto mb-2 text-blue-200&quot; />
                      <div className=&quot;text-2xl font-bold text-white&quot;>24/7</div>
                      <div className=&quot;text-xs text-gray-100 font-semibold&quot;>Support expert</div>
                    </div>
                  </div>
                </div>

                {/* Right: Pricing and CTA */}
                <div className=&quot;space-y-8&quot;>
                  <div className=&quot;bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-2xl text-gray-800&quot;>
                    <div className=&quot;text-center mb-6&quot;>
                      <div className=&quot;text-sm text-gray-600 mb-2&quot;>Prix habituel : <span className=&quot;line-through&quot;>{guideInfo.originalPrice}€</span></div>
                      <div className=&quot;text-5xl font-bold text-blue-600 mb-2&quot;>{guideInfo.price}€</div>
                      <div className=&quot;text-green-600 font-semibold&quot;>✓ Économisez {guideInfo.originalPrice - guideInfo.price}€ aujourd&apos;hui seulement</div>
                    </div>
                    
                    <div className=&quot;space-y-4 mb-8&quot;>
                      <div className=&quot;flex items-center text-sm&quot;>
                        <div className=&quot;w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3&quot;>✓</div>
                        Accès immédiat après paiement
                      </div>
                      <div className=&quot;flex items-center text-sm&quot;>
                        <div className=&quot;w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3&quot;>✓</div>
                        Mises à jour gratuites à vie
                      </div>
                      <div className=&quot;flex items-center text-sm&quot;>
                        <div className=&quot;w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3&quot;>✓</div>
                        Compatible tous appareils
                      </div>
                      <div className=&quot;flex items-center text-sm&quot;>
                        <div className=&quot;w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3&quot;>✓</div>
                        Garantie remboursement 30j
                      </div>
                    </div>

                    <div className=&quot;space-y-3&quot;>
                      <button
                        onClick={() => setShowGuideModal(true)}
                        className=&quot;w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1&quot;
                      >
                        🚀 Télécharger Maintenant
                      </button>
                      <button
                        onClick={() => setShowGuideModal(true)}
                        className=&quot;w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-xl font-semibold hover:bg-blue-50 transition-colors&quot;
                      >
                        📧 Recevoir par Email
                      </button>
                    </div>
                  </div>

                  <div className=&quot;text-center text-sm text-white font-medium&quot;>
                    <div className=&quot;flex items-center justify-center gap-4&quot;>
                      <span>🔒 Paiement 100% sécurisé</span>
                      <span>⚡ Téléchargement instantané</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonials */}
              <div className=&quot;mt-16 text-center&quot;>
                <h3 className=&quot;text-2xl font-bold mb-8 text-white&quot;>Ce que disent nos clients</h3>
                <div className=&quot;grid md:grid-cols-3 gap-6&quot;>
                  <div className=&quot;bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm border border-white border-opacity-30 shadow-lg&quot;>
                    <div className=&quot;flex justify-center mb-3&quot;>
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className=&quot;h-5 w-5 text-yellow-400&quot; />
                      ))}
                    </div>
                    <p className=&quot;text-sm text-white mb-3 font-medium&quot;>&quot;Incroyable ! J&apos;ai économisé des centaines d&apos;euros chez le coiffeur grâce à ce guide.&quot;</p>
                    <div className=&quot;text-xs text-gray-100 font-semibold&quot;>- Marc L., Paris</div>
                  </div>
                  <div className=&quot;bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm border border-white border-opacity-30 shadow-lg&quot;>
                    <div className=&quot;flex justify-center mb-3&quot;>
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className=&quot;h-5 w-5 text-yellow-400&quot; />
                      ))}
                    </div>
                    <p className=&quot;text-sm text-white mb-3 font-medium&quot;>&quot;Les techniques sont clairement expliquées. Même ma femme me complimente maintenant !&quot;</p>
                    <div className=&quot;text-xs text-gray-100 font-semibold&quot;>- Thomas K., Lyon</div>
                  </div>
                  <div className=&quot;bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm border border-white border-opacity-30 shadow-lg&quot;>
                    <div className=&quot;flex justify-center mb-3&quot;>
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className=&quot;h-5 w-5 text-yellow-400&quot; />
                      ))}
                    </div>
                    <p className=&quot;text-sm text-white mb-3 font-medium&quot;>&quot;Le meilleur investissement que j&apos;ai fait. ROI en 2 coupes seulement !&quot;</p>
                    <div className=&quot;text-xs text-gray-100 font-semibold&quot;>- Julie M., Marseille</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Guide Premium */}
        {showGuideModal && (
          <div className=&quot;fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50&quot;>
            <div className=&quot;bg-white rounded-2xl max-w-4xl w-full max-h-95vh overflow-y-auto shadow-2xl&quot;>
              <div className=&quot;relative&quot;>
                {/* Header with gradient */}
                <div className=&quot;bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white rounded-t-2xl&quot;>
                  <button
                    onClick={() => setShowGuideModal(false)}
                    className=&quot;absolute top-6 right-6 text-white hover:text-gray-200 transition-colors&quot;
                  >
                    <XMarkIcon className=&quot;h-8 w-8&quot; />
                  </button>
                  
                  <div className=&quot;text-center&quot;>
                    <div className=&quot;inline-flex items-center px-4 py-2 bg-yellow-400 text-black rounded-full text-sm font-bold mb-4&quot;>
                      🔥 OFFRE LIMITÉE - Plus que 24h
                    </div>
                    <h3 className=&quot;text-3xl font-bold mb-2&quot;>Guide Self-Cut Premium</h3>
                    <p className=&quot;text-blue-100 text-lg&quot;>La méthode complète pour maîtriser la coupe à domicile</p>
                  </div>
                </div>
                
                <div className=&quot;p-8&quot;>
                  <div className=&quot;grid lg:grid-cols-2 gap-8&quot;>
                    {/* Left: Content Details */}
                    <div className=&quot;space-y-6&quot;>
                      <div>
                        <h4 className=&quot;text-2xl font-bold text-gray-900 mb-4&quot;>Contenu Complet du Guide</h4>
                        <div className=&quot;space-y-4&quot;>
                          <div className=&quot;flex items-start space-x-3&quot;>
                            <div className=&quot;w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold&quot;>1</div>
                            <div>
                              <h5 className=&quot;font-semibold text-gray-900&quot;>Préparation & Outils (15 pages)</h5>
                              <p className=&quot;text-gray-600 text-sm&quot;>Choisir les bons outils, préparer l&apos;espace de coupe, techniques de sécurité</p>
                            </div>
                          </div>
                          <div className=&quot;flex items-start space-x-3&quot;>
                            <div className=&quot;w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold&quot;>2</div>
                            <div>
                              <h5 className=&quot;font-semibold text-gray-900&quot;>Techniques de Base (20 pages)</h5>
                              <p className=&quot;text-gray-600 text-sm&quot;>Coupes simples, égalisation, techniques pour débutants avec illustrations</p>
                            </div>
                          </div>
                          <div className=&quot;flex items-start space-x-3&quot;>
                            <div className=&quot;w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold&quot;>3</div>
                            <div>
                              <h5 className=&quot;font-semibold text-gray-900&quot;>Dégradés Professionnels (25 pages)</h5>
                              <p className=&quot;text-gray-600 text-sm&quot;>Maîtrisez les dégradés parfaits, finitions nettes, styles modernes</p>
                            </div>
                          </div>
                          <div className=&quot;flex items-start space-x-3&quot;>
                            <div className=&quot;w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold&quot;>4</div>
                            <div>
                              <h5 className=&quot;font-semibold text-gray-900&quot;>Correction d&apos;Erreurs (15 pages)</h5>
                              <p className=&quot;text-gray-600 text-sm&quot;>Comment rattraper les erreurs, techniques de réparation</p>
                            </div>
                          </div>
                          <div className=&quot;flex items-start space-x-3&quot;>
                            <div className=&quot;w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold&quot;>5</div>
                            <div>
                              <h5 className=&quot;font-semibold text-gray-900&quot;>Styles Avancés (10 pages)</h5>
                              <p className=&quot;text-gray-600 text-sm&quot;>Coupes tendances 2025, styles personnalisés, maintenance</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Pricing */}
                    <div className=&quot;lg:sticky lg:top-8&quot;>
                      <div className=&quot;bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg&quot;>
                        <div className=&quot;text-center mb-6&quot;>
                          <div className=&quot;text-sm text-gray-500 mb-1&quot;>Prix habituel</div>
                          <div className=&quot;text-2xl text-gray-400 line-through mb-2&quot;>{guideInfo.originalPrice}€</div>
                          <div className=&quot;text-5xl font-bold text-blue-600 mb-2&quot;>{guideInfo.price}€</div>
                          <div className=&quot;inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold&quot;>
                            🔥 -{guideInfo.discount}% aujourd&apos;hui seulement
                          </div>
                        </div>
                        
                        <div className=&quot;space-y-3 mb-6&quot;>
                          <div className=&quot;flex items-center text-sm text-gray-700&quot;>
                            <div className=&quot;w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3&quot;>
                              <span className=&quot;text-white text-xs&quot;>✓</span>
                            </div>
                            Téléchargement immédiat
                          </div>
                          <div className=&quot;flex items-center text-sm text-gray-700&quot;>
                            <div className=&quot;w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3&quot;>
                              <span className=&quot;text-white text-xs&quot;>✓</span>
                            </div>
                            Accès à vie + mises à jour gratuites
                          </div>
                          <div className=&quot;flex items-center text-sm text-gray-700&quot;>
                            <div className=&quot;w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3&quot;>
                              <span className=&quot;text-white text-xs&quot;>✓</span>
                            </div>
                            Compatible tous appareils (PDF, mobile, tablette)
                          </div>
                          <div className=&quot;flex items-center text-sm text-gray-700&quot;>
                            <div className=&quot;w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3&quot;>
                              <span className=&quot;text-white text-xs&quot;>✓</span>
                            </div>
                            Garantie satisfait ou remboursé 30 jours
                          </div>
                        </div>

                        <div className=&quot;space-y-3&quot;>
                          <button className=&quot;w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1&quot;>
                            <ArrowDownTrayIcon className=&quot;h-6 w-6 inline mr-2&quot; />
                            Acheter & Télécharger Maintenant
                          </button>
                          <button className=&quot;w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-xl font-semibold hover:bg-blue-50 transition-colors&quot;>
                            <EnvelopeIcon className=&quot;h-5 w-5 inline mr-2&quot; />
                            Recevoir par Email
                          </button>
                        </div>

                        <div className=&quot;text-center mt-4 text-xs text-gray-500&quot;>
                          🔒 Paiement sécurisé SSL • ⚡ Téléchargement instantané
                        </div>
                      </div>

                      {/* Countdown Timer */}
                      <div className=&quot;mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-center&quot;>
                        <div className=&quot;text-red-800 font-semibold text-sm mb-2&quot;>⏰ Offre limitée - Plus que :</div>
                        <div className=&quot;text-2xl font-bold text-red-600&quot;>23:42:17</div>
                        <div className=&quot;text-red-600 text-xs&quot;>Heures : Minutes : Secondes</div>
                      </div>
                    </div>
                  </div>

                  {/* Social Proof */}
                  <div className=&quot;mt-8 pt-8 border-t border-gray-200&quot;>
                    <div className=&quot;text-center mb-6&quot;>
                      <h4 className=&quot;text-xl font-bold text-gray-900 mb-2&quot;>Déjà adopté par 10,000+ personnes</h4>
                      <div className=&quot;flex items-center justify-center space-x-1 mb-2&quot;>
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} className=&quot;h-6 w-6 text-yellow-400&quot; />
                        ))}
                        <span className=&quot;text-gray-600 ml-2&quot;>(4.9/5 sur 2,847 avis)</span>
                      </div>
                    </div>
                    
                    <div className=&quot;grid md:grid-cols-2 gap-4&quot;>
                      <div className=&quot;bg-gray-50 rounded-lg p-4&quot;>
                        <p className=&quot;text-gray-700 text-sm italic mb-2&quot;>&quot;Ce guide a changé ma vie ! Plus jamais de rendez-vous chez le coiffeur. J&apos;ai récupéré mon investissement dès la 2ème coupe.&quot;</p>
                        <div className=&quot;text-xs text-gray-600&quot;>⭐⭐⭐⭐⭐ - Alexandre M., 32 ans</div>
                      </div>
                      <div className=&quot;bg-gray-50 rounded-lg p-4&quot;>
                        <p className=&quot;text-gray-700 text-sm italic mb-2&quot;>&quot;Instructions ultra claires, même pour un débutant comme moi. Ma femme pensait que j&apos;étais allé chez un pro !&quot;</p>
                        <div className=&quot;text-xs text-gray-600&quot;>⭐⭐⭐⭐⭐ - David L., 28 ans</div>
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
