'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  ChartBarIcon, 
  StarIcon, 
  CogIcon,
  ShoppingBagIcon,
  PlusIcon,
  ClipboardDocumentListIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Statistiques', href: '/admin/stats', icon: ChartBarIcon },
  { name: 'Produits Populaires', href: '/admin/featured-products', icon: StarIcon },
  { name: 'Produits', href: '/admin/products', icon: ShoppingBagIcon },
  { name: 'Nouveau Produit', href: '/admin/products/new', icon: PlusIcon },
  { name: 'Guide Premium', href: '/admin/guide', icon: BookOpenIcon },
  { name: 'Commandes', href: '/admin/orders', icon: ClipboardDocumentListIcon },
  { name: 'Paramètres', href: '/admin/settings', icon: CogIcon },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200">
                    <Link href="/admin/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-gray-900">SelfBarberShop Admin</span>
          </Link>
        </div>
        
        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col gap-y-1 px-6 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon
                      className={`h-5 w-5 shrink-0 ${
                        isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'
                      }`}
                    />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          {/* Retour au site */}
          <div className="px-6 py-4 border-t border-gray-200">
            <Link
              href="/"
              className="group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
            >
              <HomeIcon className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-blue-600" />
              Retour au site
            </Link>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
