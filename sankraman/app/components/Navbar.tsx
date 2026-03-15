'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const navLinks = [
  { label: 'Home',       href: '#hero' },
  { label: 'About',      href: '#about' },
  { label: 'Journey',    href: '#journey' },
  { label: 'Councils',   href: '#councils' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on('change', (y) => setScrolled(y > 40));
    return unsub;
  }, [scrollY]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3'
            : 'py-5 bg-transparent'
        }`}
        style={scrolled ? {
          background: 'rgba(2, 0, 8, 0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
        } : undefined}
      >
        <div className="w-full px-10 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center group shrink-0"
          >
            <div>
              <div className="font-black text-lg tracking-widest text-white leading-none">PRAKALP 4.0</div>
              <div className="text-[11px] tracking-[0.35em] text-[#00E5FF] uppercase mt-0.5">Sankraman</div>
            </div>
          </a>

          {/* Desktop nav links — centered */}
          <div className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full absolute left-1/2 -translate-x-1/2" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-5 py-2 text-sm font-medium text-[#B388FF]/80 hover:text-[#00E5FF] transition-all duration-200 rounded-full hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA — far right */}
          <div className="hidden md:flex items-center shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-2.5 rounded-full font-semibold text-sm bg-white text-[#020008] hover:bg-white/90 transition-colors duration-300 tracking-wide"
            >
              Register Now
            </motion.button>
          </div>

          {/* Mobile CTA + menu toggle */}
          <div className="md:hidden flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-full font-bold text-xs bg-[#E8E8F0] text-[#020008] tracking-wider"
            >
              Register
            </motion.button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-1.5 p-2 z-10"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }}
                className="block w-6 h-0.5 bg-[#00E5FF] rounded"
              />
              <motion.span
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                className="block w-6 h-0.5 bg-[#B388FF] rounded"
              />
              <motion.span
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }}
                className="block w-6 h-0.5 bg-[#00E5FF] rounded"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={{ x: mobileOpen ? 0 : '100%' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-40 md:hidden"
      >
        <div
          className="absolute inset-0 bg-[#020008]/90 backdrop-blur-xl"
          onClick={() => setMobileOpen(false)}
        />
        <div className="absolute right-0 top-0 h-full w-72 glass-card border-l border-white/10 flex flex-col pt-24 px-8 gap-6">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: mobileOpen ? 0 : 40, opacity: mobileOpen ? 1 : 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="text-xl font-semibold text-[#B388FF] hover:text-[#00E5FF] transition-colors border-b border-white/10 pb-4"
            >
              {link.label}
            </motion.a>
          ))}
          <motion.button
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: mobileOpen ? 0 : 40, opacity: mobileOpen ? 1 : 0 }}
            transition={{ duration: 0.3, delay: navLinks.length * 0.06 }}
            className="mt-4 px-6 py-3 rounded-full font-bold bg-[#E8E8F0] text-[#020008] tracking-wider"
          >
            Register Now
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
