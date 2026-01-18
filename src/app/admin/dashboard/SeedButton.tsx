'use client'

import { useFormStatus } from "react-dom";
import { Loader2, Shield } from "lucide-react"; // Database removed, Shield added

export default function SeedButton() {
    const { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            type="submit"
            className={`
        relative overflow-hidden group
        bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600
        hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500
        text-white px-8 py-4 rounded-full font-bold tracking-wide uppercase text-sm
        shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(189,0,255,0.5)]
        transition-all duration-300 transform
        border border-white/20
        flex items-center gap-3
        ${pending ? 'opacity-80 cursor-wait' : 'hover:scale-105 active:scale-95'}
      `}
            onClick={() => {
                // Simple User Feedback logic
                // Since useFormStatus hook doesn't give us the 'result' of the server action directly in the button,
                // we rely on the server action revalidating the page numbers as visual feedback.
            }}
        >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 blur-md"></div>

            {pending ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                    <span className="relative z-10">Run Compliance Check...</span>
                </>
            ) : (
                <>
                    <Shield className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Run TrustTrace Check</span>
                </>
            )}
        </button>
    );
}
