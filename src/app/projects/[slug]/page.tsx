import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Page, Tag } from "@/components/Page";
import { projects } from "@/content/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return { title: p?.title };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border py-6">
      <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">{title}</h2>
      {children}
    </section>
  );
}

export default async function Project({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <Page label={`spec/${p.slug}`} title={p.title}>
      <div className="max-w-3xl">
        <p className="text-lg text-muted">{p.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        {p.shot && (
          <figure className="mt-8 max-w-xs overflow-hidden rounded-[2rem] border-4 border-border bg-card">
            <Image src={p.shot.src} width={p.shot.width} height={p.shot.height} alt={p.shot.caption} className="h-auto w-full" />
            <figcaption className="border-t border-border px-4 py-2 font-mono text-xs text-muted">{p.shot.caption}</figcaption>
          </figure>
        )}
        <div className="mt-8">
          <Block title="Problem"><p className="leading-8">{p.problem}</p></Block>
          {p.constraints.length > 0 && (
          <Block title="Constraints">
            <ul className="list-disc space-y-1 pl-6">{p.constraints.map((c) => <li key={c}>{c}</li>)}</ul>
          </Block>
          )}
          {p.decisions.length > 0 && (
          <Block title="Decisions">
            <ul className="space-y-4">
              {p.decisions.map((d) => (
                <li key={d.chose} className="rounded-lg border border-border bg-card p-4">
                  <p><strong>{d.chose}</strong> <span className="text-muted">over</span> {d.over}</p>
                  <p className="mt-1 text-sm text-muted">{d.why}</p>
                </li>
              ))}
            </ul>
          </Block>
          )}
          <Block title="Outcome"><p className="leading-8">{p.outcome}</p></Block>
          {p.link && (
            <Block title="Link">
              <a href={p.link} target="_blank" rel="noreferrer" className="text-accent underline underline-offset-4">{p.link}</a>
            </Block>
          )}
        </div>
      </div>
    </Page>
  );
}
