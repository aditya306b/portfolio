import fs from "node:fs";
import path from "node:path";

export type NoteMeta = { title: string; date: string; summary: string; tags: string[] };
export type Note = NoteMeta & { slug: string; minutes: number };

const dir = path.join(process.cwd(), "src/content/notes");

export function noteSlugs() {
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}

export async function getNote(slug: string): Promise<Note> {
  const { meta } = (await import(`@/content/notes/${slug}.mdx`)) as { meta: NoteMeta };
  const words = fs.readFileSync(path.join(dir, `${slug}.mdx`), "utf8").split(/\s+/).length;
  return { ...meta, slug, minutes: Math.max(1, Math.round(words / 200)) };
}

export async function getNotes() {
  const all = await Promise.all(noteSlugs().map(getNote));
  return all.sort((a, b) => b.date.localeCompare(a.date));
}
