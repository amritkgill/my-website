import Link from "next/link";

const projects = [
  {
    id: "tariffs",
    title: "Tariffs & Corporate Profit Shifting",
    subtitle: "Capstone",
    description:
      "Section 301 tariffs and foreign profit shifting. Diff-in-diff on Bloomberg panel data.",
  },
  {
    id: "deforestation",
    title: "Deforestation & Child Health",
    subtitle: "Natural Resource Economics",
    description:
      "IV strategy using drought-driven fire variation to estimate deforestation's causal effect on child health.",
  },
  {
    id: "compulsory-voting",
    title: "Compulsory Voting & Voter Turnout",
    subtitle: "Causal Inference",
    description:
      "Global panel DiD estimating compulsory voting increases turnout by ~10 percentage points.",
  },
  {
    id: "market-reaction",
    title: "Analyzing Market Reaction",
    subtitle: "Econometrics",
    description:
      "S&P 500 response to macroeconomic announcements. OLS with VIX interaction terms.",
  },
  {
    id: "housing-prices",
    title: "Macroeconomic Determinants of Housing Prices",
    subtitle: "Econometrics",
    description:
      "OLS regression of unemployment rate and CPI on the House Price Index using FRED data.",
  },
  {
    id: "solar-energy",
    title: "Predicting Solar Energy",
    subtitle: "Machine Learning",
    description: "Random Forest on weather and irradiance data.",
  },
];

export default function ProjectsPage() {
  return (
    <main>
      <div className="projects-page">
        {projects.map((p) => (
          <Link key={p.id} href={`/projects/${p.id}`} className="project-item">
            <span className="project-item-subtitle">{p.subtitle}</span>
            <h3 className="project-item-title">{p.title}</h3>
            <p className="project-item-desc">{p.description}</p>
            <span className="project-item-arrow">&rarr;</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
