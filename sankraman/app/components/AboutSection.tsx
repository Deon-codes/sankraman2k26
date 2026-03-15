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
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="#FFB347" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>, text: 'Legacy industrial systems' },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="#FFB347" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="6" y="7" width="12" height="14" rx="2"/><path d="M10 7V5a2 2 0 0 1 4 0v2"/><line x1="12" y1="11" x2="12" y2="15"/></svg>, text: 'Resource inefficiency' },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="#FFB347" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>, text: 'Environmental degradation' },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="#FFB347" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, text: 'Technological gaps' },
    ],
  },
  {
    side: 'right',
    label: 'Solutions',
    color: '#00E5FF',
    items: [
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v3m6-3v3M9 20v3m6-3v3M20 9h3m-3 6h3M1 9h3m-3 6h3"/></svg>, text: 'AI & automation' },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 1 0-16 0c0 4.5 4 8 8 12Z"/><circle cx="12" cy="10" r="3"/></svg>, text: 'Sustainable tech' },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8Z"/><path d="M9.5 9a2.5 2.5 0 1 1 5 0c0 2-2.5 3-2.5 3"/><circle cx="12" cy="16" r="0.5"/></svg>, text: 'Smart engineering' },
      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>, text: 'Measurable impact' },
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
          <p className="text-white/55 text-base leading-relaxed max-w-3xl mb-12">
            Sankraman represents the journey of innovation where concepts do not remain theoretical
            but evolve through research, design, testing, and refinement to become practical
            solutions that improve human living. It highlights the critical shift where creativity
            meets responsibility, and ideas are transformed into projects with tangible impact.
          </p>
        </Reveal>

        {/* Dual split: Challenges → Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          {dualSides.map((side, idx) => (
            <Reveal key={side.label} delay={0.2 + idx * 0.15}>
              <div
                className="p-6 md:p-8 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: `1px solid ${side.side === 'left' ? 'rgba(255,179,71,0.2)' : 'rgba(0,229,255,0.2)'}`,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
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
                      <span className="flex-shrink-0">{item.icon}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom tagline strip */}
        <Reveal delay={0.5}>
          <div className="mt-16 text-center">
            <div className="divider mb-6" />
            <p className="text-white/40 text-sm tracking-[0.2em] uppercase">
              Engineering innovation bridges existing challenges with smart, sustainable solutions
            </p>
            <p className="text-white font-bold text-xl md:text-2xl tracking-wider mt-3">
              Engineering the Change
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
