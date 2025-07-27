import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

export async function GET() {
  try {
    // Pour l'instant, on retourne des données de démonstration
    // car nous n'avons pas encore de système de commandes réel
    const mockOrders = [
      {
        id: '1',
        orderNumber: 'CMD-2025-001',
        customerName: 'Jean Dupont',
        customerEmail: 'jean.dupont@email.com',
        totalAmount: 89.99,
        status: 'pending',
        createdAt: '2025-01-15T10:30:00Z',
        items: [
          {
            id: '1',
            productName: 'Tondeuse Pro X',
            quantity: 1,
            price: 79.99
          },
          {
            id: '2',
            productName: 'Huile pour barbe Premium',
            quantity: 1,
            price: 10.00
          }
        ],
        shippingAddress: {
          street: '123 Rue de la Paix',
          city: 'Paris',
          postalCode: '75001',
          country: 'France'
        }
      },
      {
        id: '2',
        orderNumber: 'CMD-2025-002',
        customerName: 'Marie Martin',
        customerEmail: 'marie.martin@email.com',
        totalAmount: 45.50,
        status: 'confirmed',
        createdAt: '2025-01-14T14:20:00Z',
        items: [
          {
            id: '3',
            productName: 'Kit Accessoires Barbier',
            quantity: 1,
            price: 45.50
          }
        ],
        shippingAddress: {
          street: '456 Avenue des Champs',
          city: 'Lyon',
          postalCode: '69000',
          country: 'France'
        }
      },
      {
        id: '3',
        orderNumber: 'CMD-2025-003',
        customerName: 'Pierre Leblanc',
        customerEmail: 'pierre.leblanc@email.com',
        totalAmount: 125.00,
        status: 'shipped',
        createdAt: '2025-01-13T09:15:00Z',
        items: [
          {
            id: '4',
            productName: 'Tondeuse Self-Cut Pro',
            quantity: 1,
            price: 99.99
          },
          {
            id: '5',
            productName: 'Guide Self-Cut Premium',
            quantity: 1,
            price: 25.01
          }
        ],
        shippingAddress: {
          street: '789 Boulevard Saint-Michel',
          city: 'Marseille',
          postalCode: '13000',
          country: 'France'
        }
      },
      {
        id: '4',
        orderNumber: 'CMD-2025-004',
        customerName: 'Sophie Rousseau',
        customerEmail: 'sophie.rousseau@email.com',
        totalAmount: 67.80,
        status: 'delivered',
        createdAt: '2025-01-12T16:45:00Z',
        items: [
          {
            id: '6',
            productName: 'Ciseaux Professionnel',
            quantity: 2,
            price: 33.90
          }
        ],
        shippingAddress: {
          street: '321 Rue Victor Hugo',
          city: 'Toulouse',
          postalCode: '31000',
          country: 'France'
        }
      },
      {
        id: '5',
        orderNumber: 'CMD-2025-005',
        customerName: 'Thomas Bernard',
        customerEmail: 'thomas.bernard@email.com',
        totalAmount: 29.99,
        status: 'cancelled',
        createdAt: '2025-01-11T11:30:00Z',
        items: [
          {
            id: '7',
            productName: 'Gel Coiffant Premium',
            quantity: 1,
            price: 29.99
          }
        ],
        shippingAddress: {
          street: '654 Place de la République',
          city: 'Nice',
          postalCode: '06000',
          country: 'France'
        }
      }
    ];

    return NextResponse.json({
      success: true,
      orders: mockOrders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des commandes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // TODO: Implémenter la création de commande réelle
    console.log('Creating order:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Commande créée avec succès'
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création de la commande' },
      { status: 500 }
    );
  }
}
