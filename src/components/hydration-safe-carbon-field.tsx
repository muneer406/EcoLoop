"use client";

import dynamic from "next/dynamic";
import { trpc } from "@/lib/trpc-client";

const CarbonField = dynamic(
  () => import("@/components/carbon-field").then((m) => ({ default: m.CarbonField })),
  { ssr: false },
);

export function HydrationSafeCarbonField() {
  const { data } = trpc.dashboard.getMetrics.useQuery();

  if (!data) {
    return (
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-950/20 via-background to-background" />
    );
  }

  return (
    <CarbonField
      data={{
        transportCo2: data.dailyTotal?.transport_co2_kg ?? 0,
        foodCo2: data.dailyTotal?.food_co2_kg ?? 0,
        energyCo2: data.dailyTotal?.energy_co2_kg ?? 0,
        shoppingCo2: data.dailyTotal?.shopping_co2_kg ?? 0,
        totalCo2: data.dailyTotal?.total_co2_kg ?? 0,
      }}
    />
  );
}
