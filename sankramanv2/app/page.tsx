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

const CRITICAL_IMAGES = [
  "/bg.jpg",
  "/logos/wie.png",
  "/logos/project_cell.png",
  "/logos/ieee.png",
  "/public5/ezgif-frame-001.jpg",
];

function preloadImages(srcs: string[]): Promise<void> {
  return Promise.all(
    srcs.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        }),
    ),
  ).then(() => undefined);
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [imagesReady] = useState<Promise<void>>(() =>
    preloadImages(CRITICAL_IMAGES),
  );

  return (
    <div className="relative">
      {loading && (
        <LoadingScreen
          onComplete={() => setLoading(false)}
          imagesReady={imagesReady}
        />
      )}

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
