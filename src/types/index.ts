export type ActivityCategory = "transport" | "food" | "energy" | "shopping";

export type DietType = "vegan" | "vegetarian" | "pescatarian" | "omnivore" | "heavy_meat";

export type TransportType = "car" | "public_transport" | "bike" | "walk" | "mixed";

export type ActionStatus = "done" | "skipped";

export interface Activity {
  category: ActivityCategory;
  mode: string;
  quantity: number;
  unit: string;
  description?: string;
}

export interface CalculatedActivity extends Activity {
  co2Kg: number;
  factorUsed: number;
  source: string;
}

export interface DailySummary {
  totalCo2Kg: number;
  transportCo2Kg: number;
  foodCo2Kg: number;
  energyCo2Kg: number;
  shoppingCo2Kg: number;
}

export interface AIActivityResponse {
  activities: Activity[];
  confidence: number;
}
