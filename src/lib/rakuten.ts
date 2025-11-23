import { Product } from '@/types';
import { searchYahooProductForComplement, YahooProductData } from './yahoo';

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

interface RakutenRankingItem {
    Item: {
        itemName: string;
        itemCode: string;
        rank: number;
    };
}

interface RakutenRankingResponse {
    Items: RakutenRankingItem[];
}

// スコア計算
function calculateScore(reviewAverage: number, reviewCount: number): number {
    return reviewAverage * 20 + Math.log(reviewCount + 1);
}

/**
 * 楽天ランキングAPIで商品の総合順位を取得
 * @param itemCode 商品コード
 * @param genreId カテゴリID（オプション）
 * @returns ランキング順位、または null
 */
async function getRakutenRanking(
    itemCode: string,
    genreId?: string
): Promise<number | null> {
    if (!RAKUTEN_APP_ID) return null;

    const params = new URLSearchParams({
        format: 'json',
        applicationId: RAKUTEN_APP_ID,
    });

    if (genreId) {
        params.append('genreId', genreId);
    }

    const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20220601?${params}`;

    try {
        const res = await fetch(url);
        if (!res.ok) return null;

        const data: RakutenRankingResponse = await res.json();
        const found = data.Items?.find((item) => item.Item.itemCode === itemCode);

        return found?.Item.rank || null;
    } catch (error) {
        console.error('Rakuten Ranking API error:', error);
        return null;
    }
}

export interface EnrichedProduct extends Product {
    reviewAverage_rakuten: number;
    reviewCount_rakuten: number;
    ranking_rakuten: number | null;
    ranking_search: number; // 検索結果内順位（1-5）

    reviewAverage_yahoo: number | null;
    reviewCount_yahoo: number | null;
    price_yahoo: number | null;
    imageUrl_yahoo: string | null;
    url_yahoo: string | null;

    affiliate_rakuten: string;
    affiliate_yahoo: string | null;
}

export async function searchRakutenProducts(keyword: string): Promise<EnrichedProduct[]> {
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

        // スコアリングして上位5件を取得
        const products = data.Items.map((item) => {
            const i = item.Item;

            return {
                item: i,
                score: calculateScore(i.reviewAverage || 0, i.reviewCount || 0),
            };
        });

        const top5 = products
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);

        // 上位5件に対してYahooデータを補完
        const enrichedProducts = await Promise.all(
            top5.map(async ({ item: i }, index) => {
                // アフィリエイトURL生成
                let affiliateUrl = i.itemUrl;
                if (RAKUTEN_AFFILIATE_ID) {
                    const separator = i.itemUrl.includes('?') ? '&' : '?';
                    affiliateUrl = `${i.itemUrl}${separator}scid=${RAKUTEN_AFFILIATE_ID}`;
                }

                // Yahoo補完データ取得（商品名で検索）
                const yahooData = await searchYahooProductForComplement(i.itemName);

                // 総合ランキング取得（重いので一旦スキップ可能）
                // const ranking = await getRakutenRanking(i.itemCode);

                const enriched: EnrichedProduct = {
                    id: i.itemCode,
                    name: i.itemName,
                    price: i.itemPrice,
                    imageUrl: i.mediumImageUrls[0]?.imageUrl || '',
                    url: affiliateUrl,
                    description: i.itemCaption,
                    rating: i.reviewAverage || 0,

                    // 楽天データ
                    reviewAverage_rakuten: i.reviewAverage || 0,
                    reviewCount_rakuten: i.reviewCount || 0,
                    ranking_rakuten: null, // 後で実装
                    ranking_search: index + 1, // 検索結果内順位
                    affiliate_rakuten: affiliateUrl,

                    // Yahooデータ
                    reviewAverage_yahoo: yahooData?.reviewAverage || null,
                    reviewCount_yahoo: yahooData?.reviewCount || null,
                    price_yahoo: yahooData?.price || null,
                    imageUrl_yahoo: yahooData?.imageUrl || null,
                    url_yahoo: yahooData?.url || null,
                    affiliate_yahoo: yahooData?.url || null,
                };

                return enriched;
            })
        );

        return enrichedProducts;

    } catch (error) {
        console.error('Failed to fetch from Rakuten API:', error);
        return [];
    }
}