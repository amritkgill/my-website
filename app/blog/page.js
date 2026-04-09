import { getAllBlogPosts } from "@/lib/content";
import Link from "next/link";

export default function BlogPage() {
  const posts = getAllBlogPosts();

  if (posts.length === 0) {
    return (
      <main>
        <section className="page-section">
          <p className="empty-state">Coming Soon...</p>
        </section>
      </main>
    );
  }

  return (
    <main>
      <div className="blog-page">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-card"
          >
            <div className="blog-card-date">
              {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <h3 className="blog-card-title">{post.frontmatter.title}</h3>
            <p className="blog-card-description">
              {post.frontmatter.description}
            </p>
            <span className="card-hint">Read more &rarr;</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
