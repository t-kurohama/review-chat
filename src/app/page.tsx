'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const [question, setQuestion] = useState('');
    const router = useRouter();

    const handleAsk = (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return;
        router.push(`/advice?q=${encodeURIComponent(question)}`);
    };

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Title */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                        Review<span className="text-blue-600">Chat</span>
                    </h1>
                    <p className="text-gray-600">
                        AIアドバイザーに商品選びを相談しよう。
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleAsk} className="relative max-w-2xl mx-auto">
                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="例）2万円以内でオンライン会議に強いイヤホンを教えて"
                        className="w-full px-6 py-4 h-32 text-lg rounded-2xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    <button
                        type="submit"
                        className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl text-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        相談する
                    </button>
                </form>
            </div>
        </main>
    );
}
