import { Product } from '@/types';

const RAKUTEN_APP_ID = process.env.RAKUTEN_APP_ID;
const RAKUTEN_AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID;

interface RakutenItem {
    Item: {
        itemName: string;
        itemPrice: number;
        mediumImageUrls: { imageUrl: string }[];
        itemUrl: string;
        itemCaption: string;
        reviewAverage: number;
        reviewCount: number;
        itemCode: string;
    };
}

interface RakutenResponse {
    Items: RakutenItem[];
}

// スコア計算
function calculateScore(reviewAverage: number, reviewCount: number): number {
    return reviewAverage * 20 + Math.log(reviewCount + 1);
}

export async function searchRakutenProducts(keyword: string): Promise<Product[]> {
    if (!RAKUTEN_APP_ID || RAKUTEN_APP_ID === 'dummy') {
        console.warn('Rakuten API key is missing or dummy. Returning empty list.');
        return [];
    }

    const params = new URLSearchParams({
        format: 'json',
        keyword: keyword,
        applicationId: RAKUTEN_APP_ID,
        hits: '30', // 多めに取得してスコアリング
        imageFlag: '1',
    });

    if (RAKUTEN_AFFILIATE_ID) {
        params.append('affiliateId', RAKUTEN_AFFILIATE_ID);
    }

    const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?${params}`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Rakuten API error: ${res.statusText}`);
        }
        const data: RakutenResponse = await res.json();

        // スコアリングして上位5件
        const products = data.Items.map((item) => {
            const i = item.Item;

            // アフィリエイトURL生成
            let affiliateUrl = i.itemUrl;
            if (RAKUTEN_AFFILIATE_ID) {
                const separator = i.itemUrl.includes('?') ? '&' : '?';
                affiliateUrl = `${i.itemUrl}${separator}scid=${RAKUTEN_AFFILIATE_ID}`;
            }

            return {
                id: i.itemCode,
                name: i.itemName,
                price: i.itemPrice,
                imageUrl: i.mediumImageUrls[0]?.imageUrl || '',
                url: affiliateUrl,
                description: i.itemCaption,
                rating: i.reviewAverage || 0,
                reviewCount: i.reviewCount || 0,
                score: calculateScore(i.reviewAverage || 0, i.reviewCount || 0),
            };
        });

        // スコア順でソートして上位5件
        return products
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
            .map(({ score, reviewCount, ...product }) => product);

    } catch (error) {
        console.error('Failed to fetch from Rakuten API:', error);
        return [];
    }
}