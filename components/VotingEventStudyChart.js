"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

// Event study coefficients from the compulsory voting regression
// Reference year is -1 (coefficient = 0)
const DATA = [
  { rel: -3, coef: 0.20, se: 3.326 },
  { rel: -1, coef: 0, se: 0 },
  { rel: 0, coef: 2.26, se: 1.328 },
  { rel: 1, coef: 9.64, se: 2.294 },
  { rel: 2, coef: -4.22, se: 4.343 },
  { rel: 3, coef: 2.63, se: 2.151 },
  { rel: 4, coef: 13.61, se: 1.156 },
];

export default function VotingEventStudyChart({ maxWidth = 760 }) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const drawChart = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const width = Math.min(containerWidth, maxWidth);
      const height = width * 0.5;
      const margin = { top: 20, right: 30, bottom: 50, left: 60 };
      const innerW = width - margin.left - margin.right;
      const innerH = height - margin.top - margin.bottom;

      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const textColor = isDark ? "#E8E4DF" : "#2C2C2C";
      const mutedColor = isDark ? "#a89d91" : "#5c5148";
      const gridColor = isDark ? "#3a3a3a" : "#e0d6cc";
      const accentColor = isDark ? "#B07CC6" : "#7B2D8E";
      const ciColor = isDark ? "rgba(176,124,198,0.2)" : "rgba(123,45,142,0.15)";

      d3.select(svgRef.current).selectAll("*").remove();
      d3.select(containerRef.current).selectAll(".voting-tooltip").remove();

      const svg = d3.select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`);

      const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3.scaleLinear()
        .domain([-3.5, 4.5])
        .range([0, innerW]);

      const y = d3.scaleLinear()
        .domain([-20, 25])
        .range([innerH, 0]);

      // Grid lines
      g.selectAll(".grid-y")
        .data(y.ticks(5))
        .join("line")
        .attr("x1", 0).attr("x2", innerW)
        .attr("y1", d => y(d)).attr("y2", d => y(d))
        .attr("stroke", gridColor).attr("stroke-width", 0.5);

      // Zero line
      g.append("line")
        .attr("x1", 0).attr("x2", innerW)
        .attr("y1", y(0)).attr("y2", y(0))
        .attr("stroke", mutedColor).attr("stroke-width", 1)
        .attr("stroke-dasharray", "4,3");

      // Vertical line at adoption (rel_year = 0)
      g.append("line")
        .attr("x1", x(-0.5)).attr("x2", x(-0.5))
        .attr("y1", 0).attr("y2", innerH)
        .attr("stroke", mutedColor).attr("stroke-width", 1.5)
        .attr("stroke-dasharray", "6,4")
        .attr("opacity", 0.5);

      g.append("text")
        .attr("x", x(-0.5)).attr("y", -6)
        .attr("text-anchor", "middle")
        .attr("fill", mutedColor)
        .style("font-size", "0.65rem").style("font-weight", 700)
        .text("Law adopted");

      // Axes
      g.append("g")
        .attr("transform", `translate(0,${innerH})`)
        .call(d3.axisBottom(x).ticks(9).tickFormat(d => d > 0 ? `+${d}` : d))
        .call(g => g.select(".domain").attr("stroke", gridColor))
        .call(g => g.selectAll(".tick text").attr("fill", mutedColor).style("font-size", "0.75rem").style("font-weight", 600))
        .call(g => g.selectAll(".tick line").attr("stroke", gridColor));

      g.append("g")
        .call(d3.axisLeft(y).ticks(5).tickFormat(d => d + " pp"))
        .call(g => g.select(".domain").attr("stroke", gridColor))
        .call(g => g.selectAll(".tick text").attr("fill", mutedColor).style("font-size", "0.75rem").style("font-weight", 600))
        .call(g => g.selectAll(".tick line").attr("stroke", gridColor));

      // Axis labels
      g.append("text")
        .attr("x", innerW / 2).attr("y", innerH + 40)
        .attr("text-anchor", "middle")
        .attr("fill", mutedColor)
        .style("font-size", "0.8rem").style("font-weight", 700)
        .text("Years relative to adoption");

      // Confidence intervals (vertical lines)
      g.selectAll(".ci")
        .data(DATA.filter(d => d.se > 0))
        .join("line")
        .attr("x1", d => x(d.rel)).attr("x2", d => x(d.rel))
        .attr("y1", d => y(d.coef - 1.96 * d.se))
        .attr("y2", d => y(d.coef + 1.96 * d.se))
        .attr("stroke", accentColor)
        .attr("stroke-width", 2)
        .attr("opacity", 0.3);

      // Tooltip
      const tooltipEl = d3.select(containerRef.current)
        .append("div")
        .attr("class", "voting-tooltip")
        .style("position", "absolute")
        .style("pointer-events", "none")
        .style("background", isDark ? "#2a2a2a" : "#fff")
        .style("border", `1px solid ${gridColor}`)
        .style("border-radius", "8px")
        .style("padding", "8px 12px")
        .style("font-size", "0.75rem")
        .style("font-weight", "600")
        .style("color", textColor)
        .style("box-shadow", "0 4px 12px rgba(0,0,0,0.1)")
        .style("opacity", 0)
        .style("z-index", 10);

      // Points
      g.selectAll("circle")
        .data(DATA)
        .join("circle")
        .attr("cx", d => x(d.rel))
        .attr("cy", d => y(d.coef))
        .attr("r", d => d.rel === -1 ? 4 : 5)
        .attr("fill", d => d.rel === -1 ? mutedColor : accentColor)
        .attr("opacity", 0.9)
        .attr("stroke", "white")
        .attr("stroke-width", 1)
        .style("cursor", "pointer")
        .on("mouseenter", function(event, d) {
          d3.select(this).transition().duration(150).attr("r", 8).attr("opacity", 1);
          const label = d.rel === -1 ? "Reference year" : `${d.coef > 0 ? "+" : ""}${d.coef.toFixed(1)} pp`;
          tooltipEl
            .html(`<strong>Year ${d.rel > 0 ? "+" : ""}${d.rel}</strong><br/>${label}`)
            .style("opacity", 1);
        })
        .on("mousemove", function(event) {
          const bounds = containerRef.current.getBoundingClientRect();
          tooltipEl
            .style("left", (event.clientX - bounds.left + 12) + "px")
            .style("top", (event.clientY - bounds.top - 10) + "px");
        })
        .on("mouseleave", function(d) {
          const datum = d3.select(this).datum();
          d3.select(this).transition().duration(150).attr("r", datum.rel === -1 ? 4 : 5).attr("opacity", 0.9);
          tooltipEl.style("opacity", 0);
        });

      // Connect points with line
      const line = d3.line()
        .x(d => x(d.rel))
        .y(d => y(d.coef));

      g.append("path")
        .datum(DATA)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", accentColor)
        .attr("stroke-width", 1.5)
        .attr("opacity", 0.4);
    };

    drawChart();
    const observer = new ResizeObserver(drawChart);
    observer.observe(containerRef.current);
    const themeObs = new MutationObserver(drawChart);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => { observer.disconnect(); themeObs.disconnect(); };
  }, [maxWidth]);

  return (
    <div ref={containerRef} style={{ width: "100%", display: "flex", justifyContent: "center", position: "relative" }}>
      <svg ref={svgRef} />
    </div>
  );
}
