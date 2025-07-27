const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testAdminLogin() {
  try {
    console.log('🔍 Test de connexion admin...\n');

    // Vérifier les utilisateurs admin
    const adminUsers = await prisma.user.findMany({
      where: { role: 'ADMIN' }
    });

    console.log(`📊 Nombre d'utilisateurs admin trouvés: ${adminUsers.length}\n`);

    for (const user of adminUsers) {
      console.log(`👤 Utilisateur: ${user.name}`);
      console.log(`📧 Email: ${user.email}`);
      console.log(`🔑 Password Hash: ${user.password ? 'Oui' : 'Non'}`);
      console.log(`📅 Créé le: ${user.createdAt}`);
      
      // Test avec le mot de passe par défaut
      const testPassword = 'admin123';
      const isValid = await bcrypt.compare(testPassword, user.password);
      console.log(`🔐 Test mot de passe "${testPassword}": ${isValid ? '✅ Valide' : '❌ Invalide'}`);
      console.log('---');
    }

    // Vérifier les variables d'environnement
    console.log('\n🌍 Variables d\'environnement:');
    console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? '✅ Défini' : '❌ Manquant'}`);
    console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? '✅ Défini' : '❌ Manquant'}`);

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAdminLogin();
