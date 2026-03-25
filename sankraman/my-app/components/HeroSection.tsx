"use client";

import { motion, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface HeroSectionProps {
  scrollYProgress: any;
}

export default function HeroSection({ scrollYProgress }: HeroSectionProps) {
  // Track scroll to show/hide navbar background
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // No title animation - static display
  // No animations - keep SANKRAMAN in final position

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Navbar - Background appears on scroll */}
      <nav className={`fixed top-0 left-0 w-full z-50 px-8 py-8 md:px-12 flex items-center justify-center pointer-events-auto transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-sm' 
          : 'bg-transparent'
      }`}>
        <div className={`w-full max-w-7xl flex justify-between items-center text-[0.55rem] md:text-xs font-black tracking-[0.2em] md:tracking-[0.4em] uppercase transition-colors duration-300 ${
          isScrolled ? 'text-white' : 'text-black'
        }`}>
          <a href="#home" className="relative group pb-0.5 inline-block">
            <span className="transition-opacity group-hover:opacity-80">PRAKALP 4.0</span>
            <span className={`absolute bottom-0 left-1/2 w-0 h-[1.5px] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full ${
              isScrolled ? 'bg-white' : 'bg-black'
            }`}></span>
          </a>
          <a href="#about" className="relative group pb-0.5 inline-block">
            <span className="transition-opacity group-hover:opacity-80">ABOUT</span>
            <span className={`absolute bottom-0 left-1/2 w-0 h-[1.5px] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full ${
              isScrolled ? 'bg-white' : 'bg-black'
            }`}></span>
          </a>
          <a href="#journey" className="relative group pb-0.5 inline-block">
            <span className="transition-opacity group-hover:opacity-80">JOURNEY</span>
            <span className={`absolute bottom-0 left-1/2 w-0 h-[1.5px] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full ${
              isScrolled ? 'bg-white' : 'bg-black'
            }`}></span>
          </a>
          <a href="#councils" className="relative group pb-0.5 inline-block">
            <span className="transition-opacity group-hover:opacity-80">COUNCILS</span>
            <span className={`absolute bottom-0 left-1/2 w-0 h-[1.5px] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full ${
              isScrolled ? 'bg-white' : 'bg-black'
            }`}></span>
          </a>
          <a href="#contact" className="relative group pb-0.5 inline-block">
            <span className="transition-opacity group-hover:opacity-80">CONTACT</span>
            <span className={`absolute bottom-0 left-1/2 w-0 h-[1.5px] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full ${
              isScrolled ? 'bg-white' : 'bg-black'
            }`}></span>
          </a>
          <a href="#contact" className="relative group pb-0.5 inline-block">
            <span className="transition-opacity group-hover:opacity-80">REGISTER NOW</span>
            <span className={`absolute bottom-0 left-0 w-full h-[1.5px] ${
              isScrolled ? 'bg-white/30' : 'bg-black/30'
            }`}></span>
            <span className={`absolute bottom-0 left-1/2 w-0 h-[1.5px] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full ${
              isScrolled ? 'bg-white' : 'bg-black'
            }`}></span>
          </a>
        </div>
      </nav>

      {/* The SANKRAMAN title - Positioned lower */}
      <div className="absolute inset-0 z-10 w-full flex justify-center items-start pt-40 md:pt-48 pointer-events-none">
        <h1
          className="text-[7vw] md:text-[5vw] lg:text-[6vw] tracking-widest text-[#ffedd5] drop-shadow-[0_0_30px_rgba(255,166,0,0.8)]"
          style={{ fontFamily: "'Dune Rise', sans-serif" }}
        >
          SANKRAMAN
        </h1>
      </div>

      {/* Foreground dune image removed */}

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
  );
}