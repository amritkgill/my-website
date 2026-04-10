import Link from "next/link";

const inProgress = [
  {
    id: "tariffs",
    title: "Tariffs & Corporate Profit Shifting",
    subtitle: "Capstone",
    description:
      "Did the 2018 tariffs on Chinese imports cause U.S. firms to shift profits overseas?",
  },
  {
    id: "deforestation",
    title: "Deforestation & Child Health",
    subtitle: "Natural Resource Economics",
    description:
      "Does deforestation cause worse health outcomes for children in tropical countries?",
  },
];

const completed = [
  {
    id: "compulsory-voting",
    title: "Compulsory Voting & Voter Turnout",
    subtitle: "Causal Inference",
    description:
      "Does making voting mandatory actually increase turnout?",
  },
  {
    id: "market-reaction",
    title: "Market Reaction to Economic Announcements",
    subtitle: "Econometrics",
    description:
      "How much do Fed, jobs, and CPI announcements move the S&P 500?",
  },
  {
    id: "housing-prices",
    title: "Macroeconomic Determinants of Housing Prices",
    subtitle: "Econometrics",
    description:
      "How unemployment and inflation predict U.S. housing prices.",
  },
  {
    id: "solar-energy",
    title: "Predicting Solar Energy",
    subtitle: "Machine Learning",
    description: "Predicting solar output with Random Forest and weather data.",
  },
];

function ProjectCard({ project }) {
  return (
    <Link href={`/projects/${project.id}`} className="project-item">
      <span className="project-item-subtitle">{project.subtitle}</span>
      <h3 className="project-item-title">{project.title}</h3>
      <p className="project-item-desc">{project.description}</p>
      <span className="project-item-arrow">&rarr;</span>
    </Link>
  );
}

export default function ProjectsPage() {
  return (
    <main>
      <div className="projects-sections">
        <div className="projects-section-header">
          <h2 className="projects-section-title">In Progress</h2>
        </div>
        <div className="projects-page">
          {inProgress.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
        <div className="projects-section-header">
          <h2 className="projects-section-title">Completed</h2>
        </div>
        <div className="projects-page">
          {completed.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
