import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateTRPCNext } from "@trpc/next";
import type { NextPageContext } from "next/types";
import { createServerClient } from "@/server/db/supabase-server";

export async function createContext(opts: { req?: Request; res?: Response }) {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    user,
    supabase,
    ...opts,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
