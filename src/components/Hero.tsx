"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { profile } from "@/content/data";
import { SystemDiagram } from "./SystemDiagram";

// Three layers move at different speeds as you scroll: grid, diagram, text.
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const grid = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const text = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const diagram = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-border">
      <motion.svg
        style={{ y: grid }}
        className="absolute -right-40 -top-10 h-[640px] w-[640px] text-blue/25"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.4"
        strokeDasharray="1.5 1.5"
        aria-hidden
      >
        <circle cx="100" cy="100" r="95" />
        <circle cx="100" cy="100" r="70" />
        <circle cx="100" cy="100" r="45" />
        <path d="M0 100H200M100 0V200" strokeDasharray="none" />
      </motion.svg>
      <div className="relative mx-auto max-w-5xl px-6 pt-20 pb-10 sm:pt-28">
        <motion.div style={{ y: text }}>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {profile.role} · {profile.company}
          </p>
          <h1 className="mt-4 text-5xl leading-[1.05] font-bold tracking-tight sm:text-7xl">
            Software that
            <br />
            <span className="relative inline-block text-accent">holds up<span className="cursor text-blue">_</span></span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{profile.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <Link href="/projects" className="rounded bg-accent px-5 py-2.5 font-medium text-background">
              Read the specs
            </Link>
            <Link href="/notes" className="rounded border border-border bg-card px-5 py-2.5 font-medium hover:border-accent">
              Engineering notes
            </Link>
          </div>
        </motion.div>
        <motion.div style={{ y: diagram }} className="mt-14 rounded-lg border border-border bg-card/70 p-4">
          <p className="mb-1 font-mono text-xs text-muted">fig. 1: how I work</p>
          <SystemDiagram />
        </motion.div>
      </div>
    </section>
  );
}
