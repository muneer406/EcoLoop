import { generateObject, generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { groq } from "@ai-sdk/groq";
import { AIResponseSchema } from "@/server/validators";
import { SYSTEM_PROMPT } from "./system-prompt";
import { detectInjection, sanitizeInput } from "./defense";
import type { AIActivityResponse } from "@/types";

export type AIProvider = "claude" | "groq";

export interface ExtractionResult {
  success: boolean;
  data?: AIActivityResponse;
  error?: string;
  retried: boolean;
  provider?: AIProvider;
}

const CLAUDE_MODEL = "claude-sonnet-4-20250514";
const GROQ_MODEL = "llama-4-scout-17b-16e-instruct";

const JSON_SYSTEM_PROMPT = `${SYSTEM_PROMPT}\n\nReturn ONLY a valid JSON object. No markdown, no explanation.\nFormat: {"activities": [...], "confidence": 0.0}`;

function getProviderName(): AIProvider {
  return process.env.ANTHROPIC_API_KEY ? "claude" : "groq";
}

export async function extractActivities(
  message: string,
): Promise<ExtractionResult> {
  const sanitized = sanitizeInput(message);

  if (detectInjection(sanitized)) {
    return {
      success: true,
      data: { activities: [], confidence: 1.0 },
      retried: false,
    };
  }

  if (!sanitized.trim()) {
    return {
      success: true,
      data: { activities: [], confidence: 1.0 },
      retried: false,
    };
  }

  const result = await callAI(sanitized);

  if (!result.success) {
    const retry = await callAI(sanitized);
    return { ...retry, retried: true };
  }

  return result;
}

async function callAI(message: string): Promise<ExtractionResult> {
  const useClaude = Boolean(process.env.ANTHROPIC_API_KEY);
  const provider: AIProvider = useClaude ? "claude" : "groq";

  try {
    if (useClaude) {
      const { object } = await generateObject({
        model: anthropic(CLAUDE_MODEL),
        schema: AIResponseSchema,
        system: SYSTEM_PROMPT,
        prompt: message,
        temperature: 0.1,
      });

      const result = AIResponseSchema.parse(object);

      if (result.confidence < 0.5) {
        return { success: false, error: "LOW_CONFIDENCE", retried: false, provider };
      }

      return {
        success: true,
        data: result as AIActivityResponse,
        retried: false,
        provider,
      };
    }

    // Groq: use generateText (generateObject json_schema not supported on all models)
    return await callGroq(message, provider);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "AI_PARSE_FAILURE",
      retried: false,
      provider,
    };
  }
}

async function callGroq(
  message: string,
  provider: AIProvider,
): Promise<ExtractionResult> {
  const { text } = await generateText({
    model: groq(GROQ_MODEL),
    system: JSON_SYSTEM_PROMPT,
    prompt: message,
    temperature: 0.1,
  });

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return {
      success: false,
      error: "AI returned no valid JSON",
      retried: false,
      provider,
    };
  }

  const parsed = JSON.parse(jsonMatch[0]);
  const result = AIResponseSchema.parse(parsed);

  if (result.confidence < 0.5) {
    return { success: false, error: "LOW_CONFIDENCE", retried: false, provider };
  }

  return {
    success: true,
    data: result as AIActivityResponse,
    retried: false,
    provider,
  };
}
