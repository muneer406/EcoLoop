import { z } from "zod/v4";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../trpc";
import { LogInputSchema } from "@/server/validators";
import { extractActivities } from "@/server/services/ai";
import { calculateActivity } from "@/server/services/co2";
import {
  createLog,
  createActivities,
  getRecentActivities,
} from "@/server/services/analytics";
import type { CalculatedActivity } from "@/types";

export const chatRouter = router({
  sendMessage: protectedProcedure
    .input(LogInputSchema)
    .mutation(async ({ ctx, input }) => {
      const startTime = Date.now();

      // Step 1: AI Extraction
      const extractResult = await extractActivities(input.message);

      if (!extractResult.success && extractResult.error !== "LOW_CONFIDENCE") {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: extractResult.error ?? "Failed to process your message.",
        });
      }

      const activities = extractResult.data?.activities ?? [];

      // Step 2: CO₂ Calculation
      const calculated: CalculatedActivity[] = activities.map((a) =>
        calculateActivity(a),
      );

      const totalCo2Kg = calculated.reduce((sum, c) => sum + c.co2Kg, 0);

      // Step 3: Database Storage
      const log = await createLog(
        ctx.supabase,
        ctx.user.id,
        input.message,
        Math.round(totalCo2Kg * 10000) / 10000,
      );

      await createActivities(ctx.supabase, ctx.user.id, log.id, calculated);

      const processingMs = Date.now() - startTime;

      return {
        logId: log.id,
        message: input.message,
        activities: calculated,
        totalCo2Kg: Math.round(totalCo2Kg * 10000) / 10000,
        confidence: extractResult.data?.confidence ?? 0,
        processingMs,
      };
    }),

  getHistory: protectedProcedure.query(async ({ ctx }) => {
    const activities = await getRecentActivities(ctx.supabase, ctx.user.id);
    return activities;
  }),
});
