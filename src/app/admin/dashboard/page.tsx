import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

import { logout, seedBlocklist } from "@/lib/server-actions";
import { Shield, AlertTriangle, Database } from "lucide-react";
import SeedButton from "./SeedButton";

// Force dynamic to see real-time data
export const dynamic = 'force-dynamic';

type ReportWithAddress = Prisma.ReportGetPayload<{
    include: { address: true }
}>;

export default async function AdminDashboard() {
    const stats = {
        totalReports: await prisma.report.count(),
        totalAddresses: await prisma.address.count(),
        highRisk: await prisma.address.count({ where: { riskScore: { gt: 80 } } }),
    };

    const recentReports = await prisma.report.findMany({
        take: 20,
        orderBy: { createdAt: 'desc' },
        include: { address: true }
    });

    return (
        <main className="min-h-screen bg-[#050511] text-slate-200 font-sans flex text-sm selection:bg-cyan-500/30">
            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[120px] rounded-full"></div>
            </div>

            {/* Sidebar / Nav */}
            <nav className="w-20 lg:w-64 border-r border-white/5 bg-[#0B0B15]/80 flex flex-col items-center lg:items-start py-8 lg:px-6 fixed h-full z-10 backdrop-blur-md">
                <div className="text-2xl font-bold text-white mb-12 tracking-tighter flex items-center gap-3">
                    <Shield className="w-8 h-8 text-cyan-400" />
                    <span className="hidden lg:block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">TrustTrace</span>
                </div>

                <div className="flex-1 w-full">
                    {/* Placeholder for future nav items */}
                </div>

                <form action={logout} className="w-full">
                    <button className="text-slate-400 hover:text-white hover:bg-white/5 w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-3 group">
                        <span className="hidden lg:inline group-hover:text-cyan-400 transition-colors">Logout</span>
                        <span className="lg:hidden">Exit</span>
                    </button>
                </form>
            </nav>

            {/* Main Content */}
            <div className="flex-1 ml-20 lg:ml-64 p-8 relative z-10">

                {/* Modern UI Container (Glass Panel) */}
                <div className="w-full max-w-6xl mx-auto bg-[#0B0B15]/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] overflow-hidden relative">
                    {/* Add a subtle top border gradient */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

                    {/* Header Banner */}
                    <div className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-slate-900/80 p-8 border-b border-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <Shield className="w-6 h-6 text-cyan-400 fill-cyan-400/20" />
                                    <h2 className="text-white font-bold tracking-widest uppercase text-sm">TrustTrace Intelligence</h2>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Wallet Compliance Check</h1>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Control Bar */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                            <div className="flex gap-8 px-4">
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Reports</span>
                                    <span className="text-2xl font-bold text-white">{stats.totalReports}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-400 uppercase tracking-wider mb-1">High Risk</span>
                                    <span className="text-2xl font-bold text-white">{stats.highRisk}</span>
                                </div>
                            </div>

                            <form action={async () => {
                                'use server';
                                await seedBlocklist();
                            }}>
                                <SeedButton />
                            </form>
                        </div>

                        {/* Data Table */}
                        <div className="overflow-hidden rounded-xl border border-white/5 bg-[#050511]/50">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-white/5">
                                    <tr className="text-slate-400 text-xs uppercase tracking-wider">
                                        <th className="px-6 py-4 font-medium">Recorded (UTC)</th>
                                        <th className="px-6 py-4 font-medium">Wallet Address</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium">Source</th>
                                        <th className="px-6 py-4 font-medium">Details</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-slate-300">
                                    {recentReports.map((report: any, i: number) => (
                                        <tr key={report.id} className={`hover:bg-white/5 transition-colors ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                                            <td className="px-6 py-4 text-xs whitespace-nowrap text-slate-500">
                                                {new Date(report.createdAt).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 font-mono text-sm text-slate-200">
                                                {report.address.address}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${report.address.riskScore > 80
                                                    ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                                    : report.address.riskScore > 50
                                                        ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                        : 'bg-green-500/10 text-green-400 border-green-500/20'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${report.address.riskScore > 80 ? 'bg-red-500' : report.address.riskScore > 50 ? 'bg-yellow-500' : 'bg-green-500'
                                                        }`}></span>
                                                    {report.address.riskScore > 80 ? 'Blocked' : report.address.riskScore > 50 ? 'Warning' : 'Clean'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">{report.source}</td>
                                            <td className="px-6 py-4 text-sm text-slate-400 max-w-xs truncate">
                                                {report.description || <span className="text-slate-600 italic">No details provided</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
