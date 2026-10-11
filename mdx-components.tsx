import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h2: (p) => <h2 className="mt-12 mb-3 text-2xl font-bold tracking-tight" {...p} />,
  h3: (p) => <h3 className="mt-8 mb-2 text-lg font-semibold" {...p} />,
  p: (p) => <p className="my-4 leading-8 text-foreground/85" {...p} />,
  ul: (p) => <ul className="my-4 list-disc space-y-2 pl-6 text-foreground/85" {...p} />,
  ol: (p) => <ol className="my-4 list-decimal space-y-2 pl-6 text-foreground/85" {...p} />,
  a: (p) => <a className="text-accent underline underline-offset-4" {...p} />,
  code: (p) => <code className="rounded bg-card px-1.5 py-0.5 font-mono text-[0.9em]" {...p} />,
  pre: (p) => <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-card p-4 font-mono text-sm" {...p} />,
  blockquote: (p) => <blockquote className="my-6 border-l-2 border-accent pl-4 italic text-muted" {...p} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
