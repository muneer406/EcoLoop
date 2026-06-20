import { z } from "zod/v4";
import { protectedProcedure, router } from "../trpc";
import { CompleteActionSchema } from "@/server/validators";
import { selectAction, completeAction, updateStreak } from "@/server/services/habits";
import { getDailyTotal } from "@/server/services/analytics";

export const habitsRouter = router({
  getAction: protectedProcedure.query(async ({ ctx }) => {
    const today = new Date().toISOString().slice(0, 10);
    const dailyTotal = await getDailyTotal(ctx.supabase, ctx.user.id, today);
    const action = await selectAction(ctx.supabase, dailyTotal);

    if (!action) {
      return null;
    }

    // Get the biggest contributor for context
    let biggestCategory = "transport";
    let biggestPercentage = 0;

    if (dailyTotal && dailyTotal.total_co2_kg > 0) {
      const cats = [
        { name: "transport", value: dailyTotal.transport_co2_kg },
        { name: "food", value: dailyTotal.food_co2_kg },
        { name: "energy", value: dailyTotal.energy_co2_kg },
        { name: "shopping", value: dailyTotal.shopping_co2_kg },
      ];
      const biggest = cats.reduce((max, c) => (c.value > max.value ? c : max));
      biggestCategory = biggest.name;
      biggestPercentage = Math.round(
        (biggest.value / dailyTotal.total_co2_kg) * 100,
      );
    }

    return {
      action,
      context: `${biggestCategory} contributes ${biggestPercentage}% of your footprint today.`,
    };
  }),

  complete: protectedProcedure
    .input(CompleteActionSchema)
    .mutation(async ({ ctx, input }) => {
      const { data: action } = await ctx.supabase
        .from("micro_actions")
        .select("co2_saving_kg")
        .eq("id", input.action_id)
        .single();

      const co2Saved =
        (action as { co2_saving_kg: number } | null)?.co2_saving_kg ?? 0;

      await completeAction(
        ctx.supabase,
        ctx.user.id,
        input.action_id,
        input.status,
        input.status === "done" ? co2Saved : 0,
      );

      // Update streak
      await updateStreak(ctx.supabase, ctx.user.id);

      return { success: true };
    }),
});
