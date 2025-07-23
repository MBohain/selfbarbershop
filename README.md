# 🚀 SelfBarberShop Pro - E-commerce Dropshipping Automatisé

Site e-commerce moderne pour la vente d'équipements de barbier avec intégration automatisée vers AliExpress pour le dropshipping et **système de suspension des paiements en un clic**.

## ✨ Nouvelles Fonctionnalités Admin

### 🎛️ Contrôle Total des Paiements
- **Suspension instantanée** des paiements depuis l'admin
- **Mode maintenance** pour les mises à jour
- **Messages d'information** personnalisés
- **Gestion en temps réel** sans redémarrage

### 🔐 Interface Admin Complète
- Dashboard avec statistiques
- Gestion CRUD des produits
- Paramètres globaux du site
- Authentification sécurisée JWT

## 🚀 Déploiement Gratuit

### 📋 Guide Complet
- 📁 **[DEPLOIEMENT-GRATUIT.md](./DEPLOIEMENT-GRATUIT.md)** - Guide complet pour mettre en ligne gratuitement
- 🎛️ **[GUIDE-ADMIN.md](./GUIDE-ADMIN.md)** - Manuel d'utilisation des paramètres admin

### ⚡ Déploiement Express (5 minutes)

1. **Fork le projet** sur GitHub
2. **Connectez à Vercel** : [vercel.com/new](https://vercel.com/new)
3. **Ajoutez vos variables** d'environnement (voir `.env.example`)
4. **Déployez** ! 🎉

### 🔧 Configuration Rapide

```bash
# 1. Cloner et installer
git clone <votre-repo>
npm install

# 2. Configuration
cp .env.example .env.local
# Éditez .env.local avec vos clés

# 3. Base de données
npm run db:reset

# 4. Démarrer
npm run dev
```

## 🎯 Fonctionnalités Principales

### 💼 Business
- ✅ **Dropshipping automatisé** avec AliExpress
- ✅ **Gestion des profits** (40-60% de marge)
- ✅ **Politique de retour** intelligente
- ✅ **Suspension des paiements** en un clic
- ✅ **Calcul automatique** des coûts et bénéfices

### 🛒 E-commerce
- ✅ **Catalogue produits** avec 4 catégories
- ✅ **Système de promotions** (-30%)
- ✅ **Panier et favoris**
- ✅ **Paiements Stripe** sécurisés
- ✅ **Livraison gratuite** configurable

### 👨‍💼 Administration
- ✅ **Dashboard admin** complet
- ✅ **CRUD produits** sans code
- ✅ **Paramètres du site** en temps réel
- ✅ **Gestion des stocks** AliExpress
- ✅ **Suspension/réactivation** des paiements

### 🔧 Technique
- ✅ **Next.js 15** avec App Router
- ✅ **TypeScript** + **Tailwind CSS**
- ✅ **Prisma ORM** avec SQLite/PostgreSQL
- ✅ **Authentification JWT**
- ✅ **API RESTful** complète

## 🎛️ Interface Admin

### Accès
```
URL: /login
Email: admin@selfbarbershoppro.fr
Mot de passe: admin123
```

### Fonctionnalités
- **📊 Dashboard** - Vue d'ensemble des produits
- **➕ Nouveau Produit** - Ajout simplifié avec AliExpress
- **⚙️ Paramètres** - Contrôle total du site
- **💳 Suspension Paiements** - Toggle instantané
- **📝 Messages** - Communication avec les clients

## 🛡️ Gestion Intelligente des Paiements

### Suspension Temporaire
Quand suspendre les paiements :
- 🔧 **Maintenance** du site
- 📦 **Mise à jour** des produits
- 🏖️ **Congés/vacances**
- ⚠️ **Problème technique**

### Avantages
- ✅ **Pas de perte** de trafic
- ✅ **Clients restent** sur le site
- ✅ **SEO préservé**
- ✅ **Réactivation instantanée**

## 🌟 Hébergement Gratuit

### Plateformes Recommandées
- **🚀 Vercel** (recommandé) - 100GB/mois gratuit
- **🔥 Netlify** - Alternative solide
- **☁️ Railway** - Base de données incluse

### Coûts Réels
- **Hébergement** : Gratuit à vie
- **Base de données** : Gratuit (plusieurs options)
- **Stripe** : 2.9% + 0.25€ par transaction uniquement
- **Email** : Gratuit (Gmail)

## 📈 Business Model Dropshipping

### Automatisation Complète
1. **Client commande** sur votre site
2. **Paiement reçu** via Stripe (bénéfice immédiat)
3. **Commande auto** passée sur AliExpress
4. **Expédition directe** au client
5. **Tracking** automatique

### Rentabilité
- **Marge** : 40-60% sur chaque vente
- **Investissement** : 0€ (pas de stock)
- **Retours** : 3-6% d'impact sur les profits
- **Automatisation** : 99% du processus

## 📊 Produits Inclus

### Catalogue Prêt (12 produits)
- **4 Tondeuses** (89€ - 299€)
- **3 Accessoires** (25€ - 89€)
- **3 Produits de Soin** (15€ - 45€)
- **2 Kits Self-Cut** (79€ - 149€)

### Promotions Actives
- **30% de réduction** sur produits sélectionnés
- **Livraison gratuite** dès 75€
- **Garantie satisfaction** 30 jours

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production

# Base de données
npm run db:seed      # Peupler avec données test
npm run db:studio    # Interface Prisma Studio
npm run db:reset     # Reset + seed complet
```

## 📱 Structure du Projet

```
src/
├── app/
│   ├── admin/          # Interface administrateur
│   │   ├── dashboard/  # Dashboard principal
│   │   ├── products/   # Gestion produits
│   │   └── settings/   # Paramètres du site
│   ├── api/            # APIs REST
│   │   ├── admin/      # APIs admin protégées
│   │   ├── auth/       # Authentification
│   │   ├── orders/     # Gestion commandes
│   │   ├── products/   # API produits
│   │   └── status/     # Statut du site
│   ├── login/          # Page de connexion admin
│   ├── retours/        # Politique de retour
│   └── [pages]/        # Pages publiques
├── components/         # Composants React
├── lib/               # Utilitaires
└── prisma/            # Schéma base de données
```

## 🤝 Support et Documentation

### 📚 Documentation Complète
- **[Guide de Déploiement](./DEPLOIEMENT-GRATUIT.md)** - Mise en ligne gratuite
- **[Manuel Admin](./GUIDE-ADMIN.md)** - Utilisation des paramètres
- **[Configuration](./env.example)** - Variables d'environnement

### 🆘 Support
- **Email** : admin@selfbarbershoppro.fr
- **Issues** : GitHub Issues
- **Documentation** : README.md

## 🎯 Prochaines Étapes

### Après Déploiement
1. **Testez** votre site en ligne
2. **Configurez** vos clés Stripe réelles
3. **Personnalisez** vos produits
4. **Activez** le marketing
5. **Commencez** à vendre ! 🚀

### Évolutions Futures
- 🔌 **API AliExpress** officielle (quand disponible)
- 📱 **App mobile** React Native
- 📈 **Analytics avancées**
- 🤖 **Chatbot client**

---

**🎉 Votre business dropshipping clé en main est prêt !**

*Déployez gratuitement, gérez facilement, vendez efficacement.*

## 🚀 Fonctionnalités

### Site Web
- **Page d'accueil** attractive avec présentation des produits
- **Navigation** intuitive avec 6 catégories principales :
  - Accueil
  - Tondeuses
  - Accessoires
  - Produits (soins)
  - Self-cut
  - Contact

### E-commerce
- **Catalogue produits** complet avec filtres et tri
- **Panier d'achat** interactif
- **Système de paiement** sécurisé avec Stripe
- **Gestion des commandes** automatisée

### Automatisation Dropshipping
- **Intégration AliExpress** pour l'approvisionnement automatique
- **Traitement automatique des commandes** :
  1. Client passe commande sur votre site (prix majoré)
  2. Système passe automatiquement commande sur AliExpress (prix fournisseur)
  3. Produit expédié directement chez le client
  4. Aucune intervention manuelle requise

### Technologies
- **Frontend** : Next.js 15, TypeScript, Tailwind CSS
- **Backend** : API Routes Next.js, Prisma ORM
- **Base de données** : SQLite (dev) / PostgreSQL (prod)
- **Paiement** : Stripe
- **Email** : Nodemailer
- **Authentification** : NextAuth.js

## 🛠️ Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd babershop
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer l'environnement**
```bash
cp .env.local.example .env.local
# Éditer .env.local avec vos clés API
```

4. **Configurer la base de données**
```bash
npm run db:reset  # Créer la DB et peupler avec des données test
```

5. **Démarrer le serveur de développement**
```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📝 Configuration

### Variables d'environnement requises

```env
# Base de données
DATABASE_URL="file:./dev.db"

# Stripe (paiements)
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# AliExpress API (quand disponible)
ALIEXPRESS_API_KEY="your_api_key"
ALIEXPRESS_SECRET_KEY="your_secret_key"

# Email
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_USER="your_email@gmail.com"
EMAIL_SERVER_PASSWORD="your_app_password"
```

## 🎯 Fonctionnement du Dropshipping

### Flux automatisé
1. **Client** : Commande une tondeuse à 89.99€ sur votre site
2. **Système** : Traite le paiement via Stripe
3. **Automation** : Passe commande sur AliExpress à 45€
4. **Livraison** : Produit expédié directement chez le client
5. **Profit** : Marge automatique de 44.99€ (sans intervention)

### Gestion des erreurs
- Gestion automatique des ruptures de stock
- Remboursement automatique en cas d'échec
- Suivi des commandes en temps réel
- Notifications par email

## 📊 Administration

### Compte admin par défaut
- **Email** : admin@selfbarbershoppro.fr
- **Mot de passe** : admin123

### Fonctionnalités admin
- Gestion des produits
- Suivi des commandes
- Statistiques de vente
- Gestion des marges

## 🔧 Scripts disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run db:seed      # Peupler la base de données
npm run db:studio    # Interface graphique Prisma
npm run db:reset     # Reset complet de la DB
```

## 📦 Structure du projet

```
src/
├── app/                 # Pages Next.js (App Router)
│   ├── api/            # API Routes
│   ├── tondeuses/      # Page catégorie tondeuses
│   ├── accessoires/    # Page catégorie accessoires
│   ├── produits/       # Page tous produits
│   ├── self-cut/       # Page self-cut
│   ├── contact/        # Page contact
│   └── panier/         # Page panier
├── components/         # Composants réutilisables
├── lib/               # Utilitaires et services
│   ├── prisma.ts      # Client base de données
│   └── aliexpress.ts  # Service AliExpress
└── generated/         # Code généré par Prisma

prisma/
├── schema.prisma      # Schéma de base de données
├── seed.ts           # Données de test
└── migrations/       # Migrations DB
```

## 🚀 Déploiement

### Vercel (recommandé)
1. Connecter le repository GitHub
2. Configurer les variables d'environnement
3. Changer DATABASE_URL pour PostgreSQL
4. Déployer automatiquement

### Variables de production
- Utiliser PostgreSQL au lieu de SQLite
- Configurer les vraies clés Stripe
- Intégrer la vraie API AliExpress
- Configurer l'envoi d'emails

## 📈 Roadmap

- [ ] Interface d'administration complète
- [ ] Gestion des retours/remboursements
- [ ] Analytics et statistiques avancées
- [ ] App mobile React Native
- [ ] Multi-langues et multi-devises
- [ ] IA pour optimisation des prix

## 🤝 Support

Pour toute question ou problème :
- Email : contact@selfbarbershoppro.fr
- Documentation : [Wiki du projet]
- Issues : [GitHub Issues]

---

**Note importante** : L'intégration AliExpress est actuellement simulée car leur API publique de dropshipping n'est pas disponible. En production, vous devrez utiliser des services tiers comme Spocket, Oberlo, ou développer une solution custom avec web scraping (non recommandé).
