# 💡 Explanation: Architecture Overview & Causal Graph RAG

This document explains the conceptual foundations, architectural decisions, and design principles underlying Strata.

---

## 1. Why Causal Graphs Over Pure Vector Embeddings?
Standard Retrieval-Augmented Generation (RAG) relies on semantic vector proximity (e.g. cosine distance in an embedding space). While effective for fuzzy text matching, vector similarity fails in mission-critical geopolitical and financial risk modeling because:
1. **Correlation vs. Causation**: Proximity in embedding space tells you that two concepts are often mentioned together, not whether event $A$ causes event $B$.
2. **Directionality & Asymmetry**: In macroeconomic cascades, an interest rate shock causes asset price revaluation, but asset price fluctuations do not trigger automatic rate changes in the same symmetric manner.
3. **Temporal Invariance**: Vector embeddings compress text into static coordinates, missing sequence-dependent structural vector autoregressions (SVAR).

**Dubstrata's Causal Graph** represents knowledge as directional, typed relationships (`TRIGGERS_SVAR_PRESSURE`, `RESTRICTS_CAPITAL_FLOW`, `VALIDATES_DECOUPLING`) with structural latency metrics and confidence intervals. When our agents query the graph, they receive deterministic, cause-and-effect paths rather than unconstrained semantic associations.

---

## 2. The 3-Layer Separation of Concerns

```
┌────────────────────────────────────────────────────────┐
│  Layer 1: Presentation (Cockpit & UI)                  │
│  - React 18 + Vite Glassmorphic Dashboard              │
│  - SSE Telemetry Stream, Modals, Asset Pickers         │
└──────────────────────────┬─────────────────────────────┘
                           │ REST / SSE
┌──────────────────────────▼─────────────────────────────┐
│  Layer 2: Gateway & Control (Unified Service)          │
│  - Express.js Master Gateway (:3000)                   │
│  - EventBroker Telemetry Pub/Sub                       │
│  - Multi-Path Resilient Static Server                  │
└──────────────────────────┬─────────────────────────────┘
                           │ Internal Method Invocations
┌──────────────────────────▼─────────────────────────────┐
│  Layer 3: Deterministic Execution (Engines & Storage)  │
│  - TradingAgentHarness Orchestrator                    │
│  - Dubstrata MCP Stdio Client (Live / Fallback)        │
│  - CausalLLMManager (Gemini API + JIT Self-Correction) │
│  - ContentComplianceVerifier (Deterministic Rules)     │
│  - Cryptographic SHA-256 Chained Audit Ledger          │
└────────────────────────────────────────────────────────┘
```

### Layer 1: Presentation
Dedicated visual interfaces for each operational domain:
- **Agent Hub**: Operator commanding multi-agent debates with Autopilot capability.
- **Signal Center**: JIT risk screening and instant investigation triggering.
- **Agent Directives**: Live prompt tuning and MCP hot-reload.
- **Business Context**: Organizational markdown synchronization.

### Layer 2: Gateway & Control
A single unified Express gateway listening on port 3000. It routes REST calls, exposes Server-Sent Events (SSE) for zero-polling browser updates, serves production frontend bundles with fallback path discovery, and manages agent discussion sessions.

### Layer 3: Deterministic Execution
The core reasoning engine. It interfaces with the Dubstrata MCP daemon via standard Stdio Model Context Protocol, manages self-correcting Gemini LLM queries, validates copy against deterministic compliance constraints, and records an immutable cryptographic audit ledger.
