import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import BlinkText from "./BlinkText";
import { getAllPosts } from "@/lib/blog";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const WritingTeaser: React.FC = () => {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="py-12 md:py-16 px-6 md:px-16 border-t border-white/5" id="writing">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-baseline justify-between mb-10 md:mb-12 border-b border-border/10 pb-5 md:pb-6">
          <div className="flex items-baseline gap-4">
            <BlinkText
              as="h2"
              text="Writing"
              className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground"
              charDelay={40}
            />
            <Link
              to="/blog"
              className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors font-mono tracking-tight"
            >
              / See All Posts
            </Link>
          </div>
          <span className="hidden md:block text-muted-foreground text-[10px] tracking-[0.5em] font-mono uppercase">
            Engineering & Systems
          </span>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
        >
          {posts.map((post) => (
            <motion.article
              key={post.slug}
              variants={itemVariants}
              className="group flex flex-col justify-between rounded-xl border border-white/5 bg-[#111111] p-5 transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.03)]"
            >
              <div>
                <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  <span>{post.date}</span>
                  <span>{post.readingTime}</span>
                </div>

                <Link to={`/blog/${post.slug}`}>
                  <h3 className="text-base md:text-lg font-bold tracking-tight text-white group-hover:text-white/90 transition-colors mb-2 leading-snug">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-[11px] text-white/45 leading-relaxed font-mono uppercase tracking-wider line-clamp-3 mb-4">
                  {post.description}
                </p>
              </div>

              <div>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-[9px] font-mono uppercase tracking-[0.25em] text-white/60 group-hover:text-white transition-colors"
                >
                  Read &gt;
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WritingTeaser;
