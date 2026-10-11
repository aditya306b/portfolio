"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { AccentPicker } from "./AccentPicker";
import { TOGGLE_TERMINAL } from "./TerminalOverlay";

const links = [
  ["Projects", "/projects"],
  ["Decisions", "/decisions"],
  ["Journey", "/journey"],
  ["Notes", "/notes"],
  ["Skills", "/skills"],
  ["About", "/about"],
] as const;

export function SiteHeader() {
  const path = usePathname();
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6 text-sm">
        <Link href="/" className="font-mono font-semibold">
          aditya<span className="text-accent">.sh</span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={path.startsWith(href) ? "page" : undefined}
              className="hidden text-muted hover:text-foreground aria-[current=page]:text-foreground aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:underline-offset-8 sm:inline"
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => window.dispatchEvent(new Event(TOGGLE_TERMINAL))}
            aria-label="⌘K, open terminal"
            className="rounded border border-border bg-card px-2 py-1 font-mono text-xs text-muted hover:border-accent hover:text-foreground"
          >
            ⌘K
          </button>
          <AccentPicker />
          <ThemeToggle />
        </div>
      </nav>
      <div className="flex gap-4 overflow-x-auto border-t border-border px-6 py-2 text-xs text-muted sm:hidden">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="shrink-0 hover:text-foreground">
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
}
