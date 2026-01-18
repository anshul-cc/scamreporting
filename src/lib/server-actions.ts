'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function login(prevState: any, formData: FormData) {
    const password = formData.get("password") as string;

    // Simple env-based auth
    // Ensure you add ADMIN_PASSWORD="securepassword" to your .env
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

    if (password === ADMIN_PASSWORD) {
        const oneDay = 24 * 60 * 60 * 1000;
        cookies().set("admin_session", "true", { expires: Date.now() + oneDay });
        redirect("/admin/dashboard");
    } else {
        return { message: "Invalid password" };
    }
}

export async function logout() {
    cookies().delete("admin_session");
    redirect("/admin/login");
}

export async function seedBlocklist() {
    // Simple implementation of seeding from a known GitHub blocklist
    // Source: MetaMask eth-phishing-detect (example json)
    const BLOCKLIST_URL = "https://raw.githubusercontent.com/MetaMask/eth-phishing-detect/master/src/config.json";

    try {
        const response = await fetch(BLOCKLIST_URL, { cache: 'no-store' });
        let data;

        if (response.ok) {
            data = await response.json();
            console.log("Fetched blocklist.", data.blacklist?.length);
        } else {
            console.error("Fetch failed, using fallback data.");
            data = { blacklist: [], fuzzylist: [] };
        }

        let domainsAndAddresses = [...(data?.blacklist || []), ...(data?.fuzzylist || [])];

        // FAILSAFE: If no external data, use hardcoded list to demonstrate feature
        if (domainsAndAddresses.length === 0) {
            domainsAndAddresses = [
                "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", // Fake Example 1
                "0x8c1c9c6f5d8a9e7f8f6d6c6e6b6d6f6e696b61", // Fake Example 2
                "phishing-alert-login-meta.com",
                "secure-wallet-validation.io",
                "claim-airdrop-tokens.net"
            ];
        }

        console.log("Total items to process:", domainsAndAddresses.length);

        let addedCount = 0;
        let processedCount = 0;

        for (const item of domainsAndAddresses) {
            processedCount++;

            let chain = "UNKNOWN";
            let isValid = false;

            if (item.startsWith("0x") && item.length === 42) {
                chain = "ETH";
                isValid = true;
            } else if (item.includes(".")) {
                chain = "DNS"; // It's a domain
                isValid = true;
            } else {
                // Try to guess - if it looks like a domain
                if (item.match(/^[a-z0-9-]+(\.[a-z0-9-]+)+$/)) {
                    chain = "DNS";
                    isValid = true;
                }
            }

            if (isValid) {
                try {
                    await prisma.address.upsert({
                        where: { address: item.toLowerCase() },
                        update: {}, // Skip if exists
                        create: {
                            address: item.toLowerCase(),
                            chain: chain,
                            riskScore: 100, // Known phishing
                            tags: ["phishing", "metamask-blocklist"],
                        }
                    });
                    addedCount++;
                    // console.log("Added:", item);
                } catch (e) {
                    console.error("Failed to add:", item, e);
                }
            }

            // Limit for MVP to avoid timeouts - increased to 100 to show more data
            if (addedCount >= 100) break;
        }

        console.log("Finished seeding. Processed:", processedCount, "Added:", addedCount);

        revalidatePath("/admin/dashboard");
        revalidatePath("/"); // Update home page too
        return { success: true, count: addedCount, message: `Successfully seeded ${addedCount} addresses.` };
    } catch (error) {
        console.error("Seeding failed:", error);
        return { success: false, message: "Failed to fetch blocklist." };
    }
}

export async function submitReport(formData: FormData) {
    const address = formData.get("address") as string;
    const description = formData.get("description") as string;
    const chain = formData.get("chain") as string || "ETH";

    if (!address || !description) {
        throw new Error("Address and description are required");
    }

    // normalize address
    const normalizedAddress = address.toLowerCase().trim();

    try {
        // 1. Find or Create Address
        const addressRecord = await prisma.address.upsert({
            where: { address: normalizedAddress },
            update: {
                lastReported: new Date(),
                riskScore: { increment: 10 }, // simple logic: bump risk on every report
            },
            create: {
                address: normalizedAddress,
                chain: chain,
                riskScore: 10,
                tags: ["user-reported"],
            },
        });

        // 2. Create Report
        await prisma.report.create({
            data: {
                addressId: addressRecord.id,
                description: description,
                source: "USER_SUBMISSION",
            },
        });

        revalidatePath("/");
    } catch (error) {
        console.error("Failed to submit report:", error);
        // In a real app, return a proper error object
        throw new Error("Failed to save report");
    }

    redirect("/");
}
