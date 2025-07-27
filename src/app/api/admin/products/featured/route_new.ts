import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

// Vérifier le token JWT
function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
  } catch {
    return null;
  }
}

// Récupérer les produits en vedette pour l'admin
export async function GET() {
  try {
    // Récupérer tous les produits avec leurs informations de featured
    const allProducts = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    // Séparer les produits populaires des autres
    const featuredProducts = allProducts
      .filter(product => product.isFeatured)
      .sort((a, b) => (a.featuredOrder || 999) - (b.featuredOrder || 999));

    const availableProducts = allProducts.filter(product => !product.isFeatured);

    return NextResponse.json({
      success: true,
      featured: featuredProducts.map(product => ({
        ...product,
        images: product.images ? JSON.parse(product.images) : [],
        features: product.features ? JSON.parse(product.features) : []
      })),
      available: availableProducts.map(product => ({
        ...product,
        images: product.images ? JSON.parse(product.images) : [],
        features: product.features ? JSON.parse(product.features) : []
      })),
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des produits en vedette:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des produits en vedette' },
      { status: 500 }
    );
  }
}

// Mettre à jour les produits en vedette
export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { featuredProducts } = await request.json();
    
    // Validation: maximum 3 produits
    if (featuredProducts.length > 3) {
      return NextResponse.json(
        { success: false, error: 'Maximum 3 produits en vedette autorisés' },
        { status: 400 }
      );
    }

    // Transaction pour mettre à jour les produits
    await prisma.$transaction(async (tx) => {
      // Réinitialiser tous les produits comme non-populaires
      await tx.product.updateMany({
        data: {
          isFeatured: false,
          featuredOrder: null,
        },
      });

      // Mettre à jour les produits sélectionnés comme populaires
      for (let i = 0; i < featuredProducts.length; i++) {
        await tx.product.update({
          where: { id: featuredProducts[i].id },
          data: {
            isFeatured: true,
            featuredOrder: i + 1,
          },
        });
      }
    });

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Erreur lors de la mise à jour des produits en vedette:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour des produits en vedette' },
      { status: 500 }
    );
  }
}
