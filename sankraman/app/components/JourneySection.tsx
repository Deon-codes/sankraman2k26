'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const phases = [
  {
    id: '01',
    title: 'Ideation',
    subtitle: 'Where problems are identified and concepts are formed',
    description:
      'The journey begins with understanding the world as it is — full of complex, real-world challenges. Participants identify problems, research root causes, and crystallise an idea that could create change.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" style={{color: '#FFB347'}}><path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 4 12.7V17a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-2.3A7 7 0 0 1 12 2Z"/></svg>,
    color: '#FFB347',
    glow: 'rgba(255,179,71,0.3)',
  },
  {
    id: '02',
    title: 'Design',
    subtitle: 'Where ideas are structured into workable solutions',
    description:
      'Raw ideas transform into structured blueprints. Teams architect their solutions — planning workflows, designing interfaces, and mapping technical requirements with precision.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" style={{color: '#00E5FF'}}><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    color: '#00E5FF',
    glow: 'rgba(0,229,255,0.3)',
  },
  {
    id: '03',
    title: 'Development',
    subtitle: 'Where projects are built, tested, and refined',
    description:
      'The most intensive phase — prototypes are built, tested against real conditions, iterated upon, and refined until the solution is robust, feasible, and impactful.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" style={{color: '#7B2FBE'}}><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
    color: '#7B2FBE',
    glow: 'rgba(123,47,190,0.3)',
  },
  {
    id: '04',
    title: 'Impact',
    subtitle: 'Where solutions create measurable benefits for society',
    description:
      'The final Sankraman — solutions step out of the lab and into the world, creating measurable, tangible benefits. Ideas become change. Concepts become reality.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" style={{color: '#1E90FF'}}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    color: '#1E90FF',
    glow: 'rgba(30,144,255,0.3)',
  },
];

function PhaseCard({ phase, index }: { phase: typeof phases[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  const isEven = index % 2 === 0;

   return (
    <motion.div
      ref={ref}
      initial={{ x: isEven ? -60 : 60, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full"
    >
      {/* Timeline node — absolutely centered on the line */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div
          animate={inView ? { scale: [0, 1.3, 1] } : { scale: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          className="relative w-16 h-16 rounded-full flex items-center justify-center font-black text-lg"
          style={{
            background: '#020008',
            border: `2px solid ${phase.color}`,
            boxShadow: `0 0 15px ${phase.glow}, 0 0 30px ${phase.glow.replace('0.3', '0.1')}`,
            color: phase.color,
          }}
        >
          {phase.id}
          {/* Pulse ring */}
          <motion.div
            animate={{ scale: [1, 2], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: index * 0.5 }}
            className="absolute inset-0 rounded-full"
            style={{ border: `1px solid ${phase.color}` }}
          />
        </motion.div>
      </div>

      {/* Content card — placed on left or right half */}
      <div className={`flex ${isEven ? 'justify-start pr-[calc(50%+48px)]' : 'justify-end pl-[calc(50%+48px)]'}`}>
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          animate={{ y: hovered ? -4 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-full p-6 md:p-8 rounded-2xl relative overflow-hidden group"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: hovered
              ? `0 0 30px ${phase.glow}, 0 8px 32px rgba(0, 0, 0, 0.5)`
              : '0 8px 32px rgba(0, 0, 0, 0.5)',
            transition: 'box-shadow 0.3s',
          }}
        >
          {/* Background shimmer on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(ellipse at ${isEven ? '0% 50%' : '100% 50%'}, ${phase.glow.replace('0.3', '0.06')} 0%, transparent 70%)`,
            }}
          />

          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-3xl flex-shrink-0">{phase.icon}</span>
              <div>
                <div
                  className="text-xs font-bold tracking-[0.4em] uppercase mb-1"
                  style={{ color: phase.color }}
                >
                  Phase {phase.id}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white">{phase.title}</h3>
              </div>
            </div>
            <p className="text-sm font-semibold mb-3" style={{ color: phase.color }}>
              {phase.subtitle}
            </p>
            <p className="text-white/75 text-sm leading-relaxed">{phase.description}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ScrollLine() {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 80%', 'end 20%'],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={lineRef}
      className="absolute left-1/2 -translate-x-1/2 w-[2px] z-0 pointer-events-none"
      style={{ top: '50px', bottom: '50px' }}
    >
      {/* Dim background track */}
      <div
        className="absolute inset-0"
        style={{
          background: '#E8E8F0',
          opacity: 0.1,
        }}
      />
      {/* Animated fill that grows on scroll */}
      <motion.div
        className="absolute top-0 left-0 w-full origin-top"
        style={{
          scaleY,
          height: '100%',
          background: '#E8E8F0',
          opacity: 0.5,
          boxShadow: '0 0 6px rgba(232,232,240,0.15)',
        }}
      />
    </div>
  );
}

export default function JourneySection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.1, 0]);

  return (
    <section ref={sectionRef} id="journey" className="section-base relative">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: bgOpacity,
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #7B2FBE 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#7B2FBE]" />
            <span className="text-[#B388FF] text-xs tracking-[0.4em] uppercase font-semibold">
              The Event Journey
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#7B2FBE]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-black leading-tight"
            style={{ fontSize: 'clamp(2rem, 7vw, 5rem)' }}
          >
            <span className="chrome-text">From</span>{' '}
            <span className="neon-gradient-text">Idea</span>{' '}
            <span className="chrome-text">to</span>{' '}
            <span className="neon-gradient-text">Impact</span>
          </motion.h2>
        </div>

        {/* Phase cards with scroll-animated timeline */}
        <div className="relative flex flex-col gap-16 items-center">
          <ScrollLine />

          {phases.map((phase, i) => (
            <PhaseCard key={phase.id} phase={phase} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
