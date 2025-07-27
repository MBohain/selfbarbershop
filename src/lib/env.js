// Configuration des variables d'environnement avec valeurs par défaut
const config = {
  DATABASE_URL: process.env.DATABASE_URL || 'file:./production.db',
  JWT_SECRET: process.env.JWT_SECRET || 'selfbarbershop-admin-secret-key-2025',
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'selfbarbershop-nextauth-secret',
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://selfbarbershop.vercel.app',
  NEXT_PUBLIC_COMPANY_NAME: process.env.NEXT_PUBLIC_COMPANY_NAME || 'SelfBarberShop Pro',
  
  // Stripe (optionnel, valeurs par défaut pour éviter les erreurs)
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder',
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder',
  
  // Email (optionnel)
  EMAIL_FROM: process.env.EMAIL_FROM || 'SelfBarberShop Pro <noreply@selfbarbershoppro.fr>',
  
  // AliExpress (optionnel)
  ALIEXPRESS_API_KEY: process.env.ALIEXPRESS_API_KEY || 'placeholder',
  ALIEXPRESS_SECRET_KEY: process.env.ALIEXPRESS_SECRET_KEY || 'placeholder'
};

// Appliquer les valeurs par défaut à process.env si elles n'existent pas
Object.keys(config).forEach(key => {
  if (!process.env[key]) {
    process.env[key] = config[key];
  }
});

module.exports = config;
