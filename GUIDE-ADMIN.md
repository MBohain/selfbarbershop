# 🎛️ Guide d'Utilisation - Paramètres Admin

Ce guide vous explique comment utiliser les paramètres administrateur pour gérer votre boutique SelfBarberShop Pro.

## 🔐 Accès aux Paramètres

1. **Connexion Admin**
   - Allez sur : `http://localhost:3000/login` (ou votre URL de production)
   - Email : `admin@selfbarbershoppro.fr`
   - Mot de passe : `admin123`

2. **Navigation vers les Paramètres**
   - Une fois connecté, cliquez sur "Dashboard"
   - Cliquez sur le bouton "⚙️ Paramètres" en haut à droite

## 🎮 Fonctionnalités Disponibles

### 💳 Suspension des Paiements

**Quand utiliser :**
- Maintenance de votre boutique
- Problème avec votre compte Stripe
- Mise à jour de vos produits
- Période de congés

**Comment faire :**
1. Dans "Paiements", désactivez le toggle
2. Les clients verront : "💳 Paiements temporairement désactivés"
3. Ils peuvent toujours naviguer et voir vos produits
4. Réactivez quand vous êtes prêt

**Avantages :**
- ✅ Aucune perte de trafic
- ✅ Les clients restent sur votre site
- ✅ Ils ajoutent des produits en favoris
- ✅ Réactivation instantanée

### 🔧 Mode Maintenance

**Quand utiliser :**
- Mise à jour majeure du site
- Problème technique important
- Migration de données

**Comment faire :**
1. Activez "Mode Maintenance"
2. Une bannière rouge apparaît : "🚧 Site en maintenance"
3. Seuls les admins peuvent accéder pleinement

### 📢 Messages d'Information

**Exemples d'utilisation :**
- "🎉 Nouvelle collection disponible !"
- "📦 Livraison gratuite ce week-end"
- "💸 Promotion -30% jusqu'à dimanche"
- "⚡ Stock limité sur les tondeuses"

**Comment faire :**
1. Dans "Message du Site", tapez votre message
2. Il apparaît en bannière bleue sur tout le site
3. Les visiteurs peuvent le fermer s'ils veulent

### 🚛 Livraison Gratuite

**Configuration :**
- Modifiez le seuil (par défaut 75€)
- Impact direct sur tous les calculs de commande
- Affiché automatiquement sur le site

### 📧 Email de Contact

**Utilisation :**
- Email affiché sur toutes les pages de contact
- Utilisé pour les emails automatiques
- Modifiable en temps réel

## 📊 Tableau de Bord - Statut des Services

En bas de la page paramètres, vous avez un aperçu en temps réel :

- 🟢 **Paiements Actifs** / 🔴 **Paiements Inactifs**
- 🟢 **Site En ligne** / 🟠 **Site En maintenance**
- 🟢 **Base de données Active**

## 🚀 Scénarios d'Usage Typiques

### Scénario 1: Mise à Jour de Produits
```
1. Désactiver les paiements
2. Ajouter/modifier vos produits
3. Tester en navigation
4. Réactiver les paiements
```

### Scénario 2: Promotion Flash
```
1. Ajouter message: "🔥 FLASH SALE -50% pendant 2h !"
2. Modifier les prix de vos produits
3. Observer l'augmentation du trafic
4. Retirer le message à la fin
```

### Scénario 3: Problème Technique
```
1. Activer mode maintenance
2. Résoudre le problème
3. Tester que tout fonctionne
4. Désactiver maintenance
```

### Scénario 4: Congés/Vacances
```
1. Désactiver paiements
2. Message: "🏖️ Boutique fermée du X au Y - Commandes reprennent le Z"
3. Les clients voient vos produits
4. Réactivation à votre retour
```

## ⚡ Conseils Pro

### Réactivité
- ✅ Tous les changements sont **instantanés**
- ✅ Aucun redémarrage nécessaire
- ✅ Les visiteurs voient les changements immédiatement

### Communication
- 📝 Soyez transparent avec vos clients
- 🕐 Indiquez toujours une durée estimée
- 💬 Utilisez des emojis pour rendre les messages sympathiques

### Planification
- 📅 Suspendez les paiements **avant** de faire des changements
- 🧪 Testez toujours en navigation privée
- 📱 Vérifiez sur mobile aussi

### Sécurité
- 🔐 Changez le mot de passe admin par défaut
- 🚪 Déconnectez-vous toujours après usage
- 👥 Ne partagez pas vos accès admin

## 🎯 Impact Business

### Suspension Intelligente des Paiements
Au lieu de fermer votre site, vous :
- 🛍️ Gardez vos visiteurs sur le site
- 💡 Maintenez l'intérêt pour vos produits  
- 📈 Conservez votre référencement SEO
- ⏰ Reprenez les ventes instantanément

### Gestion de la Demande
- 🎢 Créez de l'urgence avec des messages temporaires
- 📊 Observez l'impact des messages sur les ventes
- 🎯 Testez différents seuils de livraison gratuite

## 🆘 Résolution de Problèmes

### Paiements ne se réactivent pas
1. Vérifiez vos clés Stripe dans Vercel
2. Regardez les logs d'erreur
3. Testez avec une carte de test

### Messages n'apparaissent pas
1. Videz le cache de votre navigateur
2. Testez en navigation privée
3. Vérifiez qu'il n'y a pas d'espaces vides

### Site lent après modifications
1. Les changements sont instantanés
2. Si c'est lent, c'est probablement votre connexion
3. Testez depuis un autre appareil

## 📱 Version Mobile

Tous les paramètres fonctionnent parfaitement sur mobile :
- 📲 Bannières optimisées
- 👆 Toggles tactiles
- 📱 Interface responsive

**Votre boutique est maintenant sous votre contrôle total ! 🎛️**
