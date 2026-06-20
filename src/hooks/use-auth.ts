"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { createBrowserSupabaseClient } from "@/server/db/supabase-browser";

export function useAuth() {
  const { user, isLoading, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

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
    router.push("/");
    router.refresh();
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
