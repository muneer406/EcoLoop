import { router } from "./trpc";
import { profileRouter } from "./routers/profile";
import { chatRouter } from "./routers/chat";

export const appRouter = router({
  profile: profileRouter,
  chat: chatRouter,
});

export type AppRouter = typeof appRouter;
