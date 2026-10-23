---
title: "Building Alpha-Ray: An Intelligent Ray Budget Allocator for Path Tracing"
date: "2026-04-10"
description: "Designing an ML-guided ray budget allocator to cut real-time ray-tracing cost by predicting per-tile sample counts from G-buffer features."
tags: ["Graphics", "Vulkan", "C++", "CUDA", "Path Tracing"]
cover: "/assets/ray-tracer.png"
draft: false
---

# Building Alpha-Ray: An Intelligent Ray Budget Allocator for Path Tracing

Real-time path tracing is fundamentally bound by sample count per pixel (spp). While offline renderers can afford hundreds or thousands of rays per pixel to resolve complex light transport, real-time renderers operating under a 16.6ms or 33.3ms frame budget typically cannot afford more than 1 to 2 indirect rays per pixel without aggressive spatial and temporal denoising.

However, treating every screen pixel identically with uniform ray allocation is wasteful. A flat specular surface or a diffuse wall bathed in smooth direct illumination requires far fewer secondary rays to converge than intricate geometric foliage, refractive interfaces, or high-variance caustic regions.

**Alpha-Ray** is an intelligent ray budget allocator that shifts ray distribution from a naive uniform grid into an adaptive, ML-guided sampling pipeline. By inspecting cheap, primary-hit G-buffer features, Alpha-Ray predicts the required ray density per screen tile before any expensive indirect paths are traversed.

---

## 1. The Bottleneck: Uniform vs. Adaptive Sampling

Uniform Monte Carlo sampling allocates equal computational effort across pixels with wildly diverging variance:

- **Low-Variance Regions**: Flat walls, planar floors, directly lit Lambertian surfaces. Even 1 spp combined with basic temporal accumulation resolves these cleanly.
- **High-Variance Regions**: Geometric silhouettes, penumbra contact shadows, multi-bounce inter-reflections, and transmission boundaries. These areas remain noisy and introduce blotchy artifacts into spatial reconstructors when undersampled.

Instead of throwing uniform rays across the entire framebuffer, adaptive sampling seeks to concentrate ray budgets where irradiance gradients and geometric discontinuity are sharpest.

Traditional adaptive heuristics rely on luminance variance across previous frames. However, temporal variance heuristics suffer from two critical flaws:
1. **Motion Lag**: When the camera pans rapidly or dynamic geometry enters the scene, previous frame statistics are invalidated.
2. **Disocclusion Latency**: Newly disoccluded pixels have zero temporal history, resulting in sample starvation right when variance is highest.

Alpha-Ray tackles this problem **spatially and proactively** using the primary hit's G-buffer at the current frame $t$.

---

## 2. Pipeline Architecture

Alpha-Ray operates as a dual-pass rendering pipeline integrated into a custom Vulkan Ray Tracing (`VK_KHR_ray_tracing_pipeline`) workflow:

```
[ Primary Hit Pass ]  --> G-buffer (World Normal, Linear Depth, Roughness/Albedo, Motion)
                              |
                              v
[ Tile Feature Extraction ] --> 16x16 Screen-Space Tiles
                              |
                              v
[ Neural Budget Predictor ] --> Tile Ray Density Map (0 to 16 spp per tile)
                              |
                              v
[ Indirect Ray Dispatch ]  --> vkCmdTraceRaysIndirectKHR (Variable Workgroups)
                              |
                              v
[ Radiance Accumulation & Spatial Filter ] --> Final HDR Frame
```

### The Dual-Pass Sequence
1. **Primary Geometry Pass**: A lightweight raster or primary ray-gen shader computes primary surface interactions and populates a packed G-buffer target (normals, linear depth gradients, metallic-roughness, albedo variance).
2. **Tile Aggregator**: A compute shader downsamples the $W \times H$ G-buffer into $16 \times 16$ tile descriptors. Each descriptor encapsulates depth discontinuities, surface normal curvature, and microfacet roughness variance.
3. **Budget Allocator**: A compact convolutional predictor inspects the tile feature map and outputs an integer sample budget $[0, 16]$ for each tile, constrained by a strict total-frame ray budget.
4. **Indirect Dispatch**: An indirect command buffer (`vkCmdTraceRaysIndirectKHR`) consumes the allocation buffer, launching ray generation workgroups scaled directly to the allocated budget.

---

## 3. Data Pipeline & Synthetic Supervision

Supervising an allocator requires knowing the "ground-truth difficulty" of each screen region. For training data generation, we built a pipeline using **Mitsuba 3**:

- **Dual-Pass Generation**: Mitsuba renders test scenes at 1 spp and at a converged reference of 256 spp.
- **Perceptual Error Mapping**: We compute the local relative structural and perceptual difference (FLIP / relative $L_1$) between the low-spp estimate and the converged reference.
- **Label Assignment**: Screen tiles that exhibit severe perceptual error under low sample counts receive higher target ray allocations; tiles that converge instantaneously receive minimal allocations.
- **Dataset Packing**: The multi-channel G-buffer features and corresponding tile allocation masks are exported into an indexed HDF5 dataset structure.

---

## 4. Hardware Realization & Vulkan Ray Tracing

Running a neural predictor inside the real-time frame loop requires that the prediction pass itself cannot exceed a fraction of a millisecond. If predicting ray counts takes 4ms, any compute saved on path tracing is erased.

To achieve this:
- **Low-Overhead Model**: The predictor uses an ultra-shallow fully convolutional network (FCN) operating strictly in tile-space ($120 \times 68$ grid for 1080p rendering) rather than pixel-space.
- **Quantized Edge Deployment**: The architecture is exported to **ONNX** and optimized with **TensorRT**, running FP16 / INT8 kernels directly on GPU Tensor Cores.
- **Vulkan Indirect Ray Tracing**: Vulkan's `VK_KHR_ray_tracing_pipeline` extension allows indirect dispatch arguments. By writing the predicted sample counts into a GPU storage buffer formatted for `VkTraceRaysIndirectCommandKHR`, the engine drives ray allocation directly on the GPU without round-trips to the CPU.

---

## 5. Ongoing Work & Roadmap

Phase 1 established the end-to-end dataset generation pipeline in Mitsuba 3, the tile labeller, and the Vulkan indirect ray-dispatch harness.

Current development focuses on:
- **Phase 2 Model Training**: Fine-tuning the tile classifier across complex interior scenes with varying materials and directional light paths.
- **Denoising Symbiosis**: Integrating the variable-rate radiance output with spatiotemporal filters (SVGF / ReBLUR) to verify that adaptive ray distribution accelerates overall temporal convergence.

Alpha-Ray demonstrates that modern real-time rendering is not simply a contest of brute-force hardware compute—it is an optimization problem where ML can direct rays exactly where photons matter most.
