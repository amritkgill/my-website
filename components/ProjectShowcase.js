"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import BubbleScatterChart from "./BubbleScatterChart";
import MarketReactionChart from "./MarketReactionChart";
import SolarPredictionChart from "./SolarPredictionChart";
import HousingScatterChart from "./HousingScatterChart";

const SLIDES = [
  {
    projectUrl: "/projects/tariffs",
    label: "Featured Project",
    title: "Tariffs & Corporate Profit Shifting",
    description:
      "For my capstone, I'm investigating whether the 2018 tariffs on Chinese imports caused U.S. companies to shift profits overseas to lower their tax burden. Using data from Bloomberg and SEC filings across 1,674 firms, tariff-exposed industries saw significant declines in effective tax rates.",
    linkText: "Read the full project →",
    vizCaption: "Industries with higher tariff rates saw bigger declines in effective tax rates.",
    viz: <BubbleScatterChart projectUrl={null} maxWidth={960} />,
  },
  {
    projectUrl: "/projects/market-reaction",
    title: "Market Reaction to Announcements",
    description:
      "How much do Fed, jobs, and CPI announcements move the S&P 500?",
    linkText: "View project →",
    vizCaption: "After controlling for market conditions, how much does each announcement type move the S&P 500 overnight?",
    viz: <MarketReactionChart maxWidth={960} />,
  },
  {
    projectUrl: "/projects/solar-energy",
    title: "Predicting Solar Energy",
    description:
      "Using Random Forest to predict daily solar output from weather data.",
    linkText: "View project →",
    vizCaption: "The closer to the dashed line, the better the prediction.",
    viz: <SolarPredictionChart maxWidth={960} />,
  },
  {
    projectUrl: "/projects/housing-prices",
    title: "Macroeconomic Determinants of Housing Prices",
    description:
      "How unemployment and inflation predict U.S. housing prices.",
    linkText: "View project →",
    vizCaption: "Higher unemployment is associated with lower housing prices.",
    viz: <HousingScatterChart maxWidth={960} />,
  },
];

export default function ProjectShowcase() {
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

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    let timeout;
    const onScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const index = Math.round(container.scrollLeft / container.offsetWidth);
        setActiveIndex(index);
      }, 80);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => { container.removeEventListener("scroll", onScroll); clearTimeout(timeout); };
  }, []);

  const active = SLIDES[activeIndex];

  return (
    <section className="showcase" id="featured">
      <div className="showcase-text" key={activeIndex} style={{ animation: "fadeIn 0.3s ease" }}>
        {active.label && <span className="featured-label">{active.label}</span>}
        <Link href={active.projectUrl} className="featured-title-link">
          <h2 className="featured-title">{active.title}</h2>
        </Link>
        <p className="featured-description">{active.description}</p>
        <Link href={active.projectUrl} className="featured-link">
          {active.linkText}
        </Link>
      </div>

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
              {slide.vizCaption && <p className="carousel-slide-subtitle">{slide.vizCaption}</p>}
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
