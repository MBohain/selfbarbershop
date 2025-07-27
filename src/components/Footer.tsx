import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SelfBarberShop</h3>
            <p className="text-gray-400">
              Votre destination pour tous vos besoins en équipements de barbier professionnels.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Catégories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/tondeuses" className="hover:text-white">Tondeuses</Link></li>
              <li><Link href="/accessoires" className="hover:text-white">Accessoires</Link></li>
              <li><Link href="/produits" className="hover:text-white">Produits</Link></li>
              <li><Link href="/self-cut" className="hover:text-white">Self-cut</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/livraison" className="hover:text-white">Livraison</Link></li>
              <li><Link href="/paiements" className="hover:text-white">Paiements</Link></li>
              <li><Link href="/retours" className="hover:text-white">Retours</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Informations légales</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link></li>
              <li><Link href="/cgv" className="hover:text-white">CGV</Link></li>
              <li><Link href="/politique-confidentialite" className="hover:text-white">Politique de confidentialité</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; 2025 SelfBarberShop. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
