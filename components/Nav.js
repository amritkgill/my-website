"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  const links = [
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
  ];

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
        <a href="#" className="nav-logo">Amrit</a>
        <div className="nav-links">
          {links.map(({ label, href }) => (
            <a key={label} href={href} onClick={handleLinkClick}>{label}</a>
          ))}
        </div>
        <button
          className="nav-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {links.map(({ label, href }) => (
          <a key={label} href={href} onClick={handleLinkClick}>{label}</a>
        ))}
      </div>
    </>
  );
}
