"use client";

import { motion } from "framer-motion";
import { FaEnvelope, FaInstagram } from "react-icons/fa";
import Image from "next/image";

const contacts = [
  {
    logo: "/logos/ieee.png",
    alt: "IEEExCRCE",
    name: "IEEExCRCE",
    instagram: "https://instagram.com/ieee_crce",
    website: "https://ieee-crce202526.netlify.app/",
    handle: "@ieee_crce",
    email: "ieeece.24@gmail.com",
  },
    {
    logo: "/logos/project_cell.png",
    alt: "Project Cell",
    name: "PROJECT CELL",
    instagram: "https://instagram.com/project_cell.crce",
    website: "https://project-cell-crce.vercel.app/",
    handle: "@project_cell.crce",
    email: "projectcellcrce2024@gmail.com",
  },
  {
    logo: "/logos/wie.png",
    alt: "WIExCRCE",
    name: "WIExCRCE",
    instagram: "https://instagram.com/wie_crce",
    website: "https://wiecrce-website.netlify.app/",
    handle: "@wie_crce",
    email: "wieieee.21@gmail.com",
  },
];

export default function Footer() {
  return (
    <motion.footer
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/60" />
      </div>

      {/* ── Organizer Cards ── */}
      <div className="relative z-10 w-full pt-14 pb-10 px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 w-full">
          {contacts.map((c, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
            >
              {/* Logo */}
              <a 
                href={c.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-16 h-16 mb-3 flex items-center justify-center transition-transform hover:scale-110"
              >
                <Image
                  src={c.logo}
                  alt={c.alt}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </a>

              {/* Display name */}
              <p className="text-[#ffedd5] text-sm font-semibold tracking-widest uppercase mb-4">
                {c.name}
              </p>

              {/* Instagram */}
              <a
                href={c.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#ffedd5]/80 hover:text-[#ff6600] transition-colors text-sm mb-1.5"
              >
                <FaInstagram size={14} className="text-[#ff6600] shrink-0" />
                <span>{c.handle}</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${c.email}`}
                className="flex items-center gap-2 text-[#ffedd5]/60 hover:text-[#ff6600] transition-colors text-xs break-all"
              >
                <FaEnvelope size={12} className="text-[#ff6600] shrink-0" />
                <span>{c.email}</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Giant Brand Text ── */}
      <motion.div
        className="relative z-10 w-full select-none overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
      >
        <h2
          className="font-black leading-none tracking-tight text-[#ffedd5] text-center w-full whitespace-nowrap"
          style={{ fontFamily: "'Dune Rise', sans-serif", fontSize: "clamp(2.5rem, 10vw, 10vw)", lineHeight: "1.2" }}
        >
          Prakalp 4.0
        </h2>
      </motion.div>

      {/* ── Bottom Bar ── */}
      <motion.div
        className="relative z-10 border-t border-[#ff6600]/10 w-full px-6 md:px-10 py-6 flex flex-col sm:grid sm:grid-cols-3 items-center gap-4 text-[10px] text-[#ffedd5]/50 tracking-wide pb-12 sm:pb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        <span className="text-center sm:text-left">© 2026 Sankraman. All Rights Reserved.</span>

        {/* Desktop-only Center item */}
        <span className="hidden sm:block text-center hover:text-[#ff6600] cursor-pointer transition-colors">Prakalp 4.0</span>

        {/* Desktop-only Right item */}
        <span className="hidden sm:block text-right hover:text-[#ff6600] cursor-pointer transition-colors">Privacy Policy</span>

        {/* Mobile-only Bottom and group */}
        <div className="flex sm:hidden gap-6 items-center">
          <span className="hover:text-[#ff6600] cursor-pointer transition-colors">Prakalp 4.0</span>
          <span className="hover:text-[#ff6600] cursor-pointer transition-colors">Privacy Policy</span>
        </div>
      </motion.div>
    </motion.footer>
  );
}