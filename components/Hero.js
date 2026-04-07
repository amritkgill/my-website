"use client";

import { useState } from "react";

const projects = [
  {
    id: "tariffs",
    title: "Tariffs & Corporate Profit Shifting",
    subtitle: "Capstone \u00b7 In Progress",
    bullets: [
      "Section 301 tariffs and foreign profit shifting",
      "Diff-in-diff on Bloomberg panel data",
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    id: "market-reaction",
    title: "Market Reaction to Announcements",
    subtitle: "Econometrics",
    bullets: [
      "S&P 500 response to macroeconomic announcements",
      "OLS with VIX interaction terms",
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    id: "solar-energy",
    title: "Predicting Solar Energy",
    subtitle: "Machine Learning",
    bullets: ["Random Forest on weather and irradiance data"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  },
];

export default function Hero() {
  const [openProject, setOpenProject] = useState(null);

  return (
    <>
      <section className="hero" id="hero">
        <div className="hero-three-col">
          <div className="hero-col hero-col-intro">
            <h1 className="hero-name">
              Amrit Gill
            </h1>
            <img src="/amrit.png" alt="Amrit Gill" className="hero-photo" />
          </div>

          <div className="hero-col hero-col-edu">
            <h2 className="hero-col-title">Projects</h2>
            {projects.map((p) => (
              <button
                key={p.id}
                className="hero-project-card"
                onClick={() => setOpenProject(p)}
              >
                <div className="hero-project-card-header">
                  <div className="hero-project-icon">{p.icon}</div>
                  <div>
                    <h3>{p.title}</h3>
                    <p className="hero-exp-company">{p.subtitle}</p>
                  </div>
                </div>
                <ul>
                  {p.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          <div className="hero-col hero-col-exp">
            <h2 className="hero-col-title">Education</h2>
            <div className="hero-edu-item">
              <div className="hero-edu-header">
                <img src="/usf-logo.svg" alt="USF" className="hero-edu-logo" />
                <div>
                  <h3>University of San Francisco</h3>
                  <p className="hero-edu-degree">MS Applied Economics</p>
                </div>
              </div>
              <p className="hero-edu-date">Aug 2024 &ndash; May 2026</p>
              <p className="hero-edu-gpa">GPA: 3.5</p>
            </div>
            <div className="hero-edu-item">
              <div className="hero-edu-header">
                <img src="/tamu-logo.png" alt="Texas A&amp;M" className="hero-edu-logo" />
                <div>
                  <h3>Texas A&amp;M University</h3>
                  <p className="hero-edu-degree">BS Economics</p>
                </div>
              </div>
              <p className="hero-edu-date">Aug 2021 &ndash; May 2024</p>
              <p className="hero-edu-gpa">GPA: 3.6</p>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {openProject && (
        <div className="project-dialog-overlay" onClick={() => setOpenProject(null)}>
          <div className="project-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="project-dialog-close" onClick={() => setOpenProject(null)}>
              &times;
            </button>
            <h2>{openProject.title}</h2>
            <p className="project-dialog-subtitle">{openProject.subtitle}</p>
            <div className="project-dialog-demo">
              <p>Project demo coming soon</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
