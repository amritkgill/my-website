import { getAllBlogPosts } from "@/lib/content";

export const metadata = {
  title: "Blog",
  description: "Blog posts and articles",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  if (posts.length === 0) {
    return (
      <main>
        <a href="/" className="back-link">
          &larr; Back Home
        </a>
        <h1 className="project-page-header">Blog</h1>
        <div className="blog-empty">
          <p>Blog posts coming soon. Stay tuned!</p>
          <p className="blog-empty-subtle">
            Check back later for articles on economics, data science, and more.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <a href="/" className="back-link">
        &larr; Back Home
      </a>
      <h1 className="project-page-header">Blog</h1>
      <div className="blog-list">
        {posts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-card"
          >
            <h2>{post.frontmatter.title}</h2>
            <p className="blog-card-date">{post.frontmatter.date}</p>
            {post.frontmatter.description && (
              <p className="blog-card-description">
                {post.frontmatter.description}
              </p>
            )}
          </a>
        ))}
      </div>
    </main>
  );
}
