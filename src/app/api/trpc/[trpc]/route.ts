import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";
import { createContext } from "@/server/api/context";
import { appRouter } from "@/server/api/root";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext({ req: req as unknown as Request }),
  });

export { handler as GET, handler as POST };
