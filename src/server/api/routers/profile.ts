import { z } from "zod/v4";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../trpc";
import { createProfile, getProfile } from "@/server/services/auth";
import { ProfileSchema } from "@/server/validators";

export const profileRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    return getProfile(ctx.supabase, ctx.user.id);
  }),

  create: protectedProcedure
    .input(ProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const existing = await getProfile(ctx.supabase, ctx.user.id);

      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Profile already exists",
        });
      }

      return createProfile(ctx.supabase, ctx.user.id, {
        display_name: input.display_name,
        country: input.country,
        transport_mode: input.transport_mode,
        diet: input.diet,
      });
    }),

  update: protectedProcedure
    .input(ProfileSchema.partial())
    .mutation(async ({ ctx, input }) => {
      return createProfile(ctx.supabase, ctx.user.id, {
        display_name: input.display_name ?? ctx.user.email ?? "",
        country: input.country ?? "global",
        transport_mode: input.transport_mode ?? "mixed",
        diet: input.diet ?? "omnivore",
      });
    }),
});
