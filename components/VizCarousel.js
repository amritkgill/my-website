"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import SolarPredictionChart from "./SolarPredictionChart";
import MarketReactionChart from "./MarketReactionChart";

function PlaceholderViz({ title, description, tag }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "340px",
      gap: "16px",
      padding: "40px 24px",
    }}>
      <span style={{
        fontSize: "0.65rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "2px",
        color: "var(--accent)",
      }}>{tag}</span>
      <p style={{
        fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
        fontWeight: 700,
        color: "var(--text)",
        textAlign: "center",
        lineHeight: 1.2,
        maxWidth: "520px",
      }}>{title}</p>
      <p style={{
        fontSize: "0.9rem",
        color: "var(--text-muted)",
        textAlign: "center",
        maxWidth: "400px",
        lineHeight: 1.6,
      }}>{description}</p>
      <div style={{
        marginTop: "24px",
        padding: "10px 20px",
        border: "1px solid var(--border)",
        borderRadius: "20px",
        fontSize: "0.75rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "1.5px",
        color: "var(--text-muted)",
      }}>
        Visualization coming soon
      </div>
    </div>
  );
}

const SLIDES = [
  {
    projectUrl: "/projects/market-reaction",
    title: "Market Reaction to Announcements",
    subtitle: "After controlling for market conditions, how much does each announcement type move the S\u0026P 500 overnight?",
    note: "Adjusted for volatility and prior returns.",
    viz: <MarketReactionChart maxWidth={960} />,
  },
  {
    projectUrl: "/projects/solar-energy",
    title: "Predicting Solar Energy",
    subtitle: "The x-axis is the actual energy produced, and the y-axis is what a machine learning model predicted from weather alone. The closer to the dashed line, the better the guess.",
    viz: <SolarPredictionChart maxWidth={960} />,
  },
];

export default function VizCarousel() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (index) => {
    const container = scrollRef.current;
    if (!container) return;
    const slideWidth = container.offsetWidth;
    container.scrollTo({ left: index * slideWidth, behavior: "smooth" });
    setActiveIndex(index);
  };

  const prev = () => scrollTo(Math.max(0, activeIndex - 1));
  const next = () => scrollTo(Math.min(SLIDES.length - 1, activeIndex + 1));

  // Keep activeIndex in sync when user swipes manually
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const onScroll = () => {
      const index = Math.round(container.scrollLeft / container.offsetWidth);
      setActiveIndex(index);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="chart-section" className="chart-section">
      {/* Arrows + scroll container in a row */}
      <div className="carousel-row">
        <button
          onClick={prev}
          disabled={activeIndex === 0}
          className="carousel-btn"
          aria-label="Previous"
        >
          <svg width="16" height="28" viewBox="0 0 16 28" fill="none">
            <polyline points="14,2 2,14 14,26" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div ref={scrollRef} className="carousel-scroll">
          {SLIDES.map((slide, i) => (
            <Link key={i} href={slide.projectUrl} className="carousel-slide">
              <h2 className="carousel-slide-title">{slide.title}</h2>
              <p className="carousel-slide-subtitle">{slide.subtitle}</p>
              {slide.note && (
                <p className="carousel-slide-subtitle" style={{ marginTop: "-24px", fontSize: "0.75rem", color: "var(--text-muted)", opacity: 0.6 }}>{slide.note}</p>
              )}
              {slide.viz}
            </Link>
          ))}
        </div>

        <button
          onClick={next}
          disabled={activeIndex === SLIDES.length - 1}
          className="carousel-btn"
          aria-label="Next"
        >
          <svg width="16" height="28" viewBox="0 0 16 28" fill="none">
            <polyline points="2,2 14,14 2,26" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="carousel-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`carousel-dot${i === activeIndex ? " active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
