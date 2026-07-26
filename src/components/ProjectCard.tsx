import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { Work } from "@/data/works";

export const MagneticArrow: React.FC = () => {
  return (
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
  );
};

export const cardItemVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const ProjectCard: React.FC<{ work: Work }> = ({ work }) => {
  const isClickable = !!work.link;
  const Wrapper = isClickable ? motion.a : motion.div;
  const wrapperProps = isClickable
    ? { href: work.link!, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      variants={cardItemVariant}
      className="group relative flex flex-col cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-[#111111] transition-all duration-500 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
    >
      <div className="relative aspect-[16/8] overflow-hidden grayscale contrast-[1.1] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-[1.01]">
        {work.image ? (
          <img
            src={work.image}
            alt={work.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
            <span
              className="text-white/15 font-bold tracking-tighter select-none group-hover:text-white/25 transition-colors duration-700"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
            >
              {work.placeholderText}
            </span>
          </div>
        )}

        {isClickable ? (
          <MagneticArrow />
        ) : (
          <span className="absolute bottom-6 right-6 rounded-full border border-white/10 bg-[#111111]/80 backdrop-blur-sm px-3 py-1.5 text-[9px] tracking-[0.2em] text-white/50 font-mono uppercase z-10">
            In Progress
          </span>
        )}
      </div>

      <div className="p-5 md:p-6 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground font-mono uppercase">
              {work.category}
            </span>
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground font-mono uppercase">
              {work.year}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2">
            {work.title}
          </h3>
          <p className="text-[11px] md:text-xs text-white/40 leading-relaxed max-w-sm font-mono uppercase tracking-wider">
            {work.description}
          </p>
        </div>

        {work.github && (
          <a
            href={work.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-4 inline-block w-fit text-[10px] tracking-[0.2em] text-white/40 hover:text-white/80 font-mono uppercase transition-colors"
          >
            View Repo &gt;
          </a>
        )}
      </div>
    </Wrapper>
  );
};

export default ProjectCard;
