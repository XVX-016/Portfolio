import React, { useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlinkText from "@/components/BlinkText";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : undefined;
  const allPosts = getAllPosts();

  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [slug]);

  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Extract Table of Contents from headings
  const toc: TocItem[] = useMemo(() => {
    if (!post) return [];
    const lines = post.content.split("\n");
    const headings: TocItem[] = [];

    lines.forEach((line) => {
      const match = line.match(/^(#{2,3})\s+(.*)$/);
      if (match) {
        const level = match[1].length;
        const rawText = match[2].trim();
        const cleanText = rawText.replace(/[*_`]/g, "");
        const id = cleanText
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
        headings.push({ id, text: cleanText, level });
      }
    });

    return headings;
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
        <Navbar />
        <div className="py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <button
            onClick={() => navigate("/blog")}
            className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
          >
            &lt; Return to Writing
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // Schema.org BlogPosting JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Tanmmay Kanhaiya",
      url: "https://tanmmay.me",
    },
    publisher: {
      "@type": "Person",
      name: "Tanmmay Kanhaiya",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://tanmmay.me/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      {/* BlogPosting JSON-LD structured script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div>
        <Navbar />

        <article className="py-12 md:py-20 px-6 md:px-16 max-w-[1200px] mx-auto w-full">
          <Link
            to="/blog"
            className="inline-block mb-8 text-[11px] tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors font-mono uppercase"
          >
            &lt; Back to Writing
          </Link>

          {/* Header */}
          <header className="mb-12 border-b border-border/10 pb-8">
            <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readingTime}</span>
              <span>•</span>
              <span>By Tanmmay Kanhaiya</span>
            </div>

            <BlinkText
              as="h1"
              text={post.title}
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground mb-6 leading-tight"
              charDelay={20}
            />

            <p className="text-base md:text-lg text-white/60 font-mono tracking-tight leading-relaxed max-w-3xl mb-6">
              {post.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full border border-white/10 text-[9px] font-mono uppercase tracking-widest text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Main Layout: Article Body + Sticky TOC Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16 items-start">
            {/* Article Content */}
            <div className="prose prose-invert prose-neutral max-w-none text-white/80 leading-[1.8] font-sans
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
              prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:mb-6 prose-h1:font-mono
              prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3 prose-h2:mt-12 prose-h2:mb-6 prose-h2:font-mono
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:font-mono
              prose-p:text-base prose-p:md:text-[17px] prose-p:leading-relaxed prose-p:mb-6 prose-p:text-white/80
              prose-strong:text-white prose-strong:font-semibold
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-li:my-2 prose-li:text-white/75
              prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-li:my-2 prose-li:text-white/75
              prose-blockquote:border-l-2 prose-blockquote:border-white/30 prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-white/70
              prose-hr:my-10 prose-hr:border-white/10
              prose-code:font-mono prose-code:text-[13px] prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-emerald-300 prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-[#0d0d0d] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:p-5 prose-pre:shadow-2xl prose-pre:overflow-x-auto
            ">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1({ children }) {
                    return (
                      <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-6 border-b border-white/10 pb-4 font-mono">
                        {children}
                      </h1>
                    );
                  },
                  h2({ children }) {
                    const text = String(children);
                    const id = text
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, "")
                      .replace(/\s+/g, "-");
                    return (
                      <h2 id={id} className="scroll-mt-24 text-xl md:text-2xl font-bold tracking-tight text-white mt-12 mb-5 border-b border-white/10 pb-3 font-mono">
                        {children}
                      </h2>
                    );
                  },
                  h3({ children }) {
                    const text = String(children);
                    const id = text
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, "")
                      .replace(/\s+/g, "-");
                    return (
                      <h3 id={id} className="scroll-mt-24 text-lg md:text-xl font-bold tracking-tight text-white mt-8 mb-4 font-mono">
                        {children}
                      </h3>
                    );
                  },
                  p({ children }) {
                    return (
                      <p className="text-[16px] md:text-[17px] leading-[1.8] text-white/80 mb-6 font-sans">
                        {children}
                      </p>
                    );
                  },
                  ul({ children }) {
                    return (
                      <ul className="list-disc pl-6 mb-6 space-y-2 text-[15px] md:text-[16px] text-white/75 font-sans">
                        {children}
                      </ul>
                    );
                  },
                  ol({ children }) {
                    return (
                      <ol className="list-decimal pl-6 mb-6 space-y-2 text-[15px] md:text-[16px] text-white/75 font-sans">
                        {children}
                      </ol>
                    );
                  },
                  code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const isInline = !match && !String(children).includes("\n");
                    if (isInline) {
                      return (
                        <code className="bg-white/10 text-emerald-300 font-mono text-[13px] px-1.5 py-0.5 rounded font-normal" {...props}>
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Sidebar Table of Contents */}
            {toc.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24 rounded-xl border border-white/5 bg-[#111111]/80 backdrop-blur-sm p-6">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground block mb-4">
                    Table of Contents
                  </span>
                  <nav className="space-y-2">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-[11px] font-mono transition-colors hover:text-white leading-relaxed ${
                          item.level === 3 ? "pl-3 text-white/40" : "text-white/70"
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
          </div>

          {/* Prev / Next Navigation */}
          <nav className="mt-16 pt-8 border-t border-border/10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="flex flex-col p-5 rounded-xl border border-white/5 bg-[#111111] hover:border-white/20 transition-all group"
              >
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-1">
                  &lt; Previous Article
                </span>
                <span className="text-sm font-semibold text-white group-hover:text-white/90">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextPost && (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="flex flex-col items-end text-right p-5 rounded-xl border border-white/5 bg-[#111111] hover:border-white/20 transition-all group md:col-start-2"
              >
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-1">
                  Next Article &gt;
                </span>
                <span className="text-sm font-semibold text-white group-hover:text-white/90">
                  {nextPost.title}
                </span>
              </Link>
            )}
          </nav>
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
