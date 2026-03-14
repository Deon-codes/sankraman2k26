'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-10 px-8 md:px-16 border-t border-white/8 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,229,255,0.02), transparent)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-white/6">
        {/* Logo / brand */}
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
            <a key={l} href="#" className="hover:text-[#00E5FF] transition-colors duration-200">
              {l}
            </a>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center mt-8 text-[10px] tracking-[0.4em] uppercase text-white/20">
        © 2025 IEEE × WiE × Project Cell, CRCE. All rights reserved.
      </div>
    </footer>
  );
}
