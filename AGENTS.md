# Agent Operating Instructions & Guidelines (AGENTS.md)

This document contains repository-level instructions, rules, and style requirements that any autonomous agent, script, or model executing within this harness must strictly follow.

---

## 1. Feedforward Guides & Rules

### 🔍 Causal Single-Source-of-Truth Directive
* **Rule**: All trading, backtesting, or strategic recommendations must use the **Dubstrata MCP** causal graph database as their sole source of causal truth.
* **Outages & Errors**: If the Dubstrata MCP server returns connection errors (e.g., `NameResolutionError`, `HTTPConnectionPool`), the agent must immediately suspend trading activity and place the market on **`HOLD`** with $0.00 allocated. **Do not trade under absolute uncertainty.**

### 🔒 Cryptographic Compliance Mandates
* **Rule**: All generated decision briefs and strategic dispatches must be verified using the deterministic compliance verifier (`src/content/complianceVerifier.ts`) and recorded in the SHA-256 chained audit ledger (`src/dubstrata/auditLogger.ts`).
* **Limitations**: Respect all copy and pacing rules: zero banned clichés (`delve`, `tapestry`, etc.), paragraph length under 250 characters, visceral active verbs required, and Grok summary capsules. Non-compliant outputs must be rejected or retried.

### 🛡️ Simulation-Mode Fallback Guard
* **Rule**: Unless external API keys (`DUBSTRATA_API_KEY`, `GEMINI_API_KEY`) are explicitly configured, the engine must execute via deterministic local simulation fallbacks (`src/dubstrata/client.ts`, `src/utils/llmManager.ts`) to ensure 100% reliable offline boots and safe dry-runs.

---

## 2. Sensor & Feedback Requirements

### 🧪 JSON Schema Validation
* When returning structured decisions (e.g., for backtests or scouting), models must use JSON format.
* **Auto-Correction**: The harness must parse the output. If parsing fails, the harness must loop back, feed the compilation/validation error directly back to the model, and prompt for correction (up to 3 retries).

---

## 3. UI/UX Dashboard Style Architecture
* **Rule**: The Express dashboard uses a custom premium **dark glassmorphism** theme.
* **Aesthetics**:
  - Backgrounds: Dark radial gradients, blurred backdrops (`backdrop-filter: blur(16px)`).
  - Accent Colors: Bright neon indigo (`#6366f1`), neon green (`#10b981`), and danger coral (`#f43f5e`).
  - Reasoning Output: LLM reasoning details must be formatted in styled, legible HTML snippets matching this glassmorphic palette.
