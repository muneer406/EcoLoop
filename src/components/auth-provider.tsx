"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { createBrowserSupabaseClient } from "@/server/db/supabase-browser";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setUser]);

  return <>{children}</>;
}
