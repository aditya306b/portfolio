"use client";

import { motion, useScroll, useSpring } from "motion/react";

// Thin bar under the header that fills as you read a note.
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-14 z-50 h-0.5 origin-left bg-accent" aria-hidden />;
}
