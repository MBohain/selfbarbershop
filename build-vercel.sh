#!/bin/bash

# Script de build pour Vercel - SelfBarberShop
# Ce script s'assure que Prisma est correctement généré

echo "🔧 Démarrage du build Vercel pour SelfBarberShop..."

# 1. Générer le client Prisma
echo "📋 Génération du client Prisma..."
npx prisma generate

# 2. Build Next.js
echo "🚀 Build Next.js..."
npm run build

echo "✅ Build Vercel terminé avec succès !"
