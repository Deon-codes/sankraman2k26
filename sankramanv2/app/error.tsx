"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error Caught by Boundary:", error);
  }, [error]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-8 text-center bg-[#1a0a00]">
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-[url('/bg.jpg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto p-10 border border-[#ff6600]/30 bg-black/60 backdrop-blur-xl rounded-2xl shadow-[0_0_50px_rgba(255,102,0,0.15)]">
        <h2 className="text-3xl md:text-5xl text-[#ff6600] font-black tracking-widest mb-6 drop-shadow-[0_0_20px_rgba(255,102,0,0.8)]" style={{ fontFamily: "'Dune Rise', sans-serif" }}>
          SYSTEM ANOMALY
        </h2>
        <p className="text-lg text-[#ffedd5]/80 mb-8 leading-relaxed">
          An unexpected disruption occurred in the Sankraman transition network. Our technicians have been notified.
        </p>
        
        <button
          onClick={() => reset()}
          className="group relative border-2 border-[#ff6600] bg-black/40 backdrop-blur-md px-8 py-3 rounded-lg overflow-hidden transition-all duration-500 hover:border-[#ffaa00] hover:bg-black/60 inline-flex items-center justify-center"
        >
          <span className="relative z-10 text-sm md:text-base font-black tracking-[0.2em] text-[#ff6600] uppercase group-hover:text-[#1a0a00] transition-colors duration-500" style={{ fontFamily: "'Dune Rise', sans-serif" }}>
            REINITIALIZE SEQUENCE
          </span>
          <div className="absolute inset-0 bg-[#ff6600] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
        </button>
      </div>
    </div>
  );
}
