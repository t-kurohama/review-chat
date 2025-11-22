'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function Home() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
            <div className="w-full max-w-2xl text-center space-y-8">
                <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
                    Review<span className="text-blue-600">Chat</span>
                </h1>
                <p className="text-xl text-gray-600">
                    AIアドバイザーと一緒に、最適な商品を見つけましょう。
                </p>

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
                        className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </form>

                <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
                    <span>おすすめの検索:</span>
                    <button
                        onClick={() => router.push('/search?q=wireless%20headphones')}
                        className="hover:text-blue-600 underline"
                    >
                        ワイヤレスヘッドホン
                    </button>
                    <span>•</span>
                    <button
                        onClick={() => router.push('/search?q=gaming%20mouse')}
                        className="hover:text-blue-600 underline"
                    >
                        ゲーミングマウス
                    </button>
                    <span>•</span>
                    <button
                        onClick={() => router.push('/search?q=coffee%20maker')}
                        className="hover:text-blue-600 underline"
                    >
                        コーヒーメーカー
                    </button>
                </div>
            </div>
        </main>
    );
}
