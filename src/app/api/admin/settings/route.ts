import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

// Vérifier l'authentification admin
function verifyAdminToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string; email: string };
    return decoded.role === 'ADMIN' ? decoded : null;
  } catch {
    return null;
  }
}

// GET - Récupérer tous les paramètres
export async function GET(request: NextRequest) {
  const admin = verifyAdminToken(request);
  if (!admin) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const settings = await prisma.settings.findMany();
    const settingsObject = settings.reduce((acc: Record<string, any>, setting: any) => {
      acc[setting.key] = {
        value: setting.value,
        description: setting.description,
        updatedAt: setting.updatedAt
      };
      return acc;
    }, {});

    return NextResponse.json({ success: true, settings: settingsObject });
  } catch (error) {
    console.error('Erreur lors de la récupération des paramètres:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// POST - Mettre à jour un paramètre
export async function POST(request: NextRequest) {
  const admin = verifyAdminToken(request);
  if (!admin) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { key, value, description } = await request.json();

    if (!key || value === undefined) {
      return NextResponse.json(
        { success: false, error: 'Clé et valeur requises' },
        { status: 400 }
      );
    }

    const setting = await prisma.settings.upsert({
      where: { key },
      update: {
        value: String(value),
        description,
        updatedBy: admin.email
      },
      create: {
        key,
        value: String(value),
        description,
        updatedBy: admin.email
      }
    });

    return NextResponse.json({ success: true, setting });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du paramètre:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
