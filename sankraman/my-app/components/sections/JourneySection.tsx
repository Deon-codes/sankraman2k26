"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll within the Timeline block
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Calculate parallax scale for the timeline line. 
  // It starts completely hidden and grows precisely with scroll depth.
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const timelineEvents = [
    { time: "DAY 0", title: "ARRIVAL OF THE CHOSEN", desc: "Registration & Welcome" },
    { time: "DAY 1", title: "THE INITIATION", desc: "Opening Ceremony & Workshops" },
    { time: "DAY 2", title: "THE TRIALS", desc: "Hackathon & Competitions Begin" },
    { time: "DAY 3", title: "THE CONVERGENCE", desc: "Final Presentations & Awards" }
  ];

  return (
    <div id="journey" className="relative min-h-screen flex items-center justify-center py-20">

      {/* Dark Glassmorphism Background */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-lg" />
      <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/40 to-black/70" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-6xl mx-auto px-8 md:px-12"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="text-xs font-black tracking-[0.4em] text-[#ff6600] uppercase mb-8 mix-blend-screen opacity-90">
            THE JOURNEY
          </div>

          <h2
            className="text-[4vw] md:text-[3vw] lg:text-[3.5vw] tracking-widest text-[#ffedd5] drop-shadow-[0_0_30px_rgba(255,166,0,0.6)]"
            style={{ fontFamily: "'Dune Rise', sans-serif" }}
          >
            TIMELINE OF TRANSFORMATION
          </h2>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Central line background */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-[#ff6600]/20 -translate-x-1/2 rounded-full" />
          
          {/* Active animated progress line */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-[#ff6600] -translate-x-1/2 origin-top drop-shadow-[0_0_20px_rgba(255,102,0,1)] rounded-full z-0" 
          />

          {/* Timeline Events */}
          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`w-full pl-14 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:pl-0 md:text-right' : 'md:pl-12'}`}>
                  {/* Event Card with Glassmorphism */}
                  <div className="p-6 rounded-lg bg-black/30 backdrop-blur-sm border border-[#ff6600]/20 hover:border-[#ff6600]/50 transition-all duration-500">
                    <div className="text-xs font-black tracking-[0.3em] text-[#ff6600] uppercase mb-2">
                      {event.time}
                    </div>
                    <h3
                      className="text-xl md:text-2xl text-[#ffedd5] mb-2 tracking-wider drop-shadow-sm"
                      style={{ fontFamily: "'Dune Rise', sans-serif" }}
                    >
                      {event.title}
                    </h3>
                    <p className="text-[#ffedd5]/90 tracking-wide drop-shadow-sm">
                      {event.desc}
                    </p>
                  </div>
                </div>

                {/* Central dot */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-[#ff6600] rounded-full -translate-x-1/2 border-2 border-black drop-shadow-[0_0_15px_rgba(255,102,0,0.9)] z-10" />
              </div>
            ))}
          </div>
        </div>

      </motion.div>

      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/60 pointer-events-none" />
    </div>
  );
}