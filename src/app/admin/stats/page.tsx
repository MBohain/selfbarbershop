'use client';

import { useState, useEffect } from 'react';
import {
  ChartBarIcon,
  CurrencyEuroIcon,
  ShoppingCartIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

interface StatsData {
  current: {
    sales: number;
    orders: number;
    profit: number;
    visitors: number;
    conversionRate: number;
  };
  previous: {
    sales: number;
    orders: number;
    profit: number;
    visitors: number;
    conversionRate: number;
  };
  changes: {
    sales: number;
    orders: number;
    profit: number;
    visitors: number;
    conversionRate: number;
  };
  topProducts: Array<{
    id: string;
    name: string;
    sales: number;
    price: number;
    image: string;
  }>;
  chartData: Array<{
    date: string;
    sales: number;
  }>;
  timeframe: string;
}

export default function StatsPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month' | 'year'>('week');

  useEffect(() => {
    fetchStats();
  }, [timeframe]);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/stats?timeframe=${timeframe}`);
      const data = await response.json();
      if (response.ok) {
        setStats(data);
      } else {
        console.error('Erreur lors de la récupération des statistiques');
      }
    } catch (error) {
      console.error('Erreur chargement statistiques:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Erreur lors du chargement des statistiques</p>
      </div>
    );
  }

  // Fonctions helper pour accéder aux données des statistiques
  const getSales = () => stats?.current.sales || 0;
  const getOrders = () => stats?.current.orders || 0;
  const getProfit = () => stats?.current.profit || 0;
  const getVisitors = () => stats?.current.visitors || 0;
  const getConversion = () => stats?.current.conversionRate || 0;  const StatCard = ({ title, value, icon: Icon, change, prefix = '', suffix = '' }: unknown) => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {prefix}{typeof value === 'number' ? value.toLocaleString('fr-FR', {
              minimumFractionDigits: suffix === '€' ? 2 : 0,
              maximumFractionDigits: suffix === '€' ? 2 : 0
            }) : value}{suffix}
          </p>
          {change && (
            <div className={`flex items-center mt-2 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? (
                <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              ) : (
                <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
              )}
              <span className="text-sm font-medium">
                {Math.abs(change).toFixed(1)}% vs hier
              </span>
            </div>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-full">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Statistiques</h1>
        <div className="flex space-x-2">
          {[
            { key: 'day', label: "Aujourd'hui" },
            { key: 'week', label: 'Cette semaine' },
            { key: 'month', label: 'Ce mois' },
            { key: 'year', label: 'Cette année' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTimeframe(key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeframe === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Chiffre d'Affaires"
          value={getSales()}
          icon={CurrencyEuroIcon}
          suffix="€"
        />
        <StatCard
          title="Commandes"
          value={getOrders()}
          icon={ShoppingCartIcon}
        />
        <StatCard
          title="Bénéfices"
          value={getProfit()}
          icon={ArrowTrendingUpIcon}
          suffix="€"
        />
        <StatCard
          title="Visiteurs"
          value={getVisitors()}
          icon={EyeIcon}
        />
      </div>

      {/* Conversion Rate */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Taux de Conversion</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-blue-600">
              {getConversion().toFixed(2)}%
            </p>
            <p className="text-sm text-gray-600">
              {getOrders()} commandes sur {getVisitors()} visiteurs
            </p>
          </div>
          <div className="w-32 h-32">
            <div className="relative w-full h-full">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${getConversion() * 2.827} 283`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <UserGroupIcon className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Produits les Plus Vendus</h3>
          {stats.topProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <ShoppingCartIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Aucune vente enregistrée</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales} ventes</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{(product.sales * product.price).toFixed(2)}€</p>
                    <p className="text-sm text-gray-500">{product.sales} vendus</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Business Insights */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Aperçu Business</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {((getProfit() / getSales()) * 100 || 0).toFixed(1)}%
            </p>
            <p className="text-sm text-green-700">Marge Bénéficiaire</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              {(getSales() / Math.max(getOrders(), 1)).toFixed(2)}€
            </p>
            <p className="text-sm text-blue-700">Panier Moyen</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">
              {(getVisitors() / Math.max(getOrders(), 1)).toFixed(1)}
            </p>
            <p className="text-sm text-purple-700">Visiteurs par Commande</p>
          </div>
        </div>
      </div>
    </div>
  );
}
