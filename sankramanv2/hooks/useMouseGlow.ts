"use client";

import { useEffect, useRef, RefObject, useCallback } from "react";

interface MouseGlowOptions {
  /** Glow color */
  color?: string;
  /** Glow size in pixels */
  size?: number;
  /** Glow opacity (0-1) */
  opacity?: number;
  /** Whether the glow should follow the mouse inside the element */
  followMouse?: boolean;
}

export function useMouseGlow<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: MouseGlowOptions = {}
): void {
  const {
    color = "rgba(255, 102, 0, 0.4)",
    size = 150,
    opacity = 0.6,
    followMouse = true,
  } = options;

  const glowRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      const glow = glowRef.current;
      if (!el || !glow) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      glow.style.opacity = String(opacity);
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
    },
    [ref, opacity]
  );

  const handleMouseLeave = useCallback(() => {
    const glow = glowRef.current;
    if (glow) {
      glow.style.opacity = "0";
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !followMouse) return;

    // Create glow element
    const glow = document.createElement("div");
    glow.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, ${color} 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 0;
    `;
    glowRef.current = glow;

    // Ensure parent has relative positioning
    const computedStyle = window.getComputedStyle(el);
    if (computedStyle.position === "static") {
      el.style.position = "relative";
    }
    el.style.overflow = "hidden";

    el.appendChild(glow);

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      if (glow.parentNode) {
        glow.parentNode.removeChild(glow);
      }
    };
  }, [ref, color, size, opacity, followMouse, handleMouseMove, handleMouseLeave]);
}

// Simplified version that adds a CSS class-based glow
export function useSimpleGlow<T extends HTMLElement>(
  ref: RefObject<T | null>
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseEnter = () => {
      el.classList.add("card-glow");
    };

    const handleMouseLeave = () => {
      el.classList.remove("card-glow");
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref]);
}
