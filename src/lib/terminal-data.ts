import { allDecisions, journey, profile, projects, skills } from "@/content/data";
import type { Note } from "@/lib/notes";

// Plain, serialisable snapshot of the site for the terminal (a client component).
export function terminalData(notes: Note[]) {
  return {
    profile: { name: profile.name, role: profile.role, company: profile.company, stance: profile.stance, email: profile.email, github: profile.github },
    projects: projects.map((p) => ({ slug: p.slug, title: p.title, summary: p.summary, problem: p.problem, outcome: p.outcome, stack: p.stack })),
    decisions: allDecisions.map((d) => ({ project: d.project, chose: d.chose, over: d.over, why: d.why })),
    journey,
    notes: notes.map((n) => ({ slug: n.slug, title: n.title, date: n.date, summary: n.summary })),
    skills: skills.map((s) => s.name),
  };
}

export type TerminalData = ReturnType<typeof terminalData>;
