import type { Metadata } from "next";
import { Page } from "@/components/Page";
import { journey } from "@/content/data";

export const metadata: Metadata = { title: "Journey" };

export default function Journey() {
  return (
    <Page label="/journey" title="git log --career">
      <ol className="max-w-3xl space-y-8 border-l border-border pl-6">
        {journey.map((j) => (
          <li key={j.hash} className="relative">
            <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
            <p className="font-mono text-xs text-muted">
              <span className="text-accent">commit {j.hash}</span> · {j.date}
            </p>
            <h2 className="mt-1 font-mono text-base font-semibold">{j.message}</h2>
            <p className="mt-1 text-muted">{j.body}</p>
          </li>
        ))}
      </ol>
    </Page>
  );
}
