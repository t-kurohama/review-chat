'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';

export default function Home() {
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setSearched(true);
        try {
            const res = await fetch(`/api/search-products?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            setProducts(data.products);
        } catch (error) {
            console.error('Search error:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                        Review<span className="text-blue-600">Chat</span>
                    </h1>
                    <p className="text-gray-600">
                        AIアドバイザーと一緒に、最適な商品を見つけましょう。
                    </p>
                </div>

                <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="何をお探しですか？ (例: ノイズキャンセリングヘッドホン)"
                        className="w-full px-6 py-4 text-lg rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium"
                    >
                        {loading ? '検索中...' : '検索'}
                    </button>
                </form>

                <div className="space-y-4">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        </div>
                    ) : searched && products.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            商品が見つかりませんでした。
                        </div>
                    ) : (
                        products.map((product) => (
                            <div key={product.id} className="h-64">
                                <ProductCard product={product} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}
