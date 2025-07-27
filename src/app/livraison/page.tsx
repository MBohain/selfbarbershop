import Navigation from '@/components/Navigation';
import { 
  TruckIcon, 
  MapPinIcon, 
  ClockIcon,
  GiftIcon 
} from '@heroicons/react/24/outline';

const shippingOptions = [
  {
    name: &apos;Livraison Standard&apos;,
    time: &apos;15-25 jours ouvrés&apos;,
    price: &apos;Gratuite&apos;,
    description: &apos;Suivi complet de votre commande&apos;,
    icon: TruckIcon,
    popular: true
  },
  {
    name: &apos;Livraison Express&apos;,
    time: &apos;8-15 jours ouvrés&apos;,
    price: &apos;9.99€&apos;,
    description: &apos;Traitement prioritaire&apos;,
    icon: ClockIcon,
    popular: false
  }
];

const shippingSteps = [
  {
    step: 1,
    title: &apos;Commande validée&apos;,
    description: &apos;Votre commande est confirmée et le paiement traité&apos;,
    time: &apos;Immédiat&apos;
  },
  {
    step: 2,
    title: &apos;Préparation&apos;,
    description: &apos;Votre commande est préparée par nos fournisseurs&apos;,
    time: &apos;2-3 jours&apos;
  },
  {
    step: 3,
    title: &apos;Expédition&apos;,
    description: &apos;Votre colis est expédié et vous recevez le numéro de suivi&apos;,
    time: &apos;3-5 jours&apos;
  },
  {
    step: 4,
    title: &apos;En transit&apos;,
    description: &apos;Votre colis voyage vers votre adresse&apos;,
    time: &apos;10-20 jours&apos;
  },
  {
    step: 5,
    title: &apos;Livraison&apos;,
    description: &apos;Réception de votre commande à domicile&apos;,
    time: &apos;Final&apos;
  }
];

export default function LivraisonPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Livraison & Expédition
          </h1>
          <p className="text-xl text-gray-600">
            Recevez vos produits de barbier professionnel à domicile
          </p>
        </div>

        {/* Options de livraison */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {shippingOptions.map((option) => (
            <div 
              key={option.name} 
              className={`relative bg-white p-6 rounded-lg shadow-md ${
                option.popular ? &apos;ring-2 ring-blue-500&apos; : &apos;&apos;
              }`}
            >
              {option.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 text-sm font-medium rounded-full">
                    Populaire
                  </span>
                </div>
              )}
              
              <option.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {option.name}
              </h3>
              <p className="text-3xl font-bold text-blue-600 mb-2">{option.price}</p>
              <p className="text-lg text-gray-600 mb-3">{option.time}</p>
              <p className="text-gray-500">{option.description}</p>
            </div>
          ))}
        </div>

        {/* Processus de livraison */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Suivi de votre commande
          </h2>
          
          <div className="space-y-6">
            {shippingSteps.map((step, index) => (
              <div key={step.step} className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full font-bold">
                    {step.step}
                  </div>
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-1">{step.description}</p>
                  <p className="text-sm text-blue-600 font-medium">{step.time}</p>
                </div>
                {index < shippingSteps.length - 1 && (
                  <div className="absolute left-5 mt-10 w-0.5 h-6 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Zones de livraison */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Zones de Livraison
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <MapPinIcon className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                France Métropolitaine
              </h3>
              <p className="text-gray-600">
                Livraison disponible dans toute la France métropolitaine. 
                Délais standards appliqués.
              </p>
            </div>
            
            <div>
              <MapPinIcon className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                DOM-TOM & Europe
              </h3>
              <p className="text-gray-600">
                Livraison disponible avec délais étendus. 
                Frais supplémentaires possibles selon destination.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Livraison */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Questions Fréquentes
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Pourquoi les délais sont-ils de 15-25 jours ?
              </h3>
              <p className="text-gray-600">
                Nos produits sont soigneusement sélectionnés auprès de fournisseurs internationaux 
                pour vous garantir le meilleur rapport qualité-prix. Les délais incluent la préparation, 
                l&apos;expédition et le transport international.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Puis-je suivre ma commande ?
              </h3>
              <p className="text-gray-600">
                Oui ! Dès l&apos;expédition, vous recevez un numéro de suivi par email pour 
                suivre votre colis en temps réel jusqu&apos;à la livraison.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Que faire si mon colis n&apos;arrive pas ?
              </h3>
              <p className="text-gray-600">
                Si votre commande n&apos;arrive pas dans les délais indiqués, contactez-nous. 
                Nous lançons immédiatement une enquête et vous proposons un renvoi ou un remboursement.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Y a-t-il des frais de douane ?
              </h3>
              <p className="text-gray-600">
                Pour la France métropolitaine, aucun frais de douane n&apos;est appliqué. 
                Nos prix sont déjà optimisés pour inclure tous les coûts.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
          <GiftIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Questions sur votre livraison ?
          </h3>
          <p className="text-gray-600 mb-4">
            Notre équipe suit chaque commande personnellement.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Nous Contacter
          </a>
        </div>
      </div>
    </div>
  );
}
