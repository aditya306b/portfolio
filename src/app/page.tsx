import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Terminal } from "@/components/Terminal";
import { terminalData } from "@/lib/terminal-data";
import { Reveal } from "@/components/Reveal";
import { Tag } from "@/components/Page";
import { profile, projects } from "@/content/data";
import { getNotes } from "@/lib/notes";

export default async function Home() {
  const allNotes = await getNotes();
  const notes = allNotes.slice(0, 3);
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-5xl px-6 pt-20">
        <Reveal>
          <h2 className="mb-2 font-mono text-sm uppercase tracking-widest text-muted">Poke around</h2>
          <p className="mb-6 max-w-xl text-muted">
            Skip the menus. Type <code className="font-mono text-accent">help</code>, or press <kbd className="rounded border border-border px-1.5 font-mono text-xs">Ctrl K</kbd> on any page.
          </p>
          <Terminal data={terminalData(allNotes)} />
        </Reveal>
      </section>
      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <h2 className="mb-8 font-mono text-sm uppercase tracking-widest text-muted">Featured specs</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link href={`/projects/${p.slug}`} className="block h-full rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent">
                <p className="font-mono text-xs text-muted">spec/{p.slug}</p>
                <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 3).map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <h2 className="mb-8 font-mono text-sm uppercase tracking-widest text-muted">Latest notes</h2>
          </Reveal>
          <ul className="divide-y divide-border">
            {notes.map((n) => (
              <li key={n.slug}>
                <Link href={`/notes/${n.slug}`} className="flex flex-col gap-1 py-4 hover:text-accent sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="text-lg font-medium">{n.title}</span>
                  <span className="font-mono text-xs text-muted">{n.date} · {n.minutes} min</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-muted">
            Want to talk? <a className="text-accent underline underline-offset-4" href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        </div>
      </section>
    </>
  );
}
