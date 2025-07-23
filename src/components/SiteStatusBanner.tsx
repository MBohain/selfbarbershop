'use client';

import { useEffect, useState } from 'react';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SiteStatus {
  paymentsEnabled: boolean;
  maintenanceMode: boolean;
  siteMessage: string;
}

export default function SiteStatusBanner() {
  const [status, setStatus] = useState<SiteStatus | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/status');
        if (response.ok) {
          const data = await response.json();
          setStatus(data);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du statut:', error);
      }
    };

    fetchStatus();
    
    // Vérifier le statut toutes les 30 secondes
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!status || dismissed) return null;

  // Bannière de maintenance
  if (status.maintenanceMode) {
    return (
      <div className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
              <span className="font-medium">
                🚧 Site en maintenance - Fonctionnalités limitées
              </span>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-white hover:text-gray-200"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Bannière paiements désactivés
  if (!status.paymentsEnabled) {
    return (
      <div className="bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
              <span className="font-medium">
                💳 Paiements temporairement désactivés - Consultez nos produits en attendant
              </span>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-white hover:text-gray-200"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Message d'information du site
  if (status.siteMessage && status.siteMessage.trim()) {
    return (
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <span className="font-medium">
                ℹ️ {status.siteMessage}
              </span>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-white hover:text-gray-200"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
