"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <div id="about" className="relative min-h-screen flex items-center justify-center py-20">

      {/* Dark Glassmorphism Background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/60" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-6xl mx-auto px-8 md:px-12 text-center"
      >
        {/* Section Label - Movie Poster Style */}
        <div className="text-[0.55rem] md:text-xs font-black tracking-[0.4em] text-[#ff6600] uppercase mb-8 mix-blend-screen opacity-90">
          ABOUT THE EVENT
        </div>

        {/* Main Heading */}
        <h2
          className="text-[4vw] md:text-[3vw] lg:text-[3.5vw] tracking-widest text-[#ffedd5] mb-12 drop-shadow-[0_0_30px_rgba(255,166,0,0.6)]"
          style={{ fontFamily: "'Dune Rise', sans-serif" }}
        >
          THE AWAKENING
        </h2>

        {/* Description */}
        <div className="max-w-4xl mx-auto space-y-8 mb-16">
          <p className="text-lg md:text-xl text-[#ffedd5]/95 leading-relaxed tracking-wide drop-shadow-sm">
            In the vast expanse of innovation, where engineering minds converge to reshape tomorrow,
            SANKRAMAN emerges as the ultimate crucible of technological transformation.
          </p>
          <p className="text-lg md:text-xl text-[#ffedd5]/90 leading-relaxed tracking-wide drop-shadow-sm">
            PRAKALP 4.0 brings together the brightest engineers, visionaries, and architects of change
            in a journey that transcends conventional boundaries of technology and imagination.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "48", label: "HOURS OF INNOVATION" },
            { number: "500+", label: "PARTICIPANTS" },
            { number: "25+", label: "WORKSHOPS" },
            { number: "₹50K+", label: "PRIZE POOL" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-[#ff6600]/20 hover:border-[#ff6600]/40 transition-all duration-300">
              <div
                className="text-3xl md:text-4xl font-black text-[#ff6600] tracking-wider drop-shadow-[0_0_20px_rgba(255,102,0,0.7)]"
                style={{ fontFamily: "'Dune Rise', sans-serif" }}
              >
                {stat.number}
              </div>
              <div className="text-[0.55rem] md:text-xs font-black tracking-[0.3em] text-[#ffedd5]/80 uppercase mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Additional overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
    </div>
  );
}