import React from "react";
import { motion } from "framer-motion";
import BlinkText from "./BlinkText";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";

interface Work {
    title: string;
    category: string;
    year: string;
    image: string;
    description: string;
    link: string;
    width: string;
}

const works: Work[] = [
    {
        title: "F1 Predict",
        category: "ML / PREDICTIVE",
        year: "2024",
        image: work1,
        description: "ML-driven race strategy forecasting and aerodynamic data analysis.",
        link: "https://f1-predict-five.vercel.app/",
        width: "col-span-12 md:col-span-6"
    },
    {
        title: "SVAMITVA Village",
        category: "GEOSPATIAL / GIS",
        year: "2023",
        image: work2,
        description: "Geospatial drone-mapping pipeline for rural land records verification.",
        link: "#",
        width: "col-span-12 md:col-span-6"
    },
    {
        title: "TamraCraft",
        category: "E-COMMERCE / FULL-STACK",
        year: "2023",
        image: work3,
        description: "High-performance platform for traditional copper and brass kitchenware.",
        link: "https://tamracraft.store/",
        width: "col-span-12 md:col-span-6"
    },
    {
        title: "ADSC-sim",
        category: "SIMULATION / SYSTEMS",
        year: "2023",
        image: work4,
        description: "High-fidelity Aerodynamic Decelerator System Simulator for performance testing.",
        link: "https://aircraft-flight-dynamics.vercel.app/",
        width: "col-span-12 md:col-span-6"
    },
];

const MagneticArrow: React.FC = () => {
    return (
        <motion.div
            className="absolute bottom-6 right-6 w-12 h-12 rounded-full border border-white/10 bg-[#111111]/80 backdrop-blur-sm flex items-center justify-center text-white z-10"
            initial={false}
            whileHover={{
                x: 5,
                y: -5,
                borderColor: "rgba(255,255,255,0.6)",
                scale: 1.1
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.16663 15.8333L15.8333 4.16663M15.8333 4.16663H6.66663M15.8333 4.16663V13.3333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </motion.div>
    );
};

const SelectedWorks: React.FC = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <section className="py-32 px-6 md:px-16" id="works">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex items-baseline justify-between mb-24 border-b border-border/10 pb-12">
                    <div className="flex items-baseline gap-4">
                        <BlinkText
                            as="h2"
                            text="Selected Works"
                            className="text-4xl md:text-7xl font-bold tracking-tighter text-foreground"
                            charDelay={40}
                        />
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
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
                >
                    {works.map((work) => (
                        <motion.a
                            href={work.link}
                            target={work.link !== "#" ? "_blank" : undefined}
                            rel={work.link !== "#" ? "noopener noreferrer" : undefined}
                            key={work.title}
                            variants={item}
                            className="group relative flex flex-col cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-[#111111] transition-all duration-500 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden grayscale contrast-[1.1] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-[1.01]">
                                <img
                                    src={work.image}
                                    alt={work.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />

                                <MagneticArrow />
                            </div>

                            <div className="p-8 md:p-10 flex flex-col justify-between flex-grow">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-[10px] tracking-[0.3em] text-muted-foreground font-mono uppercase">
                                            {work.category}
                                        </span>
                                        <span className="text-[10px] tracking-[0.3em] text-muted-foreground font-mono uppercase">
                                            {work.year}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
                                        {work.title}
                                    </h3>
                                    <p className="text-xs md:text-sm text-white/40 leading-relaxed max-w-sm font-mono uppercase tracking-wider">
                                        {work.description}
                                    </p>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default SelectedWorks;
