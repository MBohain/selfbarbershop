import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    const page = searchParams.get('page') || '1';
    const sort = searchParams.get('sort') || 'created_desc';

    const pageNumber = parseInt(page);
    const pageSize = limit ? parseInt(limit) : 12;
    const skip = (pageNumber - 1) * pageSize;

    // Build where clause
    const where: any = {};
    
    if (category && category !== 'all') {
      where.category = {
        slug: category
      };
    }
    
    if (featured === 'true') {
      where.featured = true;
    }

    // Build order clause
    let orderBy: any = {};
    switch (sort) {
      case 'price_asc':
        orderBy = { price: 'asc' };
        break;
      case 'price_desc':
        orderBy = { price: 'desc' };
        break;
      case 'rating_desc':
        orderBy = { rating: 'desc' };
        break;
      case 'name_asc':
        orderBy = { name: 'asc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true
        },
        orderBy,
        skip: limit ? skip : undefined,
        take: limit ? pageSize : undefined
      }),
      prisma.product.count({ where })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        products: products.map(product => ({
          ...product,
          features: product.features ? JSON.parse(product.features) : [],
          images: product.images ? JSON.parse(product.images) : []
        })),
        pagination: {
          total,
          page: pageNumber,
          pages: Math.ceil(total / pageSize),
          hasNext: pageNumber * pageSize < total,
          hasPrev: pageNumber > 1
        }
      }
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
