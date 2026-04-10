"use client";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <h1 className="hero-name">Amrit Gill</h1>
      <div className="hero-layout">
        <div className="hero-photo-col">
          <img src="/amrit.png" alt="Amrit Gill" className="hero-photo" />
        </div>
        <div className="hero-bio-col">
          <p className="hero-bio">
            Hi! I'm Amrit. I use data and economics to understand how the world works. This is my portfolio of projects and writing. Outside of this, I'm usually out hiking.
          </p>
        </div>
      </div>
      <div className="hero-arrow" style={{ marginTop: "auto", textAlign: "center", paddingBottom: "32px" }}>
        <a href="#featured" style={{ display: "inline-block", animation: "bounce 1.8s ease-in-out infinite" }}>
          <svg width="36" height="20" viewBox="0 0 36 20" fill="none">
            <polyline
              points="2,2 18,18 34,2"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
