import type { Metadata } from "next";
import { Page } from "@/components/Page";
import { achievements, profile } from "@/content/data";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <Page label="/about" title={profile.name}>
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-4 text-lg text-muted">
          {profile.about.map((p) => <p key={p}>{p}</p>)}
          <p className="font-mono text-sm">Now: {profile.role}, {profile.company} (since {profile.since}).</p>
        </div>
        <div>
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">Achievements</h2>
          <ul className="space-y-3">
            {achievements.map((a) => (
              <li key={a} className="rounded-lg border border-border bg-card p-4 text-muted">{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </Page>
  );
}
