import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag, CheckCircle2, ArrowRight } from "lucide-react";
import { blogPosts } from "@/src/features/blog/data/blogData";
import "@/src/features/blog/styles/blog.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return { title: "Article Not Found | Digital Solutions" };
  }
  return {
    title: `${post.title} — Digital Solutions Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="vx-article-container">
      {/* Navigation Bar */}
      <div className="vx-article-nav-back">
        <Link href="/#blog" className="vx-article-back-link">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to All Articles</span>
        </Link>
      </div>

      <article className="vx-article-main">
        {/* Article Header */}
        <header className="vx-article-header">
          <span className="vx-article-header-tag">{post.category}</span>
          <h1>{post.title}</h1>

          <div className="vx-article-meta-bar">
            <div className="vx-article-author-info">
              <img
                src={post.author.avatarUrl}
                alt={post.author.name}
                className="vx-article-author-avatar"
              />
              <div className="vx-article-author-text">
                <strong>{post.author.name}</strong>
                <span>{post.author.role}</span>
              </div>
            </div>

            <div className="vx-article-meta-pills">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Calendar size={14} aria-hidden="true" />
                {post.publishDate}
              </span>
              <span>•</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Clock size={14} aria-hidden="true" />
                {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Hero Cover Image */}
        <div className="vx-article-hero-media">
          <img src={post.image} alt={post.title} />
        </div>

        {/* Article Body */}
        <div className="vx-article-body">
          <p className="vx-article-lead">{post.content.lead}</p>

          {post.content.sections.map((section, idx) => (
            <section key={idx}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}

              {section.callout && (
                <div className={`vx-article-callout ${section.callout.type}`}>
                  <strong>{section.callout.title}</strong>
                  <p>{section.callout.text}</p>
                </div>
              )}

              {section.codeSnippet && (
                <div className="vx-article-code-block">
                  <pre>
                    <code>{section.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              {section.bulletPoints && (
                <ul className="vx-article-bullets">
                  {section.bulletPoints.map((item, bIdx) => (
                    <li key={bIdx}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Key Executive Takeaways */}
          <div className="vx-article-takeaways">
            <h3>
              <CheckCircle2 size={20} color="#38bdf8" />
              Key Executive Takeaways
            </h3>
            <ul>
              {post.content.takeaways.map((takeaway, tIdx) => (
                <li key={tIdx}>{takeaway}</li>
              ))}
            </ul>
          </div>

          {/* Related Tags */}
          <div style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid #f1f5f9", display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#64748b", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <Tag size={14} /> Topic Tags:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "12px",
                  background: "#f1f5f9",
                  color: "#334155",
                  padding: "3px 10px",
                  borderRadius: "4px",
                  fontWeight: "500",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Consultation Banner inside Article */}
          <div
            style={{
              marginTop: "48px",
              padding: "32px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: "0 0 10px" }}>
              Need Help Scaling Your Architecture?
            </h3>
            <p style={{ fontSize: "15px", color: "#64748b", margin: "0 0 20px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
              Our senior engineering team audits systems, develops custom apps, and deploys high-converting web experiences for ambitious enterprises.
            </p>
            <Link
              href="/#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#0e60c9",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              <span>Contact Us</span>
              <ArrowRight size={16} />
            </Link>


          </div>
        </div>
      </article>
    </div>
  );
}
