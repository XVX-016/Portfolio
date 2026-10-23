---
title: "High-Throughput LLM Inference: Understanding vLLM and PagedAttention"
date: "2026-04-18"
description: "Dissecting how vLLM revolutionizes large language model serving through PagedAttention, non-contiguous KV-cache management, and continuous batching."
tags: ["LLM", "Systems", "CUDA", "PyTorch", "vLLM", "Distributed Systems"]
cover: "/assets/vllm.png"
draft: false
---

# High-Throughput LLM Inference: Understanding vLLM and PagedAttention

Serving Large Language Models (LLMs) in production is notoriously memory-bound. While generating tokens, the autoregressive nature of transformer models requires caching the Key and Value (KV) tensors for all previous tokens in a sequence. As request concurrency and context lengths scale, managing this **KV cache** becomes the single greatest bottleneck limiting throughput and latency.

Standard serving frameworks historically wasted between 60% and 80% of GPU memory due to internal and external memory fragmentation. **vLLM** and its core algorithmic primitive, **PagedAttention**, completely redesigned this memory model by taking inspiration from classical OS virtual memory paging.

---

## 1. The Core Bottleneck: The KV Cache Problem

During autoregressive generation, generating each new token requires attending to every token that came before it. To avoid recomputing all previous keys and values at each step $t$, systems retain a persistent KV cache in high-bandwidth memory (HBM).

For a model with $L$ layers, $H$ attention heads, head dimension $D$, sequence length $S$, and precision $P$ bytes:

$$\text{KV Cache Size per Token} = 2 \times L \times H \times D \times P$$

For a 13B parameter model in FP16 precision ($L=40, H=40, D=128, P=2$), each token consumes approximately **800 KB**. For a batch of 64 concurrent requests with 2,048 tokens each, the KV cache alone demands over **100 GB of GPU memory**—dwarfing the weights of the model itself.

### Traditional Pre-Allocation Fragmentation
In early serving frameworks, memory for a request's KV cache had to be pre-allocated contiguously to accommodate the request's theoretical maximum length (e.g., 2,048 tokens). This created severe memory waste:
1. **Internal Fragmentation**: A request generating 200 tokens reserved slots for 2,048 tokens. The remaining slots sat idle.
2. **External Fragmentation**: Allocating variable-length contiguous chunks created memory holes that could not accommodate incoming requests.
3. **Reservation Inefficiency**: Memory for future tokens was locked up even before those tokens were generated.

---

## 2. PagedAttention: OS Virtual Memory for LLMs

PagedAttention resolves this bottleneck by allowing the KV cache to be stored in **non-contiguous physical memory blocks**.

Instead of allocating a massive contiguous array for each sequence:
- **Physical KV Blocks**: GPU memory is pre-divided into fixed-size blocks (e.g., holding keys and values for 16 tokens).
- **Block Tables**: Each sequence maintains a mapping table (analogous to a page table in an operating system) that tracks which physical blocks belong to which logical token positions.
- **On-Demand Allocation**: Physical blocks are allocated only when a sequence actually produces new tokens requiring additional slots.

```
Logical Sequence:  [ Tokens 0..15 ] -> [ Tokens 16..31 ] -> [ Tokens 32..47 ]
                         |                    |                     |
                     Block Table          Block Table           Block Table
                         |                    |                     |
                         v                    v                     v
Physical HBM:       [ Block #14 ]        [ Block #2 ]          [ Block #87 ]
```

Because the memory addresses do not need to be physically adjacent in memory, physical blocks can be placed anywhere in free GPU VRAM. As a result:
- **Zero External Fragmentation**: All physical memory blocks are of identical size.
- **Minimal Internal Fragmentation**: Waste is strictly limited to the unused slots within the very last block of a sequence (at most block size minus 1 tokens).

---

## 3. Custom CUDA Kernels for Non-Contiguous Attention

Standard attention kernels (such as basic FlashAttention) assume that key and value tensors are laid out contiguously in memory. Running attention over non-contiguous blocks required designing specialized CUDA kernels for PagedAttention:

1. **Kernel Invocation**: Threads within a CUDA warp collaboratively fetch the sequence's block table from global memory.
2. **Block Lookup & Prefetching**: Threads identify the physical block addresses corresponding to the logical token indices.
3. **Warp-Level Matrix Multiplication**: Using warp-level primitives, threads load key vectors into shared memory, compute dot products with the query vector, apply softmax scaling, and multiply with the value vectors across physical blocks.

By fusing these operations and leveraging Tensor Cores, PagedAttention matches or exceeds the execution speed of contiguous attention kernels while unlocking near 100% memory utilization.

---

## 4. Continuous Batching & Scheduling

Traditional static batching processes a batch of sequences until all sequences in the batch have reached their end-of-sequence (`<EOS>`) token. If one sequence requires 2,000 tokens while others complete in 50 tokens, the GPUs spend most of their cycles computing padding tokens.

vLLM couples PagedAttention with **iteration-level continuous batching**:
- After every forward pass (generation of one token per active request), completed requests are immediately evicted from the batch.
- Their physical KV blocks are returned to the free block pool.
- New requests from the waiting queue are admitted into the batch on the very next token iteration without waiting for the entire batch to complete.

This dynamic scheduling maximizes GPU Compute and Memory bandwidth utilization across fluctuating production traffic.

---

## 5. Multi-GPU Tensor Parallelism & Real-World Impact

For large models that exceed the capacity of a single GPU, vLLM coordinates distributed execution via **Megatron-style Tensor Parallelism**:
- Attention projection weights ($W_q, W_k, W_v$) and MLP column layers are split across GPUs along columns.
- The attention output projection ($W_o$) and MLP row layers are split along rows, followed by an `AllReduce` operation over high-speed NVLink.
- PagedAttention physical blocks are partitioned uniformly across worker GPUs, preserving identical block-table indexing across all parallel ranks.

By eliminating memory fragmentation and maximizing continuous batch occupancy, vLLM routinely achieves **2x to 4x higher serving throughput** compared to naive Hugging Face or early FastChat deployments.

Understanding the mechanics of PagedAttention illustrates a fundamental principle in systems engineering: when standard hardware constraints choke high-throughput pipelines, the most powerful solutions often come from adapting battle-tested operating system abstractions to modern parallel hardware.
