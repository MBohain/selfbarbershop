const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkData() {
  console.log('🔍 Vérification des données...\n');
  
  try {
    // Vérifier les catégories
    const categories = await prisma.category.findMany();
    console.log(`✅ Catégories trouvées: ${categories.length}`);
    categories.forEach(cat => console.log(`  - ${cat.name} (${cat.slug})`));
    
    // Vérifier tous les produits
    const allProducts = await prisma.product.findMany();
    console.log(`\n✅ Total produits: ${allProducts.length}`);
    
    // Vérifier spécifiquement les produits Self-Cut
    const selfCutProducts = await prisma.product.findMany({
      include: {
        category: true
      },
      where: {
        category: {
          slug: 'self-cut'
        }
      }
    });
    
    console.log(`\n🎯 Produits Self-Cut trouvés: ${selfCutProducts.length}`);
    selfCutProducts.forEach((product, index) => {
      console.log(`  ${index + 1}. ${product.name}`);
      console.log(`     Prix: ${product.price}€ (original: ${product.originalPrice}€)`);
      console.log(`     AliExpress ID: ${product.aliexpressId}`);
      console.log(`     Features: ${product.features}`);
      console.log('');
    });
    
    console.log('✅ Vérification terminée !');
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();
