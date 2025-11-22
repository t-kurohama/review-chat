import { useState } from 'react';
import { Product } from '@/types';

export function useProductSearch() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchProducts = async (query: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/search-products?q=${encodeURIComponent(query)}`);
            if (!res.ok) throw new Error('Failed to fetch products');
            const data = await res.json();
            setProducts(data.products);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { products, loading, error, searchProducts };
}
