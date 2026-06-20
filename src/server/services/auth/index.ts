import type { SupabaseClient } from "@supabase/supabase-js";
import type { Profile } from "@/types";

export async function getProfile(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return (data as Profile | null) ?? null;
}

export async function createProfile(
  supabase: SupabaseClient,
  userId: string,
  profile: {
    display_name: string;
    country: string;
    transport_mode: string;
    diet: string;
  },
) {
  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: userId,
      ...profile,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data as Profile;
}
