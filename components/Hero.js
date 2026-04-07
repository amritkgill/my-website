"use client";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-layout">
        <div className="hero-left">
          <h1 className="hero-name">
            Amrit<br />
            <span className="hero-name-last">Gill</span>
          </h1>
          <a href="#projects" className="hero-cta">See My Work</a>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
}
