import React, { useEffect } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Link } from "react-router-dom";
import Lenis from "lenis";
import BlinkText from "@/components/BlinkText";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { works } from "@/data/works";

const AllProjects: React.FC = () => {
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

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="py-14 md:py-20 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <Link
            to="/"
            className="inline-block mb-8 text-[11px] tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors font-mono uppercase"
          >
            &lt; Back
          </Link>

          <div className="flex items-baseline justify-between mb-10 md:mb-12 border-b border-border/10 pb-5 md:pb-6">
            <BlinkText
              as="h1"
              text="All Projects"
              className="text-3xl md:text-6xl font-bold tracking-tighter text-foreground"
              charDelay={30}
            />
            <span className="hidden md:block text-muted-foreground text-[10px] tracking-[0.5em] font-mono uppercase">
              {works.length} Projects
            </span>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8"
          >
            {works.map((work) => (
              <ProjectCard key={work.title} work={work} />
            ))}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllProjects;
