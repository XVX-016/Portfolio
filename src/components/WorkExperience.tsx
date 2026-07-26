import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import BlinkText from "./BlinkText";
import { experiences } from "@/data/works";

const cardItemVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const WorkExperience: React.FC = () => {
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
    <section className="py-10 md:py-12 px-6 md:px-16 border-t border-white/5" id="experience">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-baseline justify-between mb-10 md:mb-12 border-b border-border/10 pb-5 md:pb-6">
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

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8"
        >
          {experiences.map((exp) => {
            const Wrapper = exp.link ? motion.a : motion.div;
            const wrapperProps = exp.link
              ? { href: exp.link, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <Wrapper
                key={exp.company}
                {...wrapperProps}
                variants={cardItemVariant}
                className="group relative flex flex-col cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-[#111111] transition-all duration-500 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              >
                <div className="relative aspect-[16/8] overflow-hidden grayscale contrast-[1.1] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-[1.01]">
                  {exp.image ? (
                    <img
                      src={exp.image}
                      alt={exp.company}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
                      <span className="text-white/15 font-bold tracking-tighter select-none">
                        {exp.company}
                      </span>
                    </div>
                  )}
                  {exp.link && (
                    <motion.div
                      className="absolute bottom-6 right-6 w-12 h-12 rounded-full border border-white/10 bg-[#111111]/80 backdrop-blur-sm flex items-center justify-center text-white z-10"
                      initial={false}
                      whileHover={{
                        x: 5,
                        y: -5,
                        borderColor: "rgba(255,255,255,0.6)",
                        scale: 1.1,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.16663 15.8333L15.8333 4.16663M15.8333 4.16663H6.66663M15.8333 4.16663V13.3333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  )}
                </div>

                <div className="p-5 md:p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] tracking-[0.3em] text-muted-foreground font-mono uppercase">
                        {exp.role}
                      </span>
                      <span className="text-[10px] tracking-[0.3em] text-muted-foreground font-mono uppercase">
                        {exp.timeline}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2">
                      {exp.company}
                    </h3>
                    <p className="text-[11px] md:text-xs text-white/40 leading-relaxed max-w-sm font-mono uppercase tracking-wider">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WorkExperience;
