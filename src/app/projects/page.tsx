import type { Metadata } from "next";
import Link from "next/link";
import { Page, Tag } from "@/components/Page";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/content/data";

export const metadata: Metadata = { title: "Projects" };

export default function Projects() {
  return (
    <Page label="/projects" title="Specs">
      <p className="-mt-6 mb-10 max-w-2xl text-lg text-muted">
        Each project is written up the way I&apos;d hand it to another engineer: the problem, the limits I worked within, the choices I made and what came of it.
      </p>
      <div className="space-y-6">
        {projects.map((p, i) => (
          <Reveal key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="group grid gap-6 rounded-xl border border-border bg-card p-8 transition-all hover:-translate-y-0.5 hover:border-accent sm:grid-cols-[auto_1fr_auto] sm:p-10"
            >
              <span aria-hidden className="font-mono text-5xl font-bold text-muted transition-colors group-hover:text-accent sm:text-6xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-mono text-xs text-muted">spec/{p.slug}</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">{p.title}</h2>
                <p className="mt-3 max-w-2xl text-lg text-muted">{p.summary}</p>
                <p className="mt-5 max-w-2xl border-l-2 border-border pl-4 text-sm leading-6 text-muted">
                  <span className="font-mono text-xs uppercase tracking-widest text-accent">Problem </span>
                  {p.problem}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {p.stack.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                  <span className="ml-2 font-mono text-xs text-muted">
                    {p.constraints.length} constraints · {p.decisions.length} decisions
                  </span>
                </div>
              </div>
              <span className="self-end font-mono text-sm text-accent sm:self-center">Read spec →</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Page>
  );
}
