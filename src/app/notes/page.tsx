import type { Metadata } from "next";
import Link from "next/link";
import { Page, Tag } from "@/components/Page";
import { getNotes } from "@/lib/notes";

export const metadata: Metadata = { title: "Notes" };

export default async function Notes() {
  const notes = await getNotes();
  return (
    <Page label="/notes" title="Engineering notes">
      <ul className="max-w-3xl divide-y divide-border">
        {notes.map((n) => (
          <li key={n.slug} className="py-6">
            <p className="font-mono text-xs text-muted">{n.date} · {n.minutes} min read</p>
            <Link href={`/notes/${n.slug}`} className="mt-1 block text-2xl font-semibold hover:text-accent">{n.title}</Link>
            <p className="mt-2 text-muted">{n.summary}</p>
            <div className="mt-3 flex gap-1.5">{n.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
          </li>
        ))}
      </ul>
    </Page>
  );
}
