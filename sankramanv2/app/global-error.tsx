"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-[#ffedd5] min-h-screen flex items-center justify-center">
        <div className="text-center p-8 border border-[#ff6600]/30 rounded-xl bg-black/50">
          <h2 className="text-2xl text-[#ff6600] tracking-widest font-black mb-4">CRITICAL SYSTEM FAILURE</h2>
          <p className="mb-6 opacity-80">A fatal error stopped the application from rendering.</p>
          <button 
            onClick={() => reset()}
            className="px-6 py-2 border border-[#ff6600] text-[#ff6600] hover:bg-[#ff6600] hover:text-black transition-colors rounded uppercase tracking-wider font-bold"
          >
            Restart
          </button>
        </div>
      </body>
    </html>
  );
}
