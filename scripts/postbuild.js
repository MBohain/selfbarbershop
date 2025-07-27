// Script qui s'exécute après le build pour configurer la production
const { execSync } = require('child_process');

try {
  console.log('🚀 Configuration post-build...');
  
  // Définir les variables d'environnement par défaut si pas définies
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = 'file:./production.db';
  }
  if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = 'selfbarbershop-admin-secret-key-2025';
  }

  console.log('📊 Variables d\'environnement:');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Défini' : '❌ Manquant');
  console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Défini' : '❌ Manquant');

  // Tenter de configurer la base de données si en production
  if (process.env.VERCEL && process.env.DATABASE_URL) {
    console.log('🗄️ Configuration de la base de données...');
    try {
      execSync('npx prisma db push --force-reset', { stdio: 'inherit' });
      execSync('npx tsx scripts/setup-production.js', { stdio: 'inherit' });
      console.log('✅ Base de données configurée');
    } catch (error) {
      console.warn('⚠️ Erreur configuration base:', error.message);
    }
  }

  console.log('✅ Post-build terminé');
} catch (error) {
  console.warn('⚠️ Erreur post-build:', error.message);
  // Ne pas faire échouer le déploiement
}
