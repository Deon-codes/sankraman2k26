import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center"
    >
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-dusky-blue rounded-full flex items-center justify-center font-bold text-night-indigo shadow-[0_0_15px_rgba(100,149,237,0.5)]">
          P
        </div>
        <span className="font-bold tracking-widest text-lavender-haze hidden sm:block">PRAKALP 2026</span>
      </div>
      
      <div className="glass-card px-6 py-2 rounded-full flex gap-8 text-sm font-medium text-lavender-haze/80">
        <a href="#hero" className="hover:text-dusky-blue transition-colors">Home</a>
        <a href="#about" className="hover:text-dusky-blue transition-colors">About</a>
        <a href="#events" className="hover:text-dusky-blue transition-colors">Events</a>
        <a href="#timeline" className="hover:text-dusky-blue transition-colors">Timeline</a>
      </div>

      <button className="bg-dusky-blue text-night-indigo px-6 py-2 rounded-full font-bold text-sm hover:bg-lavender-haze transition-all shadow-[0_0_20px_rgba(100,149,237,0.3)] hover:shadow-[0_0_30px_rgba(100,149,237,0.6)]">
        REGISTER
      </button>
    </motion.nav>
  );
}
