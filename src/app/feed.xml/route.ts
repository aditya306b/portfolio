import { profile } from "@/content/data";
import { getNotes } from "@/lib/notes";
import { siteUrl } from "@/lib/site";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET() {
  const notes = await getNotes();
  const items = notes
    .map(
      (n) => `<item><title>${esc(n.title)}</title><link>${siteUrl}/notes/${n.slug}</link><guid>${siteUrl}/notes/${n.slug}</guid><pubDate>${new Date(n.date).toUTCString()}</pubDate><description>${esc(n.summary)}</description></item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(profile.name)}: engineering notes</title><link>${siteUrl}</link><description>${esc(profile.stance)}</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
