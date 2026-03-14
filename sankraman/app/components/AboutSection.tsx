'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const dualSides = [
  {
    side: 'left',
    label: 'Challenges',
    color: '#FFB347',
    items: [
      { icon: '⚙️', text: 'Legacy industrial systems' },
      { icon: '🔋', text: 'Resource inefficiency' },
      { icon: '🌫️', text: 'Environmental degradation' },
      { icon: '📉', text: 'Technological gaps' },
    ],
  },
  {
    side: 'right',
    label: 'Solutions',
    color: '#00E5FF',
    items: [
      { icon: '🤖', text: 'AI & automation' },
      { icon: '🌱', text: 'Sustainable tech' },
      { icon: '🧠', text: 'Smart engineering' },
      { icon: '📈', text: 'Measurable impact' },
    ],
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-base">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(123,47,190,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl w-full">
        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#00E5FF]" />
            <span className="text-[#00E5FF] text-xs tracking-[0.4em] uppercase font-semibold">
              The Theme
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            className="font-black leading-none mb-6 chrome-text"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
          >
            SANKRAMAN
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-[#B388FF] text-lg md:text-xl font-light tracking-wide mb-4 max-w-3xl italic">
            "Transition — the purposeful movement from an idea to its real-world application."
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="text-white/55 text-base leading-relaxed max-w-3xl mb-16">
            Sankraman represents the journey of innovation where concepts do not remain theoretical
            but evolve through research, design, testing, and refinement to become practical
            solutions that improve human living. It highlights the critical shift where creativity
            meets responsibility, and ideas are transformed into projects with tangible impact.
          </p>
        </Reveal>

        {/* Dual split: Challenges → Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-0 items-center">
          {dualSides.map((side, idx) => (
            <Reveal key={side.label} delay={0.2 + idx * 0.15}>
              <div
                className={`glass-card p-6 md:p-8 rounded-2xl border ${
                  side.side === 'left' ? 'border-[#FFB347]/20' : 'border-[#00E5FF]/20'
                }`}
              >
                <div
                  className="text-xs font-bold tracking-[0.35em] uppercase mb-5"
                  style={{ color: side.color }}
                >
                  {side.label}
                </div>
                <ul className="space-y-3">
                  {side.items.map((item) => (
                    <li key={item.text} className="flex items-center gap-3 text-white/70 text-sm">
                      <span className="text-lg">{item.icon}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          {/* Center arrow */}
          <Reveal delay={0.35}>
            <div className="flex flex-col items-center justify-center gap-2 px-4 md:px-8">
              <div className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-1">
                Sankraman
              </div>
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="text-[#00E5FF] text-3xl hidden md:block"
              >
                →
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="text-[#00E5FF] text-3xl md:hidden"
              >
                ↓
              </motion.div>
              <div
                className="w-[1px] h-8 hidden md:block"
                style={{
                  background: 'linear-gradient(to bottom, #00E5FF, #7B2FBE)',
                }}
              />
            </div>
          </Reveal>
        </div>

        {/* Bottom tagline strip */}
        <Reveal delay={0.5}>
          <div className="mt-16 text-center">
            <div className="divider mb-6" />
            <p className="text-white/40 text-sm tracking-[0.2em] uppercase">
              Engineering innovation bridges existing challenges with smart, sustainable solutions
            </p>
            <p className="neon-gradient-text font-bold text-xl md:text-2xl tracking-wider mt-3">
              Engineering the Change
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
