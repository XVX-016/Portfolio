import React, { useEffect, useRef, useState } from "react";

interface BlinkTextProps {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
  charDelay?: number;
  startDelay?: number;
}

const BlinkText: React.FC<BlinkTextProps> = ({
  text,
  className = "",
  as: Tag = "span",
  charDelay = 30,
  startDelay = 0,
}) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    React.createElement(
      Tag,
      {
        ref: ref as React.Ref<HTMLElement>,
        className,
        "aria-label": text,
      },
      text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            opacity: visible ? 1 : 0,
            transition: `opacity 0.08s steps(1) ${startDelay + i * charDelay}ms`,
          }}
          aria-hidden="true"
        >
          {char}
        </span>
      ))
    )
  );
};

export default BlinkText;
