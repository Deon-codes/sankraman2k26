'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SmoothScroll from './components/SmoothScroll';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import JourneySection from './components/JourneySection';
import CouncilsSection from './components/CouncilsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

// Dynamically import Three.js canvas to avoid SSR issues
const Experience = dynamic(() => import('./components/Experience'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // ── Subtle section background color shifts ──
      // About section: shift to deep purple
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: '#about',
          start: 'top bottom',
          end: 'top center',
          scrub: 1,
        },
        backgroundColor: '#05000f',
      });

      // Journey section: slightly lighter purple
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: '#journey',
          start: 'top bottom',
          end: 'top center',
          scrub: 1,
        },
        backgroundColor: '#080015',
      });

      // Councils section
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: '#councils',
          start: 'top bottom',
          end: 'top center',
          scrub: 1,
        },
        backgroundColor: '#04000d',
      });

      // ── Section reveal animations ──
      gsap.utils.toArray<HTMLElement>('.section-base').forEach((section) => {
        // Horizontal divider line width animation
        const dividers = section.querySelectorAll<HTMLElement>('.divider');
        dividers.forEach((d) => {
          gsap.fromTo(
            d,
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 1,
              duration: 1.2,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: d,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      });

      // ── Cinematic "SANKRAMAN" zoom when its section enters ──
      const sankramanSection = document.querySelector('#about');
      if (sankramanSection) {
        const title = sankramanSection.querySelector('h2');
        if (title) {
          gsap.fromTo(
            title,
            { letterSpacing: '-0.02em' },
            {
              letterSpacing: '0.04em',
              duration: 1.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: title,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // ── Journey section: stagger phase cards with parallax ──
      gsap.utils.toArray<HTMLElement>('#journey .glass-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: i % 2 === 0 ? -30 : 30 },
          {
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <div
        ref={containerRef}
        className="relative min-h-screen transition-colors duration-700"
        style={{ backgroundColor: '#020008' }}
      >
        {/* Custom cursor */}
        <Cursor />

        {/* Fixed 3D WebGL background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Experience />
        </div>

        {/* Persistent ambient radial glow */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 50% 40% at 50% 0%, rgba(0,229,255,0.03) 0%, transparent 60%),
              radial-gradient(ellipse 40% 30% at 0% 50%, rgba(123,47,190,0.03) 0%, transparent 60%),
              radial-gradient(ellipse 40% 30% at 100% 50%, rgba(30,144,255,0.03) 0%, transparent 60%)
            `,
          }}
        />

        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <main className="relative z-10">
          <HeroSection />

          {/* Divider */}
          <div className="divider" />

          <AboutSection />

          <div className="divider" />

          <JourneySection />

          <div className="divider" />

          <CouncilsSection />

          <div className="divider" />

          <ContactSection />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
