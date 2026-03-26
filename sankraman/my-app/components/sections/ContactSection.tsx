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
            JOIN THE MOVEMENT
          </div>

          <h2
            className="text-[4vw] md:text-[3vw] lg:text-[3.5vw] tracking-widest text-[#ffedd5] mb-8 drop-shadow-[0_0_30px_rgba(255,166,0,0.6)]"
            style={{ fontFamily: "'Dune Rise', sans-serif" }}
          >
            ANSWER THE CALL
          </h2>

          <p className="text-xl md:text-2xl text-[#ffedd5]/90 leading-relaxed tracking-wide mb-12 drop-shadow-sm">
            The future of engineering awaits. Are you ready to join the transformation?
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-16">
          <button className="group relative border-2 border-[#ff6600] bg-black/30 backdrop-blur-sm px-12 py-4 rounded-lg overflow-hidden transition-all duration-500 hover:border-[#ffaa00] hover:bg-black/40">
            <span
              className="relative z-10 text-xl font-black tracking-[0.3em] text-[#ff6600] uppercase group-hover:text-[#1a0a00] transition-colors duration-500 drop-shadow-sm"
              style={{ fontFamily: "'Dune Rise', sans-serif" }}
            >
              REGISTER NOW
            </span>

            {/* Sliding background */}
            <div className="absolute inset-0 bg-[#ff6600] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />

            {/* Corner accents */}
            <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#ff6600] group-hover:border-[#1a0a00] transition-colors duration-500 opacity-80" />
            <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#ff6600] group-hover:border-[#1a0a00] transition-colors duration-500 opacity-80" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#ff6600] group-hover:border-[#1a0a00] transition-colors duration-500 opacity-80" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#ff6600] group-hover:border-[#1a0a00] transition-colors duration-500 opacity-80" />
          </button>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-lg bg-black/30 backdrop-blur-sm border border-[#ff6600]/20 hover:border-[#ff6600]/40 transition-all duration-300">
            <div className="text-[0.6rem] md:text-xs font-black tracking-[0.3em] text-[#ff6600] uppercase mb-2">
              EMAIL
            </div>
            <div className="text-[#ffedd5]/90 tracking-wide drop-shadow-sm">
              info@sankraman.org
            </div>
          </div>
          <div className="p-6 rounded-lg bg-black/30 backdrop-blur-sm border border-[#ff6600]/20 hover:border-[#ff6600]/40 transition-all duration-300">
            <div className="text-[0.6rem] md:text-xs font-black tracking-[0.3em] text-[#ff6600] uppercase mb-2">
              LOCATION
            </div>
            <div className="text-[#ffedd5]/90 tracking-wide drop-shadow-sm">
              Engineering Campus
            </div>
          </div>
        </div>

      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />
    </div>
  );
}