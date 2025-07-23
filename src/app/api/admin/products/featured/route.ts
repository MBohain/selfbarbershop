import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Récupérer les produits en vedette pour l'admin
export async function GET() {
  try {
    // Pour le moment, récupérons tous les produits pour permettre la sélection
    const allProducts = await prisma.product.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    // Simuler 3 produits en vedette pour l'instant
    const featuredProducts = allProducts.slice(0, 3);

    return NextResponse.json({
      featured: featuredProducts,
      available: allProducts,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des produits en vedette:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des produits en vedette' },
      { status: 500 }
    );
  }
}

// Mettre à jour les produits en vedette (pour le moment, juste un mock)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Si c'est l'ancien format (productId + position)
    if (body.productId !== undefined) {
      console.log('Gestion produit individuel:', body);
      return NextResponse.json({ success: true });
    }
    
    // Si c'est le nouveau format (liste de produits)
    if (body.featuredProducts) {
      console.log('Gestion liste produits:', body.featuredProducts);
      
      // Validation: maximum 3 produits
      if (body.featuredProducts.length > 3) {
        return NextResponse.json(
          { error: 'Maximum 3 produits en vedette autorisés' },
          { status: 400 }
        );
      }

      // Pour le moment, on simule la sauvegarde
      // TODO: Implémenter la vraie logique quand les champs seront disponibles
      
      return NextResponse.json({
        success: true,
        message: 'Produits en vedette mis à jour avec succès',
      });
    }

    return NextResponse.json(
      { error: 'Format de données invalide' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Erreur gestion produits populaires:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
