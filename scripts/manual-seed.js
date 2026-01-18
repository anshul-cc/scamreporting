
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Starting manual seed...");

    // 1. Hardcoded data
    const seeds = [
        { address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e".toLowerCase(), chain: "ETH" },
        { address: "0x8c1c9c6f5d8a9e7f8f6d6c6e6b6d6f6e696b61".toLowerCase(), chain: "ETH" },
        { address: "phishing-alert-login-meta.com", chain: "DNS" },
        { address: "secure-wallet-validation.io", chain: "DNS" },
        { address: "claim-airdrop-tokens.net", chain: "DNS" }
    ];

    for (const item of seeds) {
        try {
            const res = await prisma.address.upsert({
                where: { address: item.address },
                update: {},
                create: {
                    address: item.address,
                    chain: item.chain,
                    riskScore: 100,
                    tags: ["manual-seed"],
                }
            });
            console.log(`Scoped: ${item.address}`);
        } catch (e) {
            console.error(`Failed ${item.address}:`, e.message);
        }
    }

    const count = await prisma.address.count();
    console.log(`Total addresses in DB: ${count}`);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
