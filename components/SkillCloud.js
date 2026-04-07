const SKILLS = [
  "Python", "pandas", "scikit-learn", "statsmodels", "matplotlib",
  "R", "SQL", "Tableau", "Power BI", "Microsoft Office",
  "OLS Regression", "Random Forest", "Diff-in-Diff", "Causal Inference",
  "Panel Data", "Data Visualization",
];

const COLORS = ["crimson", "teal", "gold", "red", "emerald", "antique"];

export default function SkillCloud() {
  return (
    <>
      <h2 className="section-title">Skills &amp; Tools</h2>
      <div className="skills-cloud">
        {SKILLS.map((skill, i) => (
          <span key={skill} className="skill-pill" data-color={COLORS[i % COLORS.length]}>
            {skill}
          </span>
        ))}
      </div>
    </>
  );
}
