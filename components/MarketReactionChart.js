"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const FED = [0.353,-0.0718,-0.0211,0.0391,0.1731,0.0487,-0.2672,0.035,0.5146,-0.0434,0.2204,0.0959,0.1008,-0.1398,0.0938,0.1031,0.4027,0.2014,1.905,0.1944,0.2724,0.2945,1.2209,0.0441,-0.3328,-0.3321,-0.0377,0.0537,0.0339,0.3036,0.0,0.0511,1.1861,0.6009,0.1364,0.7619,0.7718,0.4004,-0.083,-0.1023,-0.1603,-0.0207,0.0648,-0.0623,-0.1863,0.1992,0.178,0.0538,-0.5248,0.0614,-0.1323,0.627,1.2639,0.1259,0.306,-0.0489];

const CPI = [0.0946,-0.4415,0.3333,0.9616,0.2676,0.1293,0.3282,-0.5158,0.2741,-0.3168,0.5758,0.8102,-0.329,0.2027,0.145,0.1101,-0.2658,-0.1037,0.2186,-0.0687,0.2712,-0.0291,-0.2481,0.1031,-0.0846,-0.4018,-1.9844,0.3172,0.1944,-0.4482,0.6509,0.4038,-0.0059,-0.28,-0.3734,0.0274,0.2439,0.4261,0.0511,-0.5204,0.2133,-0.0812,0.1223,0.2369,0.169,-0.3205,0.4316,0.3288,-0.7426,-0.5939,0.5663,-0.2746,-1.0868,-1.03,1.4103,-1.7991,-1.5967,2.9264,1.9559,0.2003,-0.2563,0.9871,0.3106,0.5947,0.3148,0.6384,0.4344,0.0168,0.0911,1.0692,-0.0896,0.1813,-1.0791,0.3191,-0.81,0.3155,0.627,0.0231,0.1458,0.0164,-0.2365,0.0294,0.4174];

const JOBS = [0.2691,-0.4639,0.5077,-0.6412,-0.3154,0.4952,0.0391,0.0849,-0.3407,0.032,0.1852,-0.1741,1.0743,-0.0658,-0.6621,0.1655,0.3999,0.3293,-0.387,-0.3276,0.1454,0.2721,0.4323,0.5499,0.2169,-0.3065,-2.3333,-0.4752,0.9548,1.6408,0.8876,-0.2724,-0.0423,-1.2459,-0.0601,0.115,0.2956,0.1693,0.6641,0.2073,0.3143,0.1541,-0.0007,-0.0999,0.1533,0.4094,0.2703,0.0343,0.1194,-0.491,0.2185,-0.452,-0.9442,-0.3686,-0.8725,0.6986,-1.0141,1.258,-0.8969,0.4002,-1.0358,0.4178,0.5772,0.4725,-0.1599,0.2677,0.5076,-0.551,0.3803,-0.205,0.0403,0.201,0.1376,0.2278,1.1501,-0.1711,0.0161,-1.2945,0.0712,0.6564,0.311,0.1032];

const ROWS = [
  { label: "Fed Decision", short: "Fed", data: FED, coef: 0.19, color: "#1E3D34" },
  { label: "CPI Report", short: "CPI", data: CPI, coef: 0.03, color: "#E0A458" },
  { label: "Jobs Report", short: "Jobs", data: JOBS, coef: -0.01, color: "#8B1A1A" },
];

function getTheme() {
  const s = getComputedStyle(document.documentElement);
  return {
    text: s.getPropertyValue("--text").trim(),
    muted: s.getPropertyValue("--text-muted").trim(),
    bg: s.getPropertyValue("--bg").trim(),
    white: s.getPropertyValue("--white").trim(),
    border: s.getPropertyValue("--border").trim(),
    accent: document.documentElement.getAttribute("data-theme") === "dark" ? "#5BA8C4" : "#2A7D9D",
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
    ? { top: 20, right: 68, bottom: 36, left: 72 }
    : { top: 24, right: 90, bottom: 44, left: 130 };

  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;
  const rowH = h / 3;

  svg.attr("width", width).attr("height", height);
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

  const rows = ROWS.map(r => ({
    ...r,
    count: r.data.length,
    posRate: Math.round((r.data.filter(v => v > 0).length / r.data.length) * 100),
  }));

  const xMin = -0.04;
  const xMax = d3.max(rows, r => r.coef) * 1.2;
  const x = d3.scaleLinear().domain([xMin, xMax]).range([0, w]);

  const barH = Math.min(rowH * 0.52, small ? 30 : 42);

  // Gridlines
  g.append("g").selectAll("line").data(x.ticks(small ? 3 : 5).filter(d => d !== 0))
    .join("line")
    .attr("x1", d => x(d)).attr("x2", d => x(d))
    .attr("y1", 0).attr("y2", h)
    .attr("stroke", t.border).attr("stroke-opacity", 0.5);

  // Zero line
  g.append("line")
    .attr("x1", x(0)).attr("x2", x(0))
    .attr("y1", -4).attr("y2", h)
    .attr("stroke", t.border).attr("stroke-width", 1.5);

  g.append("text")
    .attr("x", x(0)).attr("y", -8)
    .attr("text-anchor", "middle")
    .attr("font-size", small ? "11px" : "14px")
    .attr("fill", t.text)
    .text("No effect");

  // X axis
  g.append("g")
    .attr("transform", `translate(0,${h})`)
    .call(
      d3.axisBottom(x).ticks(small ? 3 : 5)
        .tickFormat(d => d === 0 ? "0%" : `${d > 0 ? "+" : ""}${d.toFixed(2)}%`)
        .tickSize(0).tickPadding(8)
    )
    .call(sel => sel.select(".domain").remove())
    .selectAll("text").attr("font-size", small ? "11px" : "14px").attr("fill", t.text);

  g.append("text")
    .attr("x", w / 2).attr("y", h + (small ? 28 : 38))
    .attr("text-anchor", "middle")
    .attr("font-size", small ? "11px" : "15px")
    .attr("fill", t.text)
    .text("Effect on overnight return");

  // Tooltip
  const tooltip = d3.select(tooltipEl);
  const containerW = svgEl.parentElement?.offsetWidth || width;

  // Bars
  rows.forEach((row, ri) => {
    const yC = ri * rowH + rowH / 2;
    const barY = yC - barH / 2;

    g.append("text")
      .attr("x", -10).attr("y", yC - (small ? 3 : 5))
      .attr("text-anchor", "end").attr("dominant-baseline", "central")
      .attr("font-size", small ? "11px" : "15px")
      .attr("font-weight", "700")
      .attr("fill", t.text)
      .text(small ? row.short : row.label);

    g.append("text")
      .attr("x", -10).attr("y", yC + (small ? 10 : 13))
      .attr("text-anchor", "end").attr("dominant-baseline", "central")
      .attr("font-size", small ? "11px" : "14px")
      .attr("fill", t.muted)
      .text(`${row.count} days`);

    const zeroX = x(0);
    const barEndX = x(row.coef);
    const barX = Math.min(zeroX, barEndX);
    const barW = Math.abs(barEndX - zeroX);

    const bar = g.append("rect")
      .attr("x", zeroX).attr("y", barY)
      .attr("width", 0).attr("height", barH)
      .attr("fill", row.color)
      .attr("rx", small ? 3 : 4)
      .attr("opacity", 0.82);

    bar.transition()
      .delay(300 + ri * 280)
      .duration(900)
      .ease(d3.easeQuadOut)
      .attr("x", barX)
      .attr("width", barW);

    g.append("rect")
      .attr("x", 0).attr("y", barY - 6)
      .attr("width", w).attr("height", barH + 12)
      .attr("fill", "transparent").style("cursor", "pointer")
      .on("mouseenter", (event) => {
        bar.interrupt().transition().duration(100).attr("opacity", 1);
        const tipX = Math.min(event.offsetX + 14, containerW - 220);
        const tipY = Math.max(event.offsetY - 70, 4);
        tooltip.style("opacity", "1")
          .style("left", `${tipX}px`).style("top", `${tipY}px`)
          .html(
            `<strong>${row.label}</strong><br/>` +
            `Effect: <span style="color:${row.coef >= 0 ? "#27ae60" : t.accent};font-weight:700">${row.coef >= 0 ? "+" : ""}${row.coef.toFixed(2)}%</span> overnight return<br/>` +
            `Market rose ${row.posRate}% of the time<br/>` +
            `<span style="color:${t.muted}">${row.count} announcement days measured</span>`
          );
      })
      .on("mousemove", (event) => {
        tooltip.style("left", `${Math.min(event.offsetX + 14, containerW - 220)}px`)
          .style("top", `${Math.max(event.offsetY - 70, 4)}px`);
      })
      .on("mouseleave", () => {
        bar.interrupt().transition().duration(100).attr("opacity", 0.82);
        tooltip.style("opacity", "0");
      });

    const labelX = row.coef >= 0 ? barEndX + 8 : barX - 8;
    const labelAnchor = row.coef >= 0 ? "start" : "end";
    g.append("text")
      .attr("x", zeroX).attr("y", yC)
      .attr("text-anchor", labelAnchor)
      .attr("dominant-baseline", "central")
      .attr("font-size", small ? "11px" : "14px")
      .attr("font-weight", "700")
      .attr("fill", t.text)
      .attr("opacity", 0)
      .text(`${row.coef >= 0 ? "+" : ""}${row.coef.toFixed(2)}%`)
      .transition().delay(300 + ri * 280 + 700).duration(400)
      .attr("opacity", 1)
      .attr("x", labelX);
  });
}

export default function MarketReactionChart({ maxWidth = 960 }) {
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
        gap: "16px",
        marginTop: "6px",
        fontSize: "0.7rem",
        color: "var(--text-muted)",
      }}>
        <span>S&P 500, 2018–2024</span>
      </div>
    </div>
  );
}
