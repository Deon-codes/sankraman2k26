'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="contact" className="section-base overflow-hidden" ref={ref}>
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

          <p className="text-white text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Be part of Sankraman — engineer the change. Register now to participate in events,
            workshops, and experience the full journey from concept to impact.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-9 py-3 rounded-full font-bold text-sm bg-[#E8E8F0] text-[#020008] hover:bg-[#E8E8F0]/85 transition-colors duration-300 tracking-wider"
            >
              Register for PRAKALP
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-9 py-3 rounded-full font-bold text-sm text-[#E8E8F0] border border-[#E8E8F0]/25 hover:border-[#E8E8F0]/50 hover:bg-[#E8E8F0]/5 transition-all duration-300 tracking-wider"
            >
              Contact Us
            </motion.button>
          </div>

          <div className="divider mb-10" />

          {/* Social / contact links */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-white/40">
            {['Instagram', 'LinkedIn', 'Email'].map((platform) => (
              <a
                key={platform}
                href="#"
                className="hover:text-[#00E5FF] transition-colors duration-200 tracking-wider py-2"
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
