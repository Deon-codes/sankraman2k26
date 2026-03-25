"use client";

import { motion } from "framer-motion";

interface TransitionSectionProps {
  opacity: any;
  message: string;
}

export default function TransitionSection({ opacity, message }: TransitionSectionProps) {
  return (
    <motion.div 
      style={{ opacity }}
      className="h-screen bg-gradient-to-b from-black/40 to-black/20 flex items-center justify-center"
    >
      <div className="text-center">
        <div className="text-[0.55rem] md:text-xs font-black tracking-[0.4em] text-[#ff6600] uppercase mb-8 mix-blend-screen opacity-90 animate-pulse">
          {message}
        </div>
      </div>
    </motion.div>
  );
}