const YAHOO_CLIENT_ID = process.env.YAHOO_CLIENT_ID;

interface YahooItem {
    name: string;
    price: number;
    image: {
        small: string;
        medium: string;
    };
    url: string;
    review: {
        rate: number;
        count: number;
    };
}

interface YahooResponse {
    hits: YahooItem[];
}

export interface YahooProductData {
    reviewAverage: number;
    reviewCount: number;
    price: number;
    imageUrl: string;
    url: string;
}

/**
 * Yahoo検索APIで商品を検索し、補完データを取得
 * @param keyword 検索キーワード（楽天商品名や型番）
 * @returns 最も関連性の高い1件のデータ、または null
 */
export async function searchYahooProductForComplement(
    keyword: string
): Promise<YahooProductData | null> {
    if (!YAHOO_CLIENT_ID || YAHOO_CLIENT_ID === 'dummy') {
        console.warn('Yahoo Client ID is missing or dummy.');
        return null;
    }

    const params = new URLSearchParams({
        appid: YAHOO_CLIENT_ID,
        query: keyword,
        results: '1', // 最上位1件のみ取得
    });

    const url = `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?${params}`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            console.error(`Yahoo API error: ${res.status}`);
            return null;
        }

        const data: YahooResponse = await res.json();

        if (!data.hits || data.hits.length === 0) {
            return null;
        }

        const item = data.hits[0];

        return {
            reviewAverage: item.review?.rate || 0,
            reviewCount: item.review?.count || 0,
            price: item.price,
            imageUrl: item.image?.medium || item.image?.small || '',
            url: item.url,
        };
    } catch (error) {
        console.error('Yahoo API fetch error:', error);
        return null;
    }
}