export type ActivityCategory = "transport" | "food" | "energy" | "shopping";

export type DietType = "vegan" | "vegetarian" | "pescatarian" | "omnivore" | "heavy_meat";

export type TransportType = "car" | "public_transport" | "bike" | "walk" | "mixed";

export type ActionStatus = "done" | "skipped";

// -- Activity types --

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

// -- Database row types --

export interface Profile {
  id: string;
  display_name: string;
  country: string;
  transport_mode: TransportType;
  diet: DietType;
  created_at: string;
  updated_at: string;
}

export interface Log {
  id: string;
  user_id: string;
  message: string;
  total_co2_kg: number;
  created_at: string;
  updated_at: string;
}

export interface ActivityRow {
  id: string;
  log_id: string;
  user_id: string;
  category: ActivityCategory;
  mode: string;
  quantity: number;
  unit: string;
  co2_kg: number;
  description: string | null;
  created_at: string;
}

export interface DailyTotal {
  id: string;
  user_id: string;
  date: string;
  total_co2_kg: number;
  transport_co2_kg: number;
  food_co2_kg: number;
  energy_co2_kg: number;
  shopping_co2_kg: number;
  co2_saved_kg: number;
  created_at: string;
  updated_at: string;
}

export interface MicroAction {
  id: string;
  category: ActivityCategory;
  title: string;
  description: string;
  co2_saving_kg: number;
  equivalence: string;
  difficulty: string;
  estimated_minutes: number;
  active: boolean;
  created_at: string;
}

export interface UserAction {
  id: string;
  user_id: string;
  action_id: string;
  status: ActionStatus;
  co2_saved_kg: number;
  action_date: string;
  created_at: string;
}

export interface Streak {
  user_id: string;
  current_streak: number;
  longest_streak: number;
  total_co2_saved_kg: number;
  last_completed_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmissionFactor {
  id: string;
  category: ActivityCategory;
  mode: string;
  country: string;
  unit: string;
  factor: number;
  source: string;
  active: boolean;
  created_at: string;
}

// -- API types --

export interface APIError {
  code: string;
  message: string;
}

// -- Dashboard --

export interface DashboardData {
  dailyTotal: DailyTotal | null;
  streak: Streak | null;
  weeklyTotals: DailyTotal[];
  forecast: number;
  globalComparison: number;
  parisComparison: number;
}
