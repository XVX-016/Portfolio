export interface WorkExperienceItem {
  role: string;
  company: string;
  companyUrl?: string;
  startDate: string; // e.g. "2025-12"
  endDate?: string;   // e.g. "2026-02" or undefined if current
  timeline: string;  // e.g. "Dec 2025 – Present"
  isCurrent?: boolean;
  location?: string;
  type?: string;     // e.g. "Remote", "Internship", "Full-time"
  logo?: string;
  fallbackLogoText: string;
  summary: string;
  bullets: string[];
  tags: string[];
  certificateUrl?: string;
}

export const experiences: WorkExperienceItem[] = [
  {
    role: "Full Stack Developer",
    company: "Tamracraft",
    companyUrl: "https://tamracraft.store/",
    startDate: "2025-12",
    endDate: "2026-07",
    timeline: "Dec 2025 – Jul 2026",
    isCurrent: false,
    location: "India",
    type: "D2C E-Commerce Platform",
    fallbackLogoText: "TC",
    summary: "High-performance production D2C e-commerce platform covering inventory management, order workflows, and product metadata.",
    bullets: [
      "Built and deployed a production D2C e-commerce platform using React, Next.js, Node.js, and TypeScript covering inventory management, order workflows, and product metadata",
      "Configured Cloudflare DNS edge routing and optimized the Vercel CI/CD pipeline, cutting build times by 35% and raising the SEO score to 98 out of 100",
    ],
    tags: ["React", "Next.js", "Node.js", "TypeScript", "Cloudflare", "Vercel", "CI/CD"],
  },
  {
    role: "Backend Development Intern",
    company: "Shelf Swap",
    companyUrl: "https://shelfswap.in/",
    startDate: "2025-03",
    endDate: "2025-08",
    timeline: "Mar 2025 – Aug 2025",
    isCurrent: false,
    location: "Remote, India",
    type: "Nationwide Book-Exchange Network",
    fallbackLogoText: "SS",
    summary: "Scalable backend systems and microservices for a nationwide book-exchange network.",
    bullets: [
      "Designed relational database schemas and a multi-container Docker architecture for a nationwide book-exchange network",
      "Integrated the Delhivery API to automate pickup and delivery across 3 cities at launch",
      "Reduced high-concurrency API query latency by 42% through index optimization; maintained 99.9% database uptime under sustained load",
    ],
    tags: ["PostgreSQL", "Docker", "REST APIs", "Node.js", "FastAPI", "SQLAlchemy"],
    certificateUrl: undefined,
  },
];
