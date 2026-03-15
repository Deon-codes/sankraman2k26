'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const events = [
  {
    id: 1,
    category: 'Technical',
    title: 'Ideathon',
    description:
      'Identify a real-world problem and pitch your innovative concept. Teams present ideas bridging engineering challenges to practical solutions.',
    duration: '3 hours',
    team: '2–4 members',
    icon: '💡',
    color: '#FFB347',
    glow: 'rgba(255,179,71,0.25)',
    tags: ['Ideation', 'Presentation', 'Innovation'],
  },
  {
    id: 2,
    category: 'Technical',
    title: 'HackSprint',
    description:
      'A fast-paced hackathon where teams design, build, and demonstrate a working prototype. From code to product in one sitting.',
    duration: '12 hours',
    team: '3–5 members',
    icon: '⚡',
    color: '#00E5FF',
    glow: 'rgba(0,229,255,0.25)',
    tags: ['Hackathon', 'Development', 'Prototype'],
  },
  {
    id: 3,
    category: 'Technical',
    title: 'Circuit Blitz',
    description:
      'Test your hardware and electronics skills. Design a circuit, debug a system, and showcase your knowledge of embedded engineering.',
    duration: '4 hours',
    team: 'Individual / 2',
    icon: '🔌',
    color: '#7B2FBE',
    glow: 'rgba(123,47,190,0.25)',
    tags: ['Hardware', 'Embedded', 'Electronics'],
  },
  {
    id: 4,
    category: 'Technical',
    title: 'AI Challenge',
    description:
      'Build a machine learning model or AI-powered solution that addresses a real societal problem with smart, data-driven engineering.',
    duration: '6 hours',
    team: '2–4 members',
    icon: '🧠',
    color: '#1E90FF',
    glow: 'rgba(30,144,255,0.25)',
  tags: ['AI/ML', 'Data Science', 'Solutions'],
  },
  {
    id: 5,
    category: 'Non-Technical',
    title: 'Paper Presentation',
    description:
      'Present original research or technical reviews. Demonstrate your ability to communicate engineering ideas with clarity and depth.',
    duration: '15 min/team',
    team: 'Individual / 2',
    icon: '📄',
    color: '#B388FF',
    glow: 'rgba(179,136,255,0.25)',
    tags: ['Research', 'Presentation', 'Academic'],
  },
  {
    id: 6,
    category: 'Non-Technical',
    title: 'Project Expo',
    description:
      'Display your ongoing or completed projects to peers, mentors, and industry judges. Get feedback, visibility, and recognition.',
    duration: 'All Day',
    team: '2–5 members',
    icon: '🏗️',
    color: '#00E5FF',
    glow: 'rgba(0,229,255,0.25)',
    tags: ['Exhibition', 'Projects', 'Networking'],
  },
];

const filters = ['All', 'Technical', 'Non-Technical'];

function EventCard({ event, index }: { event: typeof events[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 60, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="glass-card rounded-2xl overflow-hidden relative group cursor-pointer"
      style={{
        border: `1px solid ${hovered ? event.color + '55' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered ? `0 0 40px ${event.glow}` : '0 4px 20px rgba(0,0,0,0.3)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-[2px] w-full"
        style={{ background: `linear-gradient(to right, transparent, ${event.color}, transparent)` }}
      />

      {/* Hover glow overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${event.glow.replace('0.25', '0.07')} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 p-6">
        {/* Icon + category */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl">{event.icon}</span>
          <span
            className="text-[10px] font-bold tracking-[0.3em] uppercase px-3 py-1 rounded-full"
            style={{
              color: event.color,
              background: event.glow.replace('0.25', '0.15'),
              border: `1px solid ${event.color}33`,
            }}
          >
            {event.category}
          </span>
        </div>

        <h3 className="text-xl font-black text-white mb-2">{event.title}</h3>
        <p className="text-white/55 text-sm leading-relaxed mb-4">{event.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] tracking-wider uppercase px-2 py-1 rounded-md text-white/50"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Meta info */}
        <div className="flex gap-4 pt-4 border-t border-white/8 text-xs text-white/40">
          <span>⏱ {event.duration}</span>
          <span>👥 {event.team}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventsSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = events.filter(
    (e) => activeFilter === 'All' || e.category === activeFilter
  );

  return (
    <section id="events" className="section-base">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(30,144,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#1E90FF]" />
            <span className="text-[#1E90FF] text-xs tracking-[0.4em] uppercase font-semibold">
              What&apos;s Happening
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#1E90FF]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-black chrome-text"
            style={{ fontSize: 'clamp(2rem, 7vw, 5rem)' }}
          >
            Events
          </motion.h2>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-3 mb-12"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`min-w-[110px] px-5 py-2.5 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-[#E8E8F0] text-[#020008]'
                  : 'glass-card text-white/50 hover:text-white/80'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Event grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
