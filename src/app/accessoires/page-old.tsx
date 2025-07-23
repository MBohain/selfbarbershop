import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const accessories = [
  {
    id: 1,
    name: 'Kit de Sabots Professionnels (12 pièces)',
    price: '24.99',
    originalPrice: '39.99',
    rating: 4.7,
    reviews: 156,
    image: '/placeholder-guards.jpg',
    category: 'Sabots',
    features: ['Compatible universel', '12 tailles', 'Plastique renforcé', 'Étui inclus'],
    discount: 38,
    aliexpressId: 'ACC001',
    aliexpressPrice: '12.50'
  },
  {
    id: 2,
    name: 'Ciseaux de Barbier Japonais',
    price: '45.99',
    originalPrice: '75.00',
    rating: 4.9,
    reviews: 203,
    image: '/placeholder-scissors.jpg',
    category: 'Ciseaux',
    features: ['Acier japonais', 'Ergonomique', '6.5 pouces', 'Étui cuir'],
    discount: 39,
    aliexpressId: 'ACC002',
    aliexpressPrice: '23.00'
  },
  {
    id: 3,
    name: 'Peigne de Coupe Carbone',
    price: '12.99',
    originalPrice: '22.00',
    rating: 4.5,
    reviews: 89,
    image: '/placeholder-comb.jpg',
    category: 'Peignes',
    features: ['Fibre de carbone', 'Antistatique', 'Résistant chaleur', 'Précision pro'],
    discount: 41,
    aliexpressId: 'ACC003',
    aliexpressPrice: '6.50'
  },
  {
    id: 4,
    name: 'Rasoir de Sécurité Vintage',
    price: '34.99',
    originalPrice: '55.00',
    rating: 4.6,
    reviews: 167,
    image: '/placeholder-razor.jpg',
    category: 'Rasoirs',
    features: ['Laiton massif', '10 lames incluses', 'Poids parfait', 'Finition chrome'],
    discount: 36,
    aliexpressId: 'ACC004',
    aliexpressPrice: '17.50'
  },
  {
    id: 5,
    name: 'Blaireau de Rasage Premium',
    price: '28.99',
    originalPrice: '45.00',
    rating: 4.8,
    reviews: 134,
    image: '/placeholder-brush.jpg',
    category: 'Blaireaux',
    features: ['Poils synthétiques', 'Manche bois', 'Séchage rapide', 'Support inclus'],
    discount: 36,
    aliexpressId: 'ACC005',
    aliexpressPrice: '14.50'
  },
  {
    id: 6,
    name: 'Cape de Coupe Imperméable',
    price: '18.99',
    originalPrice: '32.00',
    rating: 4.4,
    reviews: 78,
    image: '/placeholder-cape.jpg',
    category: 'Capes',
    features: ['Matériau imperméable', 'Fermeture velcro', 'Lavable machine', 'Taille unique'],
    discount: 41,
    aliexpressId: 'ACC006',
    aliexpressPrice: '9.50'
  }
];

const categories = [
  { name: 'Tous', count: accessories.length },
  { name: 'Sabots', count: accessories.filter(a => a.category === 'Sabots').length },
  { name: 'Ciseaux', count: accessories.filter(a => a.category === 'Ciseaux').length },
  { name: 'Peignes', count: accessories.filter(a => a.category === 'Peignes').length },
  { name: 'Rasoirs', count: accessories.filter(a => a.category === 'Rasoirs').length },
  { name: 'Blaireaux', count: accessories.filter(a => a.category === 'Blaireaux').length },
  { name: 'Capes', count: accessories.filter(a => a.category === 'Capes').length }
];

export default function AccessoiresPage() {
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
                <option>Nouveautés</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.name}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {accessories.map((accessory) => (
            <div key={accessory.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Image accessoire</span>
                </div>
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  -{accessory.discount}%
                </div>
                <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                  {accessory.category}
                </div>
                <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                  <HeartIcon className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{accessory.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(accessory.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({accessory.reviews})</span>
                </div>

                {/* Features */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {accessory.features.slice(0, 2).map((feature) => (
                      <span key={feature} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                    {accessory.features.length > 2 && (
                      <span className="text-xs text-gray-500">+{accessory.features.length - 2}</span>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xl font-bold text-blue-600">{accessory.price}€</span>
                    <span className="text-sm text-gray-500 line-through ml-2">{accessory.originalPrice}€</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1">
                    <ShoppingCartIcon className="h-4 w-4" />
                    Ajouter
                  </button>
                  <Link
                    href={`/accessoires/${accessory.id}`}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
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
            <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">Suivant</button>
          </nav>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Accessoires Professionnels</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Nos accessoires de barbier sont sélectionnés pour leur qualité professionnelle. 
              Que vous soyez barbier expérimenté ou amateur passionné, trouvez les outils parfaits 
              pour compléter votre équipement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✂️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Qualité Professionnelle</h3>
              <p className="text-gray-600">Accessoires utilisés par les barbiers professionnels</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Durabilité Garantie</h3>
              <p className="text-gray-600">Matériaux de haute qualité pour une longue durée de vie</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Prix Imbattables</h3>
              <p className="text-gray-600">Les meilleurs prix pour des accessoires de qualité</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
