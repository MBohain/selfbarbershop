import Navigation from &apos;@/components/Navigation&apos;;
import ShippingCalculator from &apos;@/components/ShippingCalculator&apos;;

export default function TestShipping() {
  const testAmounts = [25, 45, 59.99, 60, 75, 100];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Test des Frais de Livraison
          </h1>
          <p className="text-xl text-gray-600">
            Vérifiez le calcul automatique selon le montant du panier
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Configuration Actuelle
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Livraison Gratuite</h3>
              <p className="text-blue-800">Dès <strong>60€</strong> d&apos;achat</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-semibold text-orange-900 mb-2">Frais Standard</h3>
              <p className="text-orange-800"><strong>4,99€</strong> en dessous de 60€</p>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">💰 Votre Marge sur la Livraison</h3>
            <p className="text-green-800">
              AliExpress = <strong>Livraison gratuite</strong> → Vous gardez <strong>4,99€</strong> par commande sous 60€
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Simulation par Montant
          </h2>
          
          <div className="space-y-6">
            {testAmounts.map((amount) => (
              <div key={amount} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">
                    Panier: {amount.toFixed(2)}€
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    amount >= 60 
                      ? &apos;bg-green-100 text-green-800&apos; 
                      : &apos;bg-orange-100 text-orange-800&apos;
                  }`}>
                    {amount >= 60 ? &apos;Livraison Gratuite&apos; : &apos;Frais de Livraison&apos;}
                  </span>
                </div>
                
                <ShippingCalculator subtotal={amount} />
                
                {amount < 60 && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-800">
                      💡 <strong>Marge additionnelle:</strong> +4,99€ de profit sur la livraison
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🎯 Stratégie Business
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Avantages Client</h3>
              <ul className="text-gray-700 space-y-1">
                <li>✅ Seuil accessible (60€)</li>
                <li>✅ Frais transparents (4,99€)</li>
                <li>✅ Motivation à commander plus</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Votre Rentabilité</h3>
              <ul className="text-gray-700 space-y-1">
                <li>💰 +4,99€ par commande &lt; 60€</li>
                <li>📈 Panier moyen augmenté</li>
                <li>🎯 Marge produit + marge livraison</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
