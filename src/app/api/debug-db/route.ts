import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const count = await prisma.user.count(); // Simple query
        return NextResponse.json({ success: true, userCount: count });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message, code: e.code }, { status: 200 });
    }
}
