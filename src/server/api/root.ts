import { router } from "./trpc";
import { profileRouter } from "./routers/profile";
import { chatRouter } from "./routers/chat";
import { dashboardRouter } from "./routers/dashboard";
import { habitsRouter } from "./routers/habits";

export const appRouter = router({
  profile: profileRouter,
  chat: chatRouter,
  dashboard: dashboardRouter,
  habits: habitsRouter,
});

export type AppRouter = typeof appRouter;
