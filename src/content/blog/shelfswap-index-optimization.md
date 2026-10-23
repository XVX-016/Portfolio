---
title: "Cutting API Latency 42% with Index Optimization at Shelfswap"
date: "2025-08-20"
description: "How relational schema design, multi-container Docker architecture, and index optimization cut query latency by 42% at Shelf Swap."
tags: ["Backend", "PostgreSQL", "Database", "Performance", "Docker"]
cover: "/assets/resilience-sim.png"
draft: true
---

# Cutting API Latency 42% with Index Optimization at Shelfswap

*Draft Outline – Work in progress.*

## 1. System Context & Architecture
- Background on Shelf Swap: nationwide book-exchange network.
- Relational database schema design.
- Multi-container Docker architecture supporting core services.
- Integration of the Delhivery API across 3 cities at launch.
- <!-- TODO: Add system topology diagram and container setup details -->

## 2. Latency Bottleneck Identification
- Profiling high-concurrency API query performance under load.
- Identifying query execution bottlenecks.
- <!-- TODO: Insert slow query profiles and execution plan analysis -->

## 3. Index Optimization Strategy
- Designing targeted database indexes.
- Measuring execution impact on high-concurrency endpoints.
- Results: Reduced high-concurrency API query latency by 42%.
- Maintained 99.9% database uptime under sustained load.
- <!-- TODO: Add index definitions and before/after latency benchmarks -->

## 4. Production Stability & Takeaways
- Sustaining 99.9% uptime during peak usage.
- Practical database optimization practices for production backends.
- <!-- TODO: Add conclusions and operational learnings -->
