'use client';

import { useEffect, useState } from 'react';
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Notification {
  id: string;
  type: 'success' | 'error';
  message: string;
  product?: unknown;
}

export default function CartNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const handleCartAdded = (event: unknown) => {
      const { message, product } = event.detail;
      const notification: Notification = {
        id: Date.now().toString(),
        type: 'success',
        message,
        product
      };
      
      setNotifications(prev => [...prev, notification]);
      
      // Auto-remove après 5 secondes
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 5000);
    };

    const handleCartError = (event: unknown) => {
      const { message } = event.detail;
      const notification: Notification = {
        id: Date.now().toString(),
        type: 'error',
        message
      };
      
      setNotifications(prev => [...prev, notification]);
      
      // Auto-remove après 5 secondes
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 5000);
    };

    window.addEventListener('cart:added', handleCartAdded);
    window.addEventListener('cart:error', handleCartError);

    return () => {
      window.removeEventListener('cart:added', handleCartAdded);
      window.removeEventListener('cart:error', handleCartError);
    };
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            max-w-sm rounded-lg shadow-lg p-4 transition-all duration-300 transform
            ${notification.type === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
            }
          `}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {notification.type === 'success' ? (
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
              ) : (
                <XCircleIcon className="h-5 w-5 text-red-600" />
              )}
            </div>
            
            <div className="ml-3 w-0 flex-1">
              <p className={`text-sm font-medium ${
                notification.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {notification.message}
              </p>
              
              {notification.product && (
                <p className="text-xs text-green-600 mt-1">
                  {notification.product.name}
                </p>
              )}
            </div>
            
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={() => removeNotification(notification.id)}
                className={`inline-flex rounded-md ${
                  notification.type === 'success' 
                    ? 'text-green-400 hover:text-green-500' 
                    : 'text-red-400 hover:text-red-500'
                }`}
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
