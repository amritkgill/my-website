"use client";

import Link from "next/link";
import BubbleScatterChart from "./BubbleScatterChart";

export default function FeaturedProject() {
  return (
    <section className="featured-project" id="featured">
      <span className="featured-label">Featured Project</span>
      <Link href="/projects/tariffs" className="featured-title-link">
        <h2 className="featured-title">Tariffs & Corporate Profit Shifting</h2>
      </Link>
      <p className="featured-description">
        For my capstone, I'm investigating whether the 2018 tariffs on Chinese
        imports caused U.S. companies to shift profits overseas to lower their tax
        burden. Using data from Bloomberg and SEC filings across 1,674 firms,
        tariff-exposed industries saw significant declines in effective tax rates.
      </p>
      <div className="featured-viz">
        <BubbleScatterChart projectUrl={null} maxWidth={960} />
      </div>
      <Link href="/projects/tariffs" className="featured-link">
        Read the full project →
      </Link>
    </section>
  );
}
