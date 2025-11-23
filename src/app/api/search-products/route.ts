import { NextResponse } from 'next/server';
import { searchRakutenProducts } from '@/lib/rakuten';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');

        if (!query) {
            return NextResponse.json({ products: [] });
        }

        // B案：楽天5件を主リストとし、Yahooで補完
        const products = await searchRakutenProducts(query);

        return NextResponse.json({ products });

    } catch (error) {
        console.error('Search API error:', error);
        return NextResponse.json({ products: [] });
    }
}