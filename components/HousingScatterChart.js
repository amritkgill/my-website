"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const DATA = [
  { year: 1975, hpi: 61.09, unemployment: 8.47, cpi: 65.30 },
  { year: 1976, hpi: 65.53, unemployment: 7.72, cpi: 69.06 },
  { year: 1977, hpi: 73.44, unemployment: 7.07, cpi: 73.55 },
  { year: 1978, hpi: 83.75, unemployment: 6.07, cpi: 79.16 },
  { year: 1979, hpi: 95.13, unemployment: 5.83, cpi: 88.07 },
  { year: 1980, hpi: 102.67, unemployment: 7.14, cpi: 100.00 },
  { year: 1981, hpi: 107.24, unemployment: 7.60, cpi: 110.33 },
  { year: 1982, hpi: 108.46, unemployment: 9.71, cpi: 117.10 },
  { year: 1983, hpi: 116.24, unemployment: 9.62, cpi: 120.86 },
  { year: 1984, hpi: 121.46, unemployment: 7.53, cpi: 126.06 },
  { year: 1985, hpi: 127.66, unemployment: 7.19, cpi: 130.53 },
  { year: 1986, hpi: 136.38, unemployment: 6.99, cpi: 133.01 },
  { year: 1987, hpi: 145.20, unemployment: 6.19, cpi: 137.88 },
  { year: 1988, hpi: 152.99, unemployment: 5.49, cpi: 143.50 },
  { year: 1989, hpi: 161.06, unemployment: 5.27, cpi: 150.43 },
  { year: 1990, hpi: 166.11, unemployment: 5.62, cpi: 158.55 },
  { year: 1991, hpi: 169.28, unemployment: 6.82, cpi: 165.26 },
  { year: 1992, hpi: 173.99, unemployment: 7.51, cpi: 170.27 },
  { year: 1993, hpi: 178.05, unemployment: 6.90, cpi: 175.30 },
  { year: 1994, hpi: 182.58, unemployment: 6.08, cpi: 179.87 },
];

export default function HousingScatterChart({ maxWidth = 760 }) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const drawChart = () => {
      const containerWidth = containerRef.current.offsetWidth;
      const width = Math.min(containerWidth, maxWidth);
      const height = width * 0.55;
      const margin = { top: 20, right: 30, bottom: 50, left: 60 };
      const innerW = width - margin.left - margin.right;
      const innerH = height - margin.top - margin.bottom;

      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const textColor = isDark ? "#E8E4DF" : "#2C2C2C";
      const mutedColor = isDark ? "#a89d91" : "#5c5148";
      const gridColor = isDark ? "#3a3a3a" : "#e0d6cc";
      const accentColor = isDark ? "#5BC49E" : "#2A9D6E";

      d3.select(svgRef.current).selectAll("*").remove();
      d3.select(containerRef.current).selectAll(".housing-tooltip").remove();

      const svg = d3.select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`);

      const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3.scaleLinear()
        .domain([4.5, 10.5])
        .range([0, innerW]);

      const y = d3.scaleLinear()
        .domain([50, 195])
        .range([innerH, 0]);

      // Grid lines
      g.selectAll(".grid-y")
        .data(y.ticks(5))
        .join("line")
        .attr("x1", 0).attr("x2", innerW)
        .attr("y1", d => y(d)).attr("y2", d => y(d))
        .attr("stroke", gridColor).attr("stroke-width", 0.5);

      // Axes
      g.append("g")
        .attr("transform", `translate(0,${innerH})`)
        .call(d3.axisBottom(x).ticks(6).tickFormat(d => d + "%"))
        .call(g => g.select(".domain").attr("stroke", gridColor))
        .call(g => g.selectAll(".tick text").attr("fill", mutedColor).style("font-size", "0.75rem").style("font-weight", 600))
        .call(g => g.selectAll(".tick line").attr("stroke", gridColor));

      g.append("g")
        .call(d3.axisLeft(y).ticks(5))
        .call(g => g.select(".domain").attr("stroke", gridColor))
        .call(g => g.selectAll(".tick text").attr("fill", mutedColor).style("font-size", "0.75rem").style("font-weight", 600))
        .call(g => g.selectAll(".tick line").attr("stroke", gridColor));

      // Axis labels
      g.append("text")
        .attr("x", innerW / 2).attr("y", innerH + 40)
        .attr("text-anchor", "middle")
        .attr("fill", mutedColor)
        .style("font-size", "0.8rem").style("font-weight", 700)
        .text("Unemployment Rate");

      g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerH / 2).attr("y", -45)
        .attr("text-anchor", "middle")
        .attr("fill", mutedColor)
        .style("font-size", "0.8rem").style("font-weight", 700)
        .text("House Price Index");

      // Regression line (from OLS: HPI = -3.76 * unemployment + 1.02 * CPI + constant)
      // Simple bivariate for this viz: regress HPI on unemployment only
      const n = DATA.length;
      const meanX = d3.mean(DATA, d => d.unemployment);
      const meanY = d3.mean(DATA, d => d.hpi);
      const slope = d3.sum(DATA, d => (d.unemployment - meanX) * (d.hpi - meanY)) /
                    d3.sum(DATA, d => (d.unemployment - meanX) ** 2);
      const intercept = meanY - slope * meanX;

      const lineX1 = 4.5, lineX2 = 10.5;
      g.append("line")
        .attr("x1", x(lineX1)).attr("y1", y(intercept + slope * lineX1))
        .attr("x2", x(lineX2)).attr("y2", y(intercept + slope * lineX2))
        .attr("stroke", mutedColor)
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "6,4")
        .attr("opacity", 0.5);

      // Tooltip
      const tooltip = d3.select(containerRef.current).selectAll(".housing-tooltip").data([0]);
      const tooltipEl = tooltip.enter()
        .append("div")
        .attr("class", "housing-tooltip")
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
        .style("z-index", 10)
        .merge(tooltip);

      // Points
      g.selectAll("circle")
        .data(DATA)
        .join("circle")
        .attr("cx", d => x(d.unemployment))
        .attr("cy", d => y(d.hpi))
        .attr("r", 5)
        .attr("fill", accentColor)
        .attr("opacity", 0.8)
        .attr("stroke", "white")
        .attr("stroke-width", 1)
        .style("cursor", "pointer")
        .on("mouseenter", function(event, d) {
          d3.select(this).transition().duration(150).attr("r", 8).attr("opacity", 1);
          tooltipEl
            .html(`<strong>${d.year}</strong><br/>HPI: ${d.hpi.toFixed(1)}<br/>Unemployment: ${d.unemployment.toFixed(1)}%`)
            .style("opacity", 1);
        })
        .on("mousemove", function(event) {
          const bounds = containerRef.current.getBoundingClientRect();
          tooltipEl
            .style("left", (event.clientX - bounds.left + 12) + "px")
            .style("top", (event.clientY - bounds.top - 10) + "px");
        })
        .on("mouseleave", function() {
          d3.select(this).transition().duration(150).attr("r", 5).attr("opacity", 0.8);
          tooltipEl.style("opacity", 0);
        });

      // Year labels for a few key points
      const labeled = DATA.filter(d => [1975, 1982, 1988, 1994].includes(d.year));
      g.selectAll(".year-label")
        .data(labeled)
        .join("text")
        .attr("x", d => x(d.unemployment) + 8)
        .attr("y", d => y(d.hpi) - 8)
        .attr("fill", mutedColor)
        .style("font-size", "0.7rem")
        .style("font-weight", 600)
        .text(d => d.year);
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
