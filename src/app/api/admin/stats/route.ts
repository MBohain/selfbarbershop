import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || 'week';
    
    // Pour le moment, retournons des données à zéro pour un nouveau site
    // Dans une vraie application, ces données viendraient de tables de commandes et de logs de visite
    
    const mockData = {
      current: {
        sales: 0,
        orders: 0,
        profit: 0,
        visitors: 0,
        conversionRate: 0,
      },
      previous: {
        sales: 0,
        orders: 0,
        profit: 0,
        visitors: 0,
        conversionRate: 0,
      },
      changes: {
        sales: 0,
        orders: 0,
        profit: 0,
        visitors: 0,
        conversionRate: 0,
      },
      topProducts: [
        // Aucun produit pour le moment - sera rempli quand il y aura des ventes
      ],
      chartData: generateEmptyChartData(timeframe),
      timeframe,
    };

    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des statistiques' },
      { status: 500 }
    );
  }
}

function generateEmptyChartData(timeframe: string) {
  const data = [];
  const now = new Date();
  let days = 7;
  
  switch (timeframe) {
    case 'day':
      days = 1;
      break;
    case 'week':
      days = 7;
      break;
    case 'month':
      days = 30;
      break;
    case 'year':
      days = 365;
      break;
  }
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      sales: 0, // Toujours 0 pour un nouveau site
    });
  }
  
  return data;
}

// Endpoint pour enregistrer une visite (à appeler depuis le frontend)
export async function POST(request: NextRequest) {
  try {
    const { ip, userAgent, page } = await request.json();

    // Pour le moment, on simule l'enregistrement
    // Dans une vraie application, on enregistrerait dans la base de données
    console.log('Visite enregistrée:', { ip, userAgent, page });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la visite:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'enregistrement de la visite' },
      { status: 500 }
    );
  }
}
