import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import BlinkText from "./BlinkText";
import { stackData } from "@/data/stack";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const StackTeaser: React.FC = () => {
  // Grab featured items across groups
  const featuredItems = stackData
    .flatMap((group) => group.items.map((item) => ({ ...item, group: group.group })))
    .filter((item) => item.featured)
    .slice(0, 9);

  return (
    <section className="py-12 md:py-16 px-6 md:px-16 border-t border-white/5" id="stack">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-baseline justify-between mb-10 md:mb-12 border-b border-border/10 pb-5 md:pb-6">
          <div className="flex items-baseline gap-4">
            <BlinkText
              as="h2"
              text="Tools & Stack"
              className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground"
              charDelay={40}
            />
            <Link
              to="/stack"
              className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors font-mono tracking-tight"
            >
              / Full Stack
            </Link>
          </div>
          <span className="hidden md:block text-muted-foreground text-[10px] tracking-[0.5em] font-mono uppercase">
            Core Disciplines
          </span>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
        >
          {featuredItems.map((item) => (
            <motion.div
              key={item.name}
              variants={itemVariants}
              className="flex flex-col justify-between p-4 md:p-5 rounded-xl border border-white/5 bg-[#111111] hover:border-white/20 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm md:text-base font-semibold text-white tracking-tight">
                    {item.name}
                  </h3>
                  <span className="text-[8px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border border-white/10 text-white/40">
                    {item.group}
                  </span>
                </div>
                <p className="text-[11px] text-white/50 leading-relaxed font-mono line-clamp-2">
                  {item.usage}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StackTeaser;
