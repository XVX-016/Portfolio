import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import BlinkText from "./BlinkText";
import { certifications } from "@/data/works";

const cardItemVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const Certifications: React.FC = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  return (
    <section className="py-10 md:py-12 px-6 md:px-16 border-t border-white/5" id="certifications">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-baseline justify-between mb-10 md:mb-12 border-b border-border/10 pb-5 md:pb-6">
          <div className="flex items-baseline gap-4">
            <BlinkText
              as="h2"
              text="Certifications"
              className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground"
              charDelay={40}
            />
          </div>
          <span className="hidden md:block text-muted-foreground text-[10px] tracking-[0.5em] font-mono uppercase">
            {certifications.length} Credentials
          </span>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
        >
          {certifications.map((cert) => {
            const Inner = (
              <>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[10px] tracking-[0.25em] text-muted-foreground font-mono uppercase leading-tight">
                    {cert.issuer}
                  </span>
                  <span className="shrink-0 text-[9px] tracking-[0.2em] text-muted-foreground/60 font-mono uppercase">
                    {cert.date}
                  </span>
                </div>
                <p className="text-sm md:text-base font-semibold tracking-tight text-foreground leading-snug">
                  {cert.name}
                </p>
                {cert.credentialId && (
                  <p className="mt-2 text-[9px] tracking-[0.18em] text-white/25 font-mono uppercase">
                    ID: {cert.credentialId}
                  </p>
                )}
              </>
            );

            return cert.credentialUrl ? (
              <motion.a
                key={cert.name}
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardItemVariant}
                className="flex flex-col p-4 md:p-5 rounded-xl border border-white/5 bg-[#111111] transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.03)]"
              >
                {Inner}
              </motion.a>
            ) : (
              <motion.div
                key={cert.name}
                variants={cardItemVariant}
                className="flex flex-col p-4 md:p-5 rounded-xl border border-white/5 bg-[#111111]"
              >
                {Inner}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
