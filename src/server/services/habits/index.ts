import type { SupabaseClient } from "@supabase/supabase-js";
import type { MicroAction, ActionStatus } from "@/types";
import type { DailyTotal } from "@/types";

const DIFFICULTY_ORDER: Record<string, number> = {
  easy: 1,
  moderate: 2,
  hard: 3,
};

export async function selectAction(
  supabase: SupabaseClient,
  userId: string,
  dailyTotal: DailyTotal | null,
): Promise<MicroAction | null> {
  const today = new Date().toISOString().slice(0, 10);

  // Get actions already completed/skipped today
  const { data: usedActions } = await supabase
    .from("user_actions")
    .select("action_id")
    .eq("user_id", userId)
    .eq("action_date", today);

  const usedIds = new Set(
    ((usedActions ?? []) as { action_id: string }[]).map((a) => a.action_id),
  );

  // Determine biggest contributor category
  const biggestCategory = getBiggestCategory(dailyTotal);

  // Get available actions for that category
  const { data: actions } = await supabase
    .from("micro_actions")
    .select("*")
    .eq("category", biggestCategory)
    .eq("active", true)
    .order("difficulty", { ascending: true });

  const allActions = (actions as MicroAction[]) ?? [];

  // Exclude actions already completed or skipped today
  const available = allActions.filter((a) => !usedIds.has(a.id));

  if (available.length === 0) {
    // Fallback: any active action
    const { data: fallback } = await supabase
      .from("micro_actions")
      .select("*")
      .eq("active", true)
      .limit(1);

    return (fallback?.[0] as MicroAction) ?? null;
  }

  // Deterministic selection: prefer easiest action for the biggest category
  // Sort by difficulty, then by creation date for determinism
  available.sort((a, b) => {
    const diffA = DIFFICULTY_ORDER[a.difficulty] ?? 99;
    const diffB = DIFFICULTY_ORDER[b.difficulty] ?? 99;
    if (diffA !== diffB) return diffA - diffB;
    return a.created_at.localeCompare(b.created_at);
  });

  return available[0] ?? null;
}

function getBiggestCategory(
  dailyTotal: DailyTotal | null,
): string {
  if (!dailyTotal) return "transport";

  const categories = [
    { name: "transport", value: dailyTotal.transport_co2_kg },
    { name: "food", value: dailyTotal.food_co2_kg },
    { name: "energy", value: dailyTotal.energy_co2_kg },
    { name: "shopping", value: dailyTotal.shopping_co2_kg },
  ];

  const biggest = categories.reduce((max, cat) =>
    cat.value > max.value ? cat : max,
  );

  return biggest.value > 0 ? biggest.name : "transport";
}

export async function updateStreak(
  supabase: SupabaseClient,
  userId: string,
): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);

  // Check if user logged today and completed an action today
  const { data: dailyTotal } = await supabase
    .from("daily_totals")
    .select("*")
    .eq("user_id", userId)
    .eq("date", today)
    .maybeSingle();

  const { data: actionToday } = await supabase
    .from("user_actions")
    .select("*")
    .eq("user_id", userId)
    .eq("action_date", today)
    .eq("status", "done")
    .maybeSingle();

  // Both conditions required for streak
  const hasLogged = dailyTotal !== null;
  const hasCompleted = actionToday !== null;

  if (!hasLogged || !hasCompleted) return;

  // Get current streak
  const { data: streak } = await supabase
    .from("streaks")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  const currentStreak = (streak as { current_streak: number } | null)
    ?.current_streak ?? 0;
  const longestStreak = (streak as { longest_streak: number } | null)
    ?.longest_streak ?? 0;

  const newStreak = currentStreak + 1;

  await supabase
    .from("streaks")
    .upsert({
      user_id: userId,
      current_streak: newStreak,
      longest_streak: Math.max(newStreak, longestStreak),
      last_completed_date: today,
      updated_at: new Date().toISOString(),
    });
}

export async function completeAction(
  supabase: SupabaseClient,
  userId: string,
  actionId: string,
  status: ActionStatus,
  co2Saved: number,
): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);

  await supabase.from("user_actions").insert({
    user_id: userId,
    action_id: actionId,
    status,
    co2_saved_kg: co2Saved,
    action_date: today,
  });

  // Update daily_totals with saved CO₂ (only if row already exists)
  if (status === "done" && co2Saved > 0) {
    await supabase
      .from("daily_totals")
      .update({ co2_saved_kg: co2Saved, updated_at: new Date().toISOString() })
      .eq("user_id", userId)
      .eq("date", today);
  }

  // Update streak after action completion
  await updateStreak(supabase, userId);
}
