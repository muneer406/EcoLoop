import { protectedProcedure, router } from "../trpc";
import { getDashboardData } from "@/server/services/dashboard";

export const dashboardRouter = router({
  getMetrics: protectedProcedure.query(async ({ ctx }) => {
    return getDashboardData(ctx.supabase, ctx.user.id);
  }),
});
