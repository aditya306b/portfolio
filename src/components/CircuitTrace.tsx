"use client";

import { motion, useScroll, useSpring } from "motion/react";

// A trace down the left edge: it fills with the accent colour as you read, like current
// flowing through a board. Only on wide screens, where it fits in the margin.
export function CircuitTrace() {
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const pads = [0.08, 0.28, 0.5, 0.72, 0.92];
  return (
    <div className="pointer-events-none fixed top-14 bottom-0 left-8 z-40 hidden w-4 xl:block" aria-hidden>
      <div className="absolute left-1/2 h-full w-px -translate-x-1/2 bg-blue/30" />
      <motion.div style={{ scaleY: fill }} className="absolute left-1/2 h-full w-0.5 origin-top -translate-x-1/2 bg-accent" />
      {pads.map((p) => (
        <span key={p} style={{ top: `${p * 100}%` }} className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-blue bg-background" />
      ))}
    </div>
  );
}
