import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const logs: string[] = [];
    const log = (...args: any[]) => logs.push(args.map(a => JSON.stringify(a)).join(' '));

    // Log env vars (redacted)
    log("Checking Env. DATABASE_URL exists?", !!process.env.DATABASE_URL);

    const BLOCKLIST_URL = "https://raw.githubusercontent.com/MetaMask/eth-phishing-detect/master/src/config.json";

    try {
        // Dynamic import to catch init errors
        log("Importing Prisma...");
        const { default: prisma } = await import('@/lib/prisma');
        log("Prisma imported.");
        log("Starting fetch from:", BLOCKLIST_URL);
        const response = await fetch(BLOCKLIST_URL, { cache: 'no-store' });

        if (!response.ok) {
            throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        log("Fetch success. Blacklist size:", data.blacklist?.length, "Fuzzylist size:", data.fuzzylist?.length);

        const domainsAndAddresses = [...(data.blacklist || []), ...(data.fuzzylist || [])];
        log("Total items to process:", domainsAndAddresses.length);

        let addedCount = 0;
        let processedCount = 0;
        let errors = 0;

        for (const item of domainsAndAddresses) {
            processedCount++;

            let chain = "UNKNOWN";
            let isValid = false;

            if (item.startsWith("0x") && item.length === 42) {
                chain = "ETH";
                isValid = true;
            } else if (item.includes(".")) {
                chain = "DNS";
                isValid = true;
            }

            if (isValid) {
                try {
                    await prisma.address.upsert({
                        where: { address: item.toLowerCase() },
                        update: {},
                        create: {
                            address: item.toLowerCase(),
                            chain: chain,
                            riskScore: 100,
                            tags: ["phishing", "metamask-blocklist"],
                        }
                    });
                    addedCount++;
                } catch (e: any) {
                    errors++;
                    if (errors <= 5) { // Only log first few errors
                        log("DB Error for item:", item, e.message);
                    }
                }
            }

            if (addedCount >= 50) break;
        }

        log("Finished. Processed:", processedCount, "Added:", addedCount, "Total Errors:", errors);

        return NextResponse.json({
            success: true,
            logs
        });

    } catch (error: any) {
        log("Critical Error:", error.message);
        return NextResponse.json({
            success: false,
            error: error.message,
            logs
        }, { status: 200 }); // Return 200 so we can read the body
    }
}
