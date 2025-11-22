export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    url: string;
    description?: string;
    rating?: number;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}
