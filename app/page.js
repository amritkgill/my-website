"use client";

import Hero from "@/components/Hero";
import FeaturedProject from "@/components/FeaturedProject";
import VizCarousel from "@/components/VizCarousel";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProject />
      <VizCarousel />
    </main>
  );
}
