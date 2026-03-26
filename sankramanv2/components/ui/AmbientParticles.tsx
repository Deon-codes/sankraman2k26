"use client";

import { useMemo } from "react";

interface AmbientParticlesProps {
  /** Number of particles to render */
  count?: number;
  /** Base color for particles (will be varied) */
  baseColor?: string;
  /** Whether to show on mobile */
  showOnMobile?: boolean;
}

interface Particle {
  id: number;
  left: string;
  size: number;
  duration: string;
  delay: string;
  opacity: number;
  hue: number;
  drift: number;
  layer: "back" | "mid" | "front";
}

export default function AmbientParticles({
  count = 25,
  showOnMobile = false,
}: AmbientParticlesProps) {
  // Generate particles with varied properties
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const layer = i % 3 === 0 ? "front" : i % 3 === 1 ? "mid" : "back";
      return {
        id: i,
        left: `${2 + ((i * 4.1) % 96)}%`,
        size: layer === "front" ? 1.5 + (i % 3) * 0.8 : layer === "mid" ? 1 + (i % 3) * 0.5 : 0.5 + (i % 3) * 0.3,
        duration: `${8 + (i % 6) * 2}s`,
        delay: `${((i * 0.7) % 8).toFixed(2)}s`,
        opacity: layer === "front" ? 0.4 + (i % 4) * 0.1 : layer === "mid" ? 0.2 + (i % 4) * 0.05 : 0.08 + (i % 4) * 0.02,
        hue: 80 + (i % 10) * 8, // Orange to amber range
        drift: (i % 2 === 0 ? 1 : -1) * (15 + (i % 5) * 8),
        layer,
      };
    });
  }, [count]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[1] overflow-hidden ${
        !showOnMobile ? "hidden md:block" : ""
      }`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            background:
              p.layer === "front"
                ? `rgba(255, ${p.hue}, 0, ${p.opacity})`
                : p.layer === "mid"
                ? `rgba(255, ${p.hue + 30}, 50, ${p.opacity})`
                : `rgba(200, 170, 130, ${p.opacity})`,
            boxShadow:
              p.layer === "front"
                ? `0 0 ${p.size * 4}px rgba(255, ${p.hue}, 0, ${p.opacity * 0.8})`
                : "none",
            animation: `ambientFloat ${p.duration} ${p.delay} infinite ease-in-out`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
