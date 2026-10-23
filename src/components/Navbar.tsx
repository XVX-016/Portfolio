import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Projects", path: "/projects" },
    { label: "Blog", path: "/blog" },
    { label: "Stack", path: "/stack" },
  ];

  return (
    <header className="w-full border-b border-border/10 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="font-mono text-xs md:text-sm font-bold tracking-[0.25em] text-foreground uppercase hover:opacity-80 transition-opacity"
        >
          TANMMAY KANHAIYA
        </Link>

        <nav className="flex items-center gap-6 md:gap-8">
          {navLinks.map((link) => {
            const isActive =
              link.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] transition-colors ${
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-foreground"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
