"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  /** Divider style variant */
  variant?: "wave" | "gradient" | "dust" | "line";
  /** Whether to flip vertically */
  flip?: boolean;
  /** Custom color */
  color?: string;
}

export default function SectionDivider({
  variant = "gradient",
  flip = false,
  color = "#ff6600",
}: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  if (variant === "wave") {
    return (
      <div
        ref={ref}
        className={`relative w-full h-24 overflow-hidden ${flip ? "rotate-180" : ""}`}
      >
        <motion.svg
          style={{ opacity }}
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0.1" />
              <stop offset="50%" stopColor={color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={color} stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,50 C360,100 720,0 1080,50 C1260,75 1380,25 1440,50 L1440,100 L0,100 Z"
            fill="url(#waveGrad)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </motion.svg>
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <motion.div
        ref={ref}
        style={{ opacity, scale }}
        className="relative w-full h-32 pointer-events-none"
      >
        <div
          className={`absolute inset-0 ${flip ? "rotate-180" : ""}`}
          style={{
            background: `linear-gradient(180deg, 
              transparent 0%, 
              ${color}15 30%, 
              ${color}25 50%, 
              ${color}15 70%, 
              transparent 100%)`,
          }}
        />
        {/* Center accent line */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#ff6600] to-transparent"
          initial={{ width: "0%" }}
          whileInView={{ width: "60%" }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </motion.div>
    );
  }

  if (variant === "dust") {
    return (
      <motion.div
        ref={ref}
        style={{ opacity }}
        className={`relative w-full h-20 overflow-hidden ${flip ? "rotate-180" : ""}`}
      >
        {/* Dust particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${5 + (i * 6.5) % 90}%`,
              bottom: "0",
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              background: `rgba(255, ${100 + i * 5}, 0, ${0.3 + (i % 4) * 0.1})`,
              boxShadow: `0 0 ${4 + i % 3}px rgba(255, 100, 0, 0.5)`,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + (i % 3) * 0.5,
              delay: i * 0.15,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>
    );
  }

  // Default: simple line
  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="relative w-full h-16 flex items-center justify-center"
    >
      <motion.div
        className="h-[1px] bg-gradient-to-r from-transparent via-[#ff6600]/50 to-transparent"
        initial={{ width: "0%" }}
        whileInView={{ width: "80%" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </motion.div>
  );
}
