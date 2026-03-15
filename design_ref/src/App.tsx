import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Section, GlassCard } from './components/Layout';
import Navbar from './components/Navbar';
import SmoothScroll from './components/SmoothScroll';
import Experience from './components/Experience';
import Cursor from './components/Cursor';
import AnimatedList from './components/AnimatedList';

gsap.registerPlugin(ScrollTrigger);

function Reveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function GlitchOverlay() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "#sankraman",
      start: "top center",
      onEnter: () => setActive(true),
      onLeaveBack: () => setActive(false),
    });
    return () => trigger.kill();
  }, []);

  if (!active) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.2, 0.1, 0.3, 0] }}
      transition={{ duration: 0.5, repeat: Infinity }}
      className="fixed inset-0 z-[100] pointer-events-none bg-dusky-blue/5 mix-blend-overlay"
    />
  );
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero to Challenges Transition
      gsap.to("#hero", {
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        opacity: 0,
        scale: 0.8,
        filter: "blur(20px)"
      });

      // Sankraman Cinematic Moment
      const sankramanTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#sankraman",
          start: "top center",
          end: "bottom center",
          scrub: 1
        }
      });

      sankramanTl
        .fromTo("#sankraman h2", { scale: 0.5, opacity: 0 }, { scale: 1.2, opacity: 1, duration: 1 })
        .to("#sankraman h2", { letterSpacing: "0.5em", opacity: 0.2, duration: 1 });

      // Background Color Shifts
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: "#future",
          start: "top bottom",
          end: "top center",
          scrub: true
        },
        backgroundColor: "#191970" // Midnight Blue
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <div ref={containerRef} className="bg-night-indigo text-lavender-haze selection:bg-dusky-blue selection:text-night-indigo transition-colors duration-1000">
        <Cursor />
        <GlitchOverlay />
        <Navbar />
        
        {/* WebGL Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Experience />
        </div>

        <main className="relative z-10">
          {/* Hero Section */}
          <Section id="hero" className="h-screen">
            <div className="text-center">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-7xl md:text-9xl font-black tracking-tighter glow-text mb-4"
              >
                PRAKALP 2026
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-xl md:text-2xl font-light tracking-[0.3em] text-dusky-blue uppercase"
              >
                Sankraman — Engineering the Transition
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <span className="text-[10px] uppercase tracking-widest opacity-50">Scroll to explore</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-dusky-blue to-transparent" />
            </motion.div>
          </Section>

          {/* Challenges Section */}
          <Section id="challenges" className="bg-transparent">
            <div className="max-w-4xl w-full">
              <Reveal>
                <h2 className="text-4xl md:text-6xl font-bold mb-12 text-lavender-haze">Industrial Challenges</h2>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard delay={0.1}>
                  <h3 className="text-xl font-bold mb-2 text-dusky-blue">Legacy Systems</h3>
                  <p className="text-sm opacity-70 leading-relaxed">Overcoming the limitations of outdated industrial infrastructure through digital integration.</p>
                </GlassCard>
                <GlassCard delay={0.2}>
                  <h3 className="text-xl font-bold mb-2 text-dusky-blue">Resource Scarcity</h3>
                  <p className="text-sm opacity-70 leading-relaxed">Optimizing energy and material usage in an increasingly constrained global environment.</p>
                </GlassCard>
              </div>
            </div>
          </Section>

          {/* Sankraman Transition */}
          <Section id="sankraman" className="bg-transparent h-[200vh]">
            <div className="sticky top-0 h-screen flex flex-col justify-center items-center text-center px-6">
              <h2 className="text-5xl md:text-8xl font-black mb-6 tracking-tight">SANKRAMAN</h2>
              <p className="max-w-2xl text-lg md:text-xl opacity-80 font-light italic">
                "The bridge between the problem and the solution is built with innovation."
              </p>
              <div className="mt-12 w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-dusky-blue to-transparent opacity-30" />
            </div>
          </Section>

          {/* Innovation Tracks Section */}
          <Section id="tracks" className="bg-transparent">
            <div className="max-w-6xl w-full">
              <Reveal>
                <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">Innovation Tracks</h2>
              </Reveal>
              <AnimatedList />
            </div>
          </Section>

          {/* Future Section */}
          <Section id="future" className="bg-transparent">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Reveal>
                  <h2 className="text-4xl md:text-7xl font-bold mb-8">Intelligent Future</h2>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="text-xl opacity-70 mb-12 max-w-2xl">
                    Where AI, robotics, and sustainable engineering converge to create a resilient global ecosystem.
                  </p>
                </Reveal>
                <Reveal delay={0.4}>
                  <div className="flex gap-4">
                    <button className="bg-dusky-blue text-night-indigo px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform text-sm">
                      View Roadmap
                    </button>
                  </div>
                </Reveal>
              </div>
              <div className="space-y-6">
                <GlassCard className="border-dusky-blue/30">
                  <div className="text-3xl font-bold mb-2">01</div>
                  <div className="font-bold uppercase tracking-tighter">AI Integration</div>
                </GlassCard>
                <GlassCard className="border-dusky-blue/30">
                  <div className="text-3xl font-bold mb-2">02</div>
                  <div className="font-bold uppercase tracking-tighter">Green Tech</div>
                </GlassCard>
                <GlassCard className="border-dusky-blue/30">
                  <div className="text-3xl font-bold mb-2">03</div>
                  <div className="font-bold uppercase tracking-tighter">Smart Robotics</div>
                </GlassCard>
              </div>
            </div>
          </Section>

          {/* Timeline Section */}
          <Section id="timeline" className="bg-transparent">
            <div className="max-w-4xl w-full">
              <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">Event Roadmap</h2>
              <div className="relative">
                <div className="absolute left-1/2 -translate-x-1/2 h-full w-[1px] bg-white/10" />
                {[
                  { title: "Idea Phase", desc: "Conceptualizing the transition from industrial challenges." },
                  { title: "Design", desc: "Architecting the technological solutions." },
                  { title: "Development", desc: "Building the intelligent future systems." },
                  { title: "Impact", desc: "Measuring the real-world transformation." }
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-8 mb-12 ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-1">
                      <GlassCard className={i % 2 === 0 ? 'text-right' : 'text-left'}>
                        <h3 className="font-bold text-dusky-blue">{item.title}</h3>
                        <p className="text-sm opacity-60">{item.desc}</p>
                      </GlassCard>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-dusky-blue relative z-10 shadow-[0_0_10px_rgba(100,149,237,1)]" />
                    <div className="flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Sponsors Section */}
          <Section id="sponsors" className="bg-night-indigo/30 min-h-[50vh]">
            <div className="max-w-6xl w-full text-center">
              <h3 className="text-2xl font-bold mb-12 opacity-50 uppercase tracking-[0.3em]">Supported By</h3>
              <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                {['IEEE', 'XCRCE', 'Google', 'Tesla', 'SpaceX'].map((name) => (
                  <div key={name} className="text-3xl font-black tracking-tighter hover:opacity-100 transition-opacity cursor-default">
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Ticket Pricing Section */}
          <Section id="pricing" className="bg-transparent">
            <div className="max-w-6xl w-full">
              <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">Join the Transition</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: "Early Bird", price: "$49", features: ["Full Access", "Workshops", "Digital Certificate"] },
                  { name: "Standard", price: "$99", features: ["Full Access", "Workshops", "Networking Dinner", "Swag Kit"] },
                  { name: "VIP", price: "$199", features: ["Priority Seating", "Speaker Meetup", "Exclusive Workshops", "Premium Swag"] }
                ].map((tier, i) => (
                  <GlassCard key={i} className={`flex flex-col items-center text-center ${i === 1 ? 'border-dusky-blue shadow-[0_0_30px_rgba(100,149,237,0.2)]' : ''}`}>
                    <h3 className="text-xl font-bold mb-4 uppercase tracking-widest">{tier.name}</h3>
                    <div className="text-5xl font-black mb-8 text-dusky-blue">{tier.price}</div>
                    <ul className="space-y-4 mb-10 text-sm opacity-70">
                      {tier.features.map((f, j) => <li key={j}>{f}</li>)}
                    </ul>
                    <button className={`w-full py-3 rounded-full font-bold transition-all ${i === 1 ? 'bg-dusky-blue text-night-indigo' : 'border border-white/20 hover:bg-white/5'}`}>
                      Get Tickets
                    </button>
                  </GlassCard>
                ))}
              </div>
            </div>
          </Section>

          {/* Speakers & Details */}
          <Section id="details" className="bg-night-indigo/50">
            <div className="max-w-7xl w-full">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="space-y-8">
                    <h3 className="text-3xl font-bold border-l-4 border-dusky-blue pl-4">Event Details</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="opacity-50">Date</span>
                        <span>April 15-17, 2026</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="opacity-50">Venue</span>
                        <span>XCRCE Auditorium</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="opacity-50">Location</span>
                        <span>Mumbai, India</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <h3 className="text-3xl font-bold mb-8">Keynote Speakers</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {[1, 2].map((i) => (
                        <GlassCard key={i} className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-dusky-blue to-twilight-purple" />
                          <div>
                            <div className="font-bold">Dr. Sarah Chen</div>
                            <div className="text-xs opacity-50 uppercase tracking-widest">AI Ethics Lead</div>
                          </div>
                        </GlassCard>
                      ))}
                    </div>
                  </div>
               </div>
            </div>
          </Section>

          {/* Footer */}
          <footer className="py-20 px-6 border-t border-white/5 flex flex-col items-center gap-8">
            <div className="text-2xl font-black tracking-tighter glow-text">PRAKALP 2026</div>
            <div className="flex gap-8 opacity-50 text-sm">
              <a href="#" className="hover:text-dusky-blue transition-colors">Twitter</a>
              <a href="#" className="hover:text-dusky-blue transition-colors">Instagram</a>
              <a href="#" className="hover:text-dusky-blue transition-colors">LinkedIn</a>
            </div>
            <p className="text-[10px] opacity-30 uppercase tracking-[0.5em]">© 2026 IEEE XCRCE. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </SmoothScroll>
  );
}
