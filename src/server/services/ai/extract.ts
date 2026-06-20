import { generateObject } from "ai";
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
const GROQ_MODEL = "llama-3.3-70b-versatile";

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
    const { object } = await generateObject({
      model: useClaude
        ? anthropic(CLAUDE_MODEL)
        : groq(GROQ_MODEL),
      schema: AIResponseSchema,
      system: SYSTEM_PROMPT,
      prompt: message,
      temperature: 0.1,
    });

    const result = AIResponseSchema.parse(object);

    if (result.confidence < 0.5) {
      return {
        success: false,
        error: "LOW_CONFIDENCE",
        retried: false,
        provider,
      };
    }

    return {
      success: true,
      data: result as AIActivityResponse,
      retried: false,
      provider,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "AI_PARSE_FAILURE",
      retried: false,
      provider,
    };
  }
}
