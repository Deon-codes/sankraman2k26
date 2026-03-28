"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { animate, stagger } from "animejs";

export default function JourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Alternate cards from left/right
            const cards = section.querySelectorAll<HTMLElement>("[data-journey-card]");
            cards.forEach((card, i) => {
              const fromX = i % 2 === 0 ? -60 : 60;
              animate(card, {
                translateX: [fromX, 0],
                opacity: [0, 1],
                duration: 700,
                delay: i * 160,
                ease: (t: number) => 1 - Math.pow(1 - t, 3),
              });
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Track scroll within the Timeline block
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Calculate parallax scale for the timeline line. 
  // It starts completely hidden and grows precisely with scroll depth.
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const timelineEvents = [
    { time: "ROUND 1", title: "ONLINE SUBMISSION", desc: "Submit a project PPT (max 7 slides) and a demo video (max 4 minutes). Top teams will be shortlisted for the next phase." },
    { time: "ROUND 2", title: "ON-CAMPUS PRESENTATION", desc: "Present your project with a working model at FR.CRCE. 7 min presentation + 3 min Q&A." },
    { time: "FINAL", title: "EVALUATION PHASE", desc: "Finalists present before expert judges for advanced evaluation. Winners selected based on overall performance." }
  ];

  return (
    <div ref={sectionRef} id="journey" className="relative min-h-screen flex items-center justify-center py-20">

      {/* Blur layer */}
      <div
        className="absolute inset-0 backdrop-blur-lg pointer-events-none"
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'rgba(0,0,0,0.78)',
        }}
      />

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
            EVENT PHASES
          </div>

          <h2
            className="text-[4vw] md:text-[3vw] lg:text-[3.5vw] tracking-widest text-[#ffedd5] drop-shadow-[0_0_30px_rgba(255,166,0,0.6)]"
            style={{ fontFamily: "'Dune Rise', sans-serif" }}
          >
            THE PRAKALP JOURNEY
          </h2>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Central line background */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:w-1 bg-[#ff6600]/20 -translate-x-1/2 rounded-full" />
          
          {/* Active animated progress line */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:w-1 bg-[#ff6600]/70 -translate-x-1/2 origin-top drop-shadow-[0_0_10px_rgba(255,102,0,0.6)] rounded-full z-0" 
          />

          {/* Timeline Events */}
          <div className="space-y-12 md:space-y-16">
            {timelineEvents.map((event, index) => (
              <div data-journey-card key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`w-full pl-10 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:pl-0 md:text-right' : 'md:pl-12'}`}>
                  {/* Event Card with Glassmorphism */}
                  <div className="p-4 md:p-6 rounded-xl bg-black/30 backdrop-blur-sm border border-[#ff6600]/20 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_15px_30px_-10px_rgba(255,102,0,0.4)] transition-all duration-500">
                    <div className="text-xs font-black tracking-[0.3em] text-[#ff6600] uppercase mb-2">
                      {event.time}
                    </div>
                    <h3
                      className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#ffedd5] mb-2 tracking-wider drop-shadow-sm"
                      style={{ fontFamily: "'Dune Rise', sans-serif" }}
                    >
                      {event.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-[#ffedd5]/90 tracking-wide drop-shadow-sm leading-relaxed">
                      {event.desc}
                    </p>
                  </div>
                </div>

                {/* Central dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 md:w-4 md:h-4 bg-[#ff6600] rounded-full -translate-x-1/2 border-2 border-black drop-shadow-[0_0_15px_rgba(255,102,0,0.9)] z-10" />
              </div>
            ))}
          </div>
        </div>

      </motion.div>

    </div>
  );
}