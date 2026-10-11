import type { ReactNode } from "react";

// Content is always visible. In browsers with scroll-driven animations it also fades up
// as it enters the viewport (see .reveal in globals.css); elsewhere it simply shows.
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <div className="reveal" style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
