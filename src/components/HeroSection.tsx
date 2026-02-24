import React, { useState } from "react";
import { motion } from "framer-motion";
import PhysicsPlayground from "./PhysicsPlayground";
import heroImg1 from "@/assets/1.jpg";
import heroImg2 from "@/assets/2.png";

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(true);

    const toggle = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle("light-mode");
        document.body.classList.toggle("light-mode");
    };

    return (
        <button
            onClick={toggle}
            className="relative w-[50px] h-[26px] rounded-full border transition-colors duration-500 flex items-center px-[3px] cursor-pointer"
            style={{
                backgroundColor: isDark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)",
                borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
            }}
            aria-label="Toggle Theme"
        >
            <motion.div
                className="rounded-full"
                style={{
                    width: 20,
                    height: 20,
                    backgroundColor: isDark ? "#FFFFFF" : "#000000",
                    boxShadow: isDark
                        ? "0 1px 4px rgba(0,0,0,0.3), 0 0 8px rgba(255,255,255,0.1)"
                        : "0 1px 4px rgba(0,0,0,0.2), 0 0 8px rgba(0,0,0,0.05)",
                }}
                animate={{ x: isDark ? 0 : 22 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
        </button>
    );
};

const HeroSection = () => {
    return (
        <section className="relative flex flex-col">
            {/* ===== HERO VIEWPORT ===== */}
            <div className="relative h-screen flex flex-col justify-end">
                {/* Physics lives here — absolutely positioned, full coverage */}
                <PhysicsPlayground />

                {/* ===== GLOBAL HEADER — highest z-index ===== */}
                <motion.nav
                    className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 md:px-16 py-6 z-40"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    {/* Left: Email */}
                    <a
                        href="mailto:tanmmay2005@gmail.com"
                        className="text-[10px] md:text-[11px] tracking-[0.2em] text-white/50 hover:text-white transition-colors uppercase font-mono"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                        tanmmay2005@gmail.com
                    </a>

                    {/* Center: Role text */}
                    <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
                        <span
                            className="text-[11px] tracking-[0.35em] text-white/60 uppercase whitespace-nowrap"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                            ML/AI Engineer based in Delhi, India
                        </span>
                    </div>

                    {/* Right: Theme Toggle */}
                    <ThemeToggle />
                </motion.nav>

                {/* ===== NAME — bottom-left, behind pills ===== */}
                <motion.h1
                    className="relative z-[1] px-6 md:px-16 pb-8 select-none"
                    style={{
                        fontSize: "clamp(3rem, 11vw, 14rem)",
                        fontWeight: 800,
                        lineHeight: 0.88,
                        letterSpacing: "-0.04em",
                        color: "white",
                        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                    }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                >
                    TANMMAY
                    <br />
                    KANHAIYA
                </motion.h1>
            </div>

            {/* ===== IMAGES BELOW NAME ===== */}
            <motion.div
                className="w-full px-6 md:px-16 pb-24 pt-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1400px] mx-auto">
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/5 group">
                        <img
                            src={heroImg1}
                            alt="Aerodynamic engineering"
                            className="w-full h-full object-cover grayscale contrast-[1.2] opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/5 group">
                        <img
                            src={heroImg2}
                            alt="System architecture"
                            className="w-full h-full object-cover grayscale contrast-[1.2] opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
