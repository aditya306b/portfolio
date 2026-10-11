import type { MetadataRoute } from "next";
import { projects } from "@/content/data";
import { getNotes } from "@/lib/notes";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notes = await getNotes();
  const pages = ["", "/projects", "/decisions", "/journey", "/notes", "/skills", "/about"];
  return [
    ...pages.map((p) => ({ url: `${siteUrl}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...projects.map((p) => ({ url: `${siteUrl}/projects/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...notes.map((n) => ({ url: `${siteUrl}/notes/${n.slug}`, lastModified: n.date, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
