"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="relative py-20 px-8 md:px-12 border-t border-[#ff6600]/20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Dark glassmorphism background matching the theme */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Brand and main info */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3
            className="text-3xl md:text-4xl tracking-widest text-[#ffedd5] mb-4 drop-shadow-[0_0_20px_rgba(255,166,0,0.6)]"
            style={{ fontFamily: "'Dune Rise', sans-serif" }}
          >
            SANKRAMAN
          </h3>
          <p className="text-[#ff6600] text-sm tracking-[0.3em] uppercase">
            Engineering the Transition
          </p>
        </motion.div>

        {/* Social links and contact info */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex gap-8 text-sm text-[#ffedd5]/70">
            <a
              href="#"
              className="hover:text-[#ff6600] transition-colors duration-300 tracking-[0.1em] uppercase"
            >
              Twitter
            </a>
            <a
              href="#"
              className="hover:text-[#ff6600] transition-colors duration-300 tracking-[0.1em] uppercase"
            >
              Instagram
            </a>
            <a
              href="#"
              className="hover:text-[#ff6600] transition-colors duration-300 tracking-[0.1em] uppercase"
            >
              LinkedIn
            </a>
          </div>

          <div className="text-xs text-[#ffedd5]/50 tracking-[0.2em] uppercase">
            © 2026 Prakalp 4.0. All rights reserved.
          </div>
        </motion.div>

        {/* Additional decorative element */}
        <motion.div
          className="mt-12 pt-8 border-t border-[#ff6600]/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-xs text-[#ffedd5]/40 tracking-[0.15em] uppercase">
            Crafted with passion • Prakalp 4.0 Team
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}