import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Vérifier si les paiements sont activés
export async function GET() {
  try {
    const paymentsEnabledSetting = await prisma.settings.findUnique({
      where: { key: 'payments_enabled' }
    });

    const maintenanceModeSetting = await prisma.settings.findUnique({
      where: { key: 'maintenance_mode' }
    });

    const siteMessageSetting = await prisma.settings.findUnique({
      where: { key: 'site_message' }
    });

    return NextResponse.json({
      success: true,
      paymentsEnabled: paymentsEnabledSetting?.value === 'true',
      maintenanceMode: maintenanceModeSetting?.value === 'true',
      siteMessage: siteMessageSetting?.value || ''
    });
  } catch (error) {
    console.error('Erreur lors de la vérification du statut:', error);
    return NextResponse.json(
      { 
        success: false, 
        paymentsEnabled: true, // Par défaut, on assume que les paiements sont activés
        maintenanceMode: false,
        siteMessage: ''
      },
      { status: 500 }
    );
  }
}
