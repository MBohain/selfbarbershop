import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log('🔧 Création de l\'utilisateur admin...');

    // Vérifier si l'admin existe déjà
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@selfbarbershoppro.fr' }
    });

    if (existingAdmin) {
      console.log('✅ Utilisateur admin déjà existant');
      return;
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash('admin123', 12);

    // Créer l'utilisateur admin
    const admin = await prisma.user.create({
      data: {
        email: 'admin@selfbarbershoppro.fr',
        name: 'Admin',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    console.log('✅ Utilisateur admin créé avec succès');
    console.log(`📧 Email: ${admin.email}`);
    console.log(`🔑 Mot de passe: admin123`);

  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'admin:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
