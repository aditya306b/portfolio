"use client";

const accents = [
  ["green", "#22c55e"],
  ["cyan", "#22d3ee"],
  ["amber", "#f59e0b"],
  ["violet", "#a78bfa"],
] as const;

// Lets the visitor pick the site's trace colour; remembered in localStorage.
export function AccentPicker() {
  const pick = (name: string) => {
    document.documentElement.setAttribute("data-accent", name);
    localStorage.setItem("accent", name);
  };
  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Accent colour">
      {accents.map(([name, hex]) => (
        <button
          key={name}
          onClick={() => pick(name)}
          aria-label={`${name} accent`}
          title={name}
          className="h-4 w-4 rounded-full border border-border transition-transform hover:scale-125"
          style={{ background: hex }}
        />
      ))}
    </div>
  );
}
