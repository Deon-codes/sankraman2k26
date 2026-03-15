'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import gsap from 'gsap';

const LETTERS_PRAKALP = 'PRAKALP 4.0'.split('');
const LETTERS_SANKRAMAN = 'SANKRAMAN'.split('');

function LetterReveal({ letters, delay = 0, className = '' }: { letters: string[]; delay?: number; className?: string }) {
  return (
    <span className="inline-flex flex-wrap justify-center">
      {letters.map((l, i) => (
        <motion.span
          key={i}
          initial={{ y: 80, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={className}
          style={{ display: 'inline-block', transformOrigin: 'bottom', perspective: '600px' }}
        >
          {l === ' ' ? '\u00A0' : l}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.85]);
  const blurPx = useTransform(scrollYProgress, [0, 0.7], [0, 20]);
  const filter = useTransform(blurPx, (v) => v > 0 ? `blur(${v}px)` : 'none');

  // Energy line streak animation on mount
  const streakRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!streakRef.current) return;
    gsap.fromTo(
      streakRef.current.querySelectorAll('.streak'),
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1.5, stagger: 0.15, ease: 'expo.out', delay: 1.2 }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Radial gradient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,229,255,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 30% 60%, rgba(123,47,190,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 70% 40%, rgba(30,144,255,0.06) 0%, transparent 60%)
          `,
        }}
      />

      {/* Energy streaks (inspired by poster 2 vortex trails) */}
      <div ref={streakRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: '30%', left: '-10%', width: '55%', rotate: '-25deg', color: 'from-[#00E5FF]' },
          { top: '50%', left: '-5%', width: '45%', rotate: '-15deg', color: 'from-[#7B2FBE]' },
          { top: '35%', right: '-10%', width: '55%', rotate: '20deg', color: 'from-[#1E90FF]', isRight: true },
          { top: '55%', right: '-5%', width: '40%', rotate: '10deg', color: 'from-[#00E5FF]', isRight: true },
        ].map((s, i) => (
          <div
            key={i}
            className={`streak absolute h-[1px] bg-gradient-to-r ${s.color} to-transparent ${(s as any).isRight ? 'right-0' : 'left-0'}`}
            style={{
              top: s.top,
              [(s as any).isRight ? 'right' : 'left']: (s as any).isRight ? s.right : s.left,
              width: s.width,
              transform: `rotate(${s.rotate})`,
              transformOrigin: (s as any).isRight ? 'right center' : 'left center',
              boxShadow: `0 0 8px currentColor`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        style={{ opacity, scale, filter }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        {/* Collab badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-10 text-xs font-semibold tracking-[0.25em] uppercase"
        >
          <span className="text-[#00E5FF]">IEEE</span>
          <span className="text-white/30">×</span>
          <span className="text-[#B388FF]">WiE</span>
          <span className="text-white/30">×</span>
          <span className="text-[#1E90FF]">Project Cell</span>
        </motion.div>

        {/* Presents */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-white/40 text-xs tracking-[0.45em] uppercase font-light mb-5"
        >
          Presents
        </motion.p>

        {/* PRAKALP 4.0 — chrome metallic */}
        <h1 className="font-black leading-none tracking-tight mb-6 hero-title"
          style={{ fontSize: 'clamp(3.5rem, 14vw, 10rem)' }}
        >
          <LetterReveal letters={LETTERS_PRAKALP} delay={0.4} className="chrome-text" />
        </h1>

        {/* SANKRAMAN — neon glitch */}
        <div
          className="glitch-container font-black tracking-[0.15em] leading-none mb-10"
          data-text="SANKRAMAN"
          style={{ fontSize: 'clamp(1.5rem, 6vw, 4rem)' }}
        >
          <LetterReveal letters={LETTERS_SANKRAMAN} delay={0.9} className="neon-gradient-text" />
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="text-white font-light tracking-[0.2em] uppercase text-sm md:text-base mb-4"
        >
          From Concept to Change
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.1 }}
          className="text-white text-sm tracking-widest max-w-md"
        >
          Transition from Challenges to Solutions
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="flex flex-col sm:flex-row gap-6 mt-12"
        >
          <button className="px-9 py-3 rounded-full font-bold text-sm bg-[#E8E8F0] text-[#020008] hover:bg-[#E8E8F0]/85 transition-colors duration-300 tracking-wider">
            Register Now
          </button>

          <button className="px-9 py-3 rounded-full font-bold text-sm text-[#E8E8F0] border border-[#E8E8F0]/25 hover:border-[#E8E8F0]/50 hover:bg-[#E8E8F0]/5 transition-all duration-300 tracking-wider">
            Learn More
          </button>
        </motion.div>


      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#00E5FF] to-transparent" />
      </motion.div>
    </section>
  );
}
