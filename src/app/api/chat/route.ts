import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { message } = body;

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simple mock response logic
    let reply = "最適な商品選びをお手伝いします！どのような機能を重視されますか？";

    if (message.toLowerCase().includes('sony')) {
        reply = "Sony WH-1000XM5 はノイズキャンセリング機能が非常に優れています。通勤・通学に最適です。";
    } else if (message.toLowerCase().includes('apple') || message.toLowerCase().includes('airpods')) {
        reply = "AirPods Pro はApple製品との連携が素晴らしく、iPhoneユーザーには特におすすめです。";
    } else if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cheap') || message.toLowerCase().includes('安い')) {
        reply = "予算を抑えたい場合は、Anker Soundcore Space Q45 がコストパフォーマンスに優れておりおすすめです。";
    }

    return NextResponse.json({
        role: 'assistant',
        content: reply,
        timestamp: Date.now()
    });
}
