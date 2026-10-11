import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag } from "@/components/Page";
import { ReadingProgress } from "@/components/ReadingProgress";
import { getNote, noteSlugs } from "@/lib/notes";

export function generateStaticParams() {
  return noteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/notes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!noteSlugs().includes(slug)) return {};
  const n = await getNote(slug);
  return { title: n.title, description: n.summary };
}

export default async function NotePage({ params }: PageProps<"/notes/[slug]">) {
  const { slug } = await params;
  if (!noteSlugs().includes(slug)) notFound();
  const note = await getNote(slug);
  const { default: Content } = await import(`@/content/notes/${slug}.mdx`);
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <ReadingProgress />
      <Link href="/notes" className="font-mono text-xs text-muted hover:text-accent">← all notes</Link>
      <p className="mt-8 font-mono text-xs text-muted">{note.date} · {note.minutes} min read</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">{note.title}</h1>
      <div className="mt-3 flex gap-1.5">{note.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
      <article className="mt-8">
        <Content />
      </article>
    </div>
  );
}
