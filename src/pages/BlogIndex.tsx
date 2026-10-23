import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Lenis from "lenis";
import BlinkText from "@/components/BlinkText";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getAllPosts } from "@/lib/blog";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const BlogIndex: React.FC = () => {
  const posts = getAllPosts();

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
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="py-12 md:py-20 px-6 md:px-16 max-w-[1200px] mx-auto w-full">
          <div className="flex items-baseline justify-between mb-10 md:mb-16 border-b border-border/10 pb-6">
            <div>
              <span className="text-[10px] tracking-[0.35em] text-muted-foreground font-mono uppercase block mb-2">
                Engineering Notes & Articles
              </span>
              <BlinkText
                as="h1"
                text="Blog"
                className="text-4xl md:text-7xl font-bold tracking-tighter text-foreground"
                charDelay={30}
              />
            </div>
            <span className="hidden md:block text-muted-foreground text-[10px] tracking-[0.5em] font-mono uppercase">
              {posts.length} Publications
            </span>
          </div>

          {posts.length === 0 ? (
            <div className="py-16 text-center border border-white/5 rounded-xl bg-[#111111] p-8">
              <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-2">
                Articles in preparation
              </p>
              <p className="text-xs font-mono text-white/40 max-w-md mx-auto">
                Drafts are currently being written on ray budget allocation, open-source administration, and database indexing.
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {posts.map((post) => (
                <motion.article
                  key={post.slug}
                  variants={itemVariants}
                  className="group flex flex-col justify-between rounded-xl border border-white/5 bg-[#111111] p-6 transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)]"
                >
                  <div>
                    <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">
                      <span>{post.date}</span>
                      <span>{post.readingTime}</span>
                    </div>

                    <Link to={`/blog/${post.slug}`}>
                      <h2 className="text-xl font-bold tracking-tight text-white group-hover:text-white/90 transition-colors mb-3 leading-snug">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-xs text-white/50 leading-relaxed font-mono uppercase tracking-wider line-clamp-3 mb-6">
                      {post.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full border border-white/10 text-[9px] font-mono uppercase tracking-wider text-white/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center text-[10px] font-mono uppercase tracking-[0.25em] text-white/70 group-hover:text-white transition-colors"
                    >
                      Read Article &gt;
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default BlogIndex;
