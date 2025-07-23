const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function clearProducts() {
  try {
    console.log('🗑️ Suppression de tous les produits...');

    // Supprimer les éléments de panier d'abord (foreign key)
    await prisma.cartItem.deleteMany({});
    console.log('✅ Éléments de panier supprimés');

    // Supprimer les produits
    const deletedProducts = await prisma.product.deleteMany({});
    console.log(`✅ ${deletedProducts.count} produits supprimés`);

    // Optionnel: supprimer les catégories aussi
    const deletedCategories = await prisma.category.deleteMany({});
    console.log(`✅ ${deletedCategories.count} catégories supprimées`);

    console.log('🎉 Base de données nettoyée avec succès!');
    console.log('📝 Vous pouvez maintenant ajouter vos produits via l\'admin');

  } catch (error) {
    console.error('❌ Erreur lors de la suppression:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

clearProducts();
