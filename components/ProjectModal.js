"use client";

import { useEffect, useRef } from "react";

export default function ProjectModal({ project, isOpen, onClose }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <div
      ref={overlayRef}
      className={`modal-overlay${isOpen ? " open" : ""}`}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="modal">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-header">
          <div className="modal-icon" style={{ background: project.gradient }}>
            {project.icon}
          </div>
          <div>
            <h2>{project.title}</h2>
            <p className="modal-meta">{project.type} &middot; {project.date}</p>
          </div>
        </div>
        <div className="modal-body">
          {project.overview && (
            <div className="modal-section">
              <h4>Overview</h4>
              <p>{project.overview}</p>
            </div>
          )}
          {project.findings && (
            <div className="modal-section">
              <h4>Key Findings</h4>
              <p>{project.findings}</p>
            </div>
          )}
          {project.tools && (
            <div className="modal-section">
              <h4>Tools & Techniques</h4>
              <div className="modal-tools">
                {project.tools.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>
          )}
          {project.vizData && (
            <div className="modal-section">
              <h4>Impact Visualization</h4>
              <VizChart data={project.vizData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function VizChart({ data }) {
  return (
    <div className="modal-viz">
      {data.map((bar, i) => (
        <div
          key={i}
          className="viz-bar"
          style={{
            background: bar.color,
            height: `${bar.height}%`,
            transitionDelay: `${i * 0.08}s`,
          }}
          data-label={bar.label}
        />
      ))}
    </div>
  );
}
