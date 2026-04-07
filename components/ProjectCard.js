"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function ProjectCard({ project, onExpand }) {
  const { title, type, date, slug, icon, badge, bullets, tools } = project;
  const [flipped, setFlipped] = useState(false);
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (flipped || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    if (cardRef.current) {
      cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  const handleMouseLeave = () => {
    if (!flipped && cardRef.current) {
      cardRef.current.style.transform = "";
    }
  };

  return (
    <div
      className="project-card-wrapper fade-in"
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`project-card${flipped ? " flipped" : ""}`}
        ref={cardRef}
        onClick={() => setFlipped((prev) => !prev)}
      >
        <div className="card-front">
          {badge && <div className="card-badge">{badge}</div>}
          <div className="card-icon">{icon}</div>
          <h3>{title}</h3>
          <p className="card-type">{type}</p>
          <p className="card-date">{date}</p>
        </div>
        <div className="card-back">
          <h3>{title}</h3>
          <ul>
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <div className="card-tools">
            {tools.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="card-buttons">
            <button
              className="expand-btn"
              onClick={(e) => {
                e.stopPropagation();
                onExpand();
              }}
            >
              Expand Details
            </button>
            <Link
              href={`/projects/${slug}`}
              className="read-more-btn"
              onClick={(e) => e.stopPropagation()}
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
