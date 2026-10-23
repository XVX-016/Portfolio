export interface StackItem {
  name: string;
  category: string;
  usage: string;
  featured?: boolean;
}

export interface StackGroup {
  group: string;
  description: string;
  items: StackItem[];
}

export const stackData: StackGroup[] = [
  {
    group: "Languages",
    description: "Core programming languages I write and design systems in.",
    items: [
      { name: "Python", category: "Languages", usage: "Primary language for deep learning research, FastAPI services, scientific simulation, and data pipelines.", featured: true },
      { name: "C++", category: "Languages", usage: "High-performance systems programming, custom Vulkan ray tracing engines, and latency-critical compute.", featured: true },
      { name: "TypeScript", category: "Languages", usage: "Strictly typed full-stack interfaces, Next.js, and browser-native simulations.", featured: true },
      { name: "Cython", category: "Languages", usage: "C-extensions and acceleration for inner simulation loops and numerical operations.", featured: true },
      { name: "Dart", category: "Languages", usage: "Cross-platform mobile application development with Flutter for local-first apps.", featured: false },
      { name: "SQL", category: "Languages", usage: "Complex analytical queries, relational modeling, and geospatial operations in PostGIS.", featured: false },
    ],
  },
  {
    group: "ML / AI & Simulation",
    description: "Frameworks, architectures, and inference engines for model development, sensor fusion, and deployment.",
    items: [
      { name: "PyTorch", category: "ML / AI", usage: "Training computer vision architectures (YOLOv8, ViT, ConvNeXt, Siamese nets), custom neural predictors, and embeddings.", featured: true },
      { name: "ONNX & TensorRT", category: "ML / AI", usage: "Quantized edge model export and sub-millisecond inference acceleration on RTX-class GPUs.", featured: true },
      { name: "SciPy & FilterPy", category: "ML / AI", usage: "Extended Kalman Filtering, sensor fusion, numerical integration (RK4), and control theory (LQR).", featured: true },
      { name: "LangGraph & LangChain", category: "ML / AI", usage: "Building multi-agent autonomous workflows, cyclic execution graphs, and tool-calling systems.", featured: false },
      { name: "Ollama", category: "ML / AI", usage: "Local LLM inference, quantized model deployment (Llama 3, Mistral, Qwen), and low-latency testing.", featured: false },
      { name: "NumPy & pandas", category: "ML / AI", usage: "Vectorized data processing, feature engineering, and statistical telemetry analysis.", featured: false },
    ],
  },
  {
    group: "Backend, DB & Cloud",
    description: "Data persistence, high-concurrency API services, and infrastructure pipelines.",
    items: [
      { name: "FastAPI & Node.js", category: "Backend / DB", usage: "Asynchronous REST APIs, streaming responses, and high-speed ML model inference runners.", featured: true },
      { name: "PostgreSQL & PostGIS", category: "Backend / DB", usage: "Spatial indexing, GeoAlchemy2 geospatial queries, and composite index optimization.", featured: true },
      { name: "Redis & Supabase", category: "Backend / DB", usage: "Telemetry replay caching, rate limiting, pub/sub event streams, and real-time database backends.", featured: true },
      { name: "Docker & Docker Compose", category: "Backend / DB", usage: "Multi-container microservices, reproducible ML environments, and CI deployment stacks.", featured: true },
      { name: "Cloudflare & Vercel", category: "Backend / DB", usage: "Edge DNS routing, CI/CD pipelines, and high-performance serverless deployment.", featured: false },
    ],
  },
  {
    group: "Frontend & 3D Web",
    description: "Client-side interfaces, responsive web apps, and real-time 3D telemetry graphics.",
    items: [
      { name: "React & Next.js", category: "Frontend", usage: "Production D2C storefronts, reactive user interfaces, and static site generation.", featured: true },
      { name: "React Three Fiber & Three.js", category: "Frontend", usage: "Interactive 3D flight cockpit simulation visualisations and WebGL telemetry.", featured: true },
      { name: "Tailwind CSS", category: "Frontend", usage: "Design systems, typography grids, and theme synchronization.", featured: false },
      { name: "Flutter", category: "Frontend", usage: "Local-first mobile architecture, Riverpod state management, and offline databases (Isar).", featured: true },
      { name: "MapLibre GL & Leaflet", category: "Frontend", usage: "Geospatial vector tile rendering and real-time damage-assessment mapping overlays.", featured: false },
    ],
  },
  {
    group: "Graphics & Rendering",
    description: "Low-level graphics APIs, GPU compute, and ray tracing research pipelines.",
    items: [
      { name: "Vulkan", category: "Graphics", usage: "Low-overhead GPU pipelines, Ray Tracing KHR extensions, and indirect command dispatch.", featured: true },
      { name: "CUDA", category: "Graphics", usage: "Massively parallel GPU computing, matrix arithmetic kernels, and custom ray allocation passes.", featured: true },
      { name: "Mitsuba 3", category: "Graphics", usage: "Dual-pass renderer, G-buffer packing, and synthetic dataset generation for path tracing models.", featured: true },
      { name: "GLSL / HLSL", category: "Graphics", usage: "Compute shaders, G-buffer rasterization, and SVGF temporal denoising filters.", featured: false },
    ],
  },
  {
    group: "DevOps & Tooling",
    description: "The daily developer environment, CI automation, and spatial analysis tools.",
    items: [
      { name: "GitHub Actions", category: "DevOps", usage: "Automated test suites, zero-warning linting checks, and multi-platform build workflows.", featured: true },
      { name: "Rasterio & QGIS", category: "DevOps", usage: "Geospatial raster processing, aerial patch tiling, and ground truth validation.", featured: false },
      { name: "RenderDoc & Nsight", category: "DevOps", usage: "Vulkan frame debugging, GPU shader execution profiling, and memory inspection.", featured: true },
      { name: "VS Code", category: "DevOps", usage: "Primary editor with remote SSH development, container attach, and C++/Python debugging.", featured: false },
    ],
  },
];
