import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

export async function GET() {
  try {
    // Pour l'instant, on retourne des données de démonstration
    const mockGuide = {
      id: '1',
      title: 'Guide Self-Cut Premium',
      description: 'Maîtrisez l\'art de la coupe à domicile avec notre guide détaillé',
      price: 29,
      originalPrice: 79,
      discount: 63,
      isActive: true,
      pdfFile: null,
      pdfFileName: null,
      totalPages: 85,
      videoCount: 12,
      salesCount: 847,
      rating: 4.9,
      reviewCount: 2847,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      guide: mockGuide
    });
  } catch (error) {
    console.error('Error fetching guide settings:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des paramètres du guide' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // TODO: Implémenter la sauvegarde réelle dans la base de données
    console.log('Updating guide settings:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Paramètres du guide mis à jour avec succès'
    });
  } catch (error) {
    console.error('Error updating guide settings:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour des paramètres du guide' },
      { status: 500 }
    );
  }
}
