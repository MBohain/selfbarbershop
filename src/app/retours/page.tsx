import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  ArrowPathIcon, 
  ShieldCheckIcon, 
  ClockIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

const returnReasons = [
  {
    title: 'Produit défectueux',
    description: 'Remboursement complet sans retour requis',
    icon: ExclamationTriangleIcon,
    action: 'Remboursement immédiat',
    timeframe: '2-3 jours ouvrés'
  },
  {
    title: 'Produit non conforme',
    description: 'Ne correspond pas à la description',
    icon: ShieldCheckIcon,
    action: 'Remboursement ou échange',
    timeframe: '5-7 jours ouvrés'
  },
  {
    title: 'Changement d\'avis',
    description: 'Retour possible sous conditions',
    icon: ArrowPathIcon,
    action: 'Retour à vos frais',
    timeframe: '10-14 jours ouvrés'
  }
];

const returnProcess = [
  {
    step: 1,
    title: 'Contactez-nous',
    description: 'Envoyez un email avec votre numéro de commande et photos si produit défectueux'
  },
  {
    step: 2,
    title: 'Évaluation',
    description: 'Notre équipe évalue votre demande sous 24h'
  },
  {
    step: 3,
    title: 'Solution proposée',
    description: 'Remboursement, échange ou retour selon le cas'
  },
  {
    step: 4,
    title: 'Remboursement',
    description: 'Crédit sur votre méthode de paiement originale'
  }
];

export default function RetoursPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Retours & Remboursements
          </h1>
          <p className="text-xl text-gray-600">
            Notre politique de retour transparente et équitable
          </p>
        </div>

        {/* Résumé de la politique */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
          <div className="flex items-start">
            <ShieldCheckIcon className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Garantie Satisfaction Client
              </h3>
              <p className="text-blue-800">
                Retour gratuit sous 30 jours pour tout produit défectueux ou non conforme. 
                Pour les produits de moins de 20€, remboursement sans retour requis.
              </p>
            </div>
          </div>
        </div>

        {/* Types de retours */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Conditions de Retour
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {returnReasons.map((reason, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <reason.icon className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {reason.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {reason.description}
                </p>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Action : </span>
                    <span className="text-green-600">{reason.action}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Délai : </span>
                    <span className="text-blue-600">{reason.timeframe}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Processus de retour */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Processus de Retour
          </h2>
          
          <div className="space-y-6">
            {returnProcess.map((step) => (
              <div key={step.step} className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full font-bold">
                    {step.step}
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conditions détaillées */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Conditions Détaillées
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🎯 Produits Défectueux (&lt; 20€)
              </h3>
              <p className="text-gray-600">
                Pour les produits de faible valeur, nous offrons un remboursement complet 
                sans demander le retour du produit. Envoyez-nous des photos du défaut.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                📦 Produits de Valeur (&gt; 20€)
              </h3>
              <p className="text-gray-600">
                Pour les produits de plus grande valeur, un retour peut être nécessaire. 
                Nous évaluons au cas par cas pour minimiser vos frais.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ⏰ Délai de Retour
              </h3>
              <p className="text-gray-600">
                30 jours à compter de la réception pour signaler un problème. 
                Les retours pour changement d'avis sont acceptés sous 14 jours.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                💰 Frais de Retour
              </h3>
              <p className="text-gray-600">
                - Produit défectueux : <strong>Frais gratuits</strong><br />
                - Erreur de notre part : <strong>Frais gratuits</strong><br />
                - Changement d'avis : <strong>À votre charge</strong>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🔄 Remboursements
              </h3>
              <p className="text-gray-600">
                Les remboursements sont effectués sur votre méthode de paiement originale 
                sous 5-10 jours ouvrés après acceptation du retour.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Questions Fréquentes
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Que faire si mon produit arrive endommagé ?
              </h3>
              <p className="text-gray-600">
                Contactez-nous immédiatement avec des photos. Pour la plupart des cas, 
                nous offrons un remboursement sans retour requis.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Puis-je échanger un produit ?
              </h3>
              <p className="text-gray-600">
                Oui, selon disponibilité. Nous pouvons proposer un échange ou un avoir 
                pour faciliter votre nouvelle commande.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Comment suivre mon remboursement ?
              </h3>
              <p className="text-gray-600">
                Vous recevrez un email de confirmation avec le détail du remboursement 
                et les délais selon votre banque.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <ClockIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Besoin d&apos;aide pour un retour ?
          </h3>
          <p className="text-gray-600 mb-4">
            Notre équipe traite les demandes de retour sous 24h
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <strong>Email :</strong> retours@selfbarbershoppro.fr
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
