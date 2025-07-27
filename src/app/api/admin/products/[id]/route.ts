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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Vérifier l'authentification
    verifyAdmin(request);

    const productId = params.id;

    // Supprimer le produit
    await prisma.product.delete({
      where: { id: productId }
    });

    return NextResponse.json({
      message: 'Produit supprimé avec succès'
    });

  } catch (error: unknown) {
    console.error('Error deleting product:', error);
    
    if (error.message === 'Token manquant' || error.message === 'Token invalide' || error.message === 'Accès non autorisé') {
      return NextResponse.json(
        { message: error.message },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { message: 'Erreur lors de la suppression du produit' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
