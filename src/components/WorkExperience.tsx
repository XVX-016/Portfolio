import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import BlinkText from "./BlinkText";
import { experiences } from "@/data/experience";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const WorkExperience: React.FC = () => {
  return (
    <section className="py-12 md:py-16 px-6 md:px-16 border-t border-white/5" id="experience">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-12 md:mb-16 border-b border-border/10 pb-5 md:pb-6">
          <div className="flex items-baseline gap-4">
            <BlinkText
              as="h2"
              text="Work Experience"
              className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground"
              charDelay={40}
            />
          </div>
          <span className="hidden md:block text-muted-foreground text-[10px] tracking-[0.5em] font-mono uppercase">
            Professional Timeline
          </span>
        </div>

        {/* Semantic Timeline Container */}
        <div className="relative pl-6 md:pl-8 border-l border-white/10">
          <motion.ol
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-12 md:space-y-14"
          >
            {experiences.map((exp, index) => {
              const isCurrent = exp.isCurrent;

              return (
                <motion.li
                  key={exp.company}
                  variants={itemVariants}
                  className="relative group"
                >
                  {/* Timeline Node Dot */}
                  <div
                    className={`absolute -left-[31px] md:-left-[39px] top-1.5 flex items-center justify-center w-3 h-3 rounded-full border transition-colors duration-300 z-10 ${
                      isCurrent
                        ? "border-white bg-foreground shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                        : "border-white/30 bg-[#0a0a0a] group-hover:border-white/80"
                    }`}
                  >
                    {isCurrent && (
                      <span className="w-1 h-1 rounded-full bg-background" />
                    )}
                  </div>

                  {/* Single Clean Content Block */}
                  <div className="flex flex-col space-y-4">
                    <div>
                      {/* Role & Company Header */}
                      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                          {exp.role}
                        </h3>
                        <span className="text-white/30 text-sm font-mono">at</span>
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg md:text-xl font-bold tracking-tight text-white hover:text-white/80 underline decoration-white/20 underline-offset-4 transition-colors font-mono"
                          >
                            {exp.company}
                            <span className="ml-1 text-xs text-white/40 no-underline inline-block">↗</span>
                          </a>
                        ) : (
                          <span className="text-lg md:text-xl font-bold tracking-tight text-white font-mono">
                            {exp.company}
                          </span>
                        )}
                      </div>

                      {/* Timeline & Location directly beneath the Role */}
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <time
                          dateTime={exp.startDate}
                          className="text-xs font-mono font-medium tracking-tight text-muted-foreground"
                        >
                          {exp.timeline}
                        </time>

                        {isCurrent && (
                          <span className="inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.2em] text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Present
                          </span>
                        )}

                        {(exp.type || exp.location) && (
                          <>
                            <span className="text-white/20 text-xs font-mono">•</span>
                            <span className="text-[10px] font-mono tracking-wider text-muted-foreground/80 uppercase">
                              {[exp.type, exp.location].filter(Boolean).join(" • ")}
                            </span>
                          </>
                        )}
                      </div>

                      {/* One-line Summary */}
                      {exp.summary && (
                        <p className="mt-3 text-xs md:text-sm text-white/60 font-mono tracking-tight leading-relaxed max-w-3xl">
                          {exp.summary}
                        </p>
                      )}
                    </div>

                    {/* 2-4 Impact Bullets */}
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="space-y-2 mt-1 max-w-3xl">
                        {exp.bullets.map((bullet, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-xs md:text-sm text-white/55 font-mono leading-relaxed"
                          >
                            <span className="mt-1 shrink-0 text-white/25 text-xs">—</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech Tags & Optional Certificate Link */}
                    <div className="pt-2 flex flex-wrap items-center gap-2">
                      {exp.tags &&
                        exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-full border border-white/10 text-[9px] font-mono uppercase tracking-[0.15em] text-white/45 bg-white/[0.02]"
                          >
                            {tag}
                          </span>
                        ))}

                      {/* View Certificate Link */}
                      {exp.certificateUrl && (
                        <a
                          href={exp.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 ml-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 hover:text-white underline decoration-white/30 underline-offset-4 transition-colors"
                        >
                          View Certificate ↗
                        </a>
                      )}
                    </div>

                    {/* Hairline Divider between entries */}
                    {index < experiences.length - 1 && (
                      <div className="pt-6">
                        <div className="h-[1px] w-full bg-white/5" />
                      </div>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
