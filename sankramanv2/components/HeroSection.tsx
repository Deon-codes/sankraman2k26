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

  // Calculate parallax offsets. Ending at 0.4 gives a more responsive feel while still allowing a brief pause.
  const textY = useTransform(scrollYProgress, [0, 0.2], ["100vh", "-15vh"]);
  const textScale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.05, 0.2], [0, 1, 1]);
  const heroOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // The HeroSection takes 200vh to finish leaving the screen.
      // The next component (AboutSection) hits the top of the screen at 200vh.
      // Eclipsing the navbar completely around 1.95 innerHeight.
      setIsScrolled(window.scrollY >= window.innerHeight * 1.5);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} id="home" className="relative min-h-[200vh]">
      {/* Sticky inner container */}
      <motion.div style={{ opacity: heroOpacity }} className="sticky top-0 h-screen w-full">

        {/* Background Layer: bg.jpg */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="/bg.jpg" alt="Dune Background" className="w-full h-full object-cover" />
        </div>

        {/* Navbar */}
        <nav className={`absolute top-0 left-0 w-full z-50 px-8 py-8 md:px-12 flex items-center justify-center pointer-events-auto transition-all duration-300 ${isScrolled ? 'bg-black/60 backdrop-blur-md' : 'bg-transparent'
          }`}>
          <div className={`w-full max-w-7xl flex justify-between items-center text-xs font-black tracking-[0.4em] uppercase transition-colors duration-300 ${isScrolled ? 'text-[#ffedd5]' : 'text-[#1a0a00]'
            } ${!isScrolled && 'mix-blend-multiply opacity-90'}`}>

            {/* All Elements Equally Spaced */}
            <div className="hidden md:flex w-full justify-between items-center">
              <a href="#home" className="relative group pb-0.5 inline-block flex-1 text-center">
                <span className="transition-opacity group-hover:opacity-80">PRAKALP 4.0</span>
                <span className={`absolute bottom-0 left-1/2 w-0 h-[1.5px] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full ${isScrolled ? 'bg-[#ffedd5]' : 'bg-[#1a0a00]'
                  }`}></span>
              </a>

              <a href="#about" className="relative group pb-0.5 inline-block flex-1 text-center">
                <span className="transition-opacity group-hover:opacity-80">ABOUT</span>
                <span className={`absolute bottom-0 left-1/2 w-0 h-[1.5px] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full ${isScrolled ? 'bg-[#ffedd5]' : 'bg-[#1a0a00]'
                  }`}></span>
              </a>

              <a href="#journey" className="relative group pb-0.5 inline-block flex-1 text-center">
                <span className="transition-opacity group-hover:opacity-80">JOURNEY</span>
                <span className={`absolute bottom-0 left-1/2 w-0 h-[1.5px] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full ${isScrolled ? 'bg-[#ffedd5]' : 'bg-[#1a0a00]'
                  }`}></span>
              </a>

              <a href="#councils" className="relative group pb-0.5 inline-block flex-1 text-center">
                <span className="transition-opacity group-hover:opacity-80">COUNCILS</span>
                <span className={`absolute bottom-0 left-1/2 w-0 h-[1.5px] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full ${isScrolled ? 'bg-[#ffedd5]' : 'bg-[#1a0a00]'
                  }`}></span>
              </a>

              <a href="#contact" className="relative group pb-0.5 inline-block flex-1 text-center">
                <span className="transition-opacity group-hover:opacity-80">CONTACT</span>
                <span className={`absolute bottom-0 left-1/2 w-0 h-[1.5px] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full ${isScrolled ? 'bg-[#ffedd5]' : 'bg-[#1a0a00]'
                  }`}></span>
              </a>

              <a href="https://unstop.com/p/prakalp-40-fr-conceicao-rodrigues-college-of-engineering-frcrce-bandra-1660364?utm_medium=Share&utm_source=chrqwgfb39910&utm_campaign=Online_coding_challenge" target="_blank" rel="noopener noreferrer" className="relative group pb-0.5 inline-block flex-1 text-center">
                <span className="transition-opacity group-hover:opacity-80">REGISTER NOW</span>
                <span className={`absolute bottom-0 left-0 w-full h-[1.5px] ${isScrolled ? 'bg-[#ffedd5]/30' : 'bg-[#1a0a00]/30'
                  }`}></span>
                <span className={`absolute bottom-0 left-1/2 w-0 h-[1.5px] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full ${isScrolled ? 'bg-[#ffedd5]' : 'bg-[#1a0a00]'
                  }`}></span>
              </a>
            </div>

            <div className="md:hidden w-full flex items-center justify-between">
              <a
                href="#home"
                style={{ fontFamily: "'Dune Rise', sans-serif" }}
                className="text-sm tracking-[0.12em] text-black"
              >
                Prakalp 4.0
              </a>

              {/* Mobile Hamburger Icon */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex flex-col justify-center items-center w-8 h-8 z-60"
                aria-label="Toggle menu"
              >
                <span className={`bg-current h-0.5 w-6 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5 bg-[#ffedd5]!' : ''}`}></span>
                <span className={`bg-current h-0.5 w-6 rounded-full transition-all duration-300 my-1 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-current h-0.5 w-6 rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5 bg-[#ffedd5]!' : ''}`}></span>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-55 flex flex-col items-center justify-center transition-all duration-500 ease-in-out pointer-events-auto ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}>
          {/* Close Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-8 right-8 text-[#ffedd5] hover:text-[#ff6600] transition-colors duration-200 text-3xl leading-none"
            aria-label="Close menu"
          >
            ✕
          </button>
          <div className="flex flex-col gap-10 text-center text-lg font-black tracking-[0.4em] uppercase text-[#ffedd5]">
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#ff6600] transition-colors">ABOUT</a>
            <a href="#journey" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#ff6600] transition-colors">JOURNEY</a>
            <a href="#councils" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#ff6600] transition-colors">COUNCILS</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#ff6600] transition-colors">CONTACT</a>
            <a href="https://unstop.com/p/prakalp-40-fr-conceicao-rodrigues-college-of-engineering-frcrce-bandra-1660364?utm_medium=Share&utm_source=chrqwgfb39910&utm_campaign=Online_coding_challenge" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="text-[#ff6600] hover:text-[#ffaa00] transition-colors mt-4">REGISTER NOW</a>
          </div>
        </div>

        {/* Rising SANKRAMAN Text (z-10) */}
        <div className="absolute inset-0 z-10 w-full flex flex-col justify-center items-center pointer-events-none px-6 text-center">
          <motion.div
            style={{ y: textY, scale: textScale, opacity: textOpacity }}
            className="flex flex-col items-center max-w-4xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                fontFamily: "'Dune Rise', sans-serif",

              }}
              className="text-[8vw] md:text-[6vw] lg:text-[7vw] tracking-widest font-black text-[#ffedd5] mb-2 leading-tight"
            >
              SANKRAMAN
            </motion.h1>
          </motion.div>
        </div>

        {/* Foreground Dune Mask (z-20) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <img src="/fg.png" alt="Dune Foreground Mask" className="w-full h-full object-cover" />
        </div>





        {/* Bottom Center Partners */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:bottom-12 z-30 pointer-events-none">
          <div className="text-xs font-black tracking-[0.4em] uppercase opacity-90 whitespace-nowrap text-white">
            WIE x PROJECT CELL × IEEE
          </div>
        </div>

      </motion.div>
    </div>
  );
}