"use client";

import { motion } from "framer-motion";
import FunnelChart, { FunnelStage } from "@/components/ui/funnel-chart";

const FUNNEL_DATA: FunnelStage[] = [
  {
    label: "Total Registrations",
    value: 5000,
    color: "#ff7b00", // Theme matching colors
  },
  {
    label: "Active Participants",
    value: 3500,
    color: "#e65c00",
  },
  {
    label: "Project Submissions",
    value: 1200,
    color: "#cc3d00",
  },
  {
    label: "Finalists",
    value: 150,
    color: "#b31e00",
  },
];

export default function StatsSection() {
  return (
    <div id="stats" className="relative min-h-[100dvh] flex flex-col items-center justify-center py-24">

      {/* Dark Glassmorphism Background aligned with AboutSection */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/60" />

      {/* Additional overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-[0.55rem] md:text-xs font-black tracking-[0.4em] text-[#ff6600] uppercase mb-8 mix-blend-screen opacity-90"
          >
            IMPACT METRICS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-[4vw] md:text-[3vw] lg:text-[3.5vw] tracking-widest text-[#ffedd5] mb-6 drop-shadow-[0_0_30px_rgba(255,166,0,0.6)]"
            style={{ fontFamily: "'Dune Rise', sans-serif" }}
          >
            THE JOURNEY SO FAR
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-[#ffedd5]/90 leading-relaxed tracking-wide drop-shadow-sm max-w-2xl mx-auto"
          >
            Witness the scale of our impact and the depth of our reach across every dimension of the convergence.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-5xl mx-auto mt-8 relative z-10"
        >
          <FunnelChart
            data={FUNNEL_DATA}
            orientation="vertical"
            labelLayout="grouped"
            labelAlign="center"
          />
        </motion.div>
      </div>
    </div>
  );
}
