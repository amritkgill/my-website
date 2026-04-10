"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const INDUSTRIES = [
  { name: "Computer & Electronic", tariff: 21, etrChange: -12.0, firms: 173 },
  { name: "Machinery", tariff: 20, etrChange: -9.5, firms: 88 },
  { name: "Electrical Equipment", tariff: 18, etrChange: -14.5, firms: 29 },
  { name: "Plastics & Rubber", tariff: 15, etrChange: -11.8, firms: 9 },
  { name: "Transportation Equip.", tariff: 15, etrChange: -6.6, firms: 71 },
  { name: "Fabricated Metal", tariff: 14, etrChange: -7.1, firms: 27 },
  { name: "Petroleum & Coal", tariff: 13, etrChange: -4.3, firms: 14 },
  { name: "Miscellaneous Mfg", tariff: 13, etrChange: -10.8, firms: 42 },
  { name: "Paper", tariff: 12, etrChange: -10.0, firms: 8 },
  { name: "Chemical", tariff: 12, etrChange: -8.6, firms: 234 },
  { name: "Nonmetallic Mineral", tariff: 11, etrChange: -3.6, firms: 8 },
  { name: "Apparel", tariff: 10, etrChange: -15.8, firms: 10 },
  { name: "Wood Products", tariff: 10, etrChange: 2.9, firms: 6 },
  { name: "Leather", tariff: 10, etrChange: -11.0, firms: 5 },
  { name: "Furniture", tariff: 10, etrChange: -9.6, firms: 7 },
  { name: "Printing", tariff: 10, etrChange: -7.0, firms: 3 },
  { name: "Beverage & Tobacco", tariff: 10, etrChange: 0.7, firms: 17 },
  { name: "Food", tariff: 10, etrChange: -3.4, firms: 25 },
  { name: "Oil & Gas", tariff: 10, etrChange: -6.1, firms: 35 },
  { name: "Mining", tariff: 10, etrChange: 1.4, firms: 25 },
];

const LABEL_CONFIG = {
  "Chemical":              { dx: 0, dy: 13,  anchor: "middle" },
  "Computer & Electronic": { dx: 0, dy: 13,  anchor: "middle", text: "Comp. & Elec." },
  "Machinery":             { dx: 0, dy: -8,  anchor: "middle" },
  "Electrical Equipment":  { dx: 0, dy: 13,  anchor: "middle", text: "Elec. Equip" },
  "Apparel":               { dx: 0, dy: 13,  anchor: "middle" },
  "Transportation Equip.": { dx: 0, dy: 13,  anchor: "middle", text: "Transport" },
};

function getTheme() {
  const s = getComputedStyle(document.documentElement);
  return {
    text: s.getPropertyValue("--text").trim(),
    muted: s.getPropertyValue("--text-muted").trim(),
    bg: s.getPropertyValue("--bg").trim(),
    white: s.getPropertyValue("--white").trim(),
    border: s.getPropertyValue("--border").trim(),
    accent: s.getPropertyValue("--accent").trim(),
  };
}

function getDims(container, maxWidth) {
  const w = Math.min(container.offsetWidth - 16, maxWidth);
  return { width: Math.max(w, 300), height: Math.max(w * 0.6, 240) };
}

function renderChart(svgEl, tooltipEl, dims) {
  const svg = d3.select(svgEl);
  svg.selectAll("*").remove();
  const t = getTheme();

  const { width, height } = dims;

  const small = width < 500;
  const margin = small
    ? { top: 20, right: 16, bottom: 38, left: 44 }
    : { top: 30, right: 40, bottom: 55, left: 65 };
  const tickFontSize = small ? "11px" : "14px";
  const labelFontSize = small ? "11px" : "15px";
  const bubbleLabelFontSize = small ? "8px" : "11px";
  const legendFontSize = small ? "11px" : "16px";
  const xTicks = small ? 4 : 8;
  const yTicks = small ? 4 : 5;

  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;

  svg.attr("width", width).attr("height", height);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([8, 23]).range([0, w]);
  const y = d3.scaleLinear().domain([5, -22]).range([0, h]);
  const r = d3.scaleSqrt().domain([1, 234]).range([small ? 3 : 5, small ? 20 : 32]);
  const color = d3.scaleSequential(d3.interpolateRgb("#FFB3BA", "#8B0000")).domain([8, 22]);

  // Grid
  g.append("g")
    .selectAll("line")
    .data(y.ticks(yTicks))
    .join("line")
    .attr("x1", 0).attr("x2", w)
    .attr("y1", (d) => y(d)).attr("y2", (d) => y(d))
    .attr("stroke", t.border).attr("stroke-opacity", 0.5).attr("stroke-width", 1);

  // Zero line
  g.append("line")
    .attr("x1", 0).attr("x2", w)
    .attr("y1", y(0)).attr("y2", y(0))
    .attr("stroke", t.border).attr("stroke-width", 1.5)
    .attr("stroke-dasharray", "4 3");

  // Axes
  g.append("g")
    .attr("transform", `translate(0,${h})`)
    .call(d3.axisBottom(x).ticks(xTicks).tickFormat((d) => `${d}%`))
    .call((sel) => sel.select(".domain").attr("stroke", t.border))
    .selectAll("text").attr("font-size", tickFontSize).attr("fill", t.text);

  g.append("g")
    .call(d3.axisLeft(y).ticks(yTicks).tickFormat((d) => `${d > 0 ? "+" : ""}${d}%`))
    .call((sel) => sel.select(".domain").attr("stroke", t.border))
    .selectAll("text").attr("font-size", tickFontSize).attr("fill", t.text);

  // Axis labels
  g.append("text")
    .attr("x", w / 2).attr("y", h + (small ? 30 : 45))
    .attr("text-anchor", "middle").attr("font-size", labelFontSize).attr("fill", t.text)
    .text("Mean Tariff Increase (%)");

  g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", small ? -36 : -50).attr("x", -h / 2)
    .attr("text-anchor", "middle").attr("font-size", labelFontSize).attr("fill", t.text)
    .text("Change in Effective Tax Rate");

  // Trend line
  const xMean = d3.mean(INDUSTRIES, (d) => d.tariff) || 0;
  const yMean = d3.mean(INDUSTRIES, (d) => d.etrChange) || 0;
  const slope =
    INDUSTRIES.reduce((s, d) => s + (d.tariff - xMean) * (d.etrChange - yMean), 0) /
    INDUSTRIES.reduce((s, d) => s + (d.tariff - xMean) ** 2, 0);
  const intercept = yMean - slope * xMean;

  const trendLine = g.append("line")
    .attr("x1", x(9)).attr("y1", y(slope * 9 + intercept))
    .attr("x2", x(9)).attr("y2", y(slope * 9 + intercept))
    .attr("stroke", t.muted).attr("stroke-width", 2)
    .attr("stroke-dasharray", "8 4").attr("opacity", 0.5);

  trendLine.transition().delay(1800).duration(1000).ease(d3.easeQuadOut)
    .attr("x2", x(22)).attr("y2", y(slope * 22 + intercept));

  // Tooltip
  const tooltip = d3.select(tooltipEl);
  const containerWidth = svgEl.parentElement?.offsetWidth || width;

  // Bubbles
  INDUSTRIES.forEach((d, i) => {
    const bubble = g.append("circle")
      .attr("cx", x(d.tariff)).attr("cy", y(0)).attr("r", 0)
      .attr("fill", color(d.tariff)).attr("opacity", 0.75)
      .attr("stroke", t.bg).attr("stroke-width", 1.5)
      .style("cursor", "pointer");

    bubble.transition()
      .delay(200 + i * 60).duration(800)
      .ease(d3.easeBackOut.overshoot(0.8))
      .attr("cy", y(d.etrChange)).attr("r", r(d.firms));

    // Hit area
    g.append("circle")
      .attr("cx", x(d.tariff)).attr("cy", y(d.etrChange))
      .attr("r", Math.max(r(d.firms), 12))
      .attr("fill", "transparent").style("cursor", "pointer")
      .on("mouseenter", (event) => {
        bubble.interrupt().transition().duration(200)
          .attr("opacity", 1).attr("stroke-width", 2.5).attr("stroke", t.text);
        const tipLeft = Math.min(event.offsetX + 16, containerWidth - 160);
        const tipTop = Math.max(event.offsetY - 60, 4);
        tooltip.style("opacity", "1")
          .style("left", `${tipLeft}px`)
          .style("top", `${tipTop}px`)
          .html(
            `<strong style="font-size:13px">${d.name}</strong><br/>` +
            `Tariff increase: ${d.tariff}%<br/>` +
            `ETR change: <span style="color:${d.etrChange < 0 ? t.accent : "#27ae60"};font-weight:600">${d.etrChange > 0 ? "+" : ""}${d.etrChange.toFixed(1)} ppts</span><br/>` +
            `<span style="color:${t.muted}">${d.firms} firms</span>`
          );
      })
      .on("mousemove", (event) => {
        const tipLeft = Math.min(event.offsetX + 16, containerWidth - 160);
        const tipTop = Math.max(event.offsetY - 60, 4);
        tooltip.style("left", `${tipLeft}px`).style("top", `${tipTop}px`);
      })
      .on("mouseleave", () => {
        bubble.interrupt().transition().duration(200)
          .attr("opacity", 0.75).attr("stroke-width", 1.5).attr("stroke", t.bg);
        tooltip.style("opacity", "0");
      });

    // Labels
    if (!small) {
      const lc = LABEL_CONFIG[d.name];
      if (lc) {
        const bubbleR = r(d.firms);
        g.append("text")
          .attr("x", x(d.tariff) + lc.dx)
          .attr("y", y(d.etrChange) + (lc.dy > 0 ? bubbleR + lc.dy : -bubbleR + lc.dy))
          .attr("text-anchor", lc.anchor)
          .attr("font-size", bubbleLabelFontSize).attr("font-weight", "600")
          .attr("fill", t.text).attr("pointer-events", "none")
          .attr("opacity", 0).text(lc.text || d.name)
          .transition().delay(1200 + i * 60).duration(400).attr("opacity", 0.9);
      }
    }
  });

  // Size legend
  if (!small) {
    const sizeLegend = g.append("g")
      .attr("transform", `translate(${w - 100}, 20)`).attr("opacity", 0);

    [10, 100].forEach((n, i) => {
      sizeLegend.append("circle")
        .attr("cx", i * 45).attr("cy", 0).attr("r", r(n))
        .attr("fill", "none").attr("stroke", t.border).attr("stroke-width", 1);
      sizeLegend.append("text")
        .attr("x", i * 45).attr("y", r(n) + 14)
        .attr("text-anchor", "middle").attr("font-size", legendFontSize).attr("fill", t.text)
        .text(`${n} firms`);
    });

    sizeLegend.transition().delay(2000).duration(500).attr("opacity", 1);
  }
}

export default function BubbleScatterChart({
  projectUrl = "#project-tariffs",
  maxWidth = 760,
}) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const hasRendered = useRef(false);

  useEffect(() => {
    const svgEl = svgRef.current;
    const containerEl = containerRef.current;
    const tooltipEl = tooltipRef.current;
    if (!svgEl || !containerEl || !tooltipEl) return;

    const dims = getDims(containerEl, maxWidth);
    svgEl.setAttribute("width", String(dims.width));
    svgEl.setAttribute("height", String(dims.height));

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRendered.current) {
          hasRendered.current = true;
          renderChart(svgEl, tooltipEl, getDims(containerEl, maxWidth));
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(svgEl);

    const onResize = () => {
      if (!hasRendered.current) return;
      renderChart(svgEl, tooltipEl, getDims(containerEl, maxWidth));
    };
    window.addEventListener("resize", onResize);

    // Re-render on theme change
    const themeObs = new MutationObserver(() => {
      if (hasRendered.current) renderChart(svgEl, tooltipEl, getDims(containerEl, maxWidth));
    });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      obs.disconnect();
      window.removeEventListener("resize", onResize);
      themeObs.disconnect();
    };
  }, [maxWidth]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: `${maxWidth}px`,
        margin: "0 auto",
      }}
    >
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          background: "var(--white)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "10px 14px",
          fontSize: "12px",
          lineHeight: "1.6",
          color: "var(--text)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          transition: "opacity 0.15s ease",
          zIndex: 10,
        }}
      />

      <svg ref={svgRef} style={{ display: "block" }} />

      {projectUrl && (
        <a
          href={projectUrl}
          style={{
            display: "block",
            textAlign: "center",
            marginTop: "0.75rem",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          View full project &rarr;
        </a>
      )}
    </div>
  );
}
