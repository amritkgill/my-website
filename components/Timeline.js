export default function Timeline() {
  return (
    <>
      <h2 className="section-title">Experience</h2>
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <div className="timeline-header">
              <h3>Data Analytics Intern</h3>
              <span className="timeline-date">May 2025 - Sep 2025</span>
            </div>
            <p className="timeline-company">WeVote &middot; Oakland, CA</p>
            <ul>
              <li>Built SQL pipelines joining user, engagement, and donation data</li>
              <li>Created Tableau dashboards tracking 1,000+ engagement actions, identifying behaviors driving 64% of platform activity</li>
              <li>Presented recommendations to leadership on underperforming features</li>
            </ul>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <div className="timeline-header">
              <h3>Student Assistant</h3>
              <span className="timeline-date">Aug 2022 - Apr 2024</span>
            </div>
            <p className="timeline-company">Texas A&amp;M Health Science Center &middot; Bryan, TX</p>
            <ul>
              <li>Built Excel-based inventory tracking system with pivot tables and conditional formatting</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
