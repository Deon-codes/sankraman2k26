"use client";

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import JourneySection from "@/components/sections/JourneySection";
import CouncilsSection from "@/components/sections/CouncilsSection";
import StatsSection from "@/components/sections/StatsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative">
      
      {/* Hero Section with internal scroll tracking and parallax */}
      <HeroSection />

      {/* Content Sections - Normal document flow below hero */}
      <div className="relative z-20">
        
        {/* About Section */}
        <AboutSection />

        {/* Journey Section */}
        <JourneySection />

        {/* Councils Section */}
        <CouncilsSection />

        {/* Stats Section */}
        <StatsSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />
        
      </div>

    </div>
  );
}
