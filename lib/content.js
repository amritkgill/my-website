import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export function getProjectBySlug(slug) {
  const filePath = path.join(contentDir, "projects", `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);
  return { slug, frontmatter, content };
}

export function getAllProjects() {
  const projectsDir = path.join(contentDir, "projects");
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".mdx"));
  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(projectsDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data: frontmatter } = matter(fileContents);
    return { slug, frontmatter };
  });
}

export function getBlogBySlug(slug) {
  const filePath = path.join(contentDir, "blog", `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);
  return { slug, frontmatter, content };
}

export function getAllBlogPosts() {
  const blogDir = path.join(contentDir, "blog");
  if (!fs.existsSync(blogDir)) return [];
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(blogDir, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data: frontmatter } = matter(fileContents);
      return { slug, frontmatter };
    })
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
}
