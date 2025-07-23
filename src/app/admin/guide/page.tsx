'use client';

import { useState, useEffect } from 'react';
import { 
  BookOpenIcon, 
  ArrowUpTrayIcon,
  PencilIcon,
  EyeIcon,
  DocumentArrowDownIcon,
  CurrencyEuroIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface GuideSettings {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  isActive: boolean;
  pdfFile?: string;
  pdfFileName?: string;
  totalPages: number;
  videoCount: number;
  salesCount: number;
  rating: number;
  reviewCount: number;
  updatedAt: string;
}

export default function GuideAdminPage() {
  const [guide, setGuide] = useState<GuideSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    fetchGuideSettings();
  }, []);

  const fetchGuideSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/guide');
      if (response.ok) {
        const data = await response.json();
        setGuide(data.guide);
      }
    } catch (error) {
      console.error('Error fetching guide settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveGuideSettings = async () => {
    if (!guide) return;
    
    try {
      setSaving(true);
      const response = await fetch('/api/admin/guide', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(guide),
      });

      if (response.ok) {
        alert('Paramètres sauvegardés avec succès !');
      } else {
        alert('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Error saving guide settings:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || file.type !== 'application/pdf') {
      alert('Veuillez sélectionner un fichier PDF');
      return;
    }

    if (file.size > 50 * 1024 * 1024) { // 50MB max
      alert('Le fichier ne doit pas dépasser 50MB');
      return;
    }

    try {
      setUploadingPdf(true);
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await fetch('/api/admin/guide/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setGuide(prev => prev ? {
          ...prev,
          pdfFile: data.filePath,
          pdfFileName: file.name
        } : null);
        alert('PDF uploadé avec succès !');
      } else {
        alert('Erreur lors de l\'upload du PDF');
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert('Erreur lors de l\'upload du PDF');
    } finally {
      setUploadingPdf(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpenIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Aucun guide configuré</h2>
          <p className="text-gray-600 mb-4">Configurez votre guide premium pour commencer les ventes</p>
          <button
            onClick={() => setGuide({
              id: '1',
              title: 'Guide Self-Cut Premium',
              description: 'Maîtrisez l\'art de la coupe à domicile',
              price: 29,
              originalPrice: 79,
              discount: 63,
              isActive: true,
              totalPages: 85,
              videoCount: 12,
              salesCount: 0,
              rating: 4.9,
              reviewCount: 2847,
              updatedAt: new Date().toISOString()
            })}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Créer le guide
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion du Guide Premium</h1>
          <p className="mt-2 text-gray-600">
            Configurez votre guide self-cut, prix et fichiers PDF
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            <EyeIcon className="h-5 w-5 mr-2" />
            {previewMode ? 'Mode Édition' : 'Aperçu'}
          </button>
          <button
            onClick={saveGuideSettings}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            ) : (
              <CheckCircleIcon className="h-5 w-5 mr-2" />
            )}
            Sauvegarder
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informations générales */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Informations du Guide</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre du Guide
                </label>
                <input
                  type="text"
                  value={guide.title}
                  onChange={(e) => setGuide({...guide, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut
                </label>
                <select
                  value={guide.isActive ? 'active' : 'inactive'}
                  onChange={(e) => setGuide({...guide, isActive: e.target.value === 'active'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Actif (en vente)</option>
                  <option value="inactive">Inactif (masqué)</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={guide.description}
                onChange={(e) => setGuide({...guide, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tarification */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tarification</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix de vente (€)
                </label>
                <div className="relative">
                  <CurrencyEuroIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={guide.price}
                    onChange={(e) => setGuide({...guide, price: parseFloat(e.target.value) || 0})}
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix barré (€)
                </label>
                <div className="relative">
                  <CurrencyEuroIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={guide.originalPrice}
                    onChange={(e) => {
                      const originalPrice = parseFloat(e.target.value) || 0;
                      const discount = originalPrice > 0 ? Math.round(((originalPrice - guide.price) / originalPrice) * 100) : 0;
                      setGuide({...guide, originalPrice, discount});
                    }}
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Réduction (%)
                </label>
                <input
                  type="text"
                  value={`${guide.discount}%`}
                  readOnly
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
                />
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-800">
                <strong>Aperçu prix :</strong> <span className="line-through">{guide.originalPrice}€</span> → <span className="text-2xl font-bold">{guide.price}€</span> <span className="text-green-600">(-{guide.discount}%)</span>
              </div>
            </div>
          </div>

          {/* Contenu du guide */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contenu du Guide</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de pages
                </label>
                <input
                  type="number"
                  value={guide.totalPages}
                  onChange={(e) => setGuide({...guide, totalPages: parseInt(e.target.value) || 0})}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de vidéos
                </label>
                <input
                  type="number"
                  value={guide.videoCount}
                  onChange={(e) => setGuide({...guide, videoCount: parseInt(e.target.value) || 0})}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Upload PDF */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Fichier PDF du Guide</h2>
            
            {guide.pdfFile ? (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DocumentArrowDownIcon className="h-8 w-8 text-green-600 mr-3" />
                    <div>
                      <div className="font-medium text-green-800">{guide.pdfFileName}</div>
                      <div className="text-sm text-green-600">PDF uploadé avec succès</div>
                    </div>
                  </div>
                  <a
                    href={guide.pdfFile}
                    download
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Télécharger
                  </a>
                </div>
              </div>
            ) : (
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-yellow-800">
                  ⚠️ Aucun PDF uploadé. Les clients ne pourront pas télécharger le guide.
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Uploader un nouveau PDF
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <ArrowUpTrayIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="text-gray-600 mb-2">
                  Glissez votre PDF ici ou 
                  <label className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium ml-1">
                    parcourez
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploadingPdf}
                    />
                  </label>
                </div>
                <div className="text-sm text-gray-500">
                  PDF uniquement, max 50MB
                </div>
                {uploadingPdf && (
                  <div className="mt-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                    <div className="text-sm text-blue-600 mt-2">Upload en cours...</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistiques</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Ventes totales</span>
                <span className="font-bold text-gray-900">{guide.salesCount}</span>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Revenus générés</span>
                <span className="font-bold text-green-600">{(guide.salesCount * guide.price).toFixed(2)}€</span>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Note moyenne</span>
                <span className="font-bold text-yellow-600">{guide.rating}/5</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Nombre d'avis</span>
                <span className="font-bold text-gray-900">{guide.reviewCount}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions Rapides</h2>
            
            <div className="space-y-3">
              <button
                onClick={() => window.open('/self-cut', '_blank')}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <EyeIcon className="h-5 w-5 mr-2" />
                Voir sur le site
              </button>
              
              <button
                onClick={() => {
                  setGuide({...guide, isActive: !guide.isActive});
                  saveGuideSettings();
                }}
                className={`w-full flex items-center justify-center px-4 py-2 rounded-lg ${
                  guide.isActive 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {guide.isActive ? 'Désactiver' : 'Activer'} la vente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
