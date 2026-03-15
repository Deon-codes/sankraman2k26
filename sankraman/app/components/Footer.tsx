'use client';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,229,255,0.02), transparent)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-12 pb-6">
        {/* Main row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-white/6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="text-2xl font-black chrome-text tracking-widest">PRAKALP 4.0</div>
            <div className="text-[10px] tracking-[0.4em] text-[#00E5FF] uppercase mt-0.5">
              Sankraman · 2025
            </div>
          </div>

          {/* Council credits */}
          <div className="flex items-center gap-3 text-sm text-white/30 font-medium">
            <span className="text-[#00E5FF]/70">IEEE</span>
            <span className="text-white/20">×</span>
            <span className="text-[#FF6EC7]/70">WiE</span>
            <span className="text-white/20">×</span>
            <span className="text-[#B388FF]/70">Project Cell</span>
            <span className="text-white/20">—</span>
            <span>CRCE</span>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm text-white/30">
            {['Privacy', 'Terms', 'Contact'].map((l) => (
              <a key={l} href="#" className="hover:text-[#00E5FF] transition-colors duration-200 tracking-wider">
                {l}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 pb-4 text-xs tracking-[0.3em] uppercase text-white/20">
          © 2025 IEEE × WiE × Project Cell, CRCE. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
