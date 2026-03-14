'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

function TrailDot({ mouseX, mouseY, delay }: { mouseX: any; mouseY: any; delay: number }) {
  const x = useSpring(mouseX, { damping: 30 + delay * 80, stiffness: 200 - delay * 40 });
  const y = useSpring(mouseY, { damping: 30 + delay * 80, stiffness: 200 - delay * 40 });

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        width: `${6 - delay * 8}px`,
        height: `${6 - delay * 8}px`,
        opacity: 0.4 - delay * 0.4,
        background: `rgba(0, 229, 255, ${0.4 - delay * 0.35})`,
        boxShadow: `0 0 ${8 - delay * 6}px rgba(0, 229, 255, 0.6)`,
      }}
    />
  );
}

export default function Cursor() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const springConfig = { damping: 22, stiffness: 180 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Don't show custom cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsMobile(true);
      return;
    }

    document.documentElement.style.cursor = 'none';

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        !!(target.closest('a') || target.closest('button') || target.closest('.glass-card'))
      );
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? '48px' : clicking ? '20px' : '36px',
          height: hovering ? '48px' : clicking ? '20px' : '36px',
          borderColor: hovering ? 'rgba(0,229,255,0.8)' : 'rgba(0,229,255,0.4)',
          boxShadow: hovering
            ? '0 0 15px rgba(0,229,255,0.5), inset 0 0 10px rgba(0,229,255,0.1)'
            : '0 0 8px rgba(0,229,255,0.2)',
          backgroundColor: hovering ? 'rgba(0,229,255,0.05)' : 'transparent',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s, box-shadow 0.2s',
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: '5px',
          height: '5px',
          background: '#00E5FF',
          boxShadow: '0 0 8px #00E5FF',
        }}
      />
      {/* Trails */}
      {[0.05, 0.1, 0.15, 0.2, 0.25].map((d, i) => (
        <TrailDot key={i} mouseX={mouseX} mouseY={mouseY} delay={d} />
      ))}
    </>
  );
}
