'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { 
  CogIcon,
  CreditCardIcon,
  WrenchScrewdriverIcon,
  ChatBubbleLeftRightIcon,
  TruckIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

interface Setting {
  value: string;
  description: string;
  updatedAt: string;
}

interface Settings {
  payments_enabled?: Setting;
  maintenance_mode?: Setting;
  site_message?: Setting;
  free_shipping_threshold?: Setting;
  shipping_cost?: Setting;
  contact_email?: Setting;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Vérifier l'authentification
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/login');
      return;
    }

    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/settings', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data.settings);
      } else {
        console.error('Erreur lors du chargement des paramètres');
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: string, value: string) => {
    try {
      setSaving(true);
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          key,
          value,
          description: settings[key as keyof Settings]?.description
        }),
      });

      if (response.ok) {
        setMessage('Paramètre mis à jour avec succès');
        setTimeout(() => setMessage(''), 3000);
        loadSettings(); // Recharger les paramètres
      } else {
        setMessage('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  const togglePayments = () => {
    const currentValue = settings.payments_enabled?.value === 'true';
    updateSetting('payments_enabled', currentValue ? 'false' : 'true');
  };

  const toggleMaintenance = () => {
    const currentValue = settings.maintenance_mode?.value === 'true';
    updateSetting('maintenance_mode', currentValue ? 'false' : 'true');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Paramètres du Site
          </h1>
          <p className="text-gray-600">
            Gérez les paramètres globaux de votre boutique
          </p>
        </div>

        {/* Message de statut */}
        {message && (
          <div className={`mb-6 p-4 rounded-md ${
            message.includes('succès') 
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Paiements */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <CreditCardIcon className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Paiements
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              {settings.payments_enabled?.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Paiements {settings.payments_enabled?.value === 'true' ? 'activés' : 'désactivés'}
              </span>
              <button
                onClick={togglePayments}
                disabled={saving}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  settings.payments_enabled?.value === 'true' ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.payments_enabled?.value === 'true' ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            {settings.payments_enabled?.value === 'false' && (
              <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-md">
                <p className="text-sm text-orange-800">
                  ⚠️ Les paiements sont désactivés. Les clients ne pourront pas finaliser leurs commandes.
                </p>
              </div>
            )}
          </div>

          {/* Mode maintenance */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <WrenchScrewdriverIcon className="h-6 w-6 text-orange-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Mode Maintenance
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              {settings.maintenance_mode?.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Maintenance {settings.maintenance_mode?.value === 'true' ? 'activée' : 'désactivée'}
              </span>
              <button
                onClick={toggleMaintenance}
                disabled={saving}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                  settings.maintenance_mode?.value === 'true' ? 'bg-orange-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.maintenance_mode?.value === 'true' ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            {settings.maintenance_mode?.value === 'true' && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-800">
                  🚧 Le site est en mode maintenance. Seuls les administrateurs peuvent y accéder.
                </p>
              </div>
            )}
          </div>

          {/* Message du site */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Message du Site
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              {settings.site_message?.description}
            </p>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Message d'information à afficher sur le site..."
              defaultValue={settings.site_message?.value || ''}
              onBlur={(e) => updateSetting('site_message', e.target.value)}
            />
          </div>

          {/* Seuil livraison gratuite */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <TruckIcon className="h-6 w-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Livraison Gratuite
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              {settings.free_shipping_threshold?.description}
            </p>
            <div className="flex items-center">
              <input
                type="number"
                step="0.01"
                className="w-20 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue={settings.free_shipping_threshold?.value || '60'}
                onBlur={(e) => updateSetting('free_shipping_threshold', e.target.value)}
              />
              <span className="ml-2 text-gray-700">€</span>
            </div>
          </div>

          {/* Frais de livraison */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <TruckIcon className="h-6 w-6 text-orange-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Frais de Livraison
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              {settings.shipping_cost?.description}
            </p>
            <div className="flex items-center">
              <input
                type="number"
                step="0.01"
                className="w-20 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                defaultValue={settings.shipping_cost?.value || '4.99'}
                onBlur={(e) => updateSetting('shipping_cost', e.target.value)}
              />
              <span className="ml-2 text-gray-700">€</span>
            </div>
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800">
                💡 <strong>Astuce Business :</strong> Livraison gratuite sur AliExpress, vous gardez {settings.shipping_cost?.value || '4.99'}€ de marge par commande sous {settings.free_shipping_threshold?.value || '60'}€
              </p>
            </div>
          </div>

          {/* Email de contact */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
            <div className="flex items-center mb-4">
              <EnvelopeIcon className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Email de Contact
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              {settings.contact_email?.description}
            </p>
            <input
              type="email"
              className="w-full max-w-md p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="contact@selfbarbershoppro.fr"
              defaultValue={settings.contact_email?.value || ''}
              onBlur={(e) => updateSetting('contact_email', e.target.value)}
            />
          </div>
        </div>

        {/* Statut des services */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <CogIcon className="h-6 w-6 text-gray-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">
              Statut des Services
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                settings.payments_enabled?.value === 'true' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className="text-sm text-gray-700">
                Paiements {settings.payments_enabled?.value === 'true' ? 'Actifs' : 'Inactifs'}
              </span>
            </div>
            
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                settings.maintenance_mode?.value === 'false' ? 'bg-green-500' : 'bg-orange-500'
              }`}></div>
              <span className="text-sm text-gray-700">
                Site {settings.maintenance_mode?.value === 'false' ? 'En ligne' : 'En maintenance'}
              </span>
            </div>
            
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2 bg-green-500"></div>
              <span className="text-sm text-gray-700">
                Base de données Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
