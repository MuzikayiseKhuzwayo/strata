# 🛠️ How-To: Configure Agent Directives & SOPs

This recipe explains how to customize the behaviors, prompt instructions, and operational boundaries of the 5 specialized subagents.

---

## 1. The Persona Hierarchy
Strata coordinates 5 distinct organizational roles:
- **Visionary (`SOP-STR-001`)**: High-level strategy, SVAR shock assessment, market decoupling.
- **Producer (`SOP-OPS-004`)**: Engineering task queues, backlog prioritization, WIP limits.
- **Seller (`SOP-SLS-001`)**: B2B institutional client qualification, pricing models, MEDDPICC checks.
- **Controller (`SOP-FIN-001`)**: Financial audit trail, ledger reconciliations, compliance signatures.
- **Systematiser (`SOP-OPS-001`)**: Process waste (Muda) elimination, ingestion pipelines, Cypher graphs.

---

## 2. Modifying Directives via Dashboard
1. Navigate to **Agent Management** in the cockpit sidebar.
2. Select any agent tab (e.g. **Visionary** or **Producer**).
3. Edit the system prompt directly in the text area.
4. (Optional) In the **Global Hyper-Directives** box, enter system-wide constraints that every agent must obey (e.g., `"Never recommend positions exceeding 25% portfolio volatility limit."`).
5. Click **"Save All Directives"**.
6. Changes are immediately saved to `./data/agent_directives.json` and loaded into the active chat session without rebooting.

---

## 3. Synchronizing Business Context Documents
To keep agents aligned with existing project documents:
1. Open the **Business Context** tab in the sidebar.
2. Enter the path to your source specification (e.g. `docs/business/business_plan.md`).
3. Click **"Load Context"**.
4. Edit the markdown content in the visual editor.
5. Click **"Save & Synchronize"** to commit the updates back to your local filesystem.

---

## 4. Programmatic Configuration via REST API
You can also update directives programmatically:

```bash
curl -X POST http://localhost:3000/api/agents/directives \
  -H "Content-Type: application/json" \
  -d '{
    "Visionary": "Focus exclusively on sovereign debt crises and commodity supply disruptions.",
    "hyperDirectives": "Strictly enforce zero-lookahead backtest compliance."
  }'
```
