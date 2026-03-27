"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

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

          <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-[#ffedd5]/90 leading-relaxed tracking-wide mb-12 drop-shadow-sm">
            Step into Sankraman — where ideas turn into impactful innovations.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mb-16 flex flex-col sm:flex-row justify-center items-center gap-6">
          <a href="https://unstop.com/p/prakalp-40-fr-conceicao-rodrigues-college-of-engineering-frcrce-bandra-1660364?utm_medium=Share&utm_source=chrqwgfb39910&utm_campaign=Online_coding_challenge" target="_blank" rel="noopener noreferrer" className="group relative border-2 border-[#ff6600] bg-black/30 backdrop-blur-sm px-12 py-4 rounded-lg overflow-hidden transition-all duration-500 hover:border-[#ffaa00] hover:bg-black/40">
            <span
              className="relative z-10 text-sm sm:text-base md:text-lg lg:text-xl font-black tracking-[0.3em] text-[#ff6600] uppercase group-hover:text-[#1a0a00] transition-colors duration-500 drop-shadow-sm"
              style={{ fontFamily: "'Dune Rise', sans-serif" }}
            >
              REGISTER NOW
            </span>
            <div className="absolute inset-0 bg-[#ff6600] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          </a>

          <a href="#contact-heads" className="inline-block">
            <button className="group relative border border-[#ffedd5]/30 bg-white/5 backdrop-blur-sm px-12 py-4 rounded-lg overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-[#ffedd5]/60 cursor-pointer">
              <span
                className="relative z-10 text-sm sm:text-base md:text-lg lg:text-xl font-black tracking-[0.3em] text-[#ffedd5] uppercase transition-colors duration-500 drop-shadow-sm"
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
          <div className="p-6 rounded-xl bg-black/30 backdrop-blur-sm border border-[#ff6600]/20 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(255,102,0,0.4)] transition-all duration-500 flex flex-col">
            <div className="text-[0.55rem] md:text-xs font-black tracking-[0.3em] text-[#ff6600] uppercase mb-3">
              EVENT VENUE
            </div>
            <h3 className="text-sm sm:text-base md:text-lg text-[#ffedd5] font-bold mb-2 tracking-wider leading-tight">
              Fr. Conceicao Rodrigues College of Engineering
            </h3>
            <div className="text-[#ffedd5]/90 tracking-wide drop-shadow-sm mb-4 text-[0.7rem] sm:text-xs leading-relaxed">
              Fr. Agnel Ashram, Bandstand Promenade,<br />
              Bandra West, Mumbai 400050
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-[0.65rem] sm:text-xs">
              <div className="bg-black/40 backdrop-blur-sm border border-[#ff6600]/10 p-2 rounded">
                <div className="text-[#ff6600] text-[0.55rem] uppercase font-black tracking-[0.2em] mb-1">Date</div>
                <div className="text-[#ffedd5]/90 font-semibold">18 April 2026</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-[#ff6600]/10 p-2 rounded">
                <div className="text-[#ff6600] text-[0.55rem] uppercase font-black tracking-[0.2em] mb-1">Day</div>
                <div className="text-[#ffedd5]/90 font-semibold">Saturday</div>
              </div>
              <div className="col-span-2 bg-black/40 backdrop-blur-sm border border-[#ff6600]/10 p-2 rounded">
                <div className="text-[#ff6600] text-[0.55rem] uppercase font-black tracking-[0.2em] mb-1">Station</div>
                <div className="text-[#ffedd5]/90 font-semibold">Nearest: Bandra</div>
              </div>
            </div>

            {/* Maps Link Button */}
            <a
              href="https://maps.app.goo.gl/9awrEXbbMHC2w8xM7"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative border border-[#ff6600]/50 bg-black/30 backdrop-blur-sm px-4 py-2 rounded text-center overflow-hidden transition-all duration-300 hover:border-[#ff6600] hover:bg-black/40 self-start"
            >
              <span className="relative z-10 text-[0.65rem] sm:text-xs font-black tracking-[0.2em] text-[#ff6600] uppercase group-hover:text-[#ffaa00] transition-colors">
                📍 Open in Maps
              </span>
            </a>
          </div>
          <div id="contact-heads" className="p-8 rounded-xl bg-black/30 backdrop-blur-sm border border-[#ff6600]/20 hover:-translate-y-2 hover:shadow-[0_15px_30px_-10px_rgba(255,102,0,0.4)] transition-all duration-500 flex flex-col justify-center">
            <div className="text-[0.6rem] md:text-xs font-black tracking-[0.3em] text-[#ff6600] uppercase mb-4">
              CONTACT HEADS
            </div>
            <div className="space-y-3 text-[#ffedd5]/90 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#ff6600]/20 pb-2">
                <span>Kunal Sarvaiya <span className="text-[#ff6600] text-[0.5rem] sm:text-[0.65rem] ml-1">IEEE PR</span></span>
                <div className="flex items-center gap-3 mt-1 sm:mt-0 ml-auto">
                  <span className="font-mono text-[0.7rem] sm:text-xs">+91 79001 88666</span>
                  <a href="https://wa.me/919700188666" target="_blank" rel="noopener noreferrer" className="text-[#ff6600] hover:text-[#ffaa00] transition-colors flex-shrink-0">
                    <FaWhatsapp size={16} />
                  </a>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#ff6600]/20 pb-2">
                <span>Aahana Peter <span className="text-[#ff6600] text-[0.5rem] sm:text-[0.65rem] ml-1">WIE PR</span></span>
                <div className="flex items-center gap-3 mt-1 sm:mt-0 ml-auto">
                  <span className="font-mono text-[0.7rem] sm:text-xs">+91 87796 14123</span>
                  <a href="https://wa.me/918779614123" target="_blank" rel="noopener noreferrer" className="text-[#ff6600] hover:text-[#ffaa00] transition-colors flex-shrink-0">
                    <FaWhatsapp size={16} />
                  </a>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#ff6600]/20 pb-2">
                <span>Pranav Koradiya <span className="text-[#ff6600] text-[0.5rem] sm:text-[0.65rem] ml-1">Project Cell Co-lead</span></span>
                <div className="flex items-center gap-3 mt-1 sm:mt-0 ml-auto">
                  <span className="font-mono text-[0.7rem] sm:text-xs">+91 97692 04570</span>
                  <a href="https://wa.me/919769204570" target="_blank" rel="noopener noreferrer" className="text-[#ff6600] hover:text-[#ffaa00] transition-colors flex-shrink-0">
                    <FaWhatsapp size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />
    </div>
  );
}
