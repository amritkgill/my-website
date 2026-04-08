"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const DATA = [
  {a:0,p:114},{a:0,p:2},{a:0,p:135},{a:0,p:4},{a:5,p:27},
  {a:319,p:371},{a:391,p:315},{a:493,p:234},{a:532,p:604},{a:546,p:467},
  {a:680,p:620},{a:760,p:1184},{a:781,p:438},{a:812,p:942},{a:868,p:361},
  {a:982,p:1809},{a:1085,p:892},{a:1089,p:967},{a:1163,p:1384},{a:1189,p:1607},
  {a:1265,p:1254},{a:1287,p:916},{a:1338,p:1200},{a:1479,p:914},{a:1507,p:1364},
  {a:1607,p:2463},{a:1655,p:1374},{a:1674,p:2072},{a:1700,p:1045},{a:1764,p:1892},
  {a:1897,p:2033},{a:1993,p:1786},{a:2032,p:1136},{a:2040,p:1425},{a:2064,p:1770},
  {a:2188,p:2480},{a:2211,p:1318},{a:2232,p:2348},{a:2375,p:1740},{a:2396,p:1915},
  {a:2480,p:3030},{a:2628,p:2142},{a:2701,p:2414},{a:2705,p:2726},{a:2771,p:2260},
  {a:2806,p:3140},{a:2806,p:2100},{a:2899,p:3084},{a:3044,p:2267},{a:3058,p:2866},
  {a:3128,p:2140},{a:3224,p:2948},{a:3325,p:2199},{a:3352,p:3129},{a:3366,p:2052},
  {a:3436,p:3024},{a:3467,p:2455},{a:3621,p:908},{a:3629,p:3036},{a:3650,p:3422},
];

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
    ? { top: 12, right: 16, bottom: 38, left: 46 }
    : { top: 20, right: 32, bottom: 50, left: 60 };
  const tickFont = small ? "11px" : "14px";
  const labelFont = small ? "11px" : "15px";

  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;

  svg.attr("width", width).attr("height", height);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const domain = [0, 4000];
  const x = d3.scaleLinear().domain(domain).range([0, w]);
  const y = d3.scaleLinear().domain(domain).range([h, 0]);

  // Grid
  const ticks = small ? 4 : 5;
  g.append("g").selectAll("line").data(y.ticks(ticks)).join("line")
    .attr("x1", 0).attr("x2", w)
    .attr("y1", d => y(d)).attr("y2", d => y(d))
    .attr("stroke", t.border).attr("stroke-opacity", 0.5).attr("stroke-width", 1);

  // Perfect-prediction diagonal
  const diag = g.append("line")
    .attr("x1", x(0)).attr("y1", y(0))
    .attr("x2", x(0)).attr("y2", y(0))
    .attr("stroke", t.border).attr("stroke-width", 1.5)
    .attr("stroke-dasharray", "6 4").attr("opacity", 0.6);

  diag.transition().delay(300).duration(800).ease(d3.easeQuadOut)
    .attr("x2", x(4000)).attr("y2", y(4000));

  // Axes
  g.append("g")
    .attr("transform", `translate(0,${h})`)
    .call(
      d3.axisBottom(x).ticks(ticks)
        .tickFormat(d => d === 0 ? "0" : `${(d / 1000).toFixed(0)}k`)
        .tickSize(0).tickPadding(8)
    )
    .call(sel => sel.select(".domain").remove())
    .selectAll("text").attr("font-size", tickFont).attr("fill", t.text);

  g.append("g")
    .call(
      d3.axisLeft(y).ticks(ticks)
        .tickFormat(d => d === 0 ? "0" : `${(d / 1000).toFixed(0)}k`)
        .tickSize(0).tickPadding(8)
    )
    .call(sel => sel.select(".domain").remove())
    .selectAll("text").attr("font-size", tickFont).attr("fill", t.text);

  // Axis labels
  g.append("text")
    .attr("x", w / 2).attr("y", h + (small ? 30 : 42))
    .attr("text-anchor", "middle").attr("font-size", labelFont).attr("fill", t.text)
    .text("Actual Output (Wh)");

  g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", small ? -34 : -44).attr("x", -h / 2)
    .attr("text-anchor", "middle").attr("font-size", labelFont).attr("fill", t.text)
    .text("Predicted Output (Wh)");

  // Tooltip
  const tooltip = d3.select(tooltipEl);
  const containerWidth = svgEl.parentElement?.offsetWidth || width;

  // Dots
  const dotColor = "#0047AB";

  DATA.forEach((d, i) => {
    const dot = g.append("circle")
      .attr("cx", x(d.a))
      .attr("cy", y(d.a))
      .attr("r", 0)
      .attr("fill", dotColor)
      .attr("opacity", 0);

    dot.transition()
      .delay(400 + i * 20)
      .duration(600)
      .ease(d3.easeBackOut.overshoot(0.5))
      .attr("cy", y(d.p))
      .attr("r", small ? 4.5 : 6)
      .attr("opacity", 0.65);

    g.append("circle")
      .attr("cx", x(d.a)).attr("cy", y(d.p))
      .attr("r", 12).attr("fill", "transparent").style("cursor", "pointer")
      .on("mouseenter", (event) => {
        dot.interrupt().transition().duration(120)
          .attr("r", small ? 7 : 9).attr("opacity", 1);
        const tipLeft = Math.min(event.offsetX + 14, containerWidth - 170);
        const tipTop = Math.max(event.offsetY - 50, 4);
        tooltip.style("opacity", "1")
          .style("left", `${tipLeft}px`)
          .style("top", `${tipTop}px`)
          .html(
            `Actual: <strong>${d.a.toLocaleString()} Wh</strong><br/>` +
            `Predicted: <strong>${d.p.toLocaleString()} Wh</strong>`
          );
      })
      .on("mousemove", (event) => {
        tooltip.style("left", `${Math.min(event.offsetX + 14, containerWidth - 170)}px`)
          .style("top", `${Math.max(event.offsetY - 50, 4)}px`);
      })
      .on("mouseleave", () => {
        dot.interrupt().transition().duration(120)
          .attr("r", small ? 4.5 : 6).attr("opacity", 0.65);
        tooltip.style("opacity", "0");
      });
  });
}

export default function SolarPredictionChart({ maxWidth = 960 }) {
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
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "24px",
        marginTop: "8px",
        fontSize: "0.75rem",
        color: "var(--text-muted)",
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: "#0047AB", opacity: 0.7, display: "inline-block",
          }} />
          Model prediction
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{
            width: "16px", height: "0", borderTop: "1.5px dashed var(--border)",
            display: "inline-block",
          }} />
          Perfect accuracy
        </span>
      </div>
    </div>
  );
}
