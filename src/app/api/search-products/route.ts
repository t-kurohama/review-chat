import { NextResponse } from 'next/server';
import { searchRakutenProducts } from '@/lib/rakuten';

const MOCK_PRODUCTS = [
    {
        id: '1',
        name: 'Sony WH-1000XM5 ワイヤレスノイズキャンセリングヘッドホン',
        price: 39800,
        imageUrl: 'https://m.media-amazon.com/images/I/51SKmu2G9FL._AC_SL1500_.jpg',
        url: 'https://example.com/product/1',
        description: '業界最高クラスのノイズキャンセリング性能。',
        rating: 4.8,
        reviewAverage_rakuten: 4.8,
        reviewCount_rakuten: 1250,
        reviewAverage_yahoo: 4.7,
        reviewCount_yahoo: 890,
        ranking_search: 1,
        affiliate_rakuten: 'https://rakuten.co.jp/example/1',
    },
    {
        id: '2',
        name: 'Apple AirPods Pro (第2世代)',
        price: 39800,
        imageUrl: 'https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg',
        url: 'https://example.com/product/2',
        description: '驚くほど鮮明なサウンドとアクティブノイズキャンセリング。',
        rating: 4.7,
        reviewAverage_rakuten: 4.7,
        reviewCount_rakuten: 3400,
        reviewAverage_yahoo: 4.8,
        reviewCount_yahoo: 2100,
        ranking_search: 2,
        affiliate_rakuten: 'https://rakuten.co.jp/example/2',
    },
    {
        id: '3',
        name: 'Bose QuietComfort 45 Bluetooth Wireless Noise Cancelling Headphones',
        price: 33000,
        imageUrl: 'https://m.media-amazon.com/images/I/51JbsHSktkL._AC_SL1500_.jpg',
        url: 'https://example.com/product/3',
        description: '静寂、快適さ、そしてサウンドの完璧なバランス。',
        rating: 4.6,
        reviewAverage_rakuten: 4.5,
        reviewCount_rakuten: 560,
        reviewAverage_yahoo: 4.6,
        reviewCount_yahoo: 420,
        ranking_search: 3,
        affiliate_rakuten: 'https://rakuten.co.jp/example/3',
    },
    {
        id: '4',
        name: 'Sennheiser MOMENTUM 4 Wireless',
        price: 49900,
        imageUrl: 'https://m.media-amazon.com/images/I/61gXyI9-cEL._AC_SL1500_.jpg',
        url: 'https://example.com/product/4',
        description: '60時間のバッテリー寿命とシグネチャーサウンド。',
        rating: 4.5,
        reviewAverage_rakuten: 4.4,
        reviewCount_rakuten: 120,
        reviewAverage_yahoo: 4.5,
        reviewCount_yahoo: 90,
        ranking_search: 4,
        affiliate_rakuten: 'https://rakuten.co.jp/example/4',
    },
    {
        id: '5',
        name: 'Anker Soundcore Space Q45',
        price: 14990,
        imageUrl: 'https://m.media-amazon.com/images/I/51Ltm3tbH2L._AC_SL1500_.jpg',
        url: 'https://example.com/product/5',
        description: 'ウルトラノイズキャンセリング2.0搭載。最大50時間再生。',
        rating: 4.4,
        reviewAverage_rakuten: 4.3,
        reviewCount_rakuten: 850,
        reviewAverage_yahoo: 4.4,
        reviewCount_yahoo: 620,
        ranking_search: 5,
        affiliate_rakuten: 'https://rakuten.co.jp/example/5',
    },
];

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');

        if (!query) {
            return NextResponse.json({ products: [] });
        }

        // B案：楽天5件を主リストとし、Yahooで補完
        // const products = await searchRakutenProducts(query); // Original line
        const products = MOCK_PRODUCTS.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );


        return NextResponse.json({ products });

    } catch (error) {
        console.error('Search API error:', error);
        return NextResponse.json({ products: [] });
    }
}