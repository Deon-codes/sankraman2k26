"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ScrollBlurWrapperProps {
  children: React.ReactNode;
  id?: string;
}

export default function ScrollBlurWrapper({ children, id }: ScrollBlurWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "center 50%", "end 20%"],
  });

  // Blur effect: blur more when section is outside viewport
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, 8]);
  
  // Opacity effect: fade in/out on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);
  
  // Scale effect: subtle zoom for depth
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{
        opacity,
        scale,
      }}
      initial={{ opacity: 0.6 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
      className="relative z-10"
    >
      <motion.div
        style={{
          filter: blur as unknown as MotionValue<string>,
        }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
