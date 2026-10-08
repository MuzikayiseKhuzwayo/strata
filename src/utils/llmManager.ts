import axios from 'axios';
import { logger } from './logger';

export class CausalLLMManager {
  private apiKey: string | undefined;
  private model: string = 'gemini-2.5-flash';
  private maxRetries = 4;
  private baseDelayMs = 2000;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    if (!this.apiKey) {
      logger.warn('⚠️ GEMINI_API_KEY environment variable is not defined.');
      logger.warn('Core harness will run LLM evaluations in local mock/simulation fallback mode.');
    }
  }

  public hasApiKey(): boolean {
    return !!this.apiKey;
  }

  /**
   * Basic model completion query with exponential backoff retries
   */
  public async queryModel(
    prompt: string,
    systemInstruction?: string,
    isJson = false
  ): Promise<string> {
    if (!this.apiKey) {
      logger.info('🤖 [LLM SIMULATION] Executing local deterministic simulation fallback (no GEMINI_API_KEY configured).');
      return this.generateSimulatedCompletion(prompt, systemInstruction, isJson);
    }

    let attempt = 0;
    let lastError = '';

    while (attempt <= this.maxRetries) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
        const payload: any = {
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: isJson ? 'application/json' : 'text/plain'
          }
        };

        if (systemInstruction) {
          payload.systemInstruction = {
            parts: [{ text: systemInstruction }]
          };
        }

        logger.info(`🤖 [LLM] Outgoing request to Gemini API (${this.model}). Prompt size: ${prompt.length} chars.`);
        const startTime = Date.now();
        const response = await axios.post(url, payload, {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000
        });

        const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          logger.info(`✅ [LLM] Gemini API response received in ${Date.now() - startTime}ms. Response size: ${text.length} chars.`);
          return text.trim();
        }
        throw new Error('No candidate content text returned from Gemini API response.');
      } catch (err: any) {
        lastError = err.response?.data?.error?.message || err.message;
        if (attempt < this.maxRetries) {
          const currentDelayMs = this.baseDelayMs * Math.pow(2, attempt);
          logger.warn(
            `⚠️ Gemini API call failed: "${lastError}". Retrying in ${currentDelayMs / 1000} seconds... (Attempt ${attempt + 1}/${this.maxRetries + 1})`
          );
          await new Promise((resolve) => setTimeout(resolve, currentDelayMs));
          attempt++;
        } else {
          logger.error(
            `❌ Gemini API call failed permanently after ${this.maxRetries + 1} attempts. Last error: ${lastError}`
          );
          break;
        }
      }
    }

    throw new Error(
      `Gemini API call failed permanently on ${this.model} after ${this.maxRetries + 1} attempts. Last error: ${lastError}`
    );
  }

  /**
   * Queries the model and parses the JSON response using a validator.
   * If parsing fails or the validator throws an error, it runs a self-correction feedback loop.
   */
  public async queryModelStructured<T>(
    prompt: string,
    systemInstruction: string,
    validator: (data: any) => T,
    maxFeedbackRetries = 3
  ): Promise<T> {
    let currentPrompt = prompt;
    let feedbackAttempt = 0;

    while (feedbackAttempt <= maxFeedbackRetries) {
      try {
        const responseText = await this.queryModel(
          currentPrompt,
          systemInstruction,
          true
        );

        let parsedData: any;
        try {
          parsedData = JSON.parse(responseText);
        } catch (jsonErr: any) {
          throw new Error(`Invalid JSON syntax in model response: ${jsonErr.message}`);
        }

        // Validate the structure of parsed object
        return validator(parsedData);
      } catch (err: any) {
        if (feedbackAttempt < maxFeedbackRetries) {
          feedbackAttempt++;
          logger.warn(
            `🔍 [SENSOR FEEDBACK LOOP] Output validation failed: "${err.message}". Retrying with model self-correction (Attempt ${feedbackAttempt}/${maxFeedbackRetries})...`
          );
          
          // Re-feed the invalid response and error trace back to Gemini context for JIT correction
          currentPrompt = `
${prompt}

--- FEEDBACK / CORRECTION REQUIRED ---
Your previous response failed validation with the following error:
Error Message: "${err.message}"

Please correct the JSON formatting. Ensure the output matches the exact JSON schema requested.
Do not include any extra explanatory text, comments, or markdown wraps. Start and end with curly braces.
`;
        } else {
          logger.error(
            `❌ [SENSOR FAILURE] Model failed to produce a valid schema after ${maxFeedbackRetries} self-correction attempts. Last error: ${err.message}`
          );
          throw err;
        }
      }
    }

    throw new Error('Self-correcting structured query loop exited unexpectedly.');
  }

  /**
   * Generates deterministic, compliant simulated LLM completions for offline demo & fallback mode
   */
  private generateSimulatedCompletion(
    prompt: string,
    systemInstruction?: string,
    isJson = false
  ): string {
    const pLower = prompt.toLowerCase();
    const sLower = (systemInstruction || '').toLowerCase();

    if (isJson) {
      if (pLower.includes('nextspeaker') || pLower.includes('speaker') || sLower.includes('orchestrator')) {
        const candidates = ['Visionary', 'Producer', 'Seller', 'Controller', 'Systematiser'];
        const randomSpeaker = candidates[Math.floor(Math.random() * candidates.length)];
        return JSON.stringify({
          nextSpeaker: randomSpeaker,
          reason: `Delegating to ${randomSpeaker} for operational validation and causal alignment.`
        }, null, 2);
      }

      if (pLower.includes('action') || pLower.includes('file_write') || sLower.includes('tool')) {
        return JSON.stringify({
          action: 'none',
          thought: 'Synthesized telemetry and validated against system directives.'
        }, null, 2);
      }

      return JSON.stringify({
        status: 'simulated_success',
        summary: 'Operational risk analysis synthesized deterministically.',
        confidence: 0.94,
        metrics: { svar_pressure: 0.78, decoupling_score: 0.86 }
      }, null, 2);
    }

    // Role-specific simulated responses
    if (sLower.includes('visionary') || pLower.includes('visionary')) {
      return `We must decouple our capital exposure from standard market contagion loops.\n\nSVAR analysis reveals persistent transaction settlement friction across downstream pipelines.\n\nWe audit volatility divergence and validate our counter-cyclical positioning to hedge systemic liquidity drawdowns.`;
    }

    if (sLower.includes('producer') || pLower.includes('producer')) {
      return `Checking the active sprint backlog and engineering WIP limits.\n\nFastAPI gateway latency benchmarks remain locked at 4.2ms across all telemetry endpoints.\n\nWe leverage automated CI test suites and audit deployment pipelines to eliminate production bottlenecks.`;
    }

    if (sLower.includes('seller') || pLower.includes('seller')) {
      return `Institutional discovery aligns with tier-one quantitative trading desks.\n\nWe qualify prospective asset managers under MEDDPICC frameworks for causal API access.\n\nSubscription contracts validate $0.005 per query billing with USDC settlement verification.`;
    }

    if (sLower.includes('controller') || pLower.includes('controller')) {
      return `Financial ledger reconciliation confirms zero double-spends across Solana x402 signatures.\n\nAll cryptographic compliance mandates pass verification thresholds.\n\nWe audit daily expenditure caps and validate capital allocation reserves.`;
    }

    if (sLower.includes('systematiser') || pLower.includes('systematiser')) {
      return `Mapping ingestion architecture from RSS feeds into Cypher knowledge graphs.\n\nEliminating Muda waste in crawler cycles ensures zero data duplication.\n\nWe decouple asynchronous ingestion workers and hedge against external parser timeouts.`;
    }

    if (sLower.includes('video') || pLower.includes('video script')) {
      return `Look at how standard financial desks respond to sudden liquidity crises.\n\nThey rely on lagging indicators that bleed capital when market volatility spikes.\n\nWe audit the orderbook microstructure in real-time to detect institutional imbalances before prices move.\n\nWhen cross-border settlement freezes, standard pipelines break under latency spikes.\n\nWe decouple our risk architecture using causal graph validation.\n\nThis lets quantitative desks validate positions and hedge systemic drawdowns before the crowd reacts.`;
    }

    if (sLower.includes('outreach') || pLower.includes('cold outreach')) {
      return `Subject: Decoupling Data Latency for Quantitative Desks\n\nHi Engineering Team,\n\nWe noticed your team is scaling real-time ingestion pipelines across high-volatility market feeds.\n\nMost traditional systems bleed execution efficiency when downstream data pipelines stall.\n\nWe built an engine that cuts graph traversal latency to 4.2ms.\n\nWe can validate your existing feed architecture and audit downstream settlement risks.\n\nWould you be open to a 10-minute technical review this week?`;
    }

    // Default Strategic Decision Brief (Adhering strictly to compliance rules)
    return `## Strategic Decision Brief: Risk Analysis\n\nStandard macroeconomic desks assume liquidity risks resolve smoothly across foreign exchange channels.\n\nOur causal graph inquiry reveals significant downstream settlement friction.\n\nWe audit orderbook depth across institutional corridors to detect hidden capital flight.\n\nQuantitative desks must leverage counter-cyclical buffers to hedge systemic contagion.\n\nWe validate structural state transitions and decouple our risk profile from unhedged drawdowns.`;
  }
}

