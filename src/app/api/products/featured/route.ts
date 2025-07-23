import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Récupérer les produits marqués comme populaires
    const featuredProducts = await prisma.product.findMany({
      where: {
        isActive: true,
        isFeatured: true
      },
      include: {
        category: true
      },
      orderBy: {
        featuredOrder: 'asc' // Ordre défini par l'admin
      },
      take: 3 // Maximum 3 produits populaires
    });

    return NextResponse.json({
      success: true,
      products: featuredProducts.map(product => ({
        ...product,
        images: product.images ? JSON.parse(product.images) : [],
        features: product.features ? JSON.parse(product.features) : []
      }))
    });

  } catch (error) {
    console.error('Erreur récupération produits populaires:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
