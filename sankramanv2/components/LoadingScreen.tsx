"use client";

import { useEffect, useRef, useState } from "react";
import { animate, createTimeline, stagger } from "animejs";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LETTERS = "SANKRAMAN".split("");

// Enhanced multi-layer particle system
const DUST_PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: `dust-${i}`,
  left: `${3 + ((i * 3.2) % 94)}%`,
  size: 1.2 + (i % 3) * 0.6,
  duration: `${3.5 + (i % 5) * 0.8}s`,
  delay: `${((i * 0.28) % 4).toFixed(2)}s`,
  opacity: 0.15 + (i % 4) * 0.05,
  hue: 80 + (i % 8) * 10,
}));

const EMBER_PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: `ember-${i}`,
  left: `${10 + ((i * 7.5) % 80)}%`,
  size: 2 + (i % 3) * 1.2,
  duration: `${2 + (i % 3) * 0.5}s`,
  delay: `${((i * 0.5) % 2.5).toFixed(2)}s`,
  opacity: 0.6 + (i % 3) * 0.15,
}));

const SAND_PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: `sand-${i}`,
  left: `${5 + ((i * 5.3) % 90)}%`,
  size: 0.8 + (i % 4) * 0.4,
  duration: `${4 + (i % 4) * 1}s`,
  delay: `${((i * 0.42) % 3.5).toFixed(2)}s`,
  opacity: 0.08 + (i % 5) * 0.03,
  drift: (i % 2 === 0 ? 1 : -1) * (10 + (i % 3) * 5),
}));

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);
  const [taglineText, setTaglineText] = useState("");
  const fullTagline = "ENGINEERING THE TRANSITION";

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const container = containerRef.current;
    const progress = progressRef.current;
    const topBar = topBarRef.current;
    const bottomBar = bottomBarRef.current;
    if (!container || !progress) return;

    const letterEls = Array.from(
      container.querySelectorAll<HTMLElement>(".ll"),
    );
    const subtitleEl = container.querySelector<HTMLElement>(".ls");
    const partnersEl = container.querySelector<HTMLElement>(".lp");
    const glowEl = container.querySelector<HTMLElement>(".lg");
    const waveEls = Array.from(
      container.querySelectorAll<HTMLElement>(".energy-wave"),
    );

    // ── Set initial states ──────────────────────────────────────────────────
    letterEls.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(36px) scale(0.85)";
      el.style.filter = "blur(8px) brightness(2)";
    });
    if (subtitleEl) {
      subtitleEl.style.opacity = "0";
      subtitleEl.style.transform = "translateY(10px)";
    }
    if (partnersEl) {
      partnersEl.style.opacity = "0";
    }
    if (glowEl) {
      glowEl.style.opacity = "0";
      glowEl.style.transform = "translate(-50%,-50%) scale(0.4)";
    }
    waveEls.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translate(-50%,-50%) scale(0)";
    });

    // ── Exit: cinematic letterbox wipe ──────────────────────────────────────
    const exit = () => {
      if (!topBar || !bottomBar) {
        animate(container, {
          opacity: [1, 0],
          duration: 450,
          ease: "inQuart",
          onComplete,
        });
        return;
      }

      // Fade content out first
      const inner = container.querySelector<HTMLElement>(".l-inner");
      if (inner) {
        animate(inner, {
          opacity: [1, 0],
          scale: [1, 0.96],
          duration: 280,
          ease: "inSine",
        });
      }

      // Then bars close
      setTimeout(() => {
        animate([topBar, bottomBar], {
          scaleY: [0, 1],
          duration: 480,
          ease: "inExpo",
          delay: stagger(40),
          onComplete: () => {
            animate(container, {
              opacity: [1, 0],
              duration: 200,
              ease: "linear",
              onComplete,
            });
          },
        });
      }, 200);
    };

    // ── Main timeline ───────────────────────────────────────────────────────
    const tl = createTimeline({ onComplete: exit });

    // Energy wave pulses out from center
    tl.add(
      waveEls,
      {
        opacity: [0, 0.6, 0],
        scale: [0, 2.5],
        duration: 1200,
        delay: stagger(200),
        ease: "outQuart",
      },
      0,
    );

    // Ambient glow blooms in
    tl.add(glowEl!, {
      opacity: [0, 1],
      scale: [0.4, 1],
      duration: 750,
      ease: "outQuart",
    });

    // Letters stagger in: blur clears, position rises, scale settles
    tl.add(
      letterEls,
      {
        opacity: [0, 1],
        translateY: [36, 0],
        scale: [0.85, 1],
        filter: ["blur(8px) brightness(2.5)", "blur(0px) brightness(1)"],
        delay: stagger(68),
        duration: 620,
        ease: "outExpo",
      },
      180,
    );

    // Glitch brightness flash after landing
    tl.add(
      letterEls,
      {
        filter: [
          "brightness(1)",
          "brightness(3.5)",
          "brightness(0.8)",
          "brightness(1)",
        ],
        delay: stagger(32),
        duration: 420,
        ease: "inOutSine",
      },
      "-=180",
    );

    // Progress bar fills with slight overshoot feel
    tl.add(
      progress,
      {
        width: ["0%", "100%"],
        duration: 1350,
        ease: "outQuart",
      },
      460,
    );

    // Typewriter effect for tagline - starts at 940ms
    const typewriterDelay = 940;
    setTimeout(() => {
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i <= fullTagline.length) {
          setTaglineText(fullTagline.slice(0, i));
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 35);
    }, typewriterDelay);

    // PRAKALP 4.0 subtitle
    tl.add(
      subtitleEl!,
      {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 380,
        ease: "outSine",
      },
      1340,
    );

    // Partners line
    tl.add(
      partnersEl!,
      {
        opacity: [0, 0.65],
        duration: 340,
        ease: "outSine",
      },
      1540,
    );

    // Second wave pulse for emphasis
    tl.add(
      waveEls,
      {
        opacity: [0, 0.3, 0],
        scale: [0.5, 3],
        duration: 800,
        delay: stagger(150),
        ease: "outQuart",
      },
      1600,
    );

    // Hold before exit
    tl.add({ duration: 800 });

    return () => {
      tl.pause();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#030200] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* ── Cinematic exit bars ──────────────────────────────────────────── */}
      <div
        ref={topBarRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#030200] z-[60] pointer-events-none origin-top"
        style={{ transform: "scaleY(0)" }}
      />
      <div
        ref={bottomBarRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#030200] z-[60] pointer-events-none origin-bottom"
        style={{ transform: "scaleY(0)" }}
      />

      {/* ── Scanlines overlay ────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.018) 2px, rgba(255,255,255,0.018) 4px)",
          animation: "scanlinePulse 3s ease-in-out infinite",
        }}
      />

      {/* ── Film grain overlay ───────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          animation: "grainShift 0.5s steps(10) infinite",
        }}
      />

      {/* ── Vignette ─────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* ── Energy waves ─────────────────────────────────────────────────── */}
      <div
        className="energy-wave absolute top-1/2 left-1/2 pointer-events-none z-[7]"
        style={{
          width: "min(40vw, 300px)",
          height: "min(40vw, 300px)",
          borderRadius: "50%",
          border: "2px solid rgba(255,102,0,0.4)",
          boxShadow: "0 0 30px rgba(255,102,0,0.3), inset 0 0 30px rgba(255,102,0,0.2)",
          opacity: 0,
          transform: "translate(-50%,-50%) scale(0)",
        }}
      />
      <div
        className="energy-wave absolute top-1/2 left-1/2 pointer-events-none z-[7]"
        style={{
          width: "min(35vw, 260px)",
          height: "min(35vw, 260px)",
          borderRadius: "50%",
          border: "1px solid rgba(255,170,0,0.3)",
          boxShadow: "0 0 20px rgba(255,170,0,0.2)",
          opacity: 0,
          transform: "translate(-50%,-50%) scale(0)",
        }}
      />
      <div
        className="energy-wave absolute top-1/2 left-1/2 pointer-events-none z-[7]"
        style={{
          width: "min(45vw, 340px)",
          height: "min(45vw, 340px)",
          borderRadius: "50%",
          border: "1px solid rgba(255,80,0,0.2)",
          opacity: 0,
          transform: "translate(-50%,-50%) scale(0)",
        }}
      />

      {/* ── Dust particles (background layer) ────────────────────────────── */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
        {DUST_PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute bottom-0 rounded-full"
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: `rgba(255, ${p.hue}, 0, ${p.opacity})`,
              animation: `floatUp ${p.duration} ${p.delay} infinite ease-in`,
              boxShadow: `0 0 ${p.size * 1.5}px rgba(255,${p.hue},0,0.4)`,
            }}
          />
        ))}
      </div>

      {/* ── Sand particles (mid layer with horizontal drift) ─────────────── */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
        {SAND_PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute bottom-0 rounded-full"
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: `rgba(210, 180, 140, ${p.opacity})`,
              animation: `floatUpDrift ${p.duration} ${p.delay} infinite ease-in-out`,
              ["--drift" as string]: `${p.drift}px`,
            }}
          />
        ))}
      </div>

      {/* ── Ember particles (foreground glowing) ─────────────────────────── */}
      <div className="absolute inset-0 z-[8] pointer-events-none overflow-hidden">
        {EMBER_PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute bottom-0 rounded-full"
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: `rgba(255, 140, 0, ${p.opacity})`,
              animation: `floatUpEmber ${p.duration} ${p.delay} infinite ease-out`,
              boxShadow: `0 0 ${p.size * 3}px rgba(255,100,0,0.8), 0 0 ${p.size * 6}px rgba(255,60,0,0.4)`,
            }}
          />
        ))}
      </div>

      {/* ── Ambient glow ─────────────────────────────────────────────────── */}
      <div
        className="lg absolute top-1/2 left-1/2 pointer-events-none z-[6]"
        style={{
          width: "min(68vw, 400px)",
          height: "min(48vh, 300px)",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(255,102,0,0.18) 0%, rgba(255,60,0,0.06) 55%, transparent 75%)",
          filter: "blur(48px)",
          transform: "translate(-50%,-50%) scale(0.4)",
          animation: "glowPulse 3.5s ease-in-out infinite 2s",
        }}
      />

      {/* ── Inner content (fades out on exit) ────────────────────────────── */}
      <div className="l-inner relative z-10 flex flex-col items-center">
        {/* SANKRAMAN letters */}
        <div
          className="flex items-end mb-3"
          style={{ gap: "clamp(1px, 0.35vw, 5px)" }}
        >
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              className="ll leading-none"
              style={{
                fontFamily: "'Dune Rise', sans-serif",
                fontSize: "clamp(1.8rem, 7vw, 5rem)",
                color: "#ffedd5",
                filter: "drop-shadow(0 0 18px rgba(255,140,0,0.65))",
                display: "inline-block",
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Tagline with typewriter effect */}
        <div
          className="lt mb-8 text-center h-6"
          style={{
            fontSize: "clamp(0.45rem, 1.1vw, 0.65rem)",
            fontWeight: 900,
            letterSpacing: "0.52em",
            color: "rgba(255,102,0,0.65)",
            textTransform: "uppercase",
          }}
        >
          {taglineText}
          <span 
            className="inline-block w-[2px] h-[1em] bg-[#ff6600] ml-1 align-middle"
            style={{
              animation: taglineText.length < fullTagline.length ? "cursorBlink 0.6s infinite" : "none",
              opacity: taglineText.length < fullTagline.length ? 1 : 0,
            }}
          />
        </div>

        {/* Progress bar */}
        <div
          className="relative overflow-hidden mb-7"
          style={{
            width: "clamp(160px, 24vw, 280px)",
            height: "2px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "999px",
          }}
        >
          <div
            ref={progressRef}
            className="loading-progress-shine absolute left-0 top-0 h-full rounded-full"
            style={{
              width: "0%",
              background:
                "linear-gradient(90deg, #ff3300 0%, #ff7700 45%, #ffaa00 100%)",
              boxShadow:
                "0 0 10px rgba(255,102,0,0.9), 0 0 28px rgba(255,80,0,0.45)",
            }}
          />
        </div>

        {/* PRAKALP 4.0 */}
        <div
          className="ls mb-2 text-center"
          style={{
            fontSize: "clamp(0.55rem, 1.3vw, 0.75rem)",
            fontWeight: 900,
            letterSpacing: "0.48em",
            color: "#ff6600",
            textTransform: "uppercase",
          }}
        >
          PRAKALP 4.0
        </div>

        {/* Partners */}
        <div
          className="lp text-center"
          style={{
            fontSize: "clamp(0.48rem, 1.1vw, 0.65rem)",
            fontWeight: 700,
            letterSpacing: "0.36em",
            color: "rgba(255,237,213,0.55)",
            textTransform: "uppercase",
          }}
        >
          WIE &times; PROJECT CELL &times; IEEE
        </div>
      </div>
    </div>
  );
}
