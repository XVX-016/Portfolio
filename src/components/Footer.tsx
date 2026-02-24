import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BlinkText from "./BlinkText";

const Footer: React.FC = () => {
  const [time, setTime] = useState("");
  const [blink, setBlink] = useState(true);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0.8, 1], [100, 0]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
      setBlink((prev) => !prev);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (timeString: string) => {
    if (!timeString) return "";
    return timeString.split(":").map((part, i) => (
      <React.Fragment key={i}>
        {i > 0 && <span className={blink ? "opacity-100" : "opacity-20"}>:</span>}
        {part.replace(" AM", "").replace(" PM", "")}
        {i === 2 && <span className="ml-2 text-xs opacity-50">{timeString.slice(-2)}</span>}
      </React.Fragment>
    ));
  };

  const socials = [
    { label: "INSTAGRAM", href: "https://www.instagram.com/tanmmay.knh/" },
    { label: "LINKEDIN", href: "https://www.linkedin.com/in/tanmmay-kanhaiya-9313492a3" },
    { label: "GITHUB", href: "https://github.com/XVX-016" },
  ];

  return (
    <footer className="border-t border-border bg-background px-5 py-14 md:px-16 md:py-24 overflow-x-hidden">
      <div className="mx-auto max-w-[1400px]">
        <motion.div style={{ y }} className="mb-10 md:mb-24">
          <BlinkText
            as="h2"
            text="LET'S GET IN TOUCH"
            className="mb-4 max-w-full text-3xl font-bold leading-tight tracking-tighter text-foreground sm:text-4xl md:mb-6 md:text-7xl md:leading-none lg:text-[7.5rem]"
            charDelay={30}
          />
          <a
            href="mailto:xvx016xc@gmail.com"
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground md:text-sm md:tracking-[0.4em]"
          >
            XVX016XC@GMAIL.COM -&gt;
          </a>
        </motion.div>

        <div className="flex flex-col items-start justify-between gap-9 border-t border-white/5 pt-8 md:flex-row md:items-end md:gap-12 md:pt-12">
          <div className="flex flex-wrap gap-3 md:gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button border-foreground/10 px-5 py-2 font-mono text-[10px] transition-all hover:border-foreground/60 md:px-6"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="w-full text-left md:w-auto md:text-right">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Based in India</p>
            <p className="font-['DotGothic16'] flex items-baseline justify-start gap-1 text-2xl font-bold tracking-tighter text-foreground sm:text-3xl md:justify-end md:text-5xl">
              {formatTime(time)}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
