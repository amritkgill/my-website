import { getProjectBySlug, getAllProjects } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { frontmatter } = getProjectBySlug(slug);
  return {
    title: `${frontmatter.title} | Amrit Gill`,
    description: frontmatter.description,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const { frontmatter, content } = getProjectBySlug(slug);

  return (
    <div className="project-page">
      <div className="project-page-header">
        <a href="/projects" className="back-link">
          &larr; Back to Projects
        </a>
        <h1>{frontmatter.title}</h1>
        <p className="project-page-meta">
          {frontmatter.date}
        </p>
        {frontmatter.tools && (
          <div className="project-page-tools">
            {frontmatter.tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        )}
        {frontmatter.links && (
          <div className="project-page-links">
            {frontmatter.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-btn"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="project-page-content">
        <MDXRemote source={content} />
      </div>
    </div>
  );
}
