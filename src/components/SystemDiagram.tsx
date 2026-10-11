"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

const stages = ["Problem", "Constraints", "Decision", "Build", "Ship", "Learn"];

// What goes wrong at each stage, and what I do about it.
const failures = [
  ["the problem was vague", "restate it in one sentence, then ask until it fits"],
  ["a hidden constraint shows up late", "write constraints down first, renegotiate scope early"],
  ["the call was wrong", "the decision log says why; revert one choice, not the system"],
  ["the build breaks", "small commits and CI; roll back to the last green"],
  ["the deploy fails", "feature flag off, one-command rollback"],
  ["the lesson is lost", "write it down. That is what this notebook is for"],
];

const RED = "#ef4444";

// A pipeline drawn like a block diagram, with packets flowing through it.
// "Learn" loops back to "Problem": the whole point of writing decisions down.
export function SystemDiagram() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(ref.current!);
    svg.selectAll("*").remove();
    const W = 900;
    const H = 260;
    const x = d3.scalePoint(stages, [90, W - 90]);
    const y = (i: number) => (i % 2 === 0 ? 90 : 150);
    const pts = stages.map((s, i) => [x(s)!, y(i)] as [number, number]);

    const line = d3.line<[number, number]>().curve(d3.curveMonotoneX);
    const path = svg
      .append("path")
      .attr("d", line(pts))
      .attr("fill", "none")
      .attr("stroke", "var(--blue)")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "4 4");

    const [lx, ly] = pts[pts.length - 1];
    const [fx, fy] = pts[0];
    svg
      .append("path")
      .attr("d", `M${lx},${ly + 22} C ${lx},${H - 10} ${fx},${H - 10} ${fx},${fy + 22}`)
      .attr("fill", "none")
      .attr("stroke", "var(--accent)")
      .attr("stroke-width", 1.5)
      .attr("marker-end", "url(#arrow)");
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 8)
      .attr("refY", 5)
      .attr("markerWidth", 7)
      .attr("markerHeight", 7)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,0 L10,5 L0,10 z")
      .attr("fill", "var(--accent)");
    svg
      .append("text")
      .attr("x", W / 2)
      .attr("y", H - 14)
      .attr("text-anchor", "middle")
      .attr("fill", "var(--accent)")
      .attr("font-family", "var(--font-geist-mono)")
      .attr("font-size", 11)
      .text("feedback loop: write it down, decide better next time");

    const nodes = svg.selectAll("g.node").data(pts).join("g").attr("class", "node").attr("transform", (d) => `translate(${d})`);
    nodes
      .append("rect")
      .attr("x", -48)
      .attr("y", -20)
      .attr("width", 96)
      .attr("height", 40)
      .attr("rx", 4)
      .attr("fill", "var(--card)")
      .attr("stroke", "var(--blue)");
    nodes
      .append("text")
      .text((_, i) => stages[i])
      .attr("text-anchor", "middle")
      .attr("dy", 4)
      .attr("fill", "var(--foreground)")
      .attr("font-family", "var(--font-geist-mono)")
      .attr("font-size", 12);

    // Click a block to break it: it fails, then recovers the way I would handle it.
    const status = svg
      .append("text")
      .attr("x", 24)
      .attr("y", 28)
      .attr("fill", "var(--muted)")
      .attr("font-family", "var(--font-geist-mono)")
      .attr("font-size", 12)
      .text("click any block to break it");
    let broken = false;
    const timers: number[] = [];
    nodes
      .style("cursor", "pointer")
      .attr("role", "button")
      .attr("tabindex", 0)
      .attr("aria-label", (_, i) => `Break the ${stages[i]} stage`)
      .on("click keydown", function (e: Event, d) {
        if (e instanceof KeyboardEvent && e.key !== "Enter" && e.key !== " ") return;
        if (broken) return;
        broken = true;
        const i = pts.indexOf(d);
        const g = d3.select(this);
        g.select("rect").attr("stroke", RED).attr("stroke-width", 2);
        g.select("text").text(`✕ ${stages[i]}`).attr("fill", RED);
        status.attr("fill", RED).text(`${stages[i]} failed: ${failures[i][0]}`);
        timers.push(
          window.setTimeout(() => {
            g.select("rect").attr("stroke", "var(--accent)");
            g.select("text").text(`✓ ${stages[i]}`).attr("fill", "var(--accent)");
            status.attr("fill", "var(--accent)").text(`recovered: ${failures[i][1]}`);
          }, 2200),
          window.setTimeout(() => {
            g.select("rect").attr("stroke", "var(--blue)").attr("stroke-width", 1);
            g.select("text").text(stages[i]).attr("fill", "var(--foreground)");
            status.attr("fill", "var(--muted)").text("click any block to break it");
            broken = false;
          }, 5200),
        );
      });

    // Packets travel along the pipeline path.
    const node = path.node()!;
    const len = node.getTotalLength();
    const packets = svg.selectAll("circle.packet").data([0, 1, 2]).join("circle").attr("class", "packet").attr("r", 4).attr("fill", "var(--accent)");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const place = (t: number) =>
      packets.style("opacity", broken ? 0.15 : 1).attr("transform", (k) => {
        const p = node.getPointAtLength((((t / 6000 + k / 3) % 1) * len));
        return `translate(${p.x},${p.y})`;
      });
    packets.lower();
    place(0);
    const timer = reduce ? null : d3.timer(place);
    return () => {
      timer?.stop();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <div className="overflow-x-auto">
      <svg
        ref={ref}
        viewBox="0 0 900 260"
        className="w-full min-w-[640px]"
        role="group"
        aria-label="Diagram: problem, constraints, decision, build, ship, learn, then back to problem. Each block can be clicked to break it."
      />
    </div>
  );
}
