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
    icon: '💡',
    color: '#FFB347',
    glow: 'rgba(255,179,71,0.3)',
  },
  {
    id: '02',
    title: 'Design',
    subtitle: 'Where ideas are structured into workable solutions',
    description:
      'Raw ideas transform into structured blueprints. Teams architect their solutions — planning workflows, designing interfaces, and mapping technical requirements with precision.',
    icon: '🖥️',
    color: '#00E5FF',
    glow: 'rgba(0,229,255,0.3)',
  },
  {
    id: '03',
    title: 'Development',
    subtitle: 'Where projects are built, tested, and refined',
    description:
      'The most intensive phase — prototypes are built, tested against real conditions, iterated upon, and refined until the solution is robust, feasible, and impactful.',
    icon: '⚙️',
    color: '#7B2FBE',
    glow: 'rgba(123,47,190,0.3)',
  },
  {
    id: '04',
    title: 'Impact',
    subtitle: 'Where solutions create measurable benefits for society',
    description:
      'The final Sankraman — solutions step out of the lab and into the world, creating measurable, tangible benefits. Ideas become change. Concepts become reality.',
    icon: '📈',
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
      className={`flex items-center gap-6 md:gap-12 ${isEven ? 'flex-row' : 'flex-row-reverse'} w-full`}
    >
      {/* Content card */}
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex-1 glass-card p-6 md:p-8 rounded-2xl border border-white/8 relative overflow-hidden group"
        style={{ boxShadow: hovered ? `0 0 30px ${phase.glow}` : 'none', transition: 'box-shadow 0.3s' }}
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
            <span className="text-3xl">{phase.icon}</span>
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
          <p className="text-white/55 text-sm leading-relaxed">{phase.description}</p>
        </div>
      </motion.div>

      {/* Timeline node */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          animate={inView ? { scale: [0, 1.3, 1] } : { scale: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          className="relative w-12 h-12 rounded-full flex items-center justify-center font-black text-sm z-10"
          style={{
            background: `radial-gradient(circle, ${phase.glow} 0%, transparent 70%)`,
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
        {/* Connecting line (not on last) */}
        {index < phases.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
            className="w-[2px] h-16 md:h-24 origin-top"
            style={{
              background: `linear-gradient(to bottom, ${phase.color}, ${phases[index + 1].color})`,
              opacity: 0.4,
            }}
          />
        )}
      </div>

      {/* Spacer for alternating layout */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
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

        {/* Phase cards */}
        <div className="flex flex-col gap-0 items-center">
          {phases.map((phase, i) => (
            <PhaseCard key={phase.id} phase={phase} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
