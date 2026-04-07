"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import SkillCloud from "@/components/SkillCloud";
import Timeline from "@/components/Timeline";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";

const projects = [
  {
    slug: "tariffs",
    title: "Tariffs & Corporate Profit Shifting",
    type: "Capstone Research",
    date: "May 2026",
    badge: "In Progress",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    bullets: [
      "Analyzing Bloomberg panel data across multinational firms to quantify how U.S. tariff changes drive profit shifting to low-tax jurisdictions",
      "Applying difference-in-differences estimation to isolate causal effects of tariff exposure on reported pre-tax income allocation",
      "Integrating USITC tariff schedule data with firm-level financials to construct treatment intensity measures",
    ],
    tools: ["Python", "Panel Data", "Diff-in-Diff", "Bloomberg"],
    vizData: [
      { height: 30, color: "var(--crimson)", label: "2017" },
      { height: 35, color: "var(--teal)", label: "2018" },
      { height: 65, color: "var(--gold)", label: "2019" },
      { height: 80, color: "var(--rich-red)", label: "2020" },
      { height: 70, color: "var(--teal-deep)", label: "2021" },
      { height: 90, color: "var(--antique-gold)", label: "2022" },
      { height: 85, color: "var(--gold)", label: "2023" },
    ],
    gradient: "linear-gradient(135deg, var(--crimson), var(--rich-red))",
    overview:
      "This capstone investigates how escalating U.S. tariffs influence corporate profit-shifting behavior among multinational enterprises. By linking Bloomberg firm-level financial data with USITC tariff schedules, the study constructs a novel panel dataset to measure tariff exposure intensity. A difference-in-differences framework isolates the causal relationship between tariff shocks and changes in pre-tax income reported across jurisdictions, shedding light on the intersection of trade policy and corporate tax avoidance.",
    findings:
      "Preliminary results suggest that firms with higher tariff exposure significantly increased the share of profits booked in low-tax affiliates following major tariff escalations. The effect is most pronounced among firms in manufacturing and technology sectors with complex global supply chains. These findings have implications for both trade policy design and international tax enforcement.",
  },
  {
    slug: "market-reaction",
    title: "Market Reaction to Economic Announcements",
    type: "Econometric Analysis",
    date: "May 2025",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    bullets: [
      "Built OLS regression models to measure S&P 500 sensitivity to macroeconomic data releases",
      "Quantified the outsized impact of Federal Reserve announcements versus other economic indicators",
      "Analyzed VIX-based volatility dynamics surrounding scheduled economic events",
    ],
    tools: ["Python", "OLS Regression", "statsmodels", "VIX"],
    vizData: [
      { height: 45, color: "var(--crimson)", label: "CPI" },
      { height: 35, color: "var(--teal)", label: "GDP" },
      { height: 90, color: "var(--gold)", label: "Fed" },
      { height: 40, color: "var(--rich-red)", label: "Jobs" },
      { height: 55, color: "var(--teal-deep)", label: "Trade" },
      { height: 30, color: "var(--antique-gold)", label: "PMI" },
    ],
    gradient: "linear-gradient(135deg, var(--teal), var(--teal-deep))",
    overview:
      "This project examines how equity markets respond to scheduled macroeconomic announcements, with a focus on distinguishing the magnitude of reactions across different indicator types. Using daily S&P 500 returns and the VIX volatility index, OLS regression models capture the surprise component of CPI, GDP, employment, and Federal Reserve releases to estimate their market-moving power.",
    findings:
      "Federal Reserve announcements produced the largest and most statistically significant market reactions, roughly twice the magnitude of CPI or employment surprises. Volatility, as measured by the VIX, spiked most sharply in the 24 hours preceding Fed decisions and compressed rapidly afterward. Non-farm payroll surprises ranked second in impact, while GDP and trade balance releases showed muted effects once controlling for prior information.",
  },
  {
    slug: "solar-energy",
    title: "Predicting Solar Energy Production",
    type: "Machine Learning",
    date: "Mar 2025",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
    bullets: [
      "Trained a Random Forest model on weather and irradiance features to forecast daily solar output",
      "Achieved an R\u00B2 of 0.87, accurately capturing seasonal and cloud-cover variation",
      "Validated model robustness with k-fold cross-validation to prevent overfitting",
    ],
    tools: ["Python", "scikit-learn", "Random Forest", "Cross-Validation"],
    vizData: [
      { height: 20, color: "var(--teal-deep)", label: "Jan" },
      { height: 35, color: "var(--teal)", label: "Mar" },
      { height: 60, color: "var(--gold)", label: "May" },
      { height: 85, color: "var(--antique-gold)", label: "Jul" },
      { height: 70, color: "var(--rich-red)", label: "Sep" },
      { height: 30, color: "var(--crimson)", label: "Nov" },
    ],
    gradient: "linear-gradient(135deg, var(--gold), var(--antique-gold))",
    overview:
      "This project applies machine learning to forecast daily solar energy production using meteorological and irradiance data. A Random Forest regressor was trained on features including temperature, humidity, cloud cover, and solar irradiance to predict kilowatt-hour output. The goal was to build a reliable forecasting tool that could help grid operators and solar farm managers plan energy dispatch more effectively.",
    findings:
      "The Random Forest model achieved an R\u00B2 of 0.87 on held-out test data, with solar irradiance and cloud cover emerging as the two most important predictive features. K-fold cross-validation confirmed stable performance across folds, indicating the model generalizes well beyond the training set. Seasonal patterns were captured effectively, with summer months predicted most accurately and winter months showing slightly higher error due to greater cloud variability.",
  },
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Hero />


      {/* Experience */}
      <section id="experience" className="fade-in">
        <Timeline />
      </section>


    </main>
  );
}
