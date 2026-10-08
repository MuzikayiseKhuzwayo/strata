# 💡 Explanation: Cryptographic Compliance & Audit Trails

This document explains the cryptographic chaining mechanism and deterministic rule validation used by Strata.

---

## 1. The Auditability Challenge in Autonomous Systems
Autonomous decision-making engines deployed in hedge funds, asset management firms, or enterprise risk operations face strict regulatory and compliance scrutiny. If an AI generates a risk assessment, hedges a portfolio, or issues a strategic dispatch, operators must be able to prove:
1. **What data was seen** at the precise timestamp of the decision.
2. **What prompt and instructions** were supplied to the model.
3. **What rules or filters** were verified prior to publication.
4. **That the historical log has not been modified or backdated.**

---

## 2. Deterministic Compliance Verification
Before any Strategic Brief or B2B copy is approved, `ContentComplianceVerifier` validates the text against four structural criteria:
- **Hard-Banned AI Clichés**: Prohibits terms like `delve`, `tapestry`, `testament`, `beacon`, `fosters`, `nuanced`, `myriad`, `orchestrate`, `synergize`, `elevate`.
- **Scrollytelling Whitespace Pacing**: Flags any paragraph exceeding 250 characters without a line break.
- **Visceral Verb Presence**: Mandates active verbs (`hedge`, `validate`, `leverage`, `audit`, `decouple`).
- **Grok Search Capsule**: Requires an H2/H3 summary capsule on long-form articles.

---

## 3. SHA-256 Chained Audit Trail
Every evaluation generates an immutable audit record in `./data/audit_logs.jsonl`.

The ledger functions similarly to a cryptographic blockchain:

```
Entry N-1: [Hash: 084a1859...] 
                 │
                 ▼
Entry N:   [Payload: {...}, PreviousHash: 084a1859...] 
                 │
                 ▼ (SHA-256 Hash of entire payload)
           [VerificationHash: 73ef76f2...]
```

```typescript
const hashPayload = JSON.stringify({
  id,
  intent,
  decision,
  executionStatus,
  timestamp,
  previousHash
});

const verificationHash = crypto
  .createHash('sha256')
  .update(hashPayload)
  .digest('hex');
```

If any actor tampers with a historical log entry (altering a prompt, changing a decision timestamp, or modifying generated text), the calculated hash of that entry and every subsequent entry in the chain fails cryptographic verification.
