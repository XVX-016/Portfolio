import work1 from "@/assets/f1.jpg";
import work2 from "@/assets/svamitva.webp";
import work3 from "@/assets/tamracraft.png";
import work4 from "@/assets/adsc-sim.jpeg";
import work5 from "@/assets/aether-eye.png";
import work6 from "@/assets/resilience-sim.png";
import work7 from "@/assets/ray-tracer.png";
import work8 from "@/assets/otakulog.png";
import work9 from "@/assets/shelfswap.png";

export interface Work {
  title: string;
  category: string;
  year: string;
  image?: string;
  placeholderText?: string; // shown when no image asset exists yet
  description: string;
  link: string | null; // null = not deployed yet, card shows "In Progress"
  github?: string;
  featured: boolean; // shown on homepage "Selected Works"
}

export interface Experience {
  role: string;
  company: string;
  timeline: string;
  description: string;
  image?: string;
  link?: string | null;
}

export const works: Work[] = [
  {
    title: "F1 Predict",
    category: "ML / PREDICTIVE",
    year: "2025",
    image: work1,
    description: "ML-driven race strategy forecasting and aerodynamic data analysis.",
    link: "https://f1.tanmmay.me/",
    github: "https://github.com/XVX-016",
    featured: true,
  },
  {
    title: "SVAMITVA",
    category: "GEOSPATIAL / GIS",
    year: "2023",
    image: work2,
    description: "Geospatial drone-mapping pipeline for rural land records verification.",
    link: null,
    featured: true,
  },
  {
    title: "Aircraft Dynamics Sim",
    category: "SIMULATION / SYSTEMS",
    year: "2025 - 2026",
    image: work4,
    description: "6-DOF nonlinear flight physics engine with LQR autopilot and Kalman-filter state estimation.",
    link: "https://aircraft-flight-dynamics.vercel.app/",
    featured: true,
  },
  {
    title: "Aether-Eye",
    category: "COMPUTER VISION / SATELLITE",
    year: "2026",
    image: work5,
    description: "Satellite intelligence platform detecting and classifying aircraft in aerial imagery.",
    link: null,
    featured: true,
  },
  {
    title: "ResilienceSim",
    category: "MULTI-AGENT / SIMULATION",
    year: "2025",
    image: work6,
    description: "Multi-agent crisis resilience simulator modeling infrastructure recovery and resource allocation.",
    link: "https://resilience-sim.tanmmay.me/",
    github: "https://github.com/XVX-016/war-response-sim",
    featured: false,
  },
  {
    title: "Ray Budget Allocator",
    category: "GRAPHICS / ML DEPLOYMENT",
    year: "2026",
    image: work7,
    description: "ML-guided ray sample budget predictor for real-time Vulkan rendering pipelines.",
    link: null,
    github: "https://github.com/XVX-016/Ray-tracer",
    featured: false,
  },
  {
    title: "OtakuLog",
    category: "OPEN SOURCE / MOBILE",
    year: "2026",
    image: work8,
    description: "Local-first Flutter app for tracking anime and manga; official GSSoC '26 project.",
    link: "https://otakulog.tanmmay.me/",
    github: "https://github.com/XVX-016/OtakuLog",
    featured: false,
  },
];

export const experiences: Experience[] = [
  {
    role: "Lead Developer",
    company: "TamraCraft",
    timeline: "Dec 2026 - July 2026",
    image: work3,
    description: "High-performance platform for traditional copper and brass kitchenware.",
    link: "https://tamracraft.store/",
  },
  {
    role: "Backend Architect",
    company: "Shelf Swap",
    timeline: "March 2025 - Aug 2025",
    image: work9,
    description: "Backend systems for a nationwide, NGO-led book-exchange network.",
    link: "https://shelfswap.in/",
  },
];
