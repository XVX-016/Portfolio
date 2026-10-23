import work1 from "@/assets/f1.jpg";
import work2 from "@/assets/svamitva.webp";
import work4 from "@/assets/adsc-sim.jpeg";
import work5 from "@/assets/aether-eye.png";
import work6 from "@/assets/resilience-sim.png";
import work7 from "@/assets/ray-tracer.png";
import work8 from "@/assets/otakulog.png";
import workVllm from "@/assets/vllm.png";
import workLumen from "@/assets/lumen.png";
import workArchiveXi from "@/assets/archive-xi.png";

export interface Work {
  title: string;
  category: string;
  year: string;
  image?: string;
  placeholderText?: string;
  description: string;
  bullets?: string[];
  tags?: string[];
  link: string | null;
  github?: string;
  featured: boolean;
}

export interface Experience {
  role: string;
  company: string;
  timeline: string;
  description: string;
  image?: string;
  link?: string | null;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface SkillCategory {
  label: string;
  skills: string[];
}

// ─── Projects ────────────────────────────────────────────────────────────────

export const works: Work[] = [
  {
    title: "Alpha-Ray: Intelligent Ray Budget Allocator",
    category: "GRAPHICS / ML DEPLOYMENT",
    year: "Jun 2026 – Present",
    image: work7,
    description: "Designing an ML-guided ray budget allocator to cut real-time ray-tracing cost by predicting per-tile sample counts from G-buffer features, targeting sub-millisecond inference on RTX-class GPUs via TensorRT.",
    bullets: [
      "Built the full Phase 1 data pipeline: Mitsuba 3 dual-pass renderer, G-buffer packer, perceptual-error tile labeller, and HDF5 dataset exporter to train a tile-space U-Net/FCN classifier",
      "Designing an ML-guided ray budget allocator predicting per-tile sample counts (0 to 16 rays) from G-buffer features for indirect ray dispatch",
      "Currently training the Phase 2 model and building the ONNX/TensorRT export path for real-time Vulkan ray tracing",
    ],
    tags: ["Python", "CUDA", "Vulkan", "Mitsuba 3", "ONNX", "TensorRT", "C++"],
    link: null,
    github: "https://github.com/XVX-016/Ray-tracer",
    featured: true,
  },
  {
    title: "Aether-Eye",
    category: "COMPUTER VISION / SATELLITE",
    year: "Jan 2026 – May 2026",
    image: work5,
    description: "Satellite intelligence platform detecting and classifying 10+ aircraft variants in high-resolution aerial imagery with change detection between image pairs.",
    bullets: [
      "Trained YOLOv8 for detection and fine-tuned a ViT for classification on xView and DOTA datasets; built a Siamese change-detection model trained on LEVIR-CD, WHU-CD, and SpaceNet-7",
      "Enabled large-scale inference on 12,000x12,000-pixel satellite images by tiling into 512x512 patches, exporting models to ONNX, and serving through an async FastAPI runner",
      "Built a PostGIS-backed dashboard that maps detections to real-world coordinates in real time",
    ],
    tags: ["PyTorch", "YOLOv8", "ViT", "ONNX", "FastAPI", "PostGIS", "GeoAlchemy2", "Rasterio"],
    link: "https://aethereye.tanmmay.me/",
    featured: true,
  },
  {
    title: "Aircraft Dynamics & Control Simulation",
    category: "SIMULATION / SYSTEMS",
    year: "Oct 2025 – May 2026",
    image: work4,
    description: "6-DOF flight physics engine with closed-loop LQR autopilot and Extended Kalman Filter state estimator streamed live to a 3D browser cockpit.",
    bullets: [
      "Built a 6-DOF nonlinear flight physics engine using RK4 numerical integration modeling the full aerodynamic envelope including stall, high-alpha, Mach effects, and MIL-F-8785C Dryden turbulence",
      "Implemented an LQR autopilot for stabilization and an Extended Kalman Filter for sensor fusion and state estimation; built a linearization engine that extracts state-space matrices at any flight condition",
      "Streamed telemetry over WebSocket at 50Hz to a React Three Fiber 3D cockpit with live Bode and root-locus analysis panels",
    ],
    tags: ["Python", "SciPy", "FilterPy", "FastAPI", "React Three Fiber", "Control Theory"],
    link: "https://aircraft-flight-dynamics.vercel.app/",
    featured: true,
  },
  {
    title: "vLLM High-Throughput Inference Engine",
    category: "SYSTEMS / LLM SERVING",
    year: "2026",
    image: workVllm,
    description: "High-throughput, low-latency LLM serving engine with PagedAttention and continuous batching.",
    bullets: [
      "Optimized KV-cache memory allocation and continuous batching execution schedules",
      "Benchmarked distributed multi-GPU tensor-parallel inference workloads",
      "Integration with OpenAI-compatible API endpoints for ultra-low time-to-first-token (TTFT)",
    ],
    tags: ["Python", "CUDA", "C++", "PyTorch", "LLM Inference"],
    link: null,
    github: "https://github.com/XVX-016",
    featured: true,
  },
  {
    title: "ResilienceSim",
    category: "MULTI-AGENT / CRISIS SIMULATION",
    year: "Aug 2025 – Nov 2025",
    image: work6,
    description: "Multi-agent crisis response simulation of civil infrastructure resilience across regions with rule-based recovery and YOLOv8 vision adapter.",
    bullets: [
      "Modeled infrastructure disruption, recovery, and resource allocation across regions in a multi-agent crisis simulator with a live dashboard and rule-based recovery agent",
      "Built an optional YOLOv8 vision adapter for damage assessment overlays on Leaflet interactive maps",
      "FastAPI + Next.js real-time dashboard tracking cascading interdependencies",
    ],
    tags: ["Python", "FastAPI", "Next.js", "YOLOv8", "Multi-Agent", "Leaflet"],
    link: "https://resilience-sim.tanmmay.me/",
    github: "https://github.com/XVX-016/war-response-sim",
    featured: false,
  },
  {
    title: "F1-Predict: Race Strategy Intelligence",
    category: "ML / SIMULATION",
    year: "Aug 2025 – Nov 2025",
    image: work1,
    description: "Formula 1 race simulation combining deterministic physics modeling, Monte Carlo strategy, and ML lap-time deltas.",
    bullets: [
      "Built a race strategy engine that combines a deterministic physics model, Monte Carlo simulation, and an ML-based performance predictor with a pit-window optimizer based on constrained regression for tire degradation",
      "Replayed real F1 telemetry from FastF1 through a Redis-backed intelligence service; used Cython to speed up the simulation core",
      "Shipped the system as a Docker Compose stack with GitHub Actions CI/CD; used checksum-frozen datasets to keep results reproducible",
    ],
    tags: ["Python", "FastAPI", "Redis", "Supabase", "React", "Cython", "Docker"],
    link: "https://f1.tanmmay.me/",
    github: "https://github.com/XVX-016",
    featured: false,
  },
  {
    title: "OtakuLog (GSSoC '26 Project Administrator)",
    category: "OPEN SOURCE / MOBILE",
    year: "2026",
    image: work8,
    description: "Local-first Flutter & Isar app for tracking anime and manga. Selected as an official GSSoC '26 project.",
    bullets: [
      "Created and maintain OtakuLog, a local-first Flutter app for tracking anime and manga, selected as an official GSSoC '26 project",
      "Reviewed and merged close to 30 pull requests from external contributors; repository has 24 forks and 5 stars",
      "Fixed core performance issues and built structural system modules in the app with Riverpod and GoRouter",
    ],
    tags: ["Flutter", "Riverpod", "Isar", "GoRouter", "Dio", "Dart"],
    link: "https://otakulog.tanmmay.me/",
    github: "https://github.com/XVX-016/OtakuLog",
    featured: false,
  },
  {
    title: "ARCHIVE XI",
    category: "E-COMMERCE / FULL-STACK",
    year: "2025 – 2026",
    image: workArchiveXi,
    description: "Full-stack e-commerce storefront for a curated clothing and footwear brand.",
    bullets: [
      "Custom responsive design system engineered for high-performance browsing",
      "Seamless checkout and inventory tracking",
    ],
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://www.archivexi.in/",
    featured: false,
  },
  {
    title: "Lumen",
    category: "FINTECH / WEB",
    year: "2025",
    image: workLumen,
    description: "STEM Education Loan Planner for Indian students calculating real degree costs and loan repayment feasibility.",
    bullets: [
      "Dynamic cost-of-attendance and currency amortization calculation engine",
      "Interactive repayment timelines and ROI projections",
    ],
    tags: ["TypeScript", "React", "Financial Modeling"],
    link: "https://lumen.tanmmay.me/",
    featured: false,
  },
  {
    title: "SVAMITVA",
    category: "GEOSPATIAL / GIS",
    year: "2023",
    image: work2,
    description: "Geospatial drone-mapping pipeline for rural land records verification.",
    bullets: [
      "End-to-end UAV imagery processing pipeline for cadastral boundary extraction",
      "GIS integration for government land-record verification",
    ],
    tags: ["Python", "QGIS", "GIS", "Drone", "Remote Sensing"],
    link: null,
    featured: false,
  },
];

// ─── Work Experience ──────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    role: "Lead Developer",
    company: "TamraCraft",
    timeline: "Dec 2025 – Jul 2026",
    description: "High-performance headless e-commerce platform for traditional copper and brass kitchenware.",
    link: "https://tamracraft.store/",
  },
  {
    role: "Backend Intern",
    company: "Shelf Swap",
    timeline: "Mar 2025 – Aug 2025",
    description: "Backend systems for a nationwide, NGO-led book-exchange network.",
    link: "https://shelfswap.in/",
  },
];

// ─── Certifications ───────────────────────────────────────────────────────────

export const certifications: Certification[] = [
  {
    name: "Oracle Cloud Infrastructure Certified Foundations Associate",
    issuer: "Oracle",
    date: "Oct 2026",
    credentialUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge_m?id=B6B125C199CE9777DB3BFA124E5683AAE6A1651894E8EA4CD4BB560B933C81CA",
  },
  {
    name: "AWS Academy Graduate - Cloud Foundations - Training Badge",
    issuer: "Amazon Web Services (AWS)",
    date: "Sep 2026",
    credentialUrl: "https://www.credly.com/badges/ce257e71-8e55-4a71-952f-e2b6c0f156eb/linked_in_profile",
  },
  {
    name: "Mastering Parallel Programming with the CUDA Platform",
    issuer: "Udemy",
    date: "Jul 2026",
    credentialUrl: "https://www.udemy.com/certificate/UC-72fdb6fd-9e45-4ac0-807e-0a28474eca21/",
  },
  {
    name: "AI Fundamentals",
    issuer: "Google",
    date: "Mar 2026",
    credentialId: "V39CA8OKDJNK",
    credentialUrl: "https://www.coursera.org/account/accomplishments/records/V39CA8OKDJNK",
  },
  {
    name: "IBM RAG and Agentic AI",
    issuer: "IBM",
    date: "Mar 2026",
    credentialId: "YA6OYEW64PEQ",
    credentialUrl: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/YA6OYEW64PEQ",
  },
  {
    name: "Build AI Agents using MCP",
    issuer: "IBM",
    date: "Mar 2026",
    credentialId: "YZ9M3FTK9U02",
    credentialUrl: "https://www.coursera.org/account/accomplishments/records/YZ9M3FTK9U02",
  },
  {
    name: "Agentic AI with LangGraph, CrewAI, AutoGen and BeeAI",
    issuer: "IBM",
    date: "Mar 2026",
    credentialId: "27C3NXVA0HDR",
    credentialUrl: "https://www.coursera.org/account/accomplishments/records/27C3NXVA0HDR",
  },
  {
    name: "Agentic AI with LangChain and LangGraph",
    issuer: "IBM",
    date: "Mar 2026",
    credentialId: "43XGIO0AKQS5",
    credentialUrl: "https://www.coursera.org/account/accomplishments/records/43XGIO0AKQS5",
  },
  {
    name: "Fundamentals of Building AI Agents",
    issuer: "IBM",
    date: "Mar 2026",
    credentialId: "WN14H2MXD32W",
    credentialUrl: "https://www.coursera.org/account/accomplishments/records/WN14H2MXD32W",
  },
  {
    name: "Build Multimodal Generative AI Applications",
    issuer: "IBM",
    date: "Mar 2026",
    credentialId: "OKJF1O071GSF",
    credentialUrl: "https://www.coursera.org/account/accomplishments/records/OKJF1O071GSF",
  },
];

// ─── Skills ───────────────────────────────────────────────────────────────────

export const skillCategories: SkillCategory[] = [
  {
    label: "ML / AI",
    skills: [
      "AI / ML",
      "Gen AI",
      "Neural Nets",
      "CNN",
      "RAG",
      "Vector DB",
      "LangChain",
      "LangGraph",
      "Agentic AI",
      "Local LLM (Ollama)",
      "ML Infrastructure",
      "Geospatial AI",
    ],
  },
  {
    label: "Backend",
    skills: [
      "Python",
      "FastAPI",
      "REST API Design",
      "Third-party API Integration",
      "PostgreSQL",
      "Query Optimization",
      "Docker",
      "System Architecture",
    ],
  },
  {
    label: "Graphics",
    skills: [
      "C++",
      "CUDA",
      "Vulkan",
      "Real-time Rendering",
      "Path Tracing",
      "Physics Simulation",
    ],
  },
  {
    label: "Frontend",
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "Flutter",
      "VS Code Extension Dev",
    ],
  },
  {
    label: "Tools",
    skills: [
      "Git / GitHub",
      "Open-source (GSSoC)",
      "QGIS / GIS",
      "Leaflet",
    ],
  },
];
