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
      setTime(now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }));
      setBlink(prev => !prev);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (timeString: string) => {
    if (!timeString) return "";
    return timeString.split(":").map((part, i) => (
      <React.Fragment key={i}>
        {i > 0 && (
          <span className={blink ? "opacity-100" : "opacity-20"} style={{ transition: 'opacity 0.2s' }}>:</span>
        )}
        {part.replace(" AM", "").replace(" PM", "")}
        {i === 2 && <span className="text-xs ml-2 opacity-50">{timeString.slice(-2)}</span>}
      </React.Fragment>
    ));
  };

  const socials = [
    { label: "INSTAGRAM", href: "https://www.instagram.com/tanmmay.knh/" },
    { label: "LINKEDIN", href: "https://www.linkedin.com/in/tanmmay-kanhaiya-9313492a3" },
    { label: "GITHUB", href: "https://github.com/XVX-016" },
  ];

  return (
    <footer className="px-6 md:px-16 py-24 border-t border-border bg-background overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <motion.div style={{ y }} className="mb-24">
          <BlinkText
            as="h2"
            text="LET'S GET IN TOUCH"
            className="text-5xl md:text-7xl lg:text-[7.5rem] font-bold tracking-tighter text-foreground leading-none mb-6"
            charDelay={30}
          />
          <a
            href="mailto:xvx016xc@gmail.com"
            className="text-xs md:text-sm tracking-[0.4em] text-muted-foreground hover:text-foreground transition-colors font-mono uppercase"
          >
            XVX016XC@GMAIL.COM ↗
          </a>
        </motion.div>

        <div className="flex flex-col md:flex-row items-end justify-between gap-12 pt-12 border-t border-white/5">
          <div className="flex flex-wrap gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button text-[10px] py-2 px-6 border-foreground/10 hover:border-foreground/60 transition-all font-mono"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="text-right">
            <p className="text-[10px] tracking-widest text-muted-foreground uppercase font-mono mb-2">
              Based in India
            </p>
            <p className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground font-['DotGothic16'] flex items-baseline justify-end gap-1">
              {formatTime(time)}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
