import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon, ShoppingCartIcon, FunnelIcon } from '@heroicons/react/24/outline';

const allProducts = [
  // Tondeuses
  {
    id: 1,
    name: 'Tondeuse Professionnelle Pro-X Elite',
    price: '89.99',
    originalPrice: '140.00',
    rating: 4.8,
    reviews: 245,
    image: '/placeholder-trimmer-1.jpg',
    category: 'Tondeuses',
    categorySlug: 'tondeuses',
    discount: 36,
    bestseller: true
  },
  {
    id: 2,
    name: 'Tondeuse Sans Fil PowerCut',
    price: '64.99',
    originalPrice: '95.00',
    rating: 4.6,
    reviews: 189,
    image: '/placeholder-trimmer-2.jpg',
    category: 'Tondeuses',
    categorySlug: 'tondeuses',
    discount: 32
  },
  // Accessoires
  {
    id: 3,
    name: 'Kit de Sabots Professionnels (12 pièces)',
    price: '24.99',
    originalPrice: '39.99',
    rating: 4.7,
    reviews: 156,
    image: '/placeholder-guards.jpg',
    category: 'Accessoires',
    categorySlug: 'accessoires',
    discount: 38
  },
  {
    id: 4,
    name: 'Ciseaux de Barbier Japonais',
    price: '45.99',
    originalPrice: '75.00',
    rating: 4.9,
    reviews: 203,
    image: '/placeholder-scissors.jpg',
    category: 'Accessoires',
    categorySlug: 'accessoires',
    discount: 39,
    bestseller: true
  },
  // Produits de soin
  {
    id: 5,
    name: 'Huile de Barbe Premium 50ml',
    price: '24.99',
    originalPrice: '35.00',
    rating: 4.8,
    reviews: 167,
    image: '/placeholder-oil.jpg',
    category: 'Soins',
    categorySlug: 'produits',
    discount: 29
  },
  {
    id: 6,
    name: 'Baume de Barbe Hydratant',
    price: '19.99',
    originalPrice: '32.00',
    rating: 4.6,
    reviews: 134,
    image: '/placeholder-balm.jpg',
    category: 'Soins',
    categorySlug: 'produits',
    discount: 38
  },
  // Self-cut
  {
    id: 7,
    name: 'Kit Self-Cut Débutant',
    price: '49.99',
    originalPrice: '75.00',
    rating: 4.5,
    reviews: 89,
    image: '/placeholder-selfcut.jpg',
    category: 'Self-Cut',
    categorySlug: 'self-cut',
    discount: 33
  },
  {
    id: 8,
    name: 'Miroir 3 Faces Pliable',
    price: '34.99',
    originalPrice: '55.00',
    rating: 4.7,
    reviews: 112,
    image: '/placeholder-mirror.jpg',
    category: 'Self-Cut',
    categorySlug: 'self-cut',
    discount: 36
  }
];

const categories = [
  { name: 'Tous les produits', slug: 'all', count: allProducts.length },
  { name: 'Tondeuses', slug: 'tondeuses', count: allProducts.filter(p => p.categorySlug === 'tondeuses').length },
  { name: 'Accessoires', slug: 'accessoires', count: allProducts.filter(p => p.categorySlug === 'accessoires').length },
  { name: 'Soins', slug: 'produits', count: allProducts.filter(p => p.categorySlug === 'produits').length },
  { name: 'Self-Cut', slug: 'self-cut', count: allProducts.filter(p => p.categorySlug === 'self-cut').length }
];

const priceRanges = [
  { label: 'Moins de 25€', min: 0, max: 25 },
  { label: '25€ - 50€', min: 25, max: 50 },
  { label: '50€ - 75€', min: 50, max: 75 },
  { label: '75€ - 100€', min: 75, max: 100 },
  { label: 'Plus de 100€', min: 100, max: 999 }
];

export default function ProduitsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tous nos Produits</h1>
              <p className="text-gray-600 mt-2">Découvrez notre gamme complète d'équipements de barbier</p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 lg:hidden">
                <FunnelIcon className="h-4 w-4" />
                Filtres
              </button>
              <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Trier par popularité</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
                <option>Meilleures notes</option>
                <option>Nouveautés</option>
                <option>Meilleures ventes</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Filtres</h3>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Catégories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.slug} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-600">{category.name}</span>
                      </div>
                      <span className="text-xs text-gray-400">({category.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Prix</h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.label} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Note client</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-2 flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-4 w-4 ${
                                i < rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-1 text-sm text-gray-600">& plus</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Offers */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Offres spéciales</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">En promotion</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">Meilleures ventes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">Nouveautés</span>
                  </label>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                Appliquer les filtres
              </button>
              
              <button className="w-full mt-2 text-sm text-gray-600 hover:text-gray-800">
                Réinitialiser les filtres
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Affichage de {allProducts.length} produits
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Affichage:</span>
                <button className="p-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="p-2 border border-gray-300 rounded text-blue-600 bg-blue-50">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {allProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Image produit</span>
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        -{product.discount}%
                      </span>
                      {product.bestseller && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          Best-seller
                        </span>
                      )}
                    </div>
                    
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {product.category}
                      </span>
                      <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                        <HeartIcon className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{product.rating}</span>
                      <span className="text-sm text-gray-400">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">{product.price}€</span>
                        <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}€</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                        <ShoppingCartIcon className="h-4 w-4" />
                        Ajouter
                      </button>
                      <Link
                        href={`/${product.categorySlug}/${product.id}`}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Voir
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-2">
                <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">Précédent</button>
                <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded">1</button>
                <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">2</button>
                <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">3</button>
                <span className="px-3 py-2 text-sm text-gray-400">...</span>
                <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">10</button>
                <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">Suivant</button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
