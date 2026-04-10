"use client";

import BubbleScatterChart from "./BubbleScatterChart";
import MarketReactionChart from "./MarketReactionChart";
import SolarPredictionChart from "./SolarPredictionChart";

const VIZZES = {
  tariffs: <BubbleScatterChart projectUrl={null} maxWidth={760} />,
  "market-reaction": <MarketReactionChart maxWidth={760} />,
  "solar-energy": <SolarPredictionChart maxWidth={760} />,
};

export default function ProjectViz({ slug }) {
  const viz = VIZZES[slug];
  if (!viz) return null;
  return <div className="project-viz">{viz}</div>;
}
