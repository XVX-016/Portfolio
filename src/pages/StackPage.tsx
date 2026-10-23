import React, { useEffect } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlinkText from "@/components/BlinkText";
import { stackData } from "@/data/stack";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const groupVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const StackPage: React.FC = () => {
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
          <div className="flex items-baseline justify-between mb-12 md:mb-16 border-b border-border/10 pb-6">
            <div>
              <span className="text-[10px] tracking-[0.35em] text-muted-foreground font-mono uppercase block mb-2">
                Engineering Ecosystem & Technologies
              </span>
              <BlinkText
                as="h1"
                text="Tools & Stack"
                className="text-4xl md:text-7xl font-bold tracking-tighter text-foreground"
                charDelay={30}
              />
            </div>
            <span className="hidden md:block text-muted-foreground text-[10px] tracking-[0.5em] font-mono uppercase">
              {stackData.reduce((acc, g) => acc + g.items.length, 0)} Tools Indexed
            </span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-16"
          >
            {stackData.map((group) => (
              <motion.section key={group.group} variants={groupVariants} className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-white/5 pb-3">
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white font-mono uppercase">
                    // {group.group}
                  </h2>
                  <p className="text-[11px] font-mono text-muted-foreground tracking-wide mt-1 md:mt-0">
                    {group.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex flex-col justify-between p-5 rounded-xl border border-white/5 bg-[#111111] hover:border-white/20 transition-all duration-300"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-base font-bold text-white tracking-tight">
                            {item.name}
                          </h3>
                          {item.featured && (
                            <span className="text-[8px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border border-white/10 text-white/50">
                              Core
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/50 leading-relaxed font-mono">
                          {item.usage}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            ))}
          </motion.div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default StackPage;
