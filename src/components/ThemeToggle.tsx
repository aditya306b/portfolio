"use client";

export function ThemeToggle() {
  const toggle = () => {
    const dark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  };
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark and light theme"
      className="rounded border border-border bg-card px-2.5 py-1 font-mono text-xs hover:border-accent transition-colors"
    >
      <span className="hidden dark:inline">☀ Light</span>
      <span className="dark:hidden">☾ Dark</span>
    </button>
  );
}
