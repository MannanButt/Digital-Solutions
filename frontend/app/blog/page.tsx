import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { blogPosts } from "@/src/features/blog/data/blogData";
import "@/src/features/blog/styles/blog.css";

export const metadata: Metadata = {
  title: "Blog & Technical Insights — Digital Solutions",
  description: "Senior engineering and performance perspectives on Shopify, modern architecture, and AI automation.",
};

export default function BlogListingPage() {
  return (
    <div className="vx-article-container" style={{ padding: "40px 24px 100px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Navigation */}
        <div style={{ marginBottom: "32px" }}>
          <Link href="/" className="vx-article-back-link">
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <span className="vx-blog-eyebrow-clean">Engineering &amp; Growth Insights</span>
          <h1 className="vx-blog-title-clean">All Blog Articles</h1>
          <p style={{ fontSize: "16px", color: "#64748b", margin: "12px 0 0", maxWidth: "680px" }}>
            In-depth architectural patterns, Shopify 2.0 implementation blueprints, and conversion optimization strategies directly from our engineering team.
          </p>
        </div>

        {/* 4-Card Grid matching reference */}
        <div className="vx-blog-cards-grid">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="vx-blog-card-item"
              aria-label={`Read article: ${post.title}`}
            >
              <div className="vx-blog-card-media">
                <img src={post.image} alt={post.title} loading="lazy" />
                <div className="vx-blog-media-badge">
                  <BookOpen size={12} />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <div className="vx-blog-card-info">
                <span className="vx-blog-card-tag">{post.category}</span>
                <h2 className="vx-blog-card-name">{post.title}</h2>

                <div className="vx-blog-card-author-row">
                  <img
                    src={post.author.avatarUrl}
                    alt={post.author.name}
                    className="vx-blog-card-avatar"
                  />
                  <div className="vx-blog-card-author-meta">
                    <span className="vx-blog-card-author-name">{post.author.name}</span>
                    <span className="vx-blog-card-date">Last Updated: {post.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
