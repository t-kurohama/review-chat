'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChatUI } from '@/components/ChatUI';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

function ChatContent() {
    const searchParams = useSearchParams();
    const productId = searchParams.get('product');

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href=".." onClick={(e) => { e.preventDefault(); window.history.back(); }} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-lg font-semibold text-gray-900">
                        商品アシスタント {productId ? `(商品ID: ${productId})` : ''}
                    </h1>
                </div>
            </header>

            <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
                <ChatUI />
            </main>
        </div>
    );
}

export default function ChatPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
            <ChatContent />
        </Suspense>
    );
}
