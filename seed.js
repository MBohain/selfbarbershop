const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedProducts() {
  try {
    // Vérifier si on a déjà des produits
    const existingProducts = await prisma.product.count();
    if (existingProducts > 0) {
      console.log('Des produits existent déjà dans la base de données');
      return;
    }

    // Créer des catégories
    const categories = await Promise.all([
      prisma.category.create({
        data: {
          name: 'Gels',
          description: 'Gels coiffants professionnels'
        }
      }),
      prisma.category.create({
        data: {
          name: 'Désinfectants',
          description: 'Produits de désinfection pour matériel'
        }
      }),
      prisma.category.create({
        data: {
          name: 'Tondeuses',
          description: 'Tondeuses professionnelles'
        }
      }),
      prisma.category.create({
        data: {
          name: 'Accessoires',
          description: 'Accessoires pour barbiers'
        }
      })
    ]);

    // Créer des produits
    const products = [
      {
        name: 'Gel Fixation Forte',
        description: 'Gel coiffant pour une tenue parfaite toute la journée',
        price: 15.99,
        originalPrice: 19.99,
        stock: 50,
        categoryId: categories[0].id,
        images: ['/products/gel1.jpg'],
        isActive: true
      },
      {
        name: 'Gel Ultra Hold',
        description: 'Gel professionnel pour coiffures extrêmes',
        price: 18.99,
        originalPrice: 24.99,
        stock: 30,
        categoryId: categories[0].id,
        images: ['/products/gel2.jpg'],
        isActive: true
      },
      {
        name: 'Spray Désinfectant',
        description: 'Désinfectant efficace pour tous vos outils',
        price: 12.99,
        originalPrice: 16.99,
        stock: 100,
        categoryId: categories[1].id,
        images: ['/products/spray1.jpg'],
        isActive: true
      },
      {
        name: 'Solution Barbicide',
        description: 'Solution professionnelle de désinfection',
        price: 22.99,
        originalPrice: 29.99,
        stock: 25,
        categoryId: categories[1].id,
        images: ['/products/barbicide1.jpg'],
        isActive: true
      },
      {
        name: 'Tondeuse Pro X1',
        description: 'Tondeuse professionnelle sans fil',
        price: 89.99,
        originalPrice: 129.99,
        stock: 15,
        categoryId: categories[2].id,
        images: ['/products/tondeuse1.jpg'],
        isActive: true
      }
    ];

    for (const product of products) {
      await prisma.product.create({ data: product });
    }

    console.log('✅ Base de données peuplée avec succès!');
    console.log(`✅ ${categories.length} catégories créées`);
    console.log(`✅ ${products.length} produits créés`);

  } catch (error) {
    console.error('❌ Erreur lors du peuplement:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();
