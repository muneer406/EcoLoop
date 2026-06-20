import type { SupabaseClient } from "@supabase/supabase-js";
import type { CalculatedActivity, Log, ActivityRow, DailyTotal } from "@/types";

export async function createLog(
  supabase: SupabaseClient,
  userId: string,
  message: string,
  totalCo2Kg: number,
) {
  const { data, error } = await supabase
    .from("logs")
    .insert({
      user_id: userId,
      message,
      total_co2_kg: totalCo2Kg,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Log;
}

export async function createActivities(
  supabase: SupabaseClient,
  userId: string,
  logId: string,
  activities: CalculatedActivity[],
) {
  if (activities.length === 0) return [];

  const rows = activities.map((a) => ({
    log_id: logId,
    user_id: userId,
    category: a.category,
    mode: a.mode,
    quantity: a.quantity,
    unit: a.unit,
    co2_kg: a.co2Kg,
    description: a.description ?? null,
  }));

  const { data, error } = await supabase
    .from("activities")
    .insert(rows)
    .select();

  if (error) throw error;
  return data as ActivityRow[];
}

export async function getDailyTotal(
  supabase: SupabaseClient,
  userId: string,
  date: string,
) {
  const { data } = await supabase
    .from("daily_totals")
    .select("*")
    .eq("user_id", userId)
    .eq("date", date)
    .single();

  return (data as DailyTotal | null) ?? null;
}

export async function getWeeklyTotals(
  supabase: SupabaseClient,
  userId: string,
  startDate: string,
  endDate: string,
) {
  const { data } = await supabase
    .from("daily_totals")
    .select("*")
    .eq("user_id", userId)
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date", { ascending: false });

  return (data as DailyTotal[]) ?? [];
}

export async function getRecentActivities(
  supabase: SupabaseClient,
  userId: string,
  limit = 20,
) {
  const { data } = await supabase
    .from("activities")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  return (data as ActivityRow[]) ?? [];
}
