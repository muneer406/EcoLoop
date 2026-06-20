import { router } from "./trpc";
import { profileRouter } from "./routers/profile";
import { chatRouter } from "./routers/chat";
import { dashboardRouter } from "./routers/dashboard";

export const appRouter = router({
  profile: profileRouter,
  chat: chatRouter,
  dashboard: dashboardRouter,
});

export type AppRouter = typeof appRouter;
