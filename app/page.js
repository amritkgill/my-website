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

      {/* About */}
      <section id="about" className="fade-in">
        <h2 className="section-title">About Me</h2>
        <p className="about-text">
          I am an economist and data enthusiast currently pursuing my MS in
          Applied Economics at the University of San Francisco. My work lives at
          the intersection of economic theory and modern data science — I use
          causal inference, panel methods, and machine learning to turn complex
          datasets into clear, policy-relevant stories. Whether it is
          investigating how tariffs reshape corporate profit shifting or
          forecasting solar energy output, I am driven by curiosity and a
          commitment to rigorous, reproducible analysis.
        </p>
        <div className="education-cards">
          <div className="edu-card">
            <svg className="edu-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 2 6 3 6 3s6-1 6-3v-5" />
            </svg>
            <h3>University of San Francisco</h3>
            <p className="edu-degree">MS Applied Economics</p>
            <p className="edu-dates">Aug 2024 &ndash; May 2026</p>
            <p className="edu-gpa">GPA: 3.5</p>
            <div className="edu-tags">
              <span className="edu-tag">Econometrics</span>
              <span className="edu-tag">Causal Methods</span>
              <span className="edu-tag">Panel Data</span>
            </div>
          </div>
          <div className="edu-card">
            <svg className="edu-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 2 6 3 6 3s6-1 6-3v-5" />
            </svg>
            <h3>Texas A&amp;M University</h3>
            <p className="edu-degree">BS Economics</p>
            <p className="edu-dates">Aug 2021 &ndash; May 2024</p>
            <p className="edu-gpa">GPA: 3.6</p>
            <div className="edu-tags">
              <span className="edu-tag">Economics</span>
              <span className="edu-tag">Data Analysis</span>
              <span className="edu-tag">Statistics</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="fade-in">
        <SkillCloud />
      </section>

      {/* Projects */}
      <section id="projects" className="fade-in">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">
          Click a card to flip it. Then expand for the full story.
        </p>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              onExpand={() => openModal(project)}
            />
          ))}
        </div>
      </section>

      <ProjectModal
        isOpen={modalOpen}
        onClose={closeModal}
        project={selectedProject}
      />

      {/* Experience */}
      <section id="experience" className="fade-in">
        <Timeline />
      </section>

      {/* Beyond the Data */}
      <section id="hobbies" className="fade-in">
        <h2 className="section-title">Beyond the Data</h2>
        <p className="section-subtitle">When I&apos;m not crunching numbers, you can find me outside.</p>
        <div className="hobbies-grid">
          <div className="hobby-card">
            <div className="hobby-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 4l-4 16" /><path d="M3 12h18" /><path d="M8 8l-4 4 4 4" /><path d="M16 8l4 4-4 4" />
              </svg>
            </div>
            <h3>Hiking &amp; Mountains</h3>
            <p>
              There&apos;s nothing like a long trail with a good view to clear your head.
              I love exploring mountainous terrain and disconnecting from screens.
            </p>
          </div>
          <div className="hobby-card">
            <div className="hobby-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <h3>Travel</h3>
            <p>
              Exploring new places and cultures is how I recharge. From village trails to
              city streets, every trip brings a fresh perspective.
            </p>
          </div>
          <div className="hobby-card">
            <div className="hobby-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <h3>Culture &amp; Food</h3>
            <p>
              I&apos;m always seeking out local food spots, markets, and traditions wherever I go.
              Food is the best way to understand a place.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="fade-in">
        <h2 className="section-title">Let&apos;s Connect</h2>
        <p className="contact-text">
          I am always open to discussing new research opportunities, data
          projects, or potential collaborations. Feel free to reach out via email
          or connect with me on LinkedIn.
        </p>
        <div className="contact-btns">
          <a href="mailto:93amritgill@gmail.com" className="contact-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 7L2 7" />
            </svg>
            93amritgill@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/amritgill"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn
          </a>
        </div>
      </section>
    </main>
  );
}
