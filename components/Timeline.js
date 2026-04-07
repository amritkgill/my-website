const EXPERIENCES = [
  {
    company: "WeVote",
    role: "Data Analytics Intern",
    date: "May 2025 - Sep 2025",
    location: "Oakland, CA",
    bullets: [
      "Built SQL pipelines joining user, engagement, and donation data",
      "Created Tableau dashboards tracking 1,000+ engagement actions, identifying behaviors driving 64% of platform activity",
      "Presented recommendations to leadership on underperforming features",
    ],
  },
  {
    company: "Texas A&M Health Science Center",
    role: "Student Assistant",
    date: "Aug 2022 - Apr 2024",
    location: "Bryan, TX",
    bullets: [
      "Built Excel-based inventory tracking system with pivot tables and conditional formatting",
    ],
  },
];

export default function Timeline() {
  return (
    <section className="experience-section" id="experience">
      <h2 className="section-title">Experience</h2>
      <div className="timeline">
        {EXPERIENCES.map((exp, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <h3 className="timeline-company">{exp.company}</h3>
              <p className="timeline-role">{exp.role}</p>
              <p className="timeline-meta">
                {exp.date} &middot; {exp.location}
              </p>
              <ul className="timeline-bullets">
                {exp.bullets.map((bullet, j) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
