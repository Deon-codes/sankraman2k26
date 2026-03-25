"use client";

import { useScroll } from "framer-motion";
import { useRef } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import JourneySection from "@/components/sections/JourneySection";
import CouncilsSection from "@/components/sections/CouncilsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress only for SANKRAMAN title animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative">
      
      {/* Hero Section with scroll animation for title only */}
      <HeroSection scrollYProgress={scrollYProgress} />

      {/* Content Sections - Normal document flow below hero */}
      <div className="relative z-20">
        
        {/* About Section */}
        <AboutSection />

        {/* Journey Section */}
        <JourneySection />

        {/* Councils Section */}
        <CouncilsSection />

        {/* Contact Section */}
        <ContactSection />
        
      </div>

    </div>
  );
}
