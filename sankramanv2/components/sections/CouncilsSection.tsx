"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

export default function CouncilsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(section.querySelectorAll("[data-council]"), {
              translateY: [50, 0],
              opacity: [0, 1],
              scale: [0.92, 1],
              rotateX: [8, 0],
              duration: 750,
              delay: stagger(150),
              ease: (t: number) => 1 - Math.pow(1 - t, 3),
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  const councils = [
    { logo: "/logos/wie.png", alt: "WIE", description: "IEEE Women in Engineering empowering women in STEM through mentorship, leadership programs, and community building. WiE CRCE champions diversity and inclusion in engineering." },
    { logo: "/logos/project_cell.png", alt: "Project Cell", description: "The Hub of applied engineering at CRCE. Project Cell drives student innovation from ideation to implementation, nurturing projects that solve real problems and create lasting impact." },
    { logo: "/logos/ieee.png", alt: "IEEE", description: "The world's largest technical professional organization, driving innovation across technology discipline. IEEE CRCE fosters technical excellence and innovation platform." }
  ];

  return (
    <div ref={sectionRef} id="councils" className="relative min-h-screen flex items-center justify-center py-20">

      {/* Blur layer */}
      <div
        className="absolute inset-0 backdrop-blur-xl pointer-events-none"
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
          <div className="text-[0.55rem] md:text-xs font-black tracking-[0.4em] text-[#ff6600] uppercase mb-8 mix-blend-screen opacity-90">
            THE ALLIANCE
          </div>

          <h2
            className="text-3xl sm:text-[4vw] md:text-[3vw] lg:text-[3.5vw] tracking-widest text-[#ffedd5] drop-shadow-[0_0_30px_rgba(255,166,0,0.6)]"
            style={{ fontFamily: "'Dune Rise', sans-serif" }}
          >
            COUNCILS OF POWER
          </h2>
        </div>

        {/* Councils Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {councils.map((council, index) => (
            <div data-council key={index} className="group">
              <div className="relative border border-[#ff6600]/30 bg-black/50 backdrop-blur-md p-8 rounded-lg hover:border-[#ff6600]/60 hover:bg-black/60 transition-all duration-500">

                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#ff6600] opacity-70" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#ff6600] opacity-70" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#ff6600] opacity-70" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#ff6600] opacity-70" />

                {/* Content */}
                <div className="text-center relative z-10">
                  <div className="flex justify-center mb-6">
                    <Image
                      src={council.logo}
                      alt={council.alt}
                      width={150}
                      height={100}
                      className="h-20 sm:h-24 md:h-28 w-auto group-hover:drop-shadow-[0_0_25px_rgba(255,102,0,0.7)] transition-all duration-500"
                    />
                  </div>

                  <p className="text-xs sm:text-sm md:text-base text-[#ffedd5]/90 leading-relaxed tracking-wide drop-shadow-sm">
                    {council.description}
                  </p>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-linear-to-br from-[#ff6600]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg" />

                {/* Subtle inner glow */}
                <div className="absolute inset-0 rounded-lg shadow-inner shadow-[#ff6600]/20 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

      </motion.div>

    </div>
  );
}