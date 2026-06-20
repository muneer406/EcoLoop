import { generateObject } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { AIResponseSchema } from "@/server/validators";
import { SYSTEM_PROMPT } from "./system-prompt";
import { detectInjection, sanitizeInput } from "./defense";
import type { AIActivityResponse } from "@/types";

export interface ExtractionResult {
  success: boolean;
  data?: AIActivityResponse;
  error?: string;
  retried: boolean;
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
  try {
    const { object } = await generateObject({
      model: anthropic("claude-sonnet-4-20250514"),
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
      };
    }

    return {
      success: true,
      data: result as AIActivityResponse,
      retried: false,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "AI_PARSE_FAILURE",
      retried: false,
    };
  }
}
