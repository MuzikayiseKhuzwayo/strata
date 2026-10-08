# 📖 Reference: CLI & Environment Variables

This document catalogs all CLI arguments, environment configurations, and execution flags supported by the platform.

---

## 1. CLI Command-Line Arguments

The application entrypoint (`src/index.ts` / `dist/index.js`) accepts the following flags:

| Flag | Description | Default | Example |
|---|---|---|---|
| `--port <number>`, `-p <number>` | Sets the port for the unified Express Gateway | `3000` | `npm start -- --port 8080` |

---

## 2. Environment Variables Reference

All variables can be configured via a `.env` file in the root of the project:

| Variable | Type | Required | Default | Description |
|---|---|---|---|---|
| `PORT` | Number | No | `3000` | HTTP listening port for Express API & Dashboard |
| `DUBSTRATA_API_KEY` | String | No | `""` | Authentication key for Dubstrata MCP Causal Graph Cloud |
| `DUBSTRATA_API_URL` | String | No | `https://api.dubstrata.com` | Base URL for Dubstrata Cloud API |
| `DUBSTRATA_MCP_SERVER_COMMAND` | String | No | `npx dubstrata-mcp` | Spawn command for MCP stdio client transport |
| `GEMINI_API_KEY` | String | No | `""` | Google Gemini API key for live multi-agent reasoning |
| `SIMULATION_MODE` | Boolean | No | `true` | When true, guards virtual allocations and enables mock fallbacks |
| `DUBSTRATA_AUDIT_LOG_PATH` | String | No | `./data/audit_logs.jsonl` | Filepath for cryptographically chained SHA-256 audit ledger |

---

## 3. Exit Codes

| Exit Code | Meaning |
|---|---|
| `0` | Graceful shutdown (`SIGINT` / `SIGTERM`) or test suite success |
| `1` | Fatal uncaught exception or test suite failure |
