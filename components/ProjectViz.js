"use client";

import BubbleScatterChart from "./BubbleScatterChart";
import MarketReactionChart from "./MarketReactionChart";
import SolarPredictionChart from "./SolarPredictionChart";
import HousingScatterChart from "./HousingScatterChart";

const VIZZES = {
  tariffs: {
    chart: <BubbleScatterChart projectUrl={null} maxWidth={760} />,
    caption: "Industries with higher tariff rates saw bigger declines in effective tax rates.",
  },
  "market-reaction": {
    chart: <MarketReactionChart maxWidth={760} />,
  },
  "solar-energy": {
    chart: <SolarPredictionChart maxWidth={760} />,
  },
  "housing-prices": {
    chart: <HousingScatterChart maxWidth={760} />,
    caption: "Higher unemployment is associated with lower housing prices.",
  },
};

export default function ProjectViz({ slug }) {
  const viz = VIZZES[slug];
  if (!viz) return null;
  return (
    <div className="project-viz">
      {viz.chart}
      {viz.caption && <p className="viz-caption">{viz.caption}</p>}
    </div>
  );
}
