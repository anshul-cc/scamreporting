import { Shield, Search, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";
import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import Link from "next/link";

export const dynamic = 'force-dynamic';

type ReportWithAddress = Prisma.ReportGetPayload<{
  include: {
    address: {
      select: {
        address: true,
        tags: true,
        riskScore: true,
      }
    }
  }
}>;

export default async function Home() {
  const recentReports = await prisma.report.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' },
    include: {
      address: {
        select: {
          address: true,
          tags: true,
          riskScore: true,
        }
      }
    }
  });

  return (
    <main className="min-h-screen bg-[#050511] text-slate-200 font-sans flex flex-col items-center relative overflow-hidden selection:bg-cyan-500/30">

      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Header / Nav */}
      <div className="absolute top-6 right-6 z-20">
        <Link href="/admin/login" className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-cyan-400 border border-cyan-500/20 rounded-full hover:bg-cyan-500/10 transition-all shadow-[0_0_15px_-5px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)]">
          Admin Portal
        </Link>
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto pt-32 pb-20 px-6 text-center z-10">
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">System Online</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter text-white mb-6">
          Trust<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Trace</span>
        </h1>

        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Decentralized threat intelligence. Aggregate, verify, and neutralize malicious crypto addresses before they strike.
        </p>

        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity blur-lg pointer-events-none"></div>
          <div className="relative flex items-center bg-[#0B0B15]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl">
            <Search className="w-6 h-6 text-slate-500 ml-4" />
            <input
              type="text"
              placeholder="Search by address (0x...) or domain"
              className="flex-1 bg-transparent border-none text-white px-4 py-3 focus:outline-none placeholder:text-slate-600 font-mono text-sm"
            />
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-cyan-900/20">
              SCAN
            </button>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-6 text-sm">
          <Link href="/report" className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Report an Incident
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full max-w-5xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0B0B15]/60 backdrop-blur-sm p-6 rounded-2xl border border-white/5 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><Shield className="w-16 h-16 text-white" /></div>
            <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Total Reports</div>
            <div className="text-3xl font-bold text-white">24,592</div>
          </div>
          <div className="bg-[#0B0B15]/60 backdrop-blur-sm p-6 rounded-2xl border border-white/5 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><CheckCircle className="w-16 h-16 text-green-500" /></div>
            <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Assets Secured</div>
            <div className="text-3xl font-bold text-green-400">$12.5M</div>
          </div>
          <div className="bg-[#0B0B15]/60 backdrop-blur-sm p-6 rounded-2xl border border-white/5 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><AlertTriangle className="w-16 h-16 text-red-500" /></div>
            <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Active Threats</div>
            <div className="text-3xl font-bold text-red-500">142</div>
          </div>
        </div>
      </section>

      {/* Recent Flags */}
      <section className="w-full max-w-5xl mx-auto px-6 pb-20">
        <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Live Intelligence Feed</h2>
            <p className="text-slate-500 text-sm">Real-time reports from the network.</p>
          </div>
          <Link href="/reports" className="text-cyan-400 text-xs font-bold uppercase tracking-wider hover:text-white transition-colors flex items-center gap-1">
            View Global Map <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentReports.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white/[0.02] rounded-2xl border border-white/5 border-dashed">
              <p className="text-slate-500">No reports yet.</p>
            </div>
          ) : (
            recentReports.map((report: any) => (
              <div key={report.id} className="bg-[#0B0B15]/40 hover:bg-[#0B0B15]/80 backdrop-blur-sm border border-white/5 hover:border-cyan-500/30 p-5 rounded-xl transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wider border ${report.address.riskScore > 80 ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                    }`}>
                    Risk: {report.address.riskScore}%
                  </span>
                  <span className="text-[10px] text-slate-600 font-mono">{new Date(report.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="font-mono text-sm text-cyan-200/90 truncate mb-3 group-hover:text-cyan-400 transition-colors" title={report.address.address}>
                  {report.address.address}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {report.address.tags.map((tag: any) => (
                    <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded border border-slate-700 uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed h-[2.5em]">{report.description}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
