import { ContentComplianceVerifier, BANNED_WORDS } from '../content/complianceVerifier';
import { AuditLogger } from '../dubstrata/auditLogger';
import { DubstrataMCPClient } from '../dubstrata/client';
import { CausalLLMManager } from '../utils/llmManager';
import fs from 'fs';
import path from 'path';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    failed++;
  }
}

async function runTests() {
  console.log('================================================================');
  console.log('       🧪 RUNNING DUBSTRATA ENGINE VERIFICATION SUITE           ');
  console.log('================================================================\n');

  // Test 1: Compliance Verifier - Banned Words
  console.log('📋 Test Group 1: Content Compliance Engine');
  const badSample = `We delve into the tapestry of geopolitics to elevate our strategy.`;
  const badResult = ContentComplianceVerifier.verify(badSample);
  assert(!badResult.allowed, 'Catches hard-banned words (delve, tapestry, elevate)');
  assert(badResult.errors.length >= 3, 'Reports exact errors for all detected banned words');

  const goodSample = `Snowflake's Systems Lead joined the team.\n\nWe audit volatility divergence and validate our counter-cyclical positioning to hedge systemic liquidity drawdowns.\n\nWe decouple downstream pipelines down to 4.2ms flat.`;
  const goodResult = ContentComplianceVerifier.verify(goodSample);
  assert(goodResult.allowed, 'Clean compliant copy passes all structural checks');

  // Test 2: Cryptographic Audit Logger Chain
  console.log('\n🔐 Test Group 2: Cryptographic Audit Trail Chaining');
  const testLogPath = './data/test_audit_chain.jsonl';
  if (fs.existsSync(testLogPath)) fs.unlinkSync(testLogPath);

  const testLogger = new AuditLogger(testLogPath);
  const entry1 = testLogger.logAudit(
    {
      assetId: 'asset-test-1',
      topic: 'Geopolitical Shock Test',
      type: 'GEOPOLITICAL',
      promptUsed: 'System prompt',
      causalFactScraped: 'SVAR divergence fact',
      generatedText: 'Brief text',
      timestamp: Date.now()
    },
    'PUBLISH',
    'hash-rule-1',
    'SIMULATED'
  );

  const entry2 = testLogger.logAudit(
    {
      assetId: 'asset-test-2',
      topic: 'Liquidity Pressure Test',
      type: 'OUTREACH',
      promptUsed: 'System prompt 2',
      causalFactScraped: 'Fact 2',
      generatedText: 'Outreach text',
      timestamp: Date.now()
    },
    'PUBLISH',
    'hash-rule-2',
    'SIMULATED'
  );

  assert(!!entry1.verificationHash && entry1.verificationHash.length === 64, 'Entry 1 produces valid SHA-256 hash');
  assert(!!entry2.verificationHash && entry2.verificationHash.length === 64, 'Entry 2 produces valid SHA-256 hash');
  assert(entry1.verificationHash !== entry2.verificationHash, 'Successive audit entries generate unique chained hashes');

  // Clean test file
  if (fs.existsSync(testLogPath)) fs.unlinkSync(testLogPath);

  // Test 3: Dubstrata MCP Client Resilient Simulation Mode
  console.log('\n🌐 Test Group 3: Dubstrata MCP Causal Graph Resilience');
  const mcpClient = new DubstrataMCPClient();
  const graphContext = await mcpClient.queryGraph('Global Energy Corridors');
  assert(graphContext.includes('svar_impact_loop') || graphContext.includes('causal_nodes'), 'Returns valid causal graph structure in fallback simulation mode');

  const facts = await mcpClient.getAllFacts('Solana Settlement');
  assert(facts.includes('structural latency') || facts.includes('orderbook'), 'Returns verified architectural facts for target entity');

  // Test 4: Causal LLM Manager Resilient Simulation Fallback
  console.log('\n🤖 Test Group 4: Causal LLM Manager Fallback Mode');
  const llmManager = new CausalLLMManager();
  const simulatedText = await llmManager.queryModel(
    'Draft strategic brief on semiconductor supply lines',
    'You are the Visionary'
  );
  assert(simulatedText.length > 50, 'Generates comprehensive simulated response without crash');
  assert(
    simulatedText.toLowerCase().includes('decouple') ||
    simulatedText.toLowerCase().includes('audit') ||
    simulatedText.toLowerCase().includes('validate') ||
    simulatedText.toLowerCase().includes('hedge'),
    'Simulated response incorporates strategic visceral verbs'
  );

  const speakerSelection = await llmManager.queryModel(
    'Who should speak next?',
    'You are the Orchestrator',
    true
  );
  const parsedSpeaker = JSON.parse(speakerSelection);
  assert(!!parsedSpeaker.nextSpeaker, 'Orchestrator structured JSON returns valid nextSpeaker candidate');

  console.log('\n================================================================');
  console.log(`       🏁 TEST RESULTS: ${passed} PASSED, ${failed} FAILED                 `);
  console.log('================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
