'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import SiteStatusBanner from './SiteStatusBanner';
import { useCart } from '@/contexts/CartContext';
import CartDrawer from './CartDrawer';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Tondeuses', href: '/tondeuses' },
  { name: 'Accessoires', href: '/accessoires' },
  { name: 'Produits', href: '/produits' },
  { name: 'Self-cut', href: '/self-cut' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount } = useCart();

  // Écouter l'événement d'ouverture automatique du panier
  useEffect(() => {
    const handleOpenCart = () => {
      setCartOpen(true);
    };

    window.addEventListener('cart:open-drawer', handleOpenCart);
    return () => {
      window.removeEventListener('cart:open-drawer', handleOpenCart);
    };
  }, []);

  return (
    <>
      <SiteStatusBanner />
      <header className="bg-white shadow-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
                    <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">SelfBarberShop</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Ouvrir le menu principal</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
          <button 
            onClick={() => setCartOpen(true)}
            className="relative"
          >
            <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-blue-600" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <Link
            href="/login"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600"
          >
            Se connecter <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      
      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="text-2xl font-bold text-gray-900">SelfBarberShop</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Fermer le menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Se connecter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* CartDrawer */}
      <CartDrawer open={cartOpen} setOpen={setCartOpen} />
    </header>
    </>
  );
}
