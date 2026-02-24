import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PhysicsPlayground from "./PhysicsPlayground";
import heroImg1 from "@/assets/1.jpg";
import heroImg2 from "@/assets/2.png";

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const persistedTheme = localStorage.getItem("theme-mode");
        const shouldUseLight = persistedTheme
            ? persistedTheme === "light"
            : window.matchMedia("(prefers-color-scheme: light)").matches;

        setIsDark(!shouldUseLight);
        document.documentElement.classList.toggle("light-mode", shouldUseLight);
        document.body.classList.toggle("light-mode", shouldUseLight);
    }, []);

    const toggle = () => {
        const nextIsDark = !isDark;
        const shouldUseLight = !nextIsDark;

        setIsDark(nextIsDark);
        document.documentElement.classList.toggle("light-mode", shouldUseLight);
        document.body.classList.toggle("light-mode", shouldUseLight);
        localStorage.setItem("theme-mode", shouldUseLight ? "light" : "dark");
    };

    return (
        <button
            onClick={toggle}
            className="relative h-[26px] w-[50px] cursor-pointer rounded-full border px-[3px] transition-colors duration-500"
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
            <div className="relative h-screen overflow-hidden">
                <motion.h1
                    className="text-foreground absolute bottom-4 left-0 z-0 select-none px-5 md:bottom-8 md:px-16"
                    style={{
                        fontSize: "clamp(2.4rem, 11vw, 14rem)",
                        fontWeight: 800,
                        lineHeight: 0.88,
                        letterSpacing: "-0.04em",
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

                <PhysicsPlayground />

                <motion.nav
                    className="absolute left-0 right-0 top-0 z-40 flex items-center justify-between px-5 py-5 md:px-16 md:py-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <a
                        href="mailto:xvx016xc@gmail.com"
                        className="text-[10px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white md:text-[11px]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                        xvx016xc@gmail.com
                    </a>

                    <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
                        <span
                            className="whitespace-nowrap text-[11px] uppercase tracking-[0.35em] text-white/60"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                            ML/AI Engineer based in Delhi, India
                        </span>
                    </div>

                    <ThemeToggle />
                </motion.nav>
            </div>

            <motion.div
                className="w-full px-5 pb-12 pt-2 md:px-16 md:pb-24"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-white/5 md:aspect-[16/9]">
                        <img
                            src={heroImg1}
                            alt="Aerodynamic engineering"
                            className="h-full w-full object-cover grayscale contrast-[1.2] opacity-70 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                        />
                    </div>
                    <div className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-white/5 md:aspect-[16/9]">
                        <img
                            src={heroImg2}
                            alt="System architecture"
                            className="h-full w-full object-cover grayscale contrast-[1.2] opacity-70 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
