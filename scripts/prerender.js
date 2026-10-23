import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "..", "dist");

const templatePath = path.join(distDir, "index.html");
if (!fs.existsSync(templatePath)) {
  console.error("dist/index.html not found. Run vite build first.");
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf-8");

// Exclude drafts: Only non-draft routes are published in sitemap and prerendered
const routes = [
  {
    path: "/",
    title: "Tanmmay Kanhaiya – ML/AI Engineer & Full-Stack Developer",
    description: "Portfolio of Tanmmay Kanhaiya. ML/AI Engineer specializing in autonomous agents, computer vision, path tracing, and scalable distributed systems.",
    canonical: "https://tanmmay.me/",
    changefreq: "weekly",
    priority: "1.0",
    bodySnippet: `
      <h1>Tanmmay Kanhaiya – ML/AI Engineer & Full-Stack Developer</h1>
      <p>ML/AI Engineer based in Delhi, India</p>
      <section>
        <h2>Selected Works</h2>
        <ul>
          <li><strong>Alpha-Ray: Intelligent Ray Budget Allocator</strong>: ML-guided ray budget allocator predicting per-tile sample counts (0 to 16 rays) from G-buffer features for indirect ray dispatch.</li>
          <li><strong>Aether-Eye</strong>: Satellite intelligence platform detecting and classifying 10+ aircraft variants in high-resolution aerial imagery.</li>
          <li><strong>Aircraft Dynamics & Control Simulation</strong>: 6-DOF flight physics engine with closed-loop LQR autopilot and Extended Kalman Filter state estimator.</li>
          <li><strong>ResilienceSim</strong>: Multi-agent crisis response simulation of civil infrastructure resilience across regions.</li>
          <li><strong>F1-Predict: Race Strategy Intelligence</strong>: Formula 1 race simulation with Monte Carlo strategy and ML lap-time deltas.</li>
        </ul>
      </section>
      <section>
        <h2>Tools & Stack</h2>
        <p>Languages: Python, C++, TypeScript, Cython, Dart, SQL</p>
        <p>ML/AI: PyTorch, ONNX, TensorRT, SciPy, FilterPy, LangGraph</p>
        <p>Backend: FastAPI, Node.js, PostgreSQL, PostGIS, Redis, Supabase, Docker</p>
        <p>Graphics: Vulkan, CUDA, Mitsuba 3, Path Tracing</p>
      </section>
    `,
  },
  {
    path: "/projects",
    title: "Projects | Tanmmay Kanhaiya",
    description: "Explore selected engineering projects by Tanmmay Kanhaiya in ML/AI, graphics, flight simulation, and distributed backends.",
    canonical: "https://tanmmay.me/projects",
    changefreq: "monthly",
    priority: "0.9",
    bodySnippet: `
      <h1>All Projects – Tanmmay Kanhaiya</h1>
      <ul>
        <li><h3>Alpha-Ray: Intelligent Ray Budget Allocator</h3><p>Designing an ML-guided ray budget allocator to cut real-time ray-tracing cost by predicting per-tile sample counts from G-buffer features.</p></li>
        <li><h3>Aether-Eye</h3><p>Satellite intelligence platform detecting and classifying 10+ aircraft variants in high-resolution aerial imagery.</p></li>
        <li><h3>Aircraft Dynamics & Control Simulation</h3><p>6-DOF nonlinear flight simulator with closed-loop LQR autopilot and Extended Kalman Filter state estimator.</p></li>
        <li><h3>ResilienceSim</h3><p>Multi-agent crisis response simulation of civil infrastructure resilience across regions.</p></li>
        <li><h3>F1-Predict: Race Strategy Intelligence</h3><p>Research-driven Formula 1 race simulation combining deterministic physics modeling with stochastic Monte Carlo analysis.</p></li>
        <li><h3>OtakuLog</h3><p>Local-first Flutter & Isar app for tracking anime and manga. Official GSSoC '26 project.</p></li>
        <li><h3>SVAMITVA</h3><p>Geospatial drone-mapping pipeline for rural land records verification.</p></li>
      </ul>
    `,
  },
  {
    path: "/blog",
    title: "Writing & Engineering Notes | Tanmmay Kanhaiya",
    description: "Technical articles on real-time ray tracing, high-throughput LLM serving, distributed systems, and ML infrastructure.",
    canonical: "https://tanmmay.me/blog",
    changefreq: "weekly",
    priority: "0.8",
    bodySnippet: `
      <h1>Writing – Tanmmay Kanhaiya</h1>
      <ul>
        <li><h3>High-Throughput LLM Inference: Understanding vLLM and PagedAttention</h3><p>Dissecting how vLLM revolutionizes large language model serving through PagedAttention, non-contiguous KV-cache management, and continuous batching.</p></li>
        <li><h3>Building Alpha-Ray: An Intelligent Ray Budget Allocator for Path Tracing</h3><p>Designing an ML-guided ray budget allocator to cut real-time ray-tracing cost by predicting per-tile sample counts from G-buffer features.</p></li>
      </ul>
    `,
  },
  {
    path: "/blog/vllm-high-throughput-inference",
    title: "High-Throughput LLM Inference: Understanding vLLM and PagedAttention | Tanmmay Kanhaiya",
    description: "Dissecting how vLLM revolutionizes large language model serving through PagedAttention, non-contiguous KV-cache management, and continuous batching.",
    canonical: "https://tanmmay.me/blog/vllm-high-throughput-inference",
    changefreq: "monthly",
    priority: "0.7",
    bodySnippet: `
      <h1>High-Throughput LLM Inference: Understanding vLLM and PagedAttention</h1>
      <p>By Tanmmay Kanhaiya – Published April 18, 2026</p>
      <p>Dissecting how vLLM revolutionizes large language model serving through PagedAttention, non-contiguous KV-cache management, and continuous batching.</p>
    `,
  },
  {
    path: "/blog/building-alpha-ray",
    title: "Building Alpha-Ray: An Intelligent Ray Budget Allocator for Path Tracing | Tanmmay Kanhaiya",
    description: "Designing an ML-guided ray budget allocator to cut real-time ray-tracing cost by predicting per-tile sample counts from G-buffer features.",
    canonical: "https://tanmmay.me/blog/building-alpha-ray",
    changefreq: "monthly",
    priority: "0.7",
    bodySnippet: `
      <h1>Building Alpha-Ray: An Intelligent Ray Budget Allocator for Path Tracing</h1>
      <p>By Tanmmay Kanhaiya – Published April 10, 2026</p>
      <p>Designing an ML-guided ray budget allocator to cut real-time ray-tracing cost by predicting per-tile sample counts from G-buffer features.</p>
    `,
  },
  {
    path: "/stack",
    title: "Tools & Tech Stack | Tanmmay Kanhaiya",
    description: "Programming languages, ML/AI frameworks, graphics engines, and developer tools used by Tanmmay Kanhaiya.",
    canonical: "https://tanmmay.me/stack",
    changefreq: "monthly",
    priority: "0.8",
    bodySnippet: `
      <h1>Tools & Tech Stack – Tanmmay Kanhaiya</h1>
      <section>
        <h2>Languages</h2>
        <p><strong>Python</strong>: Primary language for deep learning research, FastAPI services, scientific simulation, and data pipelines.</p>
        <p><strong>C++</strong>: High-performance systems programming, custom Vulkan ray tracing engines, and latency-critical compute.</p>
        <p><strong>TypeScript</strong>: Strictly typed full-stack interfaces, Next.js, and browser-native simulations.</p>
        <p><strong>Cython</strong>: C-extensions and acceleration for inner simulation loops and numerical operations.</p>
      </section>
      <section>
        <h2>ML / AI & Simulation</h2>
        <p><strong>PyTorch</strong>: Training computer vision architectures, custom neural predictors, and embeddings.</p>
        <p><strong>ONNX & TensorRT</strong>: Quantized edge model export and sub-millisecond inference acceleration on RTX-class GPUs.</p>
        <p><strong>SciPy & FilterPy</strong>: Extended Kalman Filtering, sensor fusion, numerical integration (RK4), and control theory (LQR).</p>
      </section>
      <section>
        <h2>Backend, DB & Cloud</h2>
        <p><strong>FastAPI & Node.js</strong>: Asynchronous REST APIs, streaming responses, and high-speed ML model inference runners.</p>
        <p><strong>PostgreSQL & PostGIS</strong>: Spatial indexing, GeoAlchemy2 geospatial queries, and composite index optimization.</p>
        <p><strong>Docker & Docker Compose</strong>: Multi-container microservices, reproducible ML environments, and CI deployment stacks.</p>
      </section>
      <section>
        <h2>Graphics & Rendering</h2>
        <p><strong>Vulkan</strong>: Low-overhead GPU pipelines, Ray Tracing KHR extensions, and indirect command dispatch.</p>
        <p><strong>CUDA</strong>: Massively parallel GPU computing, matrix arithmetic kernels, and custom ray allocation passes.</p>
        <p><strong>Mitsuba 3</strong>: Dual-pass renderer, G-buffer packing, and synthetic dataset generation for path tracing models.</p>
      </section>
    `,
  },
];

console.log("Generating static HTML snapshots and build-time sitemap.xml...");

// 1. Generate Static HTML Snapshots
routes.forEach((route) => {
  let html = template;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);

  // Replace / Inject Meta Tags
  html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${route.canonical}" />`);
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${route.description}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${route.title}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${route.description}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${route.canonical}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${route.title}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${route.description}" />`);
  html = html.replace(/<meta name="twitter:url" content=".*?" \/>/, `<meta name="twitter:url" content="${route.canonical}" />`);

  // Inject prerendered content into <div id="root">
  const prerenderedRoot = `<div id="root">${route.bodySnippet}</div>`;
  html = html.replace('<div id="root"></div>', prerenderedRoot);

  // Determine output path
  let targetPath;
  if (route.path === "/") {
    targetPath = path.join(distDir, "index.html");
  } else {
    const routeDir = path.join(distDir, route.path.replace(/^\//, ""));
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    targetPath = path.join(routeDir, "index.html");
  }

  fs.writeFileSync(targetPath, html, "utf-8");
  console.log(`✓ Prerendered static HTML: ${path.relative(distDir, targetPath)}`);
});

// 2. Generate sitemap.xml at build time from route list
const currentDate = new Date().toISOString().split("T")[0];
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${r.canonical}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const sitemapDistPath = path.join(distDir, "sitemap.xml");
fs.writeFileSync(sitemapDistPath, sitemapXml, "utf-8");

// Also keep public/sitemap.xml synced
const sitemapPublicPath = path.resolve(__dirname, "..", "public", "sitemap.xml");
fs.writeFileSync(sitemapPublicPath, sitemapXml, "utf-8");

console.log(`✓ Generated sitemap.xml with ${routes.length} published URLs.`);
console.log("Pre-rendering and sitemap generation complete!");
