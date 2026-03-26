"use client";

import { useEffect, useRef } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789▓▒░█";

interface ScrambleTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  /** IntersectionObserver threshold (0–1). Default 0.3 */
  threshold?: number;
  /** Milliseconds per scramble frame. Default 38 */
  speed?: number;
  /** Frames each character scrambles before resolving. Default 6 */
  framesPerChar?: number;
}

export default function ScrambleText({
  text,
  className,
  style,
  tag = "span",
  threshold = 0.3,
  speed = 38,
  framesPerChar = 6,
}: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null);
  const hasRun = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = text.split("");

    /** Index at which character i stops scrambling and shows its real value */
    const settleFrame = (i: number) => i * framesPerChar + framesPerChar * 2;
    const totalFrames = settleFrame(chars.length - 1) + framesPerChar + 4;

    const runScramble = () => {
      if (hasRun.current) return;
      hasRun.current = true;

      let frame = 0;

      intervalRef.current = setInterval(() => {
        const result = chars
          .map((char, i) => {
            // Always preserve spaces and punctuation (non-alpha-numeric)
            if (!/[A-Za-z0-9]/.test(char)) return char;
            if (frame >= settleFrame(i)) return char;
            return SCRAMBLE_CHARS[
              Math.floor(Math.random() * SCRAMBLE_CHARS.length)
            ];
          })
          .join("");

        if (el) el.textContent = result;

        frame++;

        if (frame >= totalFrames) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          if (el) el.textContent = text;
        }
      }, speed);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runScramble();
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, threshold, speed, framesPerChar]);

  // Cast to h1 so TypeScript accepts the ref without complaints –
  // the actual DOM tag is controlled by `tag` at runtime.
  const Tag = tag as "h1";

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={`scramble-text${className ? ` ${className}` : ""}`}
      style={style}
    >
      {text}
    </Tag>
  );
}
