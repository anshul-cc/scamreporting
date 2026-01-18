'use client'

import { useFormState } from "react-dom";
import { login } from "@/lib/server-actions";
import Image from "next/image";

// Define the state interface
interface FormState {
    message?: string;
}

const initialState: FormState = {};

export default function AdminLogin() {
    const [state, formAction] = useFormState(login, initialState);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#050511] p-4 relative overflow-hidden">
            {/* Cyberpunk Background Glows */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

            <div className="w-full max-w-md p-10 bg-[#0B0B15]/80 backdrop-blur-xl rounded-2xl shadow-[0_0_50px_-15px_rgba(0,0,0,0.7)] border border-white/10 relative z-10 group">

                {/* Neon Border Glow Effect */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="text-center mb-12 relative">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20">
                        {/* Icon Placeholder or just abstract shape */}
                        <div className="w-8 h-8 border-2 border-white rounded-lg rotate-45"></div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin Portal</h1>
                    <p className="text-slate-400 text-sm tracking-wide">TRUSTTRACE INTELLIGENCE</p>
                </div>

                <form action={formAction} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-cyan-400 uppercase tracking-widest pl-1">Access Key</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••••••"
                            className="w-full bg-[#050511] border border-slate-800 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all placeholder:text-slate-700"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 text-sm tracking-wide uppercase mt-4 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Authenticate
                    </button>

                    {state?.message && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-center text-xs font-bold tracking-wide uppercase">
                            {state.message}
                        </div>
                    )}
                </form>
            </div>

            <div className="mt-12 text-slate-700 text-[10px] font-mono uppercase tracking-[0.2em] opacity-50">
                Secure Connection // Encrypted
            </div>
        </main>
    );
}
