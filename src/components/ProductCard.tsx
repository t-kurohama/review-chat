import { Product } from '@/types';
import { MessageCircle, ExternalLink, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="relative w-full aspect-square bg-gray-50">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                />
                {product.ranking_search && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                        {product.ranking_search}位
                    </div>
                )}
            </div>
            <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-900 line-clamp-2 h-12 mb-2 text-sm">
                    {product.name}
                </h3>

                <div className="space-y-1 mb-3">
                    {product.reviewAverage_rakuten && (
                        <div className="flex items-center gap-1 text-xs">
                            <span className="font-bold text-red-600">楽天</span>
                            <div className="flex items-center">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="ml-1 font-medium">{product.reviewAverage_rakuten}</span>
                            </div>
                            <span className="text-gray-500">({product.reviewCount_rakuten}件)</span>
                        </div>
                    )}
                    {product.reviewAverage_yahoo && (
                        <div className="flex items-center gap-1 text-xs">
                            <span className="font-bold text-purple-600">Yahoo</span>
                            <div className="flex items-center">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="ml-1 font-medium">{product.reviewAverage_yahoo}</span>
                            </div>
                            <span className="text-gray-500">({product.reviewCount_yahoo}件)</span>
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-3 border-t border-gray-50">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-gray-900">
                            ¥{product.price.toLocaleString()}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <Link
                            href={`/chat?product=${product.id}`}
                            className="flex items-center justify-center gap-1 py-2 px-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                        >
                            <MessageCircle className="w-4 h-4" />
                            相談する
                        </Link>
                        {product.affiliate_rakuten && (
                            <a
                                href={product.affiliate_rakuten}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-1 py-2 px-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                            >
                                <ExternalLink className="w-4 h-4" />
                                楽天で見る
                            </a>
                        )}
                        {product.affiliate_yahoo && (
                            <a
                                href={product.affiliate_yahoo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-1 py-2 px-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Yahooで見る
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
