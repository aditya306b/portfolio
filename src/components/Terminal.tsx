"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { TerminalData } from "@/lib/terminal-data";

type Line = { kind: "in" | "out"; text: string };

const PAGES = ["projects", "decisions", "journey", "notes", "skills", "about"];
const ACCENTS = ["green", "cyan", "amber", "violet"];
const COMMANDS = ["help", "whoami", "ls", "cat", "decisions", "git", "open", "theme", "accent", "contact", "clear", "exit"];

const HELP = `commands:
  whoami            who I am
  ls [projects|notes|skills]   list things
  cat <name>        read a project or note
  decisions         every "X over Y" call I wrote down
  git log           my career as commits
  open <page>       go to a page or project
  theme dark|light  switch theme
  accent <colour>   green, cyan, amber, violet
  contact           how to reach me
  clear             clear the screen   (Tab completes, ↑ recalls)`;

export function Terminal({ data, onNavigate, autoFocus = false, height = "h-80" }: { data: TerminalData; onNavigate?: () => void; autoFocus?: boolean; height?: string }) {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>([{ kind: "out", text: `${data.profile.name}'s terminal. Type "help" to look around.` }]);
  const [value, setValue] = useState("");
  const history = useRef<string[]>([]);
  const cursor = useRef(-1);
  const scroller = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) input.current?.focus();
  }, [autoFocus]);
  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [lines]);

  const go = (path: string) => {
    router.push(path);
    onNavigate?.();
  };

  const find = (name: string) => {
    const n = name.toLowerCase();
    return {
      project: data.projects.find((p) => p.slug === n || p.title.toLowerCase() === n || p.slug.startsWith(n)),
      note: data.notes.find((x) => x.slug === n || x.slug.startsWith(n)),
    };
  };

  // Returns the output text. Side effects (navigation, theme) happen here too.
  const execute = (raw: string): string | null => {
    const [cmd, ...rest] = raw.trim().split(/\s+/);
    const arg = rest.join(" ");
    switch (cmd.toLowerCase()) {
      case "":
        return "";
      case "help":
        return HELP;
      case "whoami":
        return `${data.profile.name}\n${data.profile.role} at ${data.profile.company}\n"${data.profile.stance}"`;
      case "ls":
        if (arg === "projects") return data.projects.map((p) => p.slug).join("\n");
        if (arg === "notes") return data.notes.map((n) => n.slug).join("\n");
        if (arg === "skills") return data.skills.join("  ");
        return "projects/  notes/  skills/  decisions/  journey/";
      case "cat": {
        if (!arg) return "usage: cat <project or note>";
        const { project, note } = find(arg);
        if (project) return `${project.title}\n${project.summary}\n\nproblem:  ${project.problem}\noutcome:  ${project.outcome}\nstack:    ${project.stack.join(", ")}`;
        if (note) return `${note.title} (${note.date})\n${note.summary}\n\ntype "open ${note.slug}" to read it.`;
        return `cat: ${arg}: no such project or note. Try "ls projects".`;
      }
      case "decisions":
        return data.decisions.map((d) => `• ${d.chose} over ${d.over}  [${d.project}]\n    ${d.why}`).join("\n");
      case "git":
        if (arg !== "log") return "usage: git log";
        return data.journey.map((j) => `commit ${j.hash}  ${j.date}\n    ${j.message}`).join("\n\n");
      case "open": {
        if (!arg) return `usage: open <${PAGES.join("|")}|project|note>`;
        const page = PAGES.find((p) => p === arg.toLowerCase());
        if (page) {
          go(`/${page}`);
          return `opening /${page} ...`;
        }
        const { project, note } = find(arg);
        if (project) {
          go(`/projects/${project.slug}`);
          return `opening ${project.title} ...`;
        }
        if (note) {
          go(`/notes/${note.slug}`);
          return `opening ${note.title} ...`;
        }
        return `open: ${arg}: not found`;
      }
      case "theme": {
        const a = arg.toLowerCase();
        if (a !== "dark" && a !== "light") return "usage: theme dark|light";
        document.documentElement.classList.toggle("dark", a === "dark");
        localStorage.setItem("theme", a);
        return `theme: ${a}`;
      }
      case "accent": {
        const a = arg.toLowerCase();
        if (!ACCENTS.includes(a)) return `usage: accent ${ACCENTS.join("|")}`;
        document.documentElement.setAttribute("data-accent", a);
        localStorage.setItem("accent", a);
        return `accent: ${a}`;
      }
      case "contact":
        return `email   ${data.profile.email}\ngithub  ${data.profile.github}`;
      case "clear":
        return null;
      case "exit":
        onNavigate?.();
        return "";
      case "sudo":
        return "nice try.";
      default:
        return `${cmd}: command not found. Type "help".`;
    }
  };

  const submit = () => {
    const raw = value;
    setValue("");
    if (raw.trim()) {
      history.current.push(raw);
      cursor.current = history.current.length;
    }
    const out = execute(raw);
    setLines((prev) => (out === null ? [] : [...prev, { kind: "in", text: raw }, ...(out ? [{ kind: "out" as const, text: out }] : [])]));
  };

  const complete = () => {
    const parts = value.split(/\s+/);
    const last = parts[parts.length - 1].toLowerCase();
    const pool = parts.length === 1 ? COMMANDS : [...PAGES, ...ACCENTS, "dark", "light", "log", ...data.projects.map((p) => p.slug), ...data.notes.map((n) => n.slug)];
    const hits = pool.filter((c) => c.startsWith(last));
    if (hits.length === 1) setValue([...parts.slice(0, -1), hits[0]].join(" ") + " ");
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      complete();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      cursor.current = Math.max(0, cursor.current - 1);
      setValue(history.current[cursor.current] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      cursor.current = Math.min(history.current.length, cursor.current + 1);
      setValue(history.current[cursor.current] ?? "");
    }
  };

  return (
    <div
      className="overflow-hidden rounded-xl border border-border bg-background font-mono text-sm shadow-lg"
      onClick={() => input.current?.focus()}
      data-testid="terminal"
    >
      <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2 text-xs text-muted">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        <span className="ml-2">aditya@notebook: ~</span>
      </div>
      <div ref={scroller} className={`${height} overflow-y-auto px-4 py-3`} aria-live="polite">
        {lines.map((l, i) =>
          l.kind === "in" ? (
            <p key={i} className="mt-2 whitespace-pre-wrap break-words">
              <span className="text-accent">$ </span>
              {l.text}
            </p>
          ) : (
            <p key={i} className="mt-1 whitespace-pre-wrap break-words text-muted">
              {l.text}
            </p>
          ),
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="mt-2 flex items-center"
        >
          <span className="mr-2 text-accent">$</span>
          <input
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            aria-label="Terminal command"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-foreground outline-none"
            placeholder='try "help"'
          />
        </form>
      </div>
    </div>
  );
}
