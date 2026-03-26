"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import JourneySection from "@/components/sections/JourneySection";
import CouncilsSection from "@/components/sections/CouncilsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import AmbientParticles from "@/components/ui/AmbientParticles";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Ambient floating particles across the site */}
      {!loading && <AmbientParticles count={20} />}

      {/* Hero Section with internal scroll tracking and parallax */}
      <HeroSection />

      {/* Content Sections - Normal document flow below hero */}
      <div className="relative z-20 overflow-x-hidden w-full">

        {/* About Section */}
        <AboutSection />

        {/* Journey Section */}
        <JourneySection />

        {/* Councils Section */}
        <CouncilsSection />

        {/* Info & Selection Section */}


        {/* Contact/CTA Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
}
