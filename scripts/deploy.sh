#!/bin/bash

# Script de déploiement pour la production
echo "🚀 Déploiement SelfBarberShop..."

# Vérifier les variables d'environnement
if [ -z "$DATABASE_URL" ] || [ -z "$JWT_SECRET" ]; then
    echo "❌ Variables d'environnement manquantes"
    echo "DATABASE_URL: ${DATABASE_URL:+✅ Défini}${DATABASE_URL:-❌ Manquant}"
    echo "JWT_SECRET: ${JWT_SECRET:+✅ Défini}${JWT_SECRET:-❌ Manquant}"
    exit 1
fi

echo "✅ Variables d'environnement configurées"

# Générer le client Prisma
echo "🔧 Génération du client Prisma..."
npx prisma generate

# Appliquer les migrations
echo "🗄️ Application des migrations..."
npx prisma db push

# Créer un utilisateur admin par défaut
echo "👤 Création de l'utilisateur admin..."
npx tsx scripts/create-admin.js

echo "✅ Déploiement terminé !"
