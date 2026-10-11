import type { Metadata } from "next";
import { Page } from "@/components/Page";
import { DecisionLog } from "@/components/DecisionLog";
import { allDecisions } from "@/content/data";

export const metadata: Metadata = { title: "Decision log" };

export default function Decisions() {
  return (
    <Page label="/decisions" title="Decision log">
      <p className="-mt-6 mb-8 max-w-2xl text-lg text-muted">
        Every &quot;X over Y&quot; call I made on these projects, in one place. The point is not that I was always right, but that I can say why.
      </p>
      <DecisionLog decisions={allDecisions} />
    </Page>
  );
}
