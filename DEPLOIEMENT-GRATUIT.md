# 🚀 Guide de Déploiement Gratuit - SelfBarberShop

Ce guide vous explique comment mettre en ligne votre site SelfBarberShop **gratuitement** sur Vercel.

## ✅ **ÉTAT ACTUEL : DÉPLOIEMENT EN COURS**

🎉 **Toutes les erreurs TypeScript/ESLint ont été corrigées !**
- ✅ Build Vercel réussi
- ✅ Code source compatible production
- ✅ **Problème Prisma Client résolu** 
- ✅ Build automatique déclenché sur Vercel
- 🔄 **Déploiement en cours...**

### 🔧 **Corrections apportées :**
- **Prisma Generate** : Ajouté au script de build
- **Cache Vercel** : Configuration optimisée 
- **Build Process** : Script postinstall configuré
- **Fichiers optimisés** : .vercelignore créé

## 📋 Prérequis

1. **Compte GitHub** (gratuit) - pour stocker votre code
2. **Compte Vercel** (gratuit) - pour l'hébergement
3. **Compte Stripe** (gratuit) - pour les paiements
4. **Votre projet SelfBarberShop Pro** - prêt à déployer

## 🌟 Étape 1: Préparation du Code

### A. Créer un repository GitHub

1. Allez sur [GitHub.com](https://github.com) et connectez-vous
2. Cliquez sur "New repository"
3. Nommez-le `selfbarbershop-pro`
4. Cochez "Public" (gratuit)
5. Cliquez "Create repository"

### B. Pousser votre code

Dans votre terminal, depuis le dossier de votre projet :

```bash
# Initialiser git si pas encore fait
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - SelfBarberShop Pro"

# Ajouter l'origine GitHub (remplacez VOTRE-USERNAME)
git remote add origin https://github.com/VOTRE-USERNAME/selfbarbershop-pro.git

# Pousser vers GitHub
git push -u origin main
```

## 🚀 Étape 2: Déploiement sur Vercel

### A. Créer un compte Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez "Sign Up"
3. Connectez-vous avec votre compte GitHub

### B. Importer votre projet

1. Sur le dashboard Vercel, cliquez "New Project"
2. Sélectionnez votre repository `selfbarbershop-pro`
3. Cliquez "Import"

### C. Configuration des variables d'environnement

Dans les paramètres du projet Vercel, ajoutez ces variables :

```env
# Base de données (Vercel fournira automatiquement)
DATABASE_URL=

# JWT Secret
JWT_SECRET=votre-secret-jwt-super-securise-ici

# NextAuth
NEXTAUTH_SECRET=votre-secret-nextauth-ici
NEXTAUTH_URL=https://votre-site.vercel.app

# Stripe (vos vraies clés)
STRIPE_PUBLISHABLE_KEY=pk_live_votre_cle_publique
STRIPE_SECRET_KEY=sk_live_votre_cle_secrete
STRIPE_WEBHOOK_SECRET=whsec_votre_webhook_secret

# Email (Gmail gratuit)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=votre.email@gmail.com
EMAIL_SERVER_PASSWORD=votre-mot-de-passe-app
EMAIL_FROM=SelfBarberShop <votre.email@gmail.com>

# Configuration de l'app
NEXT_PUBLIC_APP_URL=https://votre-site.vercel.app
NEXT_PUBLIC_COMPANY_NAME=SelfBarberShop
```

⚠️ **IMPORTANT**: Remplacez `https://votre-site.vercel.app` par votre vraie URL Vercel

### D. Base de données gratuite

Pour la base de données, vous avez plusieurs options gratuites :

#### Option 1: Vercel Postgres (Recommandée)
1. Dans votre projet Vercel, allez dans l'onglet "Storage"
2. Cliquez "Create Database" → "Postgres"
3. Suivez les instructions
4. Vercel ajoutera automatiquement `DATABASE_URL`

#### Option 2: PlanetScale (Alternative)
1. Créez un compte sur [planetscale.com](https://planetscale.com)
2. Créez une base de données gratuite
3. Copiez l'URL de connexion dans `DATABASE_URL`

## 🔧 Étape 3: Configuration Stripe

### A. Créer un compte Stripe

1. Allez sur [stripe.com](https://stripe.com)
2. Créez un compte (gratuit)
3. Activez votre compte avec vos informations

### B. Récupérer les clés API

1. Dans le dashboard Stripe, allez dans "Developers" → "API keys"
2. Copiez votre "Publishable key" et "Secret key"
3. Ajoutez-les dans les variables d'environnement Vercel

### C. Configurer les webhooks

1. Dans Stripe, allez dans "Developers" → "Webhooks"
2. Cliquez "Add endpoint"
3. URL: `https://votre-site.vercel.app/api/webhooks/stripe`
4. Sélectionnez les événements : `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Copiez le "Signing secret" dans `STRIPE_WEBHOOK_SECRET`

## 📧 Étape 4: Configuration Email (Gmail gratuit)

### A. Activer l'authentification à 2 facteurs

1. Allez dans votre compte Google
2. Activez la 2FA dans "Sécurité"

### B. Créer un mot de passe d'application

1. Dans "Sécurité" → "Mots de passe des applications"
2. Créez un nouveau mot de passe pour "Mail"
3. Utilisez ce mot de passe dans `EMAIL_SERVER_PASSWORD`

## 🗄️ Étape 5: Migration de la Base de Données

Une fois votre site déployé, vous devez créer les tables :

### A. Installer Vercel CLI

```bash
npm i -g vercel
vercel login
```

### B. Exécuter les migrations

```bash
# Se connecter à votre projet
vercel link

# Exécuter les migrations
vercel env pull .env.local
npx prisma generate
npx prisma db push
npx prisma db seed
```

## ✅ Étape 6: Tests et Validation

### A. Tester votre site

1. Visitez votre URL Vercel
2. Testez la navigation
3. Essayez de vous connecter en admin : `/login`
4. Vérifiez les paramètres : `/admin/settings`

### B. Tester les paiements

1. Utilisez les cartes de test Stripe :
   - Succès : `4242 4242 4242 4242`
   - Échec : `4000 0000 0000 0002`

### C. Suspension des paiements

1. Allez dans `/admin/settings`
2. Désactivez les paiements
3. Vérifiez que les clients ne peuvent plus payer

## 🎯 Gestion Post-Déploiement

### Surveillance des paiements

Depuis l'admin (`/admin/settings`), vous pouvez :
- ✅ **Activer/désactiver les paiements** instantanément
- 🔧 **Mode maintenance** si besoin de modifications
- 📝 **Messages d'information** pour vos clients
- 📧 **Email de contact** personnalisé

### Suspendre les paiements temporairement

Pour suspendre les paiements (maintenance, problème, etc.) :

1. Connectez-vous à votre admin : `https://votre-site.vercel.app/login`
2. Allez dans "Paramètres"
3. Désactivez le toggle "Paiements"
4. Les clients verront : "Paiements temporairement désactivés"

### Mettre à jour le site

Quand vous voulez modifier votre site :

```bash
# Modifier vos fichiers
git add .
git commit -m "Mise à jour"
git push

# Vercel redéploie automatiquement !
```

## 💰 Coûts et Limites

### Gratuit à vie :
- **Vercel** : Jusqu'à 100GB de bande passante/mois
- **Stripe** : Pas de frais mensuels, seulement 2.9% + 0.25€ par transaction
- **Gmail** : Email gratuit illimité
- **Base de données** : Plusieurs options gratuites disponibles

### Évolutivité :
Votre site peut gérer des milliers de visiteurs gratuitement. Si vous grandissez, les upgrades sont abordables.

## 🎉 Félicitations !

Votre boutique SelfBarberShop est maintenant en ligne et opérationnelle !

### Fonctionnalités actives :
- ✅ Boutique e-commerce complète
- ✅ Paiements sécurisés Stripe
- ✅ Admin panel avec gestion des produits
- ✅ Suspension des paiements à la demande
- ✅ Dropshipping automatisé
- ✅ Gestion des retours
- ✅ SSL et sécurité inclus

### URLs importantes :
- **Site public** : `https://votre-site.vercel.app`
- **Admin** : `https://votre-site.vercel.app/login`
- **Dashboard Stripe** : `https://dashboard.stripe.com`
- **Analytics Vercel** : `https://vercel.com/dashboard`

**Votre business dropshipping est prêt à générer des revenus ! 🚀**
