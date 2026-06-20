import type { Activity, CalculatedActivity, DailySummary } from "@/types";
import { getFactorWithSource } from "./factors";
import { normalizeMode } from "./normalize";

export function calculateActivity(
  activity: Activity,
  country: string = "global",
): CalculatedActivity {
  const normalizedMode = normalizeMode(activity.category, activity.mode);
  const entry = getFactorWithSource(activity.category, normalizedMode, country);

  const factorUsed = entry?.factor ?? 0;
  const co2Kg = activity.quantity * factorUsed;

  return {
    category: activity.category,
    mode: normalizedMode,
    quantity: activity.quantity,
    unit: activity.unit,
    co2Kg: Math.round(co2Kg * 10000) / 10000,
    factorUsed,
    source: entry?.source ?? "Unknown",
    description: activity.description,
  };
}

export function calculateLog(
  activities: Activity[],
  country: string = "global",
): { calculated: CalculatedActivity[]; totalCo2Kg: number } {
  const calculated = activities.map((a) => calculateActivity(a, country));
  const totalCo2Kg = calculated.reduce((sum, c) => sum + c.co2Kg, 0);

  return {
    calculated,
    totalCo2Kg: Math.round(totalCo2Kg * 10000) / 10000,
  };
}

export function calculateDailySummary(activities: Activity[]): DailySummary {
  const results = activities.map((a) => calculateActivity(a));

  const transportCo2Kg = sumByCategory(results, "transport");
  const foodCo2Kg = sumByCategory(results, "food");
  const energyCo2Kg = sumByCategory(results, "energy");
  const shoppingCo2Kg = sumByCategory(results, "shopping");

  return {
    totalCo2Kg:
      Math.round(
        (transportCo2Kg + foodCo2Kg + energyCo2Kg + shoppingCo2Kg) * 10000,
      ) / 10000,
    transportCo2Kg,
    foodCo2Kg,
    energyCo2Kg,
    shoppingCo2Kg,
  };
}

function sumByCategory(
  activities: CalculatedActivity[],
  category: string,
): number {
  return (
    Math.round(
      activities
        .filter((a) => a.category === category)
        .reduce((sum, a) => sum + a.co2Kg, 0) * 10000,
    ) / 10000
  );
}
