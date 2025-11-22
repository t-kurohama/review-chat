import { Product } from '@/types';
import { MessageCircle, ExternalLink, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative w-full aspect-square bg-gray-50">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 line-clamp-2 h-12 mb-2">
                    {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-gray-900">
                        ¥{product.price.toLocaleString()}
                    </span>
                    <div className="flex gap-2">
                        <Link
                            href={`/chat?product=${product.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                            title="この商品についてチャットする"
                        >
                            <MessageCircle className="w-5 h-5" />
                        </Link>
                        <a
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                            title="ストアで見る"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
