import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  CreditCardIcon, 
  ShieldCheckIcon, 
  ClockIcon,
  BanknotesIcon 
} from '@heroicons/react/24/outline';

const paymentMethods = [
  {
    name: 'Cartes de Crédit/Débit',
    description: 'Visa, Mastercard, American Express acceptées',
    icon: CreditCardIcon,
    security: 'Chiffrement SSL 256-bit'
  },
  {
    name: 'Paiement Sécurisé',
    description: 'Powered by Stripe - Leader mondial des paiements en ligne',
    icon: ShieldCheckIcon,
    security: 'Conforme PCI DSS'
  },
  {
    name: 'Traitement Immédiat',
    description: 'Votre commande est traitée dès validation du paiement',
    icon: ClockIcon,
    security: 'Confirmation instantanée'
  }
];

export default function PaiementsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Paiements Sécurisés
          </h1>
          <p className="text-xl text-gray-600">
            Payez en toute sécurité avec nos solutions de paiement de confiance
          </p>
        </div>

        {/* Méthodes de paiement */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {paymentMethods.map((method) => (
            <div key={method.name} className="bg-white p-6 rounded-lg shadow-md">
              <method.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {method.name}
              </h3>
              <p className="text-gray-600 mb-3">{method.description}</p>
              <div className="text-sm text-green-600 font-medium">
                ✓ {method.security}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Paiements */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Questions Fréquentes sur les Paiements
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Quand ma carte sera-t-elle débitée ?
              </h3>
              <p className="text-gray-600">
                Votre carte est débitée immédiatement lors de la validation de votre commande. 
                Vous recevez une confirmation par email instantanément.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Mes données bancaires sont-elles sécurisées ?
              </h3>
              <p className="text-gray-600">
                Absolument. Nous utilisons Stripe, une plateforme de paiement de niveau bancaire 
                avec chiffrement SSL et conformité PCI DSS. Vos données ne sont jamais stockées sur nos serveurs.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Puis-je annuler ma commande ?
              </h3>
              <p className="text-gray-600">
                Les commandes peuvent être annulées dans les 2 heures suivant la validation. 
                Passé ce délai, elles sont automatiquement transmises à nos fournisseurs pour expédition.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Comment fonctionne le remboursement ?
              </h3>
              <p className="text-gray-600">
                En cas de retour accepté, le remboursement est effectué sur votre méthode de paiement 
                originale sous 5-10 jours ouvrés selon votre banque.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Y a-t-il des frais cachés ?
              </h3>
              <p className="text-gray-600">
                Non, tous nos prix sont TTC (toutes taxes comprises). 
                Aucun frais supplémentaire ne sera ajouté lors du paiement.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Puis-je payer en plusieurs fois ?
              </h3>
              <p className="text-gray-600">
                Pour les commandes de plus de 100€, le paiement en 3x sans frais est disponible 
                directement lors du checkout via nos partenaires financiers.
              </p>
            </div>
          </div>
        </div>

        {/* Contact support */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
          <BanknotesIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Besoin d&apos;aide pour votre paiement ?
          </h3>
          <p className="text-gray-600 mb-4">
            Notre équipe support est disponible pour vous aider avec toute question relative aux paiements.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Contacter le Support
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
