import { NextResponse } from 'next/server';
import { searchRakutenProducts } from '@/lib/rakuten';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');

        if (!query) {
            return NextResponse.json({ products: [] });
        }

        const products = await searchRakutenProducts(query);
        return NextResponse.json({ products });

    } catch (error) {
        console.error('Search API error:', error);
        return NextResponse.json({ products: [] });
    }
}