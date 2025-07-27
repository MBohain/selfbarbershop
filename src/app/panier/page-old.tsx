import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { 
  TrashIcon, 
  MinusIcon, 
  PlusIcon,
  ShoppingBagIcon,
  LockClosedIcon 
} from '@heroicons/react/24/outline';

// Simulation d&apos;un panier pour la démo
const cartItems = [
  {
    id: 1,
    productId: &apos;1&apos;,
    name: &apos;Tondeuse Professionnelle Pro-X Elite&apos;,
    price: 89.99,
    originalPrice: 140.00,
    quantity: 1,
    image: &apos;/placeholder-trimmer-1.jpg&apos;,
    inStock: true
  },
  {
    id: 2,
    productId: &apos;4&apos;,
    name: &apos;Ciseaux de Barbier Japonais&apos;,
    price: 45.99,
    originalPrice: 75.00,
    quantity: 2,
    image: &apos;/placeholder-scissors.jpg&apos;,
    inStock: true
  }
];

export default function PanierPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 75 ? 0 : 5.99;
  const tax = subtotal * 0.2; // 20% VAT
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Panier</h1>
          <p className="text-gray-600 mt-2">{cartItems.length} article(s) dans votre panier</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          // Empty cart
          <div className="text-center py-12">
            <ShoppingBagIcon className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Votre panier est vide</h2>
            <p className="text-gray-600 mb-8">Découvrez nos produits et ajoutez-les à votre panier</p>
            <Link
              href="/produits"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Continuer mes achats
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Articles</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-xs text-gray-500">Image</span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                          <div className="mt-1 flex items-center space-x-2">
                            <span className="text-xl font-bold text-blue-600">{item.price}€</span>
                            <span className="text-sm text-gray-500 line-through">{item.originalPrice}€</span>
                            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                              -{Math.round((1 - item.price / item.originalPrice) * 100)}%
                            </span>
                          </div>
                          <p className="text-sm text-green-600 mt-1">En stock</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button className="p-1 rounded-md border border-gray-300 hover:bg-gray-50">
                            <MinusIcon className="h-4 w-4 text-gray-600" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button className="p-1 rounded-md border border-gray-300 hover:bg-gray-50">
                            <PlusIcon className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-medium text-gray-900">
                            {(item.price * item.quantity).toFixed(2)}€
                          </p>
                          <button className="mt-1 text-red-600 hover:text-red-800">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Continue Shopping */}
              <div className="mt-6">
                <Link
                  href="/produits"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ← Continuer mes achats
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Récapitulatif</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-medium">{subtotal.toFixed(2)}€</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Livraison</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Gratuite</span>
                      ) : (
                        `${shipping.toFixed(2)}€`
                      )}
                    </span>
                  </div>
                  
                  {shipping > 0 && (
                    <p className="text-xs text-gray-500">
                      Livraison gratuite dès 75€ d&apos;achat
                    </p>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">TVA (20%)</span>
                    <span className="font-medium">{tax.toFixed(2)}€</span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-bold text-blue-600">{total.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                  <LockClosedIcon className="h-5 w-5" />
                  <span>Passer la commande</span>
                </button>
                
                <div className="mt-4 space-y-2 text-xs text-gray-500">
                  <div className="flex items-center space-x-2">
                    <span>🚚</span>
                    <span>Livraison sous 3-5 jours ouvrés</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🔒</span>
                    <span>Paiement 100% sécurisé</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>↩️</span>
                    <span>Retour gratuit sous 30 jours</span>
                  </div>
                </div>
              </div>
              
              {/* Promo Code */}
              <div className="bg-gray-100 rounded-lg p-4 mt-6">
                <h3 className="font-medium text-gray-900 mb-2">Code promo</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Entrez votre code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-700">
                    Appliquer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
