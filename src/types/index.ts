export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    url: string;
    description?: string;
    rating?: number;
    reviewAverage_rakuten?: number | null;
    reviewCount_rakuten?: number | null;
    reviewAverage_yahoo?: number | null;
    reviewCount_yahoo?: number | null;
    ranking_rakuten?: number | null;
    ranking_search?: number | null;
    affiliate_rakuten?: string | null;
    affiliate_yahoo?: string | null;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}
