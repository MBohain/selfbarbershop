import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Récupérer le panier d'un utilisateur (pour l'instant session-based)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId') || 'guest';

    // Pour l'instant, on simule un panier session-based
    // En production, vous pouvez utiliser la session ou un userId
    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId: sessionId
      },
      include: {
        product: true
      }
    });

    return NextResponse.json({ 
      success: true, 
      cartItems,
      count: cartItems.reduce((sum, item) => sum + item.quantity, 0)
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du panier:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur', cartItems: [], count: 0 },
      { status: 500 }
    );
  }
}

// POST - Ajouter un produit au panier
export async function POST(request: NextRequest) {
  try {
    const { productId, quantity = 1, sessionId = 'guest' } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'ID produit requis' },
        { status: 400 }
      );
    }

    // Vérifier que le produit existe
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Produit non trouvé' },
        { status: 404 }
      );
    }

    // Vérifier si l'article est déjà dans le panier
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: sessionId,
          productId: productId
        }
      }
    });

    let cartItem;
    if (existingCartItem) {
      // Mettre à jour la quantité
      cartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
        include: { product: true }
      });
    } else {
      // Créer un nouvel article
      cartItem = await prisma.cartItem.create({
        data: {
          userId: sessionId,
          productId: productId,
          quantity: quantity
        },
        include: { product: true }
      });
    }

    return NextResponse.json({ 
      success: true, 
      cartItem,
      message: 'Produit ajouté au panier'
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout au panier:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour la quantité d'un article
export async function PUT(request: NextRequest) {
  try {
    const { cartItemId, quantity, sessionId = 'guest' } = await request.json();

    if (!cartItemId || quantity < 0) {
      return NextResponse.json(
        { success: false, error: 'Données invalides' },
        { status: 400 }
      );
    }

    if (quantity === 0) {
      // Supprimer l'article si quantité = 0
      await prisma.cartItem.delete({
        where: { 
          id: cartItemId,
          userId: sessionId 
        }
      });
      
      return NextResponse.json({ 
        success: true, 
        message: 'Article supprimé du panier'
      });
    } else {
      // Mettre à jour la quantité
      const cartItem = await prisma.cartItem.update({
        where: { 
          id: cartItemId,
          userId: sessionId 
        },
        data: { quantity },
        include: { product: true }
      });

      return NextResponse.json({ 
        success: true, 
        cartItem,
        message: 'Quantité mise à jour'
      });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du panier:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un article du panier
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cartItemId = searchParams.get('cartItemId');
    const sessionId = searchParams.get('sessionId') || 'guest';

    if (!cartItemId) {
      return NextResponse.json(
        { success: false, error: 'ID article requis' },
        { status: 400 }
      );
    }

    await prisma.cartItem.delete({
      where: { 
        id: cartItemId,
        userId: sessionId 
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Article supprimé du panier'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du panier:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
