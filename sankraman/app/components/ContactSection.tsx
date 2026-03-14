'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="contact" className="section-base min-h-[60vh]" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,229,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#00E5FF]" />
            <span className="text-[#00E5FF] text-xs tracking-[0.4em] uppercase font-semibold">
              Get Involved
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#00E5FF]" />
          </div>

          <h2
            className="font-black chrome-text mb-4"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
          >
            Join the Transition
          </h2>

          <p className="text-white/50 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Be part of Sankraman — engineer the change. Register now to participate in events,
            workshops, and experience the full journey from concept to impact.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative min-h-[52px] px-10 py-4 rounded-full font-bold text-base text-[#020008] overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] via-[#1E90FF] to-[#7B2FBE]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] via-[#1E90FF] to-[#7B2FBE] blur-lg opacity-0 group-hover:opacity-60 transition-opacity" />
              <span className="relative z-10 tracking-wider">Register for PRAKALP</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 rounded-full font-bold text-base text-[#B388FF] border border-[#B388FF]/30 hover:border-[#B388FF]/70 hover:bg-[#B388FF]/5 transition-all tracking-wider"
            >
              Contact Us
            </motion.button>
          </div>

          <div className="divider mb-10" />

          {/* Social / contact links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
            {['Instagram', 'LinkedIn', 'Email'].map((platform) => (
              <a
                key={platform}
                href="#"
                className="hover:text-[#00E5FF] transition-colors duration-200 tracking-wider"
              >
                {platform}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
