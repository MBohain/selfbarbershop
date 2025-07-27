# 🔧 Configuration Admin - SelfBarberShop

## 🚀 Problème résolu : Connexion Admin

### ✅ Solution appliquée

Le problème de connexion admin après déploiement était dû à la variable d'environnement `JWT_SECRET` manquante sur Vercel.

### 📋 Variables d'environnement configurées sur Vercel

```bash
JWT_SECRET=selfbarbershop-admin-secret-key-2025
DATABASE_URL=[URL de votre base PostgreSQL]
```

### 👤 Identifiants Admin

**Email:** `admin@selfbarbershoppro.fr`  
**Mot de passe:** `admin123`

### 🔄 Pour redéployer et créer l'admin

Si vous changez de base de données, exécutez :

```bash
npm run deploy
```

Cela va :
1. Appliquer le schéma à la nouvelle base
2. Créer automatiquement l'utilisateur admin

### 🌐 Base de données Production

Le site utilise maintenant PostgreSQL en production au lieu de SQLite.

### ⚡ Déploiement rapide

```bash
# 1. Configurer les variables sur Vercel
npx vercel env add JWT_SECRET
npx vercel env add DATABASE_URL

# 2. Déployer
git add .
git commit -m "Fix admin authentication"
git push origin main
```

### 🔍 Vérification

Une fois déployé, testez la connexion admin sur :
- **URL:** https://votre-domaine.vercel.app/login
- **Email:** admin@selfbarbershoppro.fr
- **Mot de passe:** admin123

---

## 🛠️ Configuration complète

### Variables d'environnement requises

```bash
JWT_SECRET="selfbarbershop-admin-secret-key-2025"
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://votre-domaine.vercel.app"
```

### Structure de l'admin

- **Dashboard:** `/admin/dashboard`
- **Produits:** `/admin/products`  
- **Commandes:** `/admin/orders`
- **Statistiques:** `/admin/stats`
- **Guide:** `/admin/guide`
