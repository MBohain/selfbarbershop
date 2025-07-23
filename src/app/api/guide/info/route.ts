import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Retourne les paramètres publics du guide
    const guideInfo = {
      title: 'Guide Self-Cut Premium',
      description: 'Maîtrisez l\'art de la coupe à domicile',
      price: 29,
      originalPrice: 79,
      discount: 63,
      isActive: true,
      totalPages: 85,
      videoCount: 12,
      rating: 4.9,
      reviewCount: 2847,
      salesCount: 10247
    };

    return NextResponse.json({
      success: true,
      guide: guideInfo
    });
  } catch (error) {
    console.error('Error fetching guide info:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des informations du guide' },
      { status: 500 }
    );
  }
}
