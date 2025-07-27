import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function setupProductionDB() {
  try {
    console.log('🚀 Configuration de la base de données de production...');

    // Créer les catégories
    const categories = [
      { id: 'cmdkypn6j0000lpr5u5zo7dg3', name: 'Soins', slug: 'soins' },
      { id: 'cmdkypn6j0001lpr5soag2wky', name: 'Accessoires', slug: 'accessoires' },
      { id: 'cmdkypn6j0002lpr5og3tnrzu', name: 'Tondeuses', slug: 'tondeuses' },
      { id: 'cmdkypn6k0003lpr5jdjfgyyk', name: 'Self-Cut', slug: 'self-cut' }
    ];

    for (const category of categories) {
      await prisma.category.upsert({
        where: { id: category.id },
        update: {},
        create: category
      });
    }

    // Créer l'utilisateur admin
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await prisma.user.upsert({
      where: { email: 'admin@selfbarbershoppro.fr' },
      update: {},
      create: {
        email: 'admin@selfbarbershoppro.fr',
        name: 'Admin',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    // Créer quelques produits de base
    const products = [
      {
        id: '1',
        name: 'Tondeuse Professionnelle Pro-X Elite',
        description: 'Tondeuse professionnelle haute performance avec lames en acier inoxydable et moteur puissant. Parfaite pour un usage intensif.',
        price: 89.99,
        originalPrice: 129.99,
        image: '/images/tondeuse-pro-x-elite.jpg',
        rating: 4.8,
        reviewCount: 156,
        featured: true,
        bestseller: true,
        inStock: true,
        stockQuantity: 25,
        isActive: true,
        isFeatured: true,
        featuredOrder: 1,
        aliexpressId: 'ALI001',
        aliexpressPrice: 45.99,
        aliexpressUrl: 'https://aliexpress.com/item/tondeuse-pro',
        features: JSON.stringify(['Lames en acier inoxydable', 'Moteur puissant', 'Batterie longue durée']),
        specifications: JSON.stringify({
          'Puissance': '45W',
          'Autonomie': '120 minutes',
          'Temps de charge': '2 heures'
        }),
        categoryId: 'cmdkypn6j0002lpr5og3tnrzu'
      },
      {
        id: '2',
        name: 'Kit Self-Cut Complet',
        description: 'Kit complet pour se couper les cheveux soi-même. Inclut tondeuse, ciseaux, peigne et guide de coupe.',
        price: 59.99,
        originalPrice: 89.99,
        image: '/images/kit-self-cut.jpg',
        rating: 4.5,
        reviewCount: 89,
        featured: true,
        bestseller: false,
        inStock: true,
        stockQuantity: 15,
        isActive: true,
        isFeatured: true,
        featuredOrder: 2,
        aliexpressId: 'ALI002',
        aliexpressPrice: 29.99,
        aliexpressUrl: 'https://aliexpress.com/item/kit-self-cut',
        features: JSON.stringify(['Kit complet', 'Guide inclus', 'Qualité professionnelle']),
        specifications: JSON.stringify({
          'Contenu': 'Tondeuse, ciseaux, peignes, cape',
          'Garantie': '2 ans'
        }),
        categoryId: 'cmdkypn6k0003lpr5jdjfgyyk'
      }
    ];

    for (const product of products) {
      await prisma.product.upsert({
        where: { id: product.id },
        update: {},
        create: product
      });
    }

    console.log('✅ Base de données configurée avec succès !');
    console.log('👤 Admin créé: admin@selfbarbershoppro.fr / admin123');
    console.log(`📦 ${categories.length} catégories créées`);
    console.log(`🛍️ ${products.length} produits créés`);

  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

setupProductionDB();
