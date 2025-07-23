'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

interface CartDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CartDrawer({ open, setOpen }: CartDrawerProps) {
  const { items, updateQuantity, removeFromCart, total } = useCart();
  
  // Paramètres de livraison (devrait venir des settings mais on utilise les valeurs par défaut)
  const freeShippingThreshold = 60;
  const shippingCost = 4.99;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - total);
  const isFreeShipping = total >= freeShippingThreshold;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Panier
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Fermer le panier</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {items.length === 0 ? (
                              <li className="flex py-6">
                                <div className="text-center w-full">
                                  <p className="text-gray-500">Votre panier est vide</p>
                                </div>
                              </li>
                            ) : (
                              items.map((item) => (
                                <li key={item.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={item.product.image || '/placeholder.jpg'}
                                      alt={item.product.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <span>{item.product.name}</span>
                                        </h3>
                                        <p className="ml-4">{(item.product.price * item.quantity).toFixed(2)}€</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">{item.product.price.toFixed(2)}€ / pièce</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center">
                                        <button
                                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                          className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                                        >
                                          -
                                        </button>
                                        <span className="px-3 py-1 bg-gray-100">{item.quantity}</span>
                                        <button
                                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                          className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                                        >
                                          +
                                        </button>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          onClick={() => removeFromCart(item.id)}
                                          className="font-medium text-red-600 hover:text-red-500"
                                        >
                                          Supprimer
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {items.length > 0 && (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Sous-total</p>
                          <p>{total.toFixed(2)}€</p>
                        </div>
                        
                        {/* Message de livraison gratuite */}
                        {total > 0 && (
                          <div className="mt-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                            {isFreeShipping ? (
                              <div className="flex items-center text-green-600">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm font-medium">Livraison gratuite !</span>
                              </div>
                            ) : (
                              <div className="text-blue-700">
                                <p className="text-sm font-medium">
                                  Plus que <span className="font-bold text-blue-800">{remainingForFreeShipping.toFixed(2)}€</span> pour la livraison gratuite !
                                </p>
                                <div className="mt-2 bg-blue-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${Math.min(100, (total / freeShippingThreshold) * 100)}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        <p className="mt-3 text-sm text-gray-500">
                          {isFreeShipping 
                            ? 'Votre livraison est offerte !' 
                            : `Frais de port: ${shippingCost.toFixed(2)}€`
                          }
                        </p>
                        <div className="mt-6">
                          <Link
                            href="/panier"
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 w-full"
                          >
                            Voir le panier
                          </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            ou{' '}
                            <button
                              type="button"
                              className="font-medium text-blue-600 hover:text-blue-500"
                              onClick={() => setOpen(false)}
                            >
                              Continuer les achats
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
