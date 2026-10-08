# 📖 Reference: REST API Specification

The unified Express Gateway exposes REST and SSE endpoints on port 3000 (configurable via `--port` or `PORT`).

---

## 1. System & Telemetry Endpoints

### `GET /api/status`
Returns real-time engine health, active daemon state, and ledger counters.

**Response `200 OK`**:
```json
{
  "engineStatus": "ACTIVE_CONTENT_DAEMON",
  "isSimulation": false,
  "assetsCount": 42,
  "recentAuditsCount": 89,
  "daemon": {
    "isRunning": true,
    "intervalMs": 300000,
    "lastRunTime": 1720000000000
  }
}
```

### `GET /api/events`
Server-Sent Events (SSE) telemetry stream for real-time dashboard notifications.
- **Content-Type**: `text/event-stream`
- **Events Emitted**: `audit_logged`, `daemon_cycle_start`, `agent_message`, `alert_modal`

### `POST /api/daemon/toggle`
Starts or stops the background RSS Risk Ingestion Daemon.

**Response `200 OK`**:
```json
{
  "isRunning": false,
  "intervalMs": 300000,
  "lastRunTime": 1720000000000
}
```

---

## 2. Signal & Content Generation Endpoints

### `GET /api/content/rss-feeds?limit=12`
Fetches parsed live RSS items from financial and macroeconomic news sources.

### `POST /api/content/investigate-manual`
Triggers an immediate end-to-end investigation pipeline on custom user input.

**Request Body**:
```json
{
  "text": "OPEC announces surprise production cut amid shipping bottleneck"
}
```

**Response `200 OK`**:
```json
{
  "success": true,
  "company": "OPEC announces...",
  "detail": "Manual Lab Entry",
  "type": "GENERAL",
  "causalFact": "STRATEGIC BRIEF: OPEC announces...",
  "isPending": false,
  "generatedAssets": [ ... ]
}
```

### `GET /api/content/assets`
Returns all persisted content assets and decision briefs.

### `GET /api/content/assets/:id`
Returns a specific content asset by its UUID.

### `DELETE /api/content/assets/:id`
Deletes a generated content asset.

---

## 3. Multi-Agent Hub Endpoints

### `GET /api/agents/chats`
Returns the array of all discussion sessions and message histories.

### `POST /api/agents/chats/session`
Initializes a new debate session topic.

**Request Body**:
```json
{ "topic": "Global Energy Transition Bottlenecks" }
```

### `POST /api/agents/chats/message`
Appends a user message to an active session topic and triggers the Autopilot loop if enabled.

**Request Body**:
```json
{
  "topic": "Global Energy Transition Bottlenecks",
  "content": "What is our capital exposure if oil spikes 15%?"
}
```

### `POST /api/agents/chats/respond`
Forces a specific specialist agent to reply to the active debate topic.

**Request Body**:
```json
{
  "topic": "Global Energy Transition Bottlenecks",
  "agentName": "Visionary"
}
```

### `POST /api/agents/chats/orchestrate`
Triggers the Orchestrator to dynamically select the most relevant next speaker.

### `GET /api/agents/autopilot`
Returns current global autopilot status: `{ "autoPilot": true }`.

### `POST /api/agents/autopilot`
Toggles global autopilot state: `{ "autoPilot": true }`.

### `GET /api/agents/brain-map`
Returns the agent file registry mapping paths, owners, and summaries.

### `GET /api/agents/files/:filename`
Streams the text contents of a sandbox file from `./data/agents/`.

---

## 4. Configuration & Directives Endpoints

### `GET /api/agents/directives`
Returns the active system prompts for the 5 agents and global hyper-directives.

### `POST /api/agents/directives`
Updates agent prompts and hyper-directives, persisting to `./data/agent_directives.json`.

### `GET /api/mcp/config`
Retrieves the Dubstrata MCP server status and configured API key.

### `POST /api/mcp/config`
Saves the API key and hot-reloads the Dubstrata stdio client.

### `GET /api/business-context`
Retrieves the loaded business context file and contents.

### `POST /api/business-context`
Saves business context and synchronizes updates directly to local disk.
