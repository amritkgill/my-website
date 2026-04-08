"use client";

import { useState, useEffect, useCallback } from "react";

const projects = [
  {
    id: "tariffs",
    title: "Tariffs & Corporate Profit Shifting",
    subtitle: "Capstone",
    description:
      "Section 301 tariffs and foreign profit shifting. Diff-in-diff on Bloomberg panel data.",
  },
  {
    id: "market-reaction",
    title: "Market Reaction to Announcements",
    subtitle: "Econometrics",
    description:
      "S&P 500 response to macroeconomic announcements. OLS with VIX interaction terms.",
  },
  {
    id: "solar-energy",
    title: "Predicting Solar Energy",
    subtitle: "Machine Learning",
    description: "Random Forest on weather and irradiance data.",
  },
];

function Modal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">&times;</button>
        <div className="modal-subtitle">{project.subtitle}</div>
        <h2 className="modal-title">{project.title}</h2>
        <div className="modal-body">
          {/* Add your project content here */}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [flippingId, setFlippingId] = useState(null);
  const [modalId, setModalId] = useState(null);

  const openProject = useCallback((id) => {
    setFlippingId(id);
    setTimeout(() => {
      setModalId(id);
    }, 400);
  }, []);

  const closeModal = useCallback(() => {
    setModalId(null);
    setFlippingId(null);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && projects.find((p) => p.id === hash)) {
      openProject(hash);
    }
  }, [openProject]);

  const modalProject = modalId ? projects.find((p) => p.id === modalId) : null;

  return (
    <main>
      <div className="projects-page">
        {projects.map((p) => (
          <div
            key={p.id}
            id={p.id}
            className={`flip-card${flippingId === p.id ? " flipping" : ""}`}
            onClick={() => openProject(p.id)}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <span className="project-subtitle">{p.subtitle}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="card-hint">View details &rarr;</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalProject && (
        <Modal project={modalProject} onClose={closeModal} />
      )}
    </main>
  );
}
