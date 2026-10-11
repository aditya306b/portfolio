"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type D = { chose: string; over: string; why: string; project: string; slug: string };

export function DecisionLog({ decisions }: { decisions: D[] }) {
  const [q, setQ] = useState("");
  const [project, setProject] = useState<string | null>(null);
  const projects = useMemo(() => [...new Set(decisions.map((d) => d.project))], [decisions]);
  const shown = decisions.filter(
    (d) => (!project || d.project === project) && `${d.chose} ${d.over} ${d.why}`.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search decisions..."
          aria-label="Search decisions"
          className="w-full rounded border border-border bg-card px-3 py-2 font-mono text-sm outline-none focus:border-accent sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-1.5">
          {[null, ...projects].map((p) => (
            <button
              key={p ?? "all"}
              onClick={() => setProject(p)}
              aria-pressed={project === p}
              className="rounded border border-border px-2.5 py-1 font-mono text-xs text-muted hover:border-accent aria-pressed:border-accent aria-pressed:text-accent"
            >
              {p ?? "all"}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 font-mono text-xs text-muted">{shown.length} of {decisions.length} decisions</p>
      <ul className="mt-4 space-y-4">
        {shown.map((d) => (
          <li key={`${d.slug}-${d.chose}`} className="rounded-xl border border-border bg-card p-6">
            <p className="text-xl font-semibold tracking-tight">
              <span className="text-accent">{d.chose}</span> <span className="font-normal text-muted">over</span> {d.over}
            </p>
            <p className="mt-2 text-muted">{d.why}</p>
            <Link href={`/projects/${d.slug}`} className="mt-3 inline-block font-mono text-xs text-muted hover:text-accent">
              from spec/{d.slug} →
            </Link>
          </li>
        ))}
        {shown.length === 0 && <li className="font-mono text-sm text-muted">No decision matches. Try a different word.</li>}
      </ul>
    </div>
  );
}
