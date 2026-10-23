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

const ProjectCard: React.FC<{ work: Work; isLargeFeatured?: boolean }> = ({
  work,
  isLargeFeatured,
}) => {
  const isClickable = !!work.link;

  const handleCardClick = (e: React.MouseEvent) => {
    // If the click is inside the GitHub repo link or other interactive element, do not trigger card link
    if ((e.target as HTMLElement).closest("a")) return;
    if (work.link) {
      window.open(work.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      onClick={handleCardClick}
      variants={cardItemVariant}
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-[#111111] transition-all duration-500 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] ${
        isClickable ? "cursor-pointer" : ""
      }`}
    >
      {/* Image — full colour, no filter or zoom transform */}
      <div
        className={`relative overflow-hidden ${
          isLargeFeatured ? "aspect-[16/7] md:aspect-[21/9]" : "aspect-[16/8]"
        }`}
      >
        {work.image ? (
          <img
            src={work.image}
            alt={work.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
            <span
              className="text-white/15 font-bold tracking-tighter select-none"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
            >
              {work.placeholderText ?? work.title}
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
            {work.link ? (
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline underline-offset-4 decoration-white/20 transition-all"
              >
                {work.title}
              </a>
            ) : (
              work.title
            )}
          </h3>
          <p className="text-[11px] md:text-xs text-white/40 leading-relaxed max-w-sm font-mono uppercase tracking-wider">
            {work.description}
          </p>

          {work.bullets && work.bullets.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {work.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-[10px] md:text-[11px] text-white/35 font-mono tracking-wide leading-relaxed">
                  <span className="mt-0.5 shrink-0 text-white/20">—</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {work.tags && work.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full border border-white/10 text-[9px] tracking-[0.15em] text-white/40 font-mono uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {work.github && (
          <a
            href={work.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block w-fit text-[10px] tracking-[0.2em] text-white/40 hover:text-white/80 font-mono uppercase transition-colors"
          >
            View Repo &gt;
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
