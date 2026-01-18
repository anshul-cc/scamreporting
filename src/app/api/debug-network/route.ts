import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const BLOCKLIST_URL = "https://raw.githubusercontent.com/MetaMask/eth-phishing-detect/master/src/config.json";
        const response = await fetch(BLOCKLIST_URL, { cache: 'no-store' });

        if (!response.ok) throw new Error("Fetch failed");

        const data = await response.json();
        return NextResponse.json({
            success: true,
            blacklistSize: data.blacklist?.length,
            fuzzylistSize: data.fuzzylist?.length
        });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 200 });
    }
}
