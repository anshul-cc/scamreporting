export default function Loading() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#050511] relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full pointing-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/10 blur-[150px] rounded-full pointing-events-none"></div>

            <div className="relative z-10 flex flex-col items-center gap-4">
                {/* Custom Spinner */}
                <div className="w-16 h-16 relative">
                    <div className="absolute inset-0 border-t-2 border-r-2 border-cyan-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-b-2 border-l-2 border-purple-500 rounded-full animate-spin direction-reverse duration-1000"></div>
                </div>

                <h2 className="text-cyan-400 font-mono text-sm uppercase tracking-[0.2em] animate-pulse">Initializing System...</h2>
            </div>
        </div>
    )
}
