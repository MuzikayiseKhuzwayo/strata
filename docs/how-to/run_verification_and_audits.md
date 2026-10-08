# 🛠️ How-To: Run Verification & Inspect Audit Chains

This recipe demonstrates how to run the automated engine test suite and audit the cryptographic SHA-256 ledger.

---

## 1. Running the Automated Test Suite
Execute the deterministic verification test suite:

```bash
npm test
```

The test runner verifies:
1. **Compliance Engine**: Confirms hard-banned vocabulary is blocked, paragraph whitespace pacing rules are enforced, and compliant copy passes.
2. **Cryptographic Chaining**: Confirms SHA-256 previous-hash pointer integrity across multiple chained entries.
3. **Causal Graph Fallback**: Confirms Dubstrata MCP mock response generation and schema adherence.
4. **LLM Manager Fallback**: Confirms structured JSON parsing, self-correction, and role-based completions in simulated mode.

---

## 2. Inspecting the Chained Audit Ledger
All compliance decisions are recorded in `./data/audit_logs.jsonl`. Each entry contains:
- `id`: UUID of the entry.
- `intent`: The prompt, topic, and scraped causal fact payload.
- `decision`: `PUBLISH`, `REJECT`, or `HOLD`.
- `complianceHash`: SHA-256 hash of the compliance evaluation rules.
- `executionStatus`: `SIMULATED`, `SUCCESS`, or `FAILED`.
- `timestamp`: Epoch milliseconds.
- `verificationHash`: SHA-256 hash of `(id + intent + decision + status + timestamp + previousHash)`.

### Viewing Audit Entries via CLI:
```bash
# Print the last 3 audit entries formatted as JSON
tail -n 3 data/audit_logs.jsonl | jq .
```

### Viewing Audit Entries via API:
```bash
curl http://localhost:3000/api/audit | jq .
```

---

## 3. Cryptographic Verification Script
To verify the unbroken integrity of the entire audit chain on disk, you can run a simple node check:

```javascript
const fs = require('fs');
const crypto = require('crypto');

const lines = fs.readFileSync('data/audit_logs.jsonl', 'utf-8').trim().split('\n');
let prevHash = '0000000000000000000000000000000000000000000000000000000000000000';
let valid = true;

for (const line of lines) {
  if (!line) continue;
  const entry = JSON.parse(line);
  const hashPayload = JSON.stringify({
    id: entry.id,
    intent: entry.intent,
    decision: entry.decision,
    executionStatus: entry.executionStatus,
    timestamp: entry.timestamp,
    previousHash: prevHash
  });
  const computedHash = crypto.createHash('sha256').update(hashPayload).digest('hex');
  if (computedHash !== entry.verificationHash) {
    console.error(`❌ Hash mismatch at entry: ${entry.id}`);
    valid = false;
    break;
  }
  prevHash = entry.verificationHash;
}

if (valid) console.log(`✅ Audit chain verified! Total entries checked: ${lines.length}`);
```
