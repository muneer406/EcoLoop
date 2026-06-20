import { z } from "zod/v4";

// -- Activity --

export const ActivitySchema = z.object({
  category: z.enum(["transport", "food", "energy", "shopping"]),
  mode: z.string().min(1).max(100),
  quantity: z.number().positive(),
  unit: z.string().min(1).max(50),
  description: z.string().max(200).optional(),
});

// -- AI Response --

export const AIResponseSchema = z.object({
  activities: z.array(ActivitySchema),
  confidence: z.number().min(0).max(1),
});

// -- Profile --

export const ProfileSchema = z.object({
  display_name: z.string().min(1).max(100),
  country: z.string().min(1).max(100),
  transport_mode: z.enum(["car", "public_transport", "bike", "walk", "mixed"]),
  diet: z.enum(["vegan", "vegetarian", "pescatarian", "omnivore", "heavy_meat"]),
});

// -- Activity Input (for logging) --

export const LogInputSchema = z.object({
  message: z.string().min(1).max(2000),
});

// -- Action Status --

export const ActionStatusSchema = z.enum(["done", "skipped"]);

// -- Complete Action Input --

export const CompleteActionSchema = z.object({
  action_id: z.string().uuid(),
  status: ActionStatusSchema,
});

// -- Date Range --

export const DateRangeSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

// -- Emitted types --

export type ActivityInput = z.infer<typeof ActivitySchema>;
export type AIResponse = z.infer<typeof AIResponseSchema>;
export type ProfileInput = z.infer<typeof ProfileSchema>;
export type LogInput = z.infer<typeof LogInputSchema>;
