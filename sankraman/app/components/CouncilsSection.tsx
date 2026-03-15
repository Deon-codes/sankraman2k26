'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const councils = [
  {
    name: 'IEEE CRCE',
    shortName: 'IEEE',
    tagline: 'Institute of Electrical and Electronics Engineers',
    description:
      'The world\'s largest technical professional organization, driving innovation across technology disciplines. IEEE CRCE fosters technical excellence through workshops, competitions, and industry connections.',
    color: '#00E5FF',
    glow: 'rgba(0,229,255,0.3)',
    gradient: 'from-[#00E5FF]/20 to-transparent',
    icon: (
      <svg viewBox="0 0 60 60" fill="none" className="w-14 h-14">
        <circle cx="30" cy="30" r="28" stroke="#00E5FF" strokeWidth="2" strokeDasharray="4 2" />
        <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fill="#00E5FF" fontSize="14" fontWeight="bold" fontFamily="Arial">IEEE</text>
      </svg>
    ),
    achievements: ['Technical Workshops', 'Industry Talks', 'Competitions'],
  },
  {
    name: 'WiE CRCE',
    shortName: 'WiE',
    tagline: 'Women in Engineering',
    description:
      'IEEE Women in Engineering — empowering women in STEM through mentorship, leadership programs, and community building. WiE CRCE champions diversity and inclusion in engineering.',
    color: '#FF6EC7',
    glow: 'rgba(255,110,199,0.3)',
    gradient: 'from-[#FF6EC7]/20 to-transparent',
    icon: (
      <svg viewBox="0 0 60 60" fill="none" className="w-14 h-14">
        <circle cx="30" cy="30" r="28" stroke="#FF6EC7" strokeWidth="2" />
        <circle cx="30" cy="22" r="8" stroke="#FF6EC7" strokeWidth="2" />
        <path d="M20 44c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#FF6EC7" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    achievements: ['Leadership Programs', 'Mentorship', 'Diversity Initiatives'],
  },
  {
    name: 'Project Cell',
    shortName: 'PC',
    tagline: 'CRCE Project Cell',
    description:
      'The hub of applied engineering at CRCE. Project Cell drives student innovation from ideation to implementation, nurturing projects that solve real problems and create lasting impact.',
    color: '#7B2FBE',
    glow: 'rgba(123,47,190,0.3)',
    gradient: 'from-[#7B2FBE]/20 to-transparent',
    icon: (
      <svg viewBox="0 0 60 60" fill="none" className="w-14 h-14">
        <rect x="10" y="10" width="40" height="40" rx="8" stroke="#7B2FBE" strokeWidth="2" />
        <path d="M20 30h20M30 20v20" stroke="#7B2FBE" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    achievements: ['Project Mentoring', 'Hackathons', 'Expos & Showcases'],
  },
];

function CouncilCard({ council, index }: { council: typeof councils[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 60, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className="glass-card rounded-2xl p-8 relative overflow-hidden group flex flex-col"
      style={{
        border: `1px solid ${council.color}22`,
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${council.glow.replace('0.3', '0.08')} 0%, transparent 70%)`,
        }}
      />

      {/* Top border accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(to right, transparent, ${council.color}, transparent)` }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        <div className="mb-5">{council.icon}</div>

        {/* Name & tagline */}
        <div
          className="text-xs font-bold tracking-[0.35em] uppercase mb-1"
          style={{ color: council.color }}
        >
          {council.tagline}
        </div>
        <h3 className="text-2xl font-black text-white mb-4">{council.name}</h3>

        {/* Description */}
        <p className="text-white/55 text-sm leading-relaxed mb-6 flex-1">{council.description}</p>

        {/* Achievement pills */}
        <div className="flex flex-wrap gap-2">
          {council.achievements.map((a) => (
            <span
              key={a}
              className="text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full font-semibold"
              style={{
                color: council.color,
                background: `${council.color}15`,
                border: `1px solid ${council.color}33`,
              }}
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function CouncilsSection() {
  return (
    <section id="councils" className="section-base">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(123,47,190,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#7B2FBE]" />
            <span className="text-[#B388FF] text-xs tracking-[0.4em] uppercase font-semibold">
              Organised By
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#7B2FBE]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-black chrome-text"
            style={{ fontSize: 'clamp(2rem, 7vw, 5rem)' }}
          >
            Three Councils,
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-black neon-gradient-text"
            style={{ fontSize: 'clamp(2rem, 7vw, 5rem)' }}
          >
            One Vision
          </motion.h2>
        </div>

        {/* Council cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {councils.map((c, i) => (
            <CouncilCard key={c.shortName} council={c} index={i} />
          ))}
        </div>

        {/* Collab banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 text-center border border-white/8 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(0,229,255,0.04) 0%, rgba(123,47,190,0.06) 50%, rgba(30,144,255,0.04) 100%)',
            }}
          />
          <div className="relative z-10">
            <div className="flex justify-center items-center gap-4 md:gap-8 mb-4 flex-wrap">
              {councils.map((c, i) => (
                <div key={c.shortName} className="flex items-center gap-4">
                  <span
                    className="text-2xl md:text-3xl font-black tracking-tight"
                    style={{ color: c.color, textShadow: `0 0 20px ${c.glow}` }}
                  >
                    {c.shortName}
                  </span>
                  {i < councils.length - 1 && (
                    <span className="text-white/20 text-2xl">×</span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-2xl mx-auto">
              A collaborative effort by three councils at CRCE — combining technical knowledge,
              inclusive leadership, and hands-on innovation to bring PRAKALP Sankraman to life.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
