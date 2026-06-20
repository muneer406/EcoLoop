"use client";

import { trpc } from "@/lib/trpc-client";
import { MotionCard } from "@/components/motion-card";
import { Skeleton } from "@/components/skeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function DashboardClient() {
  const { data, isLoading } = trpc.dashboard.getMetrics.useQuery();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-[320px] rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
      </div>
    );
  }

  if (!data || !data.dailyTotal) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 px-4">
        <p className="text-lg font-medium text-foreground">
          Your footprint story begins with a single day.
        </p>
        <p className="text-sm text-muted-foreground">
          Log your first activity to see your dashboard.
        </p>
      </div>
    );
  }

  const dailyTotal = data.dailyTotal;

  const chartData = data.weeklyTotals.map((d) => ({
    date: new Date(d.date).toLocaleDateString("en", {
      weekday: "short",
      day: "numeric",
    }),
    transport: d.transport_co2_kg,
    food: d.food_co2_kg,
    energy: d.energy_co2_kg,
    shopping: d.shopping_co2_kg,
    total: d.total_co2_kg,
  }));

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MotionCard className="card-eco p-5 space-y-1" whileHover={{ y: -4 }}>
          <p className="text-xs text-muted-foreground">Today</p>
          <p className="text-2xl font-bold text-foreground">
            {dailyTotal.total_co2_kg.toFixed(1)} kg
          </p>
        </MotionCard>
        <MotionCard className="card-eco p-5 space-y-1" whileHover={{ y: -4 }}>
          <p className="text-xs text-muted-foreground">Streak</p>
          <p className="text-2xl font-bold text-foreground">
            {data.streak?.current_streak ?? 0} days
          </p>
        </MotionCard>
        <MotionCard className="card-eco p-5 space-y-1" whileHover={{ y: -4 }}>
          <p className="text-xs text-muted-foreground">CO₂ Saved</p>
          <p className="text-2xl font-bold text-emerald-400">
            {data.co2Saved.toFixed(1)} kg
          </p>
        </MotionCard>
        <MotionCard className="card-eco p-5 space-y-1" whileHover={{ y: -4 }}>
          <p className="text-xs text-muted-foreground">Forecast</p>
          <p className="text-2xl font-bold text-foreground">
            {data.forecast}
          </p>
          <p className="text-xs text-muted-foreground">
            kg/year
          </p>
        </MotionCard>
      </div>

      {/* Weekly Trend */}
      <MotionCard className="card-eco p-6">
        <h2 className="text-sm font-medium text-foreground mb-4">
          Weekly Trend
        </h2>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "#8B8D94" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#8B8D94" }}
                unit=" kg"
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backgroundColor: "#0E1117",
                  color: "#EDEDEE",
                }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#6EE7F9"
                strokeWidth={2}
                dot={{ r: 4, fill: "#6EE7F9" }}
                name="Total"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </MotionCard>

      {/* Category Breakdown */}
      <MotionCard className="card-eco p-6">
        <h2 className="text-sm font-medium text-foreground mb-4">
          Category Breakdown
        </h2>
        <div className="space-y-3">
          {[
            {
              label: "Transport",
              value: dailyTotal.transport_co2_kg,
              color: "bg-cyan-400",
            },
            {
              label: "Food",
              value: dailyTotal.food_co2_kg,
              color: "bg-amber-400",
            },
            {
              label: "Energy",
              value: dailyTotal.energy_co2_kg,
              color: "bg-purple-400",
            },
            {
              label: "Shopping",
              value: dailyTotal.shopping_co2_kg,
              color: "bg-emerald-400",
            },
          ].map((cat) => {
            const pct =
              dailyTotal.total_co2_kg > 0
                ? (cat.value / dailyTotal.total_co2_kg) * 100
                : 0;
            return (
              <div key={cat.label} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{cat.label}</span>
                  <span className="text-muted-foreground">
                    {cat.value.toFixed(2)} kg ({pct.toFixed(0)}%)
                  </span>
                </div>
                <div className="h-2 rounded-full bg-accent overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${cat.color}`}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </MotionCard>

      {/* Comparisons */}
      <MotionCard className="card-eco p-6">
        <h2 className="text-sm font-medium text-foreground mb-4">
          Comparisons
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              Global Average (11 kg/day)
            </p>
            <p className="text-xl font-bold text-foreground">
              {data.userVsGlobal > 0 ? "+" : ""}
              {data.userVsGlobal.toFixed(1)} kg
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              You are at {data.percentage}% of global average
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              Paris Target (2.5 kg/day)
            </p>
            <p className="text-xl font-bold text-foreground">
              {data.userVsTarget > 0 ? "+" : ""}
              {data.userVsTarget.toFixed(1)} kg
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {data.multiple}x the target
            </p>
          </div>
        </div>
      </MotionCard>
    </div>
  );
}
