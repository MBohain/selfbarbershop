import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';
import { 
  HeartIcon, 
  ShoppingCartIcon, 
  BookOpenIcon,
  UserIcon,
  AcademicCapIcon,
  ScissorsIcon
} from '@heroicons/react/24/outline';

// Récupération des vrais produits depuis l'API
async function getSelfCutProducts() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/products?category=self-cut`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching self-cut products:', error);
    return { products: [] };
  }
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

export default async function SelfCutPage() {
  const { products } = await getSelfCutProducts();

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
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <BookOpenIcon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Guide Exclusif Disponible
            </h3>
            <p className="text-blue-800">
              Apprenez 50+ techniques professionnelles avec notre ebook premium
            </p>
          </div>
        </div>

        {/* Produits Self-Cut */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Équipement Professionnel
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: unknown) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Image produit</span>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Prix */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-blue-600">
                        {product.price}€
                      </span>
                      {product.originalPrice > product.price && (
                        <>
                          <span className="text-sm text-gray-500 line-through">
                            {product.originalPrice}€
                          </span>
                          <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      ({product.reviewCount} avis)
                    </span>
                  </div>
                  
                  {/* Features */}
                  <div className="mb-4">
                    <ul className="text-sm text-gray-600 space-y-1">
                      {JSON.parse(product.features).slice(0, 3).map((feature: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Badges */}
                  <div className="flex gap-2 mb-4">
                    {product.bestseller && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
                        Best-seller
                      </span>
                    )}
                    {product.featured && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                        Recommandé
                      </span>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                      <ShoppingCartIcon className="h-4 w-4" />
                      Ajouter au panier
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <HeartIcon className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            <Link
              href="/produits?search=ebook"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <BookOpenIcon className="h-5 w-5 mr-2" />
              Voir le Guide Complet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
