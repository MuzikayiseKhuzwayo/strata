# 📖 Reference: Data Schemas & Storage Layout

This document specifies the on-disk data structures and schemas utilized by Strata.

---

## 1. Directory Structure

```
data/
├── audit_logs.jsonl           # Chained SHA-256 cryptographic compliance audit trail
├── content_assets.json        # Persisted decision briefs, outreach copy, and scripts
├── agent_chats.json           # Active and historical multi-agent debate sessions
├── agent_directives.json      # Custom prompt overrides and hyper-directives
├── mcp_config.json            # Persisted MCP server key & configuration
├── mcp_interactions.jsonl     # Detailed telemetry of all MCP tool transactions
└── agents/                    # Sandbox filesystem for agent outputs
    ├── brain_map.json         # File ownership and summary registry
    ├── crm_accounts.csv       # B2B client accounts ledger
    ├── crm_opportunities.csv  # Deal pipeline with MEDDPICC checkpoints
    └── crm_pain_points.csv    # Client latency and operational pain points
```

---

## 2. Schema Specifications

### `audit_logs.jsonl` (Append-Only Chained Ledger)
```typescript
interface ContentAuditEntry {
  id: string;               // Unique UUID
  intent: {
    assetId: string;
    topic: string;
    type: 'X' | 'VIDEO' | 'OUTREACH' | 'GEOPOLITICAL';
    promptUsed: string;
    causalFactScraped: string;
    generatedText: string;
    timestamp: number;
  };
  decision: 'PUBLISH' | 'REJECT' | 'HOLD';
  complianceHash: string;   // SHA-256 hash of compliance verification output
  executionStatus: 'PENDING' | 'SUCCESS' | 'FAILED' | 'SIMULATED';
  timestamp: number;
  verificationHash: string; // SHA-256(id + intent + decision + status + timestamp + prevHash)
}
```

### `content_assets.json`
```typescript
interface ContentAsset {
  id: string;
  type: 'X' | 'VIDEO' | 'OUTREACH' | 'GEOPOLITICAL';
  topic: string;
  title: string;
  content: string;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'PUBLISHED' | 'REJECTED';
  timestamp: number;
  intervals: Record<string, any>;
}
```

### `agent_chats.json`
```typescript
interface DiscussionSession {
  topic: string;
  messages: Array<{
    id: string;
    sender: 'User' | 'Visionary' | 'Producer' | 'Seller' | 'Controller' | 'Systematiser' | 'Orchestrator';
    role: string;
    avatarColor: string;
    content: string;
    timestamp: number;
  }>;
  timestamp: number;
}
```
