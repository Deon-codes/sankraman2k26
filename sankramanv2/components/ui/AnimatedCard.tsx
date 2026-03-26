"use client";

import { useRef, useEffect, ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  /** Enable 3D tilt effect on hover */
  tiltEffect?: boolean;
  /** Enable mouse-following glow */
  glowEffect?: boolean;
  /** Glow color */
  glowColor?: string;
  /** Additional styles */
  style?: React.CSSProperties;
}

export default function AnimatedCard({
  children,
  className = "",
  tiltEffect = true,
  glowEffect = true,
  glowColor = "rgba(255, 102, 0, 0.35)",
  style,
}: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let glowEl: HTMLDivElement | null = null;

    // Create glow element if enabled
    if (glowEffect) {
      glowEl = document.createElement("div");
      glowEl.style.cssText = `
        position: absolute;
        width: 180px;
        height: 180px;
        background: radial-gradient(circle, ${glowColor} 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 0;
      `;
      glowRef.current = glowEl;
      card.style.overflow = "hidden";
      card.insertBefore(glowEl, card.firstChild);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Update glow position
      if (glowEl) {
        glowEl.style.opacity = "1";
        glowEl.style.left = `${x}px`;
        glowEl.style.top = `${y}px`;
      }

      // Apply tilt effect
      if (tiltEffect) {
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      }
    };

    const handleMouseLeave = () => {
      if (glowEl) {
        glowEl.style.opacity = "0";
      }
      if (tiltEffect) {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      if (glowEl && glowEl.parentNode) {
        glowEl.parentNode.removeChild(glowEl);
      }
    };
  }, [tiltEffect, glowEffect, glowColor]);

  return (
    <div
      ref={cardRef}
      className={`relative transition-transform duration-300 ease-out ${className}`}
      style={{
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      {/* Content wrapper to stay above glow */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
