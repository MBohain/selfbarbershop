import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Middleware d'authentification
function verifyAdmin(request: Request) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Token manquant');
  }

  const token = authHeader.substring(7);
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { role: string };
    
    if (decoded.role !== 'ADMIN') {
      throw new Error('Accès non autorisé');
    }
    
    return decoded;
  } catch {
    throw new Error('Token invalide');
  }
}

export async function POST(request: Request) {
  try {
    // Vérifier l'authentification
    verifyAdmin(request);

    const data = await request.json();

    // Créer le produit
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        originalPrice: data.originalPrice || data.price,
        rating: data.rating || 4.5,
        reviewCount: data.reviewCount || 100,
        featured: data.featured || false,
        bestseller: data.bestseller || false,
        aliexpressId: data.aliexpressId,
        aliexpressPrice: data.aliexpressPrice,
        aliexpressUrl: data.aliexpressUrl,
        features: JSON.stringify(data.features || []),
        categoryId: data.categoryId
      },
      include: {
        category: true
      }
    });

    return NextResponse.json({
      message: 'Produit créé avec succès',
      product
    });

  } catch (error: unknown) {
    console.error('Error creating product:', error);
    
    if (error.message === 'Token manquant' || error.message === 'Token invalide' || error.message === 'Accès non autorisé') {
      return NextResponse.json(
        { message: error.message },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { message: 'Erreur lors de la création du produit' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
