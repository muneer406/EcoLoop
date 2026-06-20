import { TRPCError } from "@trpc/server";
import { t } from "./trpc";

const requestCounts = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 20;

export function rateLimit(userId: string) {
  const now = Date.now();
  const record = requestCounts.get(userId);

  if (!record || now > record.resetAt) {
    requestCounts.set(userId, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }

  if (record.count >= MAX_REQUESTS) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "Rate limit exceeded. Please try again later.",
    });
  }

  record.count++;
}

export const rateLimitedProcedure = t.procedure.use(({ ctx, next }) => {
  if (ctx.user) {
    rateLimit(ctx.user.id);
  }
  return next();
});
