import type { SupabaseClient } from "@supabase/supabase-js";
import type { DailyTotal, Streak } from "@/types";
import {
  calculateBaseline,
  calculateCo2Saved,
  calculateForecast,
  calculateGlobalComparison,
  calculateParisComparison,
} from "@/server/services/co2";

export async function getDashboardData(
  supabase: SupabaseClient,
  userId: string,
) {
  const today = new Date().toISOString().slice(0, 10);
  const sevenDaysAgo = new Date(
    Date.now() - 7 * 24 * 60 * 60 * 1000,
  )
    .toISOString()
    .slice(0, 10);

  const [
    { data: dailyTotal },
    { data: weeklyTotals },
    { data: streakData },
  ] = await Promise.all([
    supabase
      .from("daily_totals")
      .select("*")
      .eq("user_id", userId)
      .eq("date", today)
      .maybeSingle(),

    supabase
      .from("daily_totals")
      .select("*")
      .eq("user_id", userId)
      .gte("date", sevenDaysAgo)
      .lte("date", today)
      .order("date", { ascending: true }),

    supabase
      .from("streaks")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle(),
  ]);

  const todayTotal = (dailyTotal as DailyTotal | null) ?? null;
  const weekly = (weeklyTotals as DailyTotal[]) ?? [];
  const streak = (streakData as Streak | null) ?? null;

  const dailyAverage =
    weekly.length > 0
      ? weekly.reduce((sum, d) => sum + d.total_co2_kg, 0) / weekly.length
      : 0;

  const dailyValues = weekly.map((d) => d.total_co2_kg);
  const baseline = calculateBaseline(dailyValues);
  const co2Saved = calculateCo2Saved(baseline, dailyAverage);
  const forecast = calculateForecast(dailyAverage);

  return {
    dailyTotal: todayTotal,
    weeklyTotals: weekly,
    streak,
    dailyAverage: Math.round(dailyAverage * 100) / 100,
    baseline: Math.round(baseline * 100) / 100,
    co2Saved: Math.round(co2Saved * 100) / 100,
    forecast: Math.round(forecast * 100) / 100,
    ...calculateGlobalComparison(dailyAverage),
    ...calculateParisComparison(dailyAverage),
  };
}
