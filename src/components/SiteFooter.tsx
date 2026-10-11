import { profile } from "@/content/data";

// Status bar in the style of an editor: version, stack and links.
export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/60 font-mono text-xs text-muted">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-6 py-3">
        <span>
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500" />
          all systems nominal · v0.2 · Next.js + D3
        </span>
        <span className="flex gap-4">
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-foreground">github</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">linkedin</a>
          <a href={`mailto:${profile.email}`} className="hover:text-foreground">email</a>
        </span>
      </div>
    </footer>
  );
}
