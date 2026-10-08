# 🚀 Tutorial: 10-Minute Zero-to-One Quickstart

Welcome to **Strata (Dubstrata Geopolitical Situation Monitor & Business Multi-Agent Hub)**. This tutorial guides you from a fresh clone to a running cockpit in under 10 minutes.

---

## 1. Prerequisites
Ensure your workstation has:
- **Node.js**: v18.0.0 or higher (`node -v`)
- **npm**: v9.0.0 or higher (`npm -v`)
- **Git**

---

## 2. Step 1: Clone and Install
Clone the repository and install all dependencies (including frontend cockpit modules):

```bash
git clone https://github.com/MuzikayiseKhuzwayo/dubstrata-investigation.git
cd dubstrata-investigation
npm install
```

---

## 3. Step 2: Configure Environment (Zero-Friction Fallback)
Copy the example environment file:

```bash
cp .env.example .env
```

> [!NOTE]
> **No API keys are required to start.**
> Strata includes an integrated **Deterministic Simulation Mode**. If `DUBSTRATA_API_KEY` or `GEMINI_API_KEY` are not set, the platform automatically boots into local simulated mode with realistic causal graphs, multi-agent debates, and synthetic signals.

To enable live production queries:
- Set `DUBSTRATA_API_KEY=your_key` in `.env` (or configure it dynamically in the UI).
- Set `GEMINI_API_KEY=your_key` in `.env` for live LLM reasoning.

---

## 4. Step 3: Run Automated Verification
Verify engine health and compliance verification before booting:

```bash
npm test
```

Expected output:
```
================================================================
       🧪 RUNNING DUBSTRATA ENGINE VERIFICATION SUITE           
================================================================
📋 Test Group 1: Content Compliance Engine
  ✅ PASS: Catches hard-banned words (delve, tapestry, elevate)
  ✅ PASS: Reports exact errors for all detected banned words
  ✅ PASS: Clean compliant copy passes all structural checks
🔐 Test Group 2: Cryptographic Audit Trail Chaining
  ✅ PASS: Successive audit entries generate unique chained hashes
...
       🏁 TEST RESULTS: 11 PASSED, 0 FAILED                 
================================================================
```

---

## 5. Step 4: Launch the Platform
Start the engine, background Risk Daemon, and visualizer:

```bash
npm start
```

You will see:
```
================================================================
       ⚡ DUBSTRATA-MCP CAUSAL CONTENT ENGINE & HARNESS ⚡      
================================================================
✨ Premium Content Visualizer listening at http://localhost:3000
🔥 ENGINE RUNNING. Open http://localhost:3000 to view dashboard.
```

---

## 6. Step 5: Explore the Cockpit
Open **[http://localhost:3000](http://localhost:3000)** in your browser:

1. **Agent Hub (Chat)**:
   - Click any sample topic or type a macro risk topic (e.g., `Semiconductor Export Controls`).
   - Click **"Visionary"** or **"Producer"** to summon an agent.
   - Toggle **"Auto-Pilot"** to watch the subagents debate strategic countermeasures sequentially.
2. **Signal Center**:
   - Inspect live RSS geopolitical signals.
   - Submit a custom event into the **Manual Investigation Lab** to generate an instant Strategic Decision Brief.
3. **Agent Management**:
   - Inspect and tune the SOP directives for each persona.
   - Hot-reload your Dubstrata MCP API key without restarting the server.
4. **Business Context**:
   - Inspect and edit organization markdown rules synchronized directly with repository files.

---

## 7. Next Steps
- Learn how to connect live cloud graphs: [How-To: Connect Dubstrata MCP](../how-to/connect_dubstrata_mcp.md)
- Explore the API: [REST API Reference](../reference/api_reference.md)
- Understand the architecture: [System Architecture Overview](../explanation/architecture_overview.md)
