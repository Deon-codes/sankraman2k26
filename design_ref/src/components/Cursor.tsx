import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('.glass-card')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-dusky-blue pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'rgba(100, 149, 237, 0.2)' : 'transparent',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-dusky-blue pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Energy Trail - Simplified version using multiple delayed dots */}
      {[...Array(5)].map((_, i) => (
        <TrailDot key={i} mouseX={mouseX} mouseY={mouseY} delay={i * 0.05} />
      ))}
    </>
  );
}

function TrailDot({ mouseX, mouseY, delay }: { mouseX: any, mouseY: any, delay: number }) {
  const x = useSpring(mouseX, { damping: 30 + delay * 100, stiffness: 200 - delay * 50 });
  const y = useSpring(mouseY, { damping: 30 + delay * 100, stiffness: 200 - delay * 50 });

  return (
    <motion.div
      className="fixed top-0 left-0 w-1 h-1 rounded-full bg-dusky-blue/30 pointer-events-none z-[9998]"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        scale: 1 - delay * 2,
      }}
    />
  );
}
