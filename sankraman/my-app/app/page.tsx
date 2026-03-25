"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress (0 to 1) to translateY offset
  // Starts completely off-screen at the bottom (100vh) and moves up above center (-15vh)
  const textY = useTransform(scrollYProgress, [0, 1], ["100vh", "-15vh"]);

  // Add a slight scale and opacity effect for dramatic entrance
  const textScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      {/* Sticky Hero Section */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Navbar - Styled mimicking the top actor credits on the Dune poster */}
        <nav className="absolute top-0 left-0 w-full z-50 px-8 py-8 md:px-12 flex items-center justify-center pointer-events-auto">
          <div className="w-full max-w-7xl flex justify-between items-center text-[0.55rem] md:text-xs font-black tracking-[0.2em] md:tracking-[0.4em] text-[#1a0a00] uppercase mix-blend-multiply opacity-90">
            <a href="#" className="relative group pb-0.5 inline-block">
              <span className="transition-opacity group-hover:opacity-80">HOME</span>
              <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-[#1a0a00] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>
            <a href="#" className="relative group pb-0.5 inline-block">
              <span className="transition-opacity group-hover:opacity-80">ABOUT</span>
              <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-[#1a0a00] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>
            <a href="#" className="relative group pb-0.5 inline-block">
              <span className="transition-opacity group-hover:opacity-80">JOURNEY</span>
              <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-[#1a0a00] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>
            <a href="#" className="relative group pb-0.5 inline-block">
              <span className="transition-opacity group-hover:opacity-80">COUNCILS</span>
              <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-[#1a0a00] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>
            <a href="#" className="relative group pb-0.5 inline-block">
              <span className="transition-opacity group-hover:opacity-80">CONTACT</span>
              <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-[#1a0a00] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>
            <a href="#" className="relative group pb-0.5 inline-block">
              <span className="transition-opacity group-hover:opacity-80">REGISTER NOW</span>
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#1a0a00]/30"></span>
              <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-[#1a0a00] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>
          </div>
        </nav>

        {/* The Text that will rise up. Placed at z-10 */}
        <div className="absolute inset-0 z-10 w-full flex justify-center items-center pointer-events-none">
          <motion.h1
            style={{
              y: textY,
              scale: textScale,
              opacity: textOpacity,
              fontFamily: "'Dune Rise', sans-serif"
            }}
            className="text-[7vw] md:text-[5vw] lg:text-[6vw] tracking-widest text-[#ffedd5] drop-shadow-[0_0_30px_rgba(255,166,0,0.8)]"
          >
            SANKRAMAN
          </motion.h1>
        </div>

        {/* Foreground Layer (The Dune mask) - pixel-perfect transparent PNG containing only the dune. Placed at z-20 */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
        >
          <img
            src="/fg.png"
            alt="Foreground Dune Mask"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 text-white/50 text-sm tracking-widest animate-pulse pointer-events-none">
          SCROLL DOWN
        </div>

        {/* Bottom Left Partners */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-30 pointer-events-none">
          <div className="text-[0.55rem] md:text-xs font-black tracking-[0.2em] md:tracking-[0.4em] text-[#1a0a00] uppercase mix-blend-multiply opacity-80 whitespace-nowrap">
            WIE × PROJECTCELL × IEEE
          </div>
        </div>
      </div>

    </div>
  );
}
