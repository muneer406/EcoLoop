// Emission factors in memory - loaded once, read many
// Sources: DEFRA 2024, IPCC, Our World In Data, IEA

import type { ActivityCategory } from "@/types";

export interface EmissionFactor {
  category: ActivityCategory;
  mode: string;
  country: string;
  unit: string;
  factor: number;
  source: string;
}

export const TRANSPORT_FACTORS: EmissionFactor[] = [
  { category: "transport", mode: "walk", country: "global", unit: "km", factor: 0.0, source: "DEFRA 2024" },
  { category: "transport", mode: "bike", country: "global", unit: "km", factor: 0.0, source: "DEFRA 2024" },
  { category: "transport", mode: "bus", country: "global", unit: "km", factor: 0.089, source: "DEFRA 2024" },
  { category: "transport", mode: "train", country: "global", unit: "km", factor: 0.041, source: "DEFRA 2024" },
  { category: "transport", mode: "car_electric", country: "global", unit: "km", factor: 0.053, source: "DEFRA 2024" },
  { category: "transport", mode: "car_hybrid", country: "global", unit: "km", factor: 0.12, source: "DEFRA 2024" },
  { category: "transport", mode: "car_petrol", country: "global", unit: "km", factor: 0.192, source: "DEFRA 2024" },
  { category: "transport", mode: "motorcycle", country: "global", unit: "km", factor: 0.103, source: "DEFRA 2024" },
  { category: "transport", mode: "flight_short", country: "global", unit: "km", factor: 0.255, source: "DEFRA 2024" },
  { category: "transport", mode: "flight_long", country: "global", unit: "km", factor: 0.195, source: "DEFRA 2024" },
];

export const FOOD_FACTORS: EmissionFactor[] = [
  { category: "food", mode: "beef", country: "global", unit: "kg", factor: 27.0, source: "Our World In Data" },
  { category: "food", mode: "lamb", country: "global", unit: "kg", factor: 24.0, source: "Our World In Data" },
  { category: "food", mode: "pork", country: "global", unit: "kg", factor: 12.1, source: "Our World In Data" },
  { category: "food", mode: "cheese", country: "global", unit: "kg", factor: 13.5, source: "Our World In Data" },
  { category: "food", mode: "chicken", country: "global", unit: "kg", factor: 6.9, source: "Our World In Data" },
  { category: "food", mode: "fish", country: "global", unit: "kg", factor: 5.4, source: "Our World In Data" },
  { category: "food", mode: "eggs", country: "global", unit: "kg", factor: 4.8, source: "Our World In Data" },
  { category: "food", mode: "rice", country: "global", unit: "kg", factor: 2.7, source: "Our World In Data" },
  { category: "food", mode: "milk", country: "global", unit: "kg", factor: 1.9, source: "Our World In Data" },
  { category: "food", mode: "vegetables", country: "global", unit: "kg", factor: 0.5, source: "Our World In Data" },
  { category: "food", mode: "fruits", country: "global", unit: "kg", factor: 0.4, source: "Our World In Data" },
  { category: "food", mode: "nuts", country: "global", unit: "kg", factor: 0.3, source: "Our World In Data" },
];

export const ENERGY_FACTORS: EmissionFactor[] = [
  { category: "energy", mode: "grid_electricity", country: "global", unit: "kWh", factor: 0.475, source: "IEA" },
  { category: "energy", mode: "grid_electricity", country: "US", unit: "kWh", factor: 0.386, source: "IEA" },
  { category: "energy", mode: "grid_electricity", country: "UK", unit: "kWh", factor: 0.193, source: "IEA" },
  { category: "energy", mode: "grid_electricity", country: "Germany", unit: "kWh", factor: 0.348, source: "IEA" },
  { category: "energy", mode: "grid_electricity", country: "India", unit: "kWh", factor: 0.708, source: "IEA" },
  { category: "energy", mode: "natural_gas", country: "global", unit: "m3", factor: 2.02, source: "DEFRA 2024" },
  { category: "energy", mode: "ac_hour", country: "global", unit: "hour", factor: 0.8, source: "IEA + DEFRA" },
  { category: "energy", mode: "heater_hour", country: "global", unit: "hour", factor: 1.1, source: "IEA + DEFRA" },
  { category: "energy", mode: "dryer_hour", country: "global", unit: "cycle", factor: 2.5, source: "DEFRA 2024" },
  { category: "energy", mode: "washing_machine", country: "global", unit: "cycle", factor: 0.6, source: "DEFRA 2024" },
];

export const SHOPPING_FACTORS: EmissionFactor[] = [
  { category: "shopping", mode: "tshirt", country: "global", unit: "item", factor: 7, source: "OWID" },
  { category: "shopping", mode: "jeans", country: "global", unit: "item", factor: 33, source: "OWID" },
  { category: "shopping", mode: "shoes", country: "global", unit: "item", factor: 14, source: "OWID" },
  { category: "shopping", mode: "smartphone", country: "global", unit: "item", factor: 70, source: "OWID" },
  { category: "shopping", mode: "laptop", country: "global", unit: "item", factor: 250, source: "OWID" },
  { category: "shopping", mode: "furniture", country: "global", unit: "item", factor: 80, source: "OWID" },
];

export const ALL_FACTORS: EmissionFactor[] = [
  ...TRANSPORT_FACTORS,
  ...FOOD_FACTORS,
  ...ENERGY_FACTORS,
  ...SHOPPING_FACTORS,
];

// Build lookup maps for O(1) factor access
function buildLookup(): Map<string, number> {
  const map = new Map<string, number>();

  for (const f of ALL_FACTORS) {
    const key = `${f.category}|${f.mode}|${f.country}`;
    map.set(key, f.factor);
    // Also set without country for global fallback
    if (f.country === "global") {
      map.set(`${f.category}|${f.mode}|__default`, f.factor);
    }
  }

  return map;
}

const FACTOR_LOOKUP = buildLookup();

export function getFactor(
  category: ActivityCategory,
  mode: string,
  country: string = "global",
): number | undefined {
  const key = `${category}|${mode}|${country}`;
  const found = FACTOR_LOOKUP.get(key);
  if (found !== undefined) return found;

  // Fallback to global
  return FACTOR_LOOKUP.get(`${category}|${mode}|global`);
}

export function getFactorWithSource(
  category: ActivityCategory,
  mode: string,
  country: string = "global",
): { factor: number; source: string } | undefined {
  const f = ALL_FACTORS.find(
    (f) => f.category === category && f.mode === mode && f.country === country,
  );
  if (f) return { factor: f.factor, source: f.source };

  const global = ALL_FACTORS.find(
    (f) => f.category === category && f.mode === mode && f.country === "global",
  );
  if (global) return { factor: global.factor, source: global.source };

  return undefined;
}
