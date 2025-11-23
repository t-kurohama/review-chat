export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    url: string;
    description?: string;
    rating?: number;
    reviewAverage_rakuten?: number;
    reviewCount_rakuten?: number;
    reviewAverage_yahoo?: number;
    reviewCount_yahoo?: number;
    ranking_rakuten?: number | null;
    ranking_search?: number;
    affiliate_rakuten?: string;
    affiliate_yahoo?: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}
