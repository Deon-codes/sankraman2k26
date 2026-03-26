"use client";

import { motion } from "framer-motion";

export default function CouncilsSection() {
  const councils = [
    { name: "WIE", fullName: "Women in Engineering", description: "IEEE Women in Engineering — empowering women in STEM through mentorship, leadership programs, and community building. WiE CRCE champions diversity and inclusion in engineering." },
    { name: "PCELL", fullName: "Project Cell", description: "The hub of applied engineering at CRCE. Project Cell drives student innovation from ideation to implementation, nurturing projects that solve real problems and create lasting impact." },
    { name: "IEEE", fullName: "Institute of Electrical & Electronics Engineers", description: "The world's largest technical professional organization, driving innovation across technology disciplines. IEEE CRCE fosters technical excellence." }
  ];

  return (
    <div id="councils" className="relative min-h-screen flex items-center justify-center py-20">

      {/* Dark Glassmorphism Background */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/35 to-black/65" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-6xl mx-auto px-8 md:px-12"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="text-[0.55rem] md:text-xs font-black tracking-[0.4em] text-[#ff6600] uppercase mb-8 mix-blend-screen opacity-90">
            THE ALLIANCE
          </div>

          <h2
            className="text-3xl sm:text-[4vw] md:text-[3vw] lg:text-[3.5vw] tracking-widest text-[#ffedd5] drop-shadow-[0_0_30px_rgba(255,166,0,0.6)]"
            style={{ fontFamily: "'Dune Rise', sans-serif" }}
          >
            COUNCILS OF POWER
          </h2>
        </div>

        {/* Councils Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {councils.map((council, index) => (
            <div key={index} className="group">
              <div className="relative border border-[#ff6600]/30 bg-black/50 backdrop-blur-md p-8 rounded-lg hover:border-[#ff6600]/60 hover:bg-black/60 transition-all duration-500">

                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#ff6600] opacity-70" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#ff6600] opacity-70" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#ff6600] opacity-70" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#ff6600] opacity-70" />

                {/* Content */}
                <div className="text-center relative z-10">
                  <h3
                    className="text-2xl md:text-3xl text-[#ff6600] mb-3 tracking-wider group-hover:text-[#ffaa00] transition-colors drop-shadow-[0_0_25px_rgba(255,102,0,0.7)]"
                    style={{ fontFamily: "'Dune Rise', sans-serif" }}
                  >
                    {council.name}
                  </h3>

                  <div className="text-[0.6rem] md:text-xs font-black tracking-[0.2em] text-[#ffedd5]/80 uppercase mb-4 drop-shadow-sm">
                    {council.fullName}
                  </div>

                  <p className="text-[#ffedd5]/90 leading-relaxed tracking-wide drop-shadow-sm">
                    {council.description}
                  </p>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff6600]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg" />

                {/* Subtle inner glow */}
                <div className="absolute inset-0 rounded-lg shadow-inner shadow-[#ff6600]/20 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50 pointer-events-none" />
    </div>
  );
}