import { GLOBAL_AVERAGE_KG_PER_DAY, PARIS_TARGET_KG_PER_DAY } from "@/constants";

export function calculateBaseline(dailyTotals: number[]): number {
  if (dailyTotals.length === 0) return GLOBAL_AVERAGE_KG_PER_DAY;

  const firstDays = dailyTotals.slice(0, 7);
  const avg = firstDays.reduce((sum, d) => sum + d, 0) / firstDays.length;

  return Math.round(avg * 100) / 100;
}

export function calculateCo2Saved(
  baseline: number,
  currentAverage: number,
): number {
  const diff = baseline - currentAverage;
  return diff > 0 ? Math.round(diff * 100) / 100 : 0;
}

export function calculateForecast(dailyAverage: number): number {
  return Math.round(dailyAverage * 365 * 100) / 100;
}

export function calculateGlobalComparison(
  userDailyAverage: number,
): { globalAvg: number; userVsGlobal: number; percentage: number } {
  const globalAvg = GLOBAL_AVERAGE_KG_PER_DAY;
  const userVsGlobal = Math.round((userDailyAverage - globalAvg) * 100) / 100;
  const percentage = Math.round((userDailyAverage / globalAvg) * 100);

  return { globalAvg, userVsGlobal, percentage };
}

export function calculateParisComparison(
  userDailyAverage: number,
): { target: number; userVsTarget: number; multiple: number } {
  const target = PARIS_TARGET_KG_PER_DAY;
  const userVsTarget = Math.round((userDailyAverage - target) * 100) / 100;
  const multiple = Math.round((userDailyAverage / target) * 10) / 10;

  return { target, userVsTarget, multiple };
}
