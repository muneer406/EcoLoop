"use client";

import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { createBrowserSupabaseClient } from "@/server/db/supabase-browser";
import type { SupabaseClient } from "@supabase/supabase-js";

function useSupabase() {
  const ref = useRef<SupabaseClient | null>(null);
  if (!ref.current) {
    ref.current = createBrowserSupabaseClient();
  }
  return ref.current;
}

export function useAuth() {
  const { user, isLoading, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const supabase = useSupabase();

  const signInWithGoogle = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }, [supabase]);

  const signInWithMagicLink = useCallback(
    async (email: string) => {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    },
    [supabase],
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    useAuthStore.getState().setUser(null);
    router.push("/");
  }, [supabase, router]);

  return {
    user,
    isLoading,
    isAuthenticated,
    signInWithGoogle,
    signInWithMagicLink,
    signOut,
  };
}
