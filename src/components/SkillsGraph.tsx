"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { projects, skills } from "@/content/data";

type Kind = "group" | "skill" | "project";
type N = d3.SimulationNodeDatum & { id: string; kind: Kind; group?: string; r: number };
type L = d3.SimulationLinkDatum<N> & { kind: "member" | "uses" };

const W = 900;
const H = 560;
const PALETTE = ["#22c55e", "#06b6d4", "#f59e0b", "#a78bfa", "#3b82f6", "#ec4899"];

// Dependency graph: skills cluster by area, projects sit in the middle and link to what they use.
// Hover or tap a node to light up its neighbours; tap empty space to reset.
export function SkillsGraph() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(ref.current!);
    svg.selectAll("*").remove();

    const groups = [...new Set(skills.map((s) => s.group))];
    const color = d3.scaleOrdinal<string, string>().domain(groups).range(PALETTE);
    const skillIds = new Set(skills.map((s) => s.name.toLowerCase()));
    const skillByLower = new Map(skills.map((s) => [s.name.toLowerCase(), s.name]));

    const uses: L[] = projects.flatMap((p) =>
      p.stack.filter((t) => skillIds.has(t.toLowerCase())).map((t) => ({ source: `p:${p.slug}`, target: skillByLower.get(t.toLowerCase())!, kind: "uses" as const })),
    );
    const degree = new Map<string, number>();
    uses.forEach((l) => degree.set(l.target as string, (degree.get(l.target as string) ?? 0) + 1));

    const nodes: N[] = [
      ...groups.map((g) => ({ id: g, kind: "group" as const, group: g, r: 15 })),
      ...skills.map((s) => ({ id: s.name, kind: "skill" as const, group: s.group, r: 6 + (degree.get(s.name) ?? 0) * 3 })),
      ...projects
        .filter((p) => uses.some((l) => l.source === `p:${p.slug}`))
        .map((p) => ({ id: `p:${p.slug}`, kind: "project" as const, r: 20 })),
    ];
    const label = (n: N) => (n.kind === "project" ? projects.find((p) => `p:${p.slug}` === n.id)!.title : n.id);
    const links: L[] = [...skills.map((s) => ({ source: s.name, target: s.group, kind: "member" as const })), ...uses];

    // Each area gets an anchor on a ring so clusters stay apart.
    const anchor = new Map(groups.map((g, i) => {
      const a = (i / groups.length) * Math.PI * 2 - Math.PI / 2;
      return [g, [W / 2 + Math.cos(a) * 270, H / 2 + Math.sin(a) * 175] as const];
    }));

    const sim = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink<N, L>(links).id((d) => d.id).distance((l) => (l.kind === "member" ? 55 : 150)).strength((l) => (l.kind === "member" ? 0.9 : 0.04)))
      .force("charge", d3.forceManyBody<N>().strength((d) => (d.kind === "group" ? -400 : -120)))
      .force("x", d3.forceX<N>((d) => (d.group ? anchor.get(d.group)![0] : W / 2)).strength((d) => (d.group ? 0.14 : 0.08)))
      .force("y", d3.forceY<N>((d) => (d.group ? anchor.get(d.group)![1] : H / 2)).strength((d) => (d.group ? 0.14 : 0.08)))
      .force("collide", d3.forceCollide<N>((d) => d.r + 22));

    const link = svg
      .append("g")
      .selectAll<SVGLineElement, L>("line")
      .data(links)
      .join("line")
      .attr("stroke", (l) => (l.kind === "uses" ? "var(--accent)" : "var(--border)"))
      .attr("stroke-width", (l) => (l.kind === "uses" ? 1.6 : 1))
      .attr("stroke-dasharray", (l) => (l.kind === "uses" ? "5 4" : null));

    const node = svg
      .append("g")
      .selectAll<SVGGElement, N>("g")
      .data(nodes)
      .join("g")
      .style("cursor", "pointer");

    node.each(function (d) {
      const g = d3.select(this);
      if (d.kind === "project") {
        g.append("rect").attr("x", -d.r).attr("y", -d.r).attr("width", d.r * 2).attr("height", d.r * 2).attr("rx", 5).attr("fill", "var(--card)").attr("stroke", "var(--accent)").attr("stroke-width", 2);
        g.append("text").text("◆").attr("text-anchor", "middle").attr("dy", 5).attr("fill", "var(--accent)").attr("font-size", 14);
      } else if (d.kind === "group") {
        g.append("circle").attr("r", d.r).attr("fill", color(d.group!)).attr("stroke", "var(--background)").attr("stroke-width", 3);
      } else {
        g.append("circle").attr("r", d.r).attr("fill", color(d.group!)).attr("fill-opacity", 0.85);
      }
      g.append("text")
        .text(label(d))
        .attr("text-anchor", "middle")
        .attr("dy", d.r + 15)
        .attr("fill", "var(--foreground)")
        .attr("font-size", d.kind === "skill" ? 12 : 13)
        .attr("font-weight", d.kind === "skill" ? 400 : 700)
        .attr("paint-order", "stroke")
        .attr("stroke", "var(--background)")
        .attr("stroke-width", 4)
        .attr("stroke-linejoin", "round");
    });

    // Neighbours of a node, used for focus highlighting.
    const near = new Map<string, Set<string>>();
    nodes.forEach((n) => near.set(n.id, new Set([n.id])));
    links.forEach((l) => {
      const a = (l.source as N).id;
      const b = (l.target as N).id;
      near.get(a)!.add(b);
      near.get(b)!.add(a);
    });
    // Picking a skill also lights up the area it belongs to.
    nodes.forEach((n) => {
      if (n.kind === "skill") near.get(n.id)!.add(n.group!);
    });

    let pinned: string | null = null;
    const focus = (id: string | null) => {
      const set = id ? near.get(id)! : null;
      node.transition().duration(150).style("opacity", (d) => (!set || set.has(d.id) ? 1 : 0.15));
      link.transition().duration(150).style("opacity", (l) => (!set ? 1 : (l.source as N).id === id || (l.target as N).id === id ? 1 : 0.07));
    };
    node
      .on("pointerenter", (_, d) => !pinned && focus(d.id))
      .on("pointerleave", () => !pinned && focus(null))
      .on("click", (e, d) => {
        e.stopPropagation();
        pinned = pinned === d.id ? null : d.id;
        focus(pinned);
      });
    svg.on("click", () => {
      pinned = null;
      focus(null);
    });

    node.call(
      d3
        .drag<SVGGElement, N>()
        .on("start", (e, d) => {
          if (!e.active) sim.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (e, d) => {
          d.fx = e.x;
          d.fy = e.y;
        })
        .on("end", (e, d) => {
          if (!e.active) sim.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }),
    );

    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
    sim.on("tick", () => {
      nodes.forEach((n) => {
        const pad = n.kind === "project" ? 110 : 55;
        n.x = clamp(n.x!, pad, W - pad);
        n.y = clamp(n.y!, 30, H - 40);
      });
      link
        .attr("x1", (l) => (l.source as N).x!)
        .attr("y1", (l) => (l.source as N).y!)
        .attr("x2", (l) => (l.target as N).x!)
        .attr("y2", (l) => (l.target as N).y!);
      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });
    // Start from a settled layout; users who prefer less motion get it frozen.
    sim.stop();
    sim.tick(300);
    node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    link
      .attr("x1", (l) => (l.source as N).x!)
      .attr("y1", (l) => (l.source as N).y!)
      .attr("x2", (l) => (l.target as N).x!)
      .attr("y2", (l) => (l.target as N).y!);
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) sim.alpha(0.05).restart();

    return () => {
      sim.stop();
    };
  }, []);

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card" tabIndex={0} role="region" aria-label="Skills and projects graph (scrollable)">
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[720px] touch-none select-none" role="img" aria-label="Graph connecting skills to the projects that use them" />
    </div>
  );
}
