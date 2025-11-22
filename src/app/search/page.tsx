'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useProductSearch } from '@/hooks/useProductSearch';
import { ProductCard } from '@/components/ProductCard';
import { Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const { products, loading, error, searchProducts } = useProductSearch();
    const router = useRouter();

    useEffect(() => {
        if (query) {
            searchProducts(query);
        }
    }, [query]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newQuery = formData.get('q') as string;
        if (newQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(newQuery)}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative">
                        <input
                            name="q"
                            defaultValue={query}
                            type="text"
                            placeholder="商品を検索..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                    </form>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    "{query}" の検索結果
                </h2>

                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white h-96 rounded-xl shadow-sm animate-pulse" />
                        ))}
                    </div>
                )}

                {error && (
                    <div className="text-center py-12">
                        <p className="text-red-600">{error}</p>
                    </div>
                )}

                {!loading && !error && products.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">商品が見つかりませんでした。</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
            <SearchContent />
        </Suspense>
    );
}
