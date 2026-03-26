"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll specifically for the Hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate parallax offsets. Ending at 0.7 gives a 30% scroll "pause" for the user to enjoy the final frame before the next section appears!
  const textY = useTransform(scrollYProgress, [0, 0.7], ["100vh", "-15vh"]);
  const textScale = useTransform(scrollYProgress, [0, 0.7], [0.8, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7], [0, 1, 1]);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // The HeroSection takes 300vh to finish leaving the screen.
      // The next component (AboutSection) hits the top of the screen at 300vh.
      // Eclipsing the navbar completely around 2.95 innerHeight.
      setIsScrolled(window.scrollY >= window.innerHeight * 2.95);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} id="home" className="relative min-h-[300vh]">
      {/* Sticky inner container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Background Layer: bg.jpg */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="/bg.jpg" alt="Dune Background" className="w-full h-full object-cover" />
        </div>

        {/* Navbar */}
        <nav className={`absolute top-0 left-0 w-full z-50 px-8 py-8 md:px-12 flex items-center justify-center pointer-events-auto transition-all duration-300 ${
          isScrolled ? 'bg-black/60 backdrop-blur-md' : 'bg-transparent'
        }`}>
          <div className={`w-full max-w-7xl flex justify-between items-center text-[0.55rem] md:text-xs font-black tracking-[0.2em] md:tracking-[0.4em] uppercase transition-colors duration-300 ${
            isScrolled ? 'text-[#ffedd5]' : 'text-[#1a0a00]'
          } ${!isScrolled && 'mix-blend-multiply opacity-90'}`}>
            <a href="#home" className="relative group pb-0.5 inline-block">
              <span className="transition-opacity group-hover:opacity-80">PRAKALP 4.0</span>
              <span className={`absolute bottom-0 left-1/2 w-0 h-[1.5px] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full ${
                isScrolled ? 'bg-[#ffedd5]' : 'bg-[#1a0a00]'
              }`}></span>
            </a>
            <a href="#about" className="relative group pb-0.5 inline-block">
              <span className="transition-opacity group-hover:opacity-80">ABOUT</span>
              <span className={`absolute bottom-0 left-1/2 w-0 h-[1.5px] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full ${
                isScrolled ? 'bg-[#ffedd5]' : 'bg-[#1a0a00]'
              }`}></span>
            </a>
            <a href="#journey" className="relative group pb-0.5 inline-block">
              <span className="transition-opacity group-hover:opacity-80">JOURNEY</span>
              <span className={`absolute bottom-0 left-1/2 w-0 h-[1.5px] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full ${
                isScrolled ? 'bg-[#ffedd5]' : 'bg-[#1a0a00]'
              }`}></span>
            </a>
            <a href="#councils" className="relative group pb-0.5 inline-block">
              <span className="transition-opacity group-hover:opacity-80">COUNCILS</span>
              <span className={`absolute bottom-0 left-1/2 w-0 h-[1.5px] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full ${
                isScrolled ? 'bg-[#ffedd5]' : 'bg-[#1a0a00]'
              }`}></span>
            </a>
            <a href="#contact" className="relative group pb-0.5 inline-block">
              <span className="transition-opacity group-hover:opacity-80">CONTACT</span>
              <span className={`absolute bottom-0 left-1/2 w-0 h-[1.5px] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full ${
                isScrolled ? 'bg-[#ffedd5]' : 'bg-[#1a0a00]'
              }`}></span>
            </a>
            <a href="#contact" className="relative group pb-0.5 inline-block">
              <span className="transition-opacity group-hover:opacity-80">REGISTER NOW</span>
              <span className={`absolute bottom-0 left-0 w-full h-[1.5px] ${
                isScrolled ? 'bg-[#ffedd5]/30' : 'bg-[#1a0a00]/30'
              }`}></span>
              <span className={`absolute bottom-0 left-1/2 w-0 h-[1.5px] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full ${
                isScrolled ? 'bg-[#ffedd5]' : 'bg-[#1a0a00]'
              }`}></span>
            </a>
          </div>
        </nav>

        {/* Rising SANKRAMAN Text (z-10) */}
        <div className="absolute inset-0 z-10 w-full flex justify-center items-center pointer-events-none">
          <motion.h1
            style={{ y: textY, scale: textScale, opacity: textOpacity, fontFamily: "'Dune Rise', sans-serif" }}
            className="text-[7vw] md:text-[5vw] lg:text-[6vw] tracking-widest text-[#ffedd5] drop-shadow-[0_0_30px_rgba(255,166,0,0.8)]"
          >
            SANKRAMAN
          </motion.h1>
        </div>

        {/* Foreground Dune Mask (z-20) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <img src="/fg.png" alt="Dune Foreground Mask" className="w-full h-full object-cover" />
        </div>



        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 text-[#ffedd5]/50 text-sm tracking-widest animate-pulse pointer-events-none">
          SCROLL DOWN
        </div>

        {/* Bottom Right Partners */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-30 pointer-events-none">
          <div className={`text-[0.55rem] md:text-xs font-black tracking-[0.2em] md:tracking-[0.4em] uppercase opacity-80 whitespace-nowrap ${
            isScrolled ? 'text-[#ffedd5]' : 'text-[#1a0a00] mix-blend-multiply'
          }`}>
            WIE × PROJECTCELL × IEEE
          </div>
        </div>

      </div>
    </div>
  );
}