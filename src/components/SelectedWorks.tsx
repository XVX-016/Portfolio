import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Link } from "react-router-dom";
import BlinkText from "./BlinkText";
import ProjectCard from "./ProjectCard";
import { works } from "@/data/works";

const featuredWorks = works.filter((w) => w.featured);

const SelectedWorks: React.FC = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section className="py-10 md:py-12 px-6 md:px-16" id="works">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-baseline justify-between mb-10 md:mb-12 border-b border-border/10 pb-5 md:pb-6">
          <div className="flex items-baseline gap-4">
            <BlinkText
              as="h2"
              text="Selected Works"
              className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground"
              charDelay={40}
            />
            <Link
              to="/projects"
              className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors font-mono tracking-tight"
            >
              / See All Projects
            </Link>
          </div>
          <span className="hidden md:block text-muted-foreground text-[10px] tracking-[0.5em] font-mono uppercase">
            Curated Projects Selection
          </span>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8"
        >
          {featuredWorks.map((work) => (
            <ProjectCard key={work.title} work={work} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SelectedWorks;
