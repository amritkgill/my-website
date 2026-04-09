import { getBlogBySlug, getAllBlogPosts } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { frontmatter } = getBlogBySlug(slug);
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const { frontmatter, content } = getBlogBySlug(slug);

  return (
    <div className="project-page">
      <div className="project-page-header">
        <a href="/blog" className="back-link">
          &larr; Back to Blog
        </a>
        <h1>{frontmatter.title}</h1>
        <p className="project-page-meta">
          {new Date(frontmatter.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="project-page-content">
        <MDXRemote source={content} />
      </div>
    </div>
  );
}
