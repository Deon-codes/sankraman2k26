"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <div id="contact" className="relative min-h-screen flex items-center justify-center py-20">

      {/* Dark Glassmorphism Background */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-2xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/45 to-black/75" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl mx-auto px-8 md:px-12 text-center"
      >
        {/* Section Header */}
        <div className="mb-16">
          <div className="text-[0.55rem] md:text-xs font-black tracking-[0.4em] text-[#ff6600] uppercase mb-8 mix-blend-screen opacity-90">
            FINAL CALL
          </div>

          <h2
            className="text-[4vw] md:text-[3vw] lg:text-[3.5vw] tracking-widest text-[#ffedd5] mb-8 drop-shadow-[0_0_30px_rgba(255,166,0,0.6)]"
            style={{ fontFamily: "'Dune Rise', sans-serif" }}
          >
            JOIN THE TRANSITION
          </h2>

          <p className="text-xl md:text-2xl text-[#ffedd5]/90 leading-relaxed tracking-wide mb-12 drop-shadow-sm">
            Step into Sankraman — where ideas turn into impactful innovations.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mb-16 flex flex-col sm:flex-row justify-center items-center gap-6">
          <a href="https://unstop.com/p/prakalp-40-fr-conceicao-rodrigues-college-of-engineering-frcrce-bandra-1660364?utm_medium=Share&utm_source=chrqwgfb39910&utm_campaign=Online_coding_challenge" target="_blank" rel="noopener noreferrer" className="group relative border-2 border-[#ff6600] bg-black/30 backdrop-blur-sm px-12 py-4 rounded-lg overflow-hidden transition-all duration-500 hover:border-[#ffaa00] hover:bg-black/40">
            <span
              className="relative z-10 text-xl font-black tracking-[0.3em] text-[#ff6600] uppercase group-hover:text-[#1a0a00] transition-colors duration-500 drop-shadow-sm"
              style={{ fontFamily: "'Dune Rise', sans-serif" }}
            >
              REGISTER NOW
            </span>
            <div className="absolute inset-0 bg-[#ff6600] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          </a>

          <a href="mailto:ieeece.24@gmail.com?cc=projectcellcrce2024@gmail.com,wieieee.21@gmail.com&subject=PRAKALP 4.0 Enquiry" className="inline-block">
            <button className="group relative border border-[#ffedd5]/30 bg-white/5 backdrop-blur-sm px-12 py-4 rounded-lg overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-[#ffedd5]/60 cursor-pointer">
              <span
                className="relative z-10 text-xl font-black tracking-[0.3em] text-[#ffedd5] uppercase transition-colors duration-500 drop-shadow-sm"
                style={{ fontFamily: "'Dune Rise', sans-serif" }}
              >
                CONTACT US
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </a>
        </div>

        {/* Venue Info */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="p-8 rounded-xl bg-black/30 backdrop-blur-sm border border-[#ff6600]/20 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(255,102,0,0.4)] transition-all duration-500">
            <div className="text-[0.6rem] md:text-xs font-black tracking-[0.3em] text-[#ff6600] uppercase mb-4">
              EVENT VENUE
            </div>
            <h3 className="text-2xl text-[#ffedd5] font-bold mb-3 tracking-wider">
              Fr. Conceicao Rodrigues College of Engineering
            </h3>
            <div className="text-[#ffedd5]/90 tracking-wide drop-shadow-sm mb-6 text-sm leading-relaxed">
              Fr. Agnel Ashram, Bandstand Promenade<br />
              Bandra West, Mumbai 400050
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-[#ffedd5]/80 text-sm">
                <span className="text-xl mr-3"></span> 18 April 2026, Saturday
              </div>
              <div className="flex items-center text-[#ffedd5]/80 text-sm">
                <span className="text-xl mr-3"></span> Nearest Station: Bandra
              </div>
            </div>
          </div>
          <div className="p-8 rounded-xl bg-black/30 backdrop-blur-sm border border-[#ff6600]/20 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(255,102,0,0.4)] transition-all duration-500 flex flex-col justify-center">
            <div className="text-[0.6rem] md:text-xs font-black tracking-[0.3em] text-[#ff6600] uppercase mb-4">
              CONTACT HEADS
            </div>
            <div className="space-y-3 text-[#ffedd5]/90 text-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#ff6600]/20 pb-2">
                <span>Kunal Sarvaiya <span className="text-[#ff6600] text-[0.65rem] ml-1">IEEE PR</span></span>
                <span className="font-mono mt-1 sm:mt-0 text-xs">+91 79001 88666</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#ff6600]/20 pb-2">
                <span>Aahana Peter <span className="text-[#ff6600] text-[0.65rem] ml-1">WIE PR</span></span>
                <span className="font-mono mt-1 sm:mt-0 text-xs">+91 87796 14123</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#ff6600]/20 pb-2">
                <span>Pranav Koradiya <span className="text-[#ff6600] text-[0.65rem] ml-1">PCELL PR</span></span>
                <span className="font-mono mt-1 sm:mt-0 text-xs">+91 97692 04570</span>
              </div>
              <div className="pt-2 text-[0.65rem] flex flex-col gap-1 text-[#ffedd5]/70">
                <span>✉ projectcellcrce2024@gmail.com | ieeece.24@gmail.com | wieieee.21@gmail.com</span>
              </div>
              <div className="pt-1 text-[0.7rem] flex flex-wrap gap-x-3 gap-y-1 text-[#ffedd5]/70">
                <span><span className="text-[#ff6600]">IG:</span> @project_cell.crce</span>
                <span>@ieee_crce</span>
                <span>@wie_crce</span>
              </div>
            </div>
          </div>
        </div>

      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />
    </div>
  );
}