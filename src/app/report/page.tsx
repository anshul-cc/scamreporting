import { submitReport } from "@/lib/server-actions";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ReportPage() {
    return (
        <main className="min-h-screen bg-[#050511] text-slate-200 font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Cyberpunk Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

            <div className="w-full max-w-lg">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group pl-1">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Intelligence Feed
                </Link>

                <div className="bg-[#0B0B15]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative group">
                    {/* Neon Border Glow Effect */}
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-red-500/20 via-purple-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    <div className="p-8 relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20 shadow-[0_0_15px_-3px_rgba(239,68,68,0.3)]">
                                <AlertTriangle className="w-8 h-8 text-red-500" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">Report Incident</h1>
                                <p className="text-slate-400 text-sm">Flag malicious activity to protect the community.</p>
                            </div>
                        </div>

                        <form action={submitReport} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="address" className="text-sm font-bold text-slate-300 uppercase tracking-wide">Wallet Address / Domain</label>
                                <input
                                    name="address"
                                    id="address"
                                    type="text"
                                    required
                                    placeholder="0x..."
                                    className="w-full bg-[#050511] border border-slate-700 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all placeholder:text-slate-700 font-mono text-sm"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="chain" className="text-sm font-bold text-slate-300 uppercase tracking-wide">Network</label>
                                <div className="relative">
                                    <select name="chain" id="chain" className="w-full bg-[#050511] border border-slate-700 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-red-500 transition-all appearance-none cursor-pointer">
                                        <option value="ETH">Ethereum (ETH)</option>
                                        <option value="SOL">Solana (SOL)</option>
                                        <option value="BTC">Bitcoin (BTC)</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="description" className="text-sm font-bold text-slate-300 uppercase tracking-wide">Incident Details</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    required
                                    rows={4}
                                    placeholder="Describe how the scam occurred..."
                                    className="w-full bg-[#050511] border border-slate-700 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all placeholder:text-slate-700 resize-none text-sm"
                                />
                            </div>

                            <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-900/40 hover:shadow-red-900/60 text-sm tracking-widest uppercase mt-4 transform hover:scale-[1.01] active:scale-[0.99]">
                                Submit Report
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
