"use client";

import { useEffect, useState } from "react";
import { Terminal } from "./Terminal";
import type { TerminalData } from "@/lib/terminal-data";

export const TOGGLE_TERMINAL = "toggle-terminal";

// Ctrl/Cmd+K (or the header button) opens the terminal anywhere on the site; Esc closes it.
export function TerminalOverlay({ data }: { data: TerminalData }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") setOpen(false);
    };
    const onToggle = () => setOpen((o) => !o);
    window.addEventListener("keydown", onKey);
    window.addEventListener(TOGGLE_TERMINAL, onToggle);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(TOGGLE_TERMINAL, onToggle);
    };
  }, []);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-background/70 p-4 pt-24 backdrop-blur-sm" onClick={() => setOpen(false)} role="dialog" aria-label="Terminal">
      <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <Terminal data={data} autoFocus onNavigate={() => setOpen(false)} />
        <p className="mt-2 text-center font-mono text-xs text-muted">Esc to close</p>
      </div>
    </div>
  );
}
