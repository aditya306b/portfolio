import type { Metadata } from "next";
import { Page } from "@/components/Page";
import { SkillsGraph } from "@/components/SkillsGraph";

export const metadata: Metadata = { title: "Skills" };

export default function Skills() {
  return (
    <Page label="/skills" title="Dependency graph">
      <p className="-mt-6 mb-6 max-w-2xl text-lg text-muted">
        Tools cluster by area. The diamonds are my projects, linked by dashed lines to what they depend on. Hover or tap a node to see what it connects to, drag to rearrange.
      </p>
      <SkillsGraph />
      <p className="mt-3 font-mono text-xs text-muted">big dot = used by more projects · diamond = project · dashed = depends on</p>
    </Page>
  );
}
