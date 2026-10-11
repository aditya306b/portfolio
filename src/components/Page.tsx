import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Page({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">{label}</p>
        <h1 className="mt-2 mb-10 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
      </Reveal>
      {children}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="rounded border border-border px-2 py-0.5 font-mono text-xs text-muted">{children}</span>;
}
