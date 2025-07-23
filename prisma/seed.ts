import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Tondeuses',
        slug: 'tondeuses',
        description: 'Tondeuses professionnelles pour barbiers',
        image: '/categories/tondeuses.jpg'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Accessoires',
        slug: 'accessoires',
        description: 'Accessoires et outils de barbier',
        image: '/categories/accessoires.jpg'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Soins',
        slug: 'soins',
        description: 'Produits de soin pour barbe et cheveux',
        image: '/categories/soins.jpg'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Self-Cut',
        slug: 'self-cut',
        description: 'Équipement pour se couper les cheveux soi-même',
        image: '/categories/self-cut.jpg'
      }
    })
  ]);

  console.log('✅ Categories created');

  // Create products
  const products = [
    // Tondeuses (prix normaux)
    {
      name: 'Tondeuse Professionnelle Pro-X Elite',
      description: 'Tondeuse professionnelle haute performance avec lames titanium et autonomie exceptionnelle',
      price: 89.99,
      originalPrice: 89.99, // Prix normal
      rating: 4.8,
      reviewCount: 245,
      featured: true,
      bestseller: true,
      aliexpressId: 'TRIM001',
      aliexpressPrice: 45.00,
      aliexpressUrl: 'https://aliexpress.com/item/trim001',
      features: JSON.stringify(['Lames titanium', 'Autonomie 3h', 'Étanche IPX7', 'Kit complet']),
      categoryId: categories[0].id
    },
    {
      name: 'Tondeuse Sans Fil PowerCut',
      description: 'Tondeuse sans fil avec charge rapide et lames en acier japonais',
      price: 64.99,
      originalPrice: 64.99, // Prix normal
      rating: 4.6,
      reviewCount: 189,
      aliexpressId: 'TRIM002',
      aliexpressPrice: 32.50,
      aliexpressUrl: 'https://aliexpress.com/item/trim002',
      features: JSON.stringify(['Charge rapide', 'Lames acier', 'Silencieuse', '8 sabots']),
      categoryId: categories[0].id
    },
    {
      name: 'Tondeuse Precision Master',
      description: 'Tondeuse de précision avec écran LCD et système d\'auto-affûtage',
      price: 59.99,
      originalPrice: 85.00, // EN PROMOTION
      rating: 4.7,
      reviewCount: 167,
      aliexpressId: 'TRIM003',
      aliexpressPrice: 30.00,
      aliexpressUrl: 'https://aliexpress.com/item/trim003',
      features: JSON.stringify(['Précision 0.1mm', 'LCD display', 'Auto-affûtage', 'Base chargeur']),
      categoryId: categories[0].id
    },
    
    // Accessoires
    {
      name: 'Spray Désinfectant Barbicide 500ml',
      description: 'Solution désinfectante professionnelle pour outils de barbier, efficace contre virus et bactéries',
      price: 16.99,
      originalPrice: 16.99, // Prix normal
      rating: 4.9,
      reviewCount: 312,
      aliexpressId: 'DESINF001',
      aliexpressPrice: 8.50,
      aliexpressUrl: 'https://aliexpress.com/item/desinf001',
      features: JSON.stringify(['500ml', 'Efficace 99.9%', 'Usage professionnel', 'Norme CE']),
      categoryId: categories[1].id
    },
    {
      name: 'Gel Coiffant Extra Fort 250ml',
      description: 'Gel coiffant professionnel tenue extra forte pour styles durables',
      price: 8.99,
      originalPrice: 12.99, // EN PROMOTION
      rating: 4.6,
      reviewCount: 198,
      aliexpressId: 'GEL001',
      aliexpressPrice: 4.50,
      aliexpressUrl: 'https://aliexpress.com/item/gel001',
      features: JSON.stringify(['Tenue 24h', '250ml', 'Séchage rapide', 'Sans résidus']),
      categoryId: categories[1].id
    },
    {
      name: 'Lingettes Nettoyantes Barbier x50',
      description: 'Lingettes désinfectantes pour nettoyer et désinfecter les outils entre chaque client',
      price: 12.99,
      originalPrice: 12.99, // Prix normal
      rating: 4.5,
      reviewCount: 156,
      aliexpressId: 'WIPES001',
      aliexpressPrice: 6.50,
      aliexpressUrl: 'https://aliexpress.com/item/wipes001',
      features: JSON.stringify(['50 lingettes', 'Biodégradables', 'Efficacité immédiate', 'Format pro']),
      categoryId: categories[1].id
    },
    
    // Soins
    {
      name: 'Lotion Après-Rasage Apaisante 100ml',
      description: 'Lotion apaisante et hydratante à l\'aloe vera pour après rasage',
      price: 14.99,
      originalPrice: 19.99, // EN PROMOTION
      rating: 4.8,
      reviewCount: 234,
      featured: true,
      aliexpressId: 'LOTION001',
      aliexpressPrice: 7.50,
      aliexpressUrl: 'https://aliexpress.com/item/lotion001',
      features: JSON.stringify(['Aloe vera', '100ml', 'Anti-irritation', 'Hydratant']),
      categoryId: categories[2].id
    },
    {
      name: 'Shampooing Barbe Purifiant 200ml',
      description: 'Shampooing spécialement formulé pour nettoyer et purifier la barbe en profondeur',
      price: 11.99,
      originalPrice: 11.99, // Prix normal
      rating: 4.7,
      reviewCount: 187,
      aliexpressId: 'SHAMP001',
      aliexpressPrice: 6.00,
      aliexpressUrl: 'https://aliexpress.com/item/shamp001',
      features: JSON.stringify(['200ml', 'Formule douce', 'Nettoie en profondeur', 'Parfum bois']),
      categoryId: categories[2].id
    },
    {
      name: 'Cire Coiffante Mate 80ml',
      description: 'Cire coiffante effet mat pour un style naturel et une tenue longue durée',
      price: 13.99,
      originalPrice: 13.99, // Prix normal
      rating: 4.6,
      reviewCount: 145,
      aliexpressId: 'CIRE001',
      aliexpressPrice: 7.00,
      aliexpressUrl: 'https://aliexpress.com/item/cire001',
      features: JSON.stringify(['Effet mat', '80ml', 'Tenue forte', 'Facile à travailler']),
      categoryId: categories[2].id
    },
    
    // Self-Cut
    {
      name: 'Miroir 3 Faces Pliable Pro',
      description: 'Miroir pliable avec 3 angles de vue et éclairage LED pour un self-cut parfait',
      price: 24.99,
      originalPrice: 34.99, // EN PROMOTION
      rating: 4.7,
      reviewCount: 112,
      aliexpressId: 'SELF001',
      aliexpressPrice: 12.50,
      aliexpressUrl: 'https://aliexpress.com/item/self001',
      features: JSON.stringify(['3 angles de vue', 'Pliable et portable', 'Base stable', 'Éclairage LED']),
      categoryId: categories[3].id
    },
    {
      name: 'Kit Self-Cut Complet Professionnel',
      description: 'Kit complet avec tondeuse sans fil, ciseaux, peigne et tous les accessoires nécessaires',
      price: 79.99,
      originalPrice: 79.99, // Prix normal
      rating: 4.8,
      reviewCount: 156,
      featured: true,
      aliexpressId: 'SELF002',
      aliexpressPrice: 40.00,
      aliexpressUrl: 'https://aliexpress.com/item/self002',
      features: JSON.stringify(['Tondeuse sans fil', 'Ciseaux pro', '10 sabots', 'Peigne carbone', 'Cape de coupe', 'Étui de rangement']),
      categoryId: categories[3].id
    },
    {
      name: 'Ebook Self-Cut Master Guide',
      description: 'Guide complet PDF exclusif avec 50+ techniques de coupe professionnelles et secrets de barbiers',
      price: 19.99,
      originalPrice: 29.99, // EN PROMOTION
      rating: 4.9,
      reviewCount: 234,
      bestseller: true,
      aliexpressId: 'EBOOK001',
      aliexpressPrice: 0.00, // Produit numérique
      aliexpressUrl: 'https://aliexpress.com/item/ebook001',
      features: JSON.stringify(['Guide exclusif 120 pages', '50+ techniques pro', 'Photos HD détaillées', 'Secrets de barbiers', 'Techniques avancées', 'Format PDF premium']),
      categoryId: categories[3].id
    }
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('✅ Products created');

  // Create admin user
  const bcrypt = require('bcryptjs');
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  await prisma.user.create({
    data: {
      email: 'admin@selfbarbershoppro.fr',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  console.log('✅ Admin user created (admin@selfbarbershoppro.fr / admin123)');

  // Create default settings
  await prisma.settings.createMany({
    data: [
      {
        key: 'payments_enabled',
        value: 'true',
        description: 'Activer/désactiver les paiements sur le site'
      },
      {
        key: 'maintenance_mode',
        value: 'false',
        description: 'Mode maintenance du site'
      },
      {
        key: 'site_message',
        value: '',
        description: 'Message d\'information affiché sur le site'
      },
      {
        key: 'free_shipping_threshold',
        value: '75',
        description: 'Montant minimum pour la livraison gratuite (€)'
      },
      {
        key: 'contact_email',
        value: 'contact@selfbarbershoppro.fr',
        description: 'Email de contact affiché sur le site'
      }
    ]
  });

  console.log('✅ Default settings created');
  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
