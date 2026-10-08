# 🛠️ How-To: Connect Dubstrata MCP Causal Graph

This recipe describes how to connect the Dubstrata MCP server to enable live causal knowledge graph queries.

---

## 1. Overview
By default, the platform boots with a simulated causal graph generator. To connect to the live Dubstrata Causal Knowledge Graph, you authenticate via your `DUBSTRATA_API_KEY`.

---

## 2. Option A: Configure via UI Cockpit (Hot-Reload)
1. Open the dashboard at `http://localhost:3000`.
2. Navigate to **Agent Management** in the left sidebar.
3. Scroll down to **Dubstrata MCP Causal Graph Connection**.
4. Paste your API key into the **Dubstrata API Key** input field.
5. Click **"Save Key & Connect"**.
6. The client will immediately hot-reload its stdio transport and display:
   ```
   ✅ STATUS: CONNECTED TO DUBSTRATA CLOUD
   ```

---

## 3. Option B: Configure via `.env` File
1. Open `.env` in the repository root.
2. Set your API key:
   ```env
   DUBSTRATA_API_KEY=ds_live_your_actual_key_here
   DUBSTRATA_API_URL=https://api.dubstrata.com
   DUBSTRATA_MCP_SERVER_COMMAND="npx dubstrata-mcp"
   ```
3. Restart the server:
   ```bash
   npm start
   ```

---

## 4. Verifying Connectivity
Check the terminal log on startup or review `data/mcp_interactions.jsonl`. A successful connection outputs:
```
[info]: ⚡ Successfully connected to Dubstrata MCP proxy server!
```

When queries run, interaction telemetry will indicate:
```
================================================================
🔌 DUBSTRATA MCP TOOL TRANSACTION: [query_graph]
----------------------------------------------------------------
- Latency:          142ms
- Execution State:  LIVE PRODUCTION API
- Token Volume:     In: ~45 | Out: ~320 | Total: ~365 (Est.)
================================================================
```

---

## 5. Troubleshooting
- **`DUBSTRATA_API_KEY is not defined`**: The harness safely degrades to local simulation mode with synthetic graphs.
- **Connection timeouts**: The client automatically retries up to 4 times with exponential backoff before falling back to simulation.
