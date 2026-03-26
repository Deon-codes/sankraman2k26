"use client";

import { useEffect, useRef, RefObject } from "react";
import { animate, stagger, AnimationParams } from "animejs";

interface AnimationOptions {
  targets: string;
  opacity?: [number, number];
  translateY?: [number, number];
  translateX?: [number, number];
  scale?: [number, number];
  rotate?: [number, number];
  delay?: ReturnType<typeof stagger> | number;
  duration?: number;
  ease?: string;
  threshold?: number;
}

export function useScrollAnimation<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: AnimationOptions
): void {
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const elements = Array.from(
      container.querySelectorAll<HTMLElement>(options.targets)
    );

    if (elements.length === 0) return;

    // Set initial state
    elements.forEach((el) => {
      el.style.opacity = "0";
      if (options.translateY) {
        el.style.transform = `translateY(${options.translateY[0]}px)`;
      }
      if (options.translateX) {
        el.style.transform = `translateX(${options.translateX[0]}px)`;
      }
      if (options.scale) {
        el.style.transform += ` scale(${options.scale[0]})`;
      }
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          const animationProps: AnimationParams = {
            opacity: options.opacity ?? [0, 1],
            delay: options.delay ?? stagger(100),
            duration: options.duration ?? 600,
            ease: options.ease ?? "outExpo",
          };

          if (options.translateY) {
            animationProps.translateY = options.translateY;
          }
          if (options.translateX) {
            animationProps.translateX = options.translateX;
          }
          if (options.scale) {
            animationProps.scale = options.scale;
          }
          if (options.rotate) {
            animationProps.rotate = options.rotate;
          }

          animate(elements, animationProps);
        }
      },
      { threshold: options.threshold ?? 0.2 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [ref, options]);
}

// Preset animations for common patterns
export const presets = {
  fadeUp: {
    targets: ".animate-item",
    opacity: [0, 1] as [number, number],
    translateY: [40, 0] as [number, number],
    duration: 600,
    ease: "outExpo",
  },
  fadeInScale: {
    targets: ".animate-item",
    opacity: [0, 1] as [number, number],
    scale: [0.9, 1] as [number, number],
    translateY: [30, 0] as [number, number],
    duration: 700,
    ease: "outExpo",
  },
  slideFromLeft: {
    targets: ".animate-item",
    opacity: [0, 1] as [number, number],
    translateX: [-50, 0] as [number, number],
    duration: 600,
    ease: "outExpo",
  },
  slideFromRight: {
    targets: ".animate-item",
    opacity: [0, 1] as [number, number],
    translateX: [50, 0] as [number, number],
    duration: 600,
    ease: "outExpo",
  },
  staggerCards: {
    targets: ".animate-card",
    opacity: [0, 1] as [number, number],
    translateY: [50, 0] as [number, number],
    scale: [0.95, 1] as [number, number],
    delay: stagger(120),
    duration: 700,
    ease: "outExpo",
  },
};
