# 🏛️ Dubstrata Architectural Blueprint & Modernization Spec

## 1. Executive Summary
This blueprint defines the unified 3-layer target architecture for **Strata (Dubstrata Situation Monitor & Business Agent Hub)**. The system modernizes legacy trading and disparate script components into an autonomous, compliance-governed risk intelligence platform.

---

## 2. The 3-Layer Architectural Separation

```mermaid
flowchart TD
    subgraph Layer1["Layer 1: Presentation (Cockpit & UI)"]
        UI["React 18 + Vite Glassmorphic Dashboard"]
        AgentHub["Agent Hub (Interactive Multi-Agent Debate)"]
        SignalCenter["Signal Center (RSS Stream & Investigation Lab)"]
        DirectivesZone["Agent Directives & MCP Settings Config"]
        ContextZone["Business Context & Strategy Sync"]
        Showcase["Benchmark Product Showcase Landing Page"]
        UI --> AgentHub
        UI --> SignalCenter
        UI --> DirectivesZone
        UI --> ContextZone
    end

    subgraph Layer2["Layer 2: Gateway & Control (Unified Service)"]
        ExpressGateway["Unified Express Gateway (:3000)"]
        SSEStream["SSE Event Telemetry Stream (/api/events)"]
        Broker["In-Memory Event Broker (EventBroker)"]
        StaticServer["Resilient Multi-Path Static Asset Server"]
        ChatMgr["Agent Chat Manager & Autopilot Controller"]
        
        ExpressGateway --> SSEStream
        ExpressGateway --> StaticServer
        ExpressGateway --> ChatMgr
        Broker --> SSEStream
    end

    subgraph Layer3["Layer 3: Deterministic Execution (Engines & Storage)"]
        Harness["TradingAgentHarness Orchestrator"]
        MCP["Dubstrata MCP Client (Stdio / Fallback)"]
        LLM["CausalLLMManager (Gemini API + Self-Correction)"]
        Daemon["Risk Daemon (RSS Ingestion & Anomaly Detection)"]
        Compliance["Compliance Verifier (Deterministic Rule Engine)"]
        AuditLedger["Cryptographic SHA-256 Audit Chain (JSONL)"]
        LocalData["Local State Files (Brain Map, Assets, Chats)"]

        Harness --> MCP
        Harness --> LLM
        Harness --> Compliance
        Harness --> AuditLedger
        Daemon --> Broker
        ChatMgr --> Harness
        ChatMgr --> LocalData
    end

    Layer1 <==>|REST APIs & SSE Stream| Layer2
    Layer2 <==>|Deterministic Method Invocations| Layer3
```

---

## 3. Data Flow & Event Telemetry

```mermaid
sequenceDiagram
    autonumber
    actor Operator as Operator / User
    participant UI as Dashboard Cockpit
    participant Gateway as Express Gateway
    participant Daemon as Risk Ingestion Daemon
    participant MCP as Dubstrata MCP Causal Graph
    participant LLM as Causal LLM Manager
    participant Compliance as Compliance Verifier
    participant Audit as Cryptographic Audit Ledger

    Note over Daemon: Background Polling (Every 5 mins)
    Daemon->>Daemon: Scrape Live Geopolitical Feeds
    Daemon->>Daemon: Detect Economic Risk Keywords
    Daemon-->>Gateway: Broadcast Anomaly Event
    Gateway-->>UI: Push Real-Time SSE Alert Modal
    
    Operator->>UI: Submit Investigation or Chat Message
    UI->>Gateway: POST /api/content/investigate-manual
    Gateway->>MCP: Query Downstream Causal Impacts
    MCP-->>Gateway: Return Causal Graph Facts & Conflicts
    Gateway->>LLM: Prompt Gemini with Causal Context
    LLM-->>Gateway: Structured Decision Brief
    Gateway->>Compliance: Deterministic Rule Verification
    Compliance-->>Gateway: Compliance Result (Pass/Fail)
    Gateway->>Audit: Append SHA-256 Chained Hash Entry
    Gateway-->>UI: Real-Time Telemetry & Generated Assets
```

---

## 4. Operational Persona Division (The 5 Subagents)

| Persona | Standard Operating Procedure | Primary Domain | Output Artifacts |
|---|---|---|---|
| **Visionary** | `SOP-STR-001` | Macroeconomic horizon mapping, SVAR loops, decoupling | Strategic Decision Briefs, OKRs |
| **Producer** | `SOP-OPS-004` | Sprint governance, engineering WIP limits, task queues | Sprint Backlogs, Work Breakdown |
| **Seller** | `SOP-SLS-001` | Institutional MEDDPICC qualification, API tiering | Discovery Docs, Deal Checkpoints |
| **Controller** | `SOP-FIN-001` | Solana x402 signatures, financial reconciliation, ASC 606 | Transaction Receipts, Schema Audits |
| **Systematiser** | `SOP-OPS-001` | Ingestion pipeline tuning, Muda elimination, Cypher graphs | Pipeline SOPs, Cypher Specs |

---

## 5. Modernization Milestones & Execution Checklist

- [x] **Milestone 1**: Forensic Audit (Inventorying all modules, data flows, and dead code).
- [x] **Milestone 2**: Architectural Blueprint (3-Layer model, telemetry sequence, component contracts).
- [ ] **Milestone 3**: Backend Unification & Resilience (Static path fallbacks, offline simulation guards, brain-map API).
- [ ] **Milestone 4**: Frontend Cockpit Integration (Verify build, purge dangling imports, streamline UX).
- [ ] **Milestone 5**: Negative Engineering (Pruning ~39MB scratch logs, deleting dead tab components, cleaning dist).
- [ ] **Milestone 6**: Boundary-First Diátaxis Docs (Tutorials, How-To, Reference, Explanation + Root README).
- [ ] **Milestone 7**: Product Showcase & Canonical Publishing (Raycast-grade benchmark landing page, link audit, git push).
