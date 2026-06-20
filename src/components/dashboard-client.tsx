"use client";

import { trpc } from "@/lib/trpc-client";
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
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  if (!data || !data.dailyTotal) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 px-4">
        <p className="text-lg font-medium">
          Your footprint story begins with a single day.
        </p>
        <p className="text-sm text-muted-foreground">
          Log your first activity to see your dashboard.
        </p>
      </div>
    );
  }

  const dailyTotal = data.dailyTotal;
  if (!dailyTotal) return null;

  const chartData = data.weeklyTotals.map((d) => ({
    date: new Date(d.date).toLocaleDateString("en", {
      weekday: "short",
      month: "short",
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
        <SummaryCard label="Today" value={`${dailyTotal.total_co2_kg.toFixed(1)} kg`} />
        <SummaryCard
          label="Streak"
          value={`${data.streak?.current_streak ?? 0} days`}
        />
        <SummaryCard
          label="CO₂ Saved"
          value={`${data.co2Saved.toFixed(1)} kg`}
        />
        <SummaryCard
          label="Forecast"
          value={`${data.forecast} kg/yr`}
          detail={
            data.forecast > 4000
              ? `Above global avg`
              : `Below global avg`
          }
        />
      </div>

      {/* Weekly Trend */}
      <div className="rounded-xl border bg-card p-6">
        <h2 className="text-sm font-medium mb-4">Weekly Trend</h2>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
                unit=" kg"
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--background)",
                }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Total"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="rounded-xl border bg-card p-6">
        <h2 className="text-sm font-medium mb-4">Category Breakdown</h2>
        <div className="space-y-3">
          {[
            {
              label: "Transport",
              value: data.dailyTotal.transport_co2_kg,
              color: "bg-blue-500",
            },
            {
              label: "Food",
              value: data.dailyTotal.food_co2_kg,
              color: "bg-amber-500",
            },
            {
              label: "Energy",
              value: data.dailyTotal.energy_co2_kg,
              color: "bg-purple-500",
            },
            {
              label: "Shopping",
              value: data.dailyTotal.shopping_co2_kg,
              color: "bg-emerald-500",
            },
          ].map((cat) => {
            const pct =
              dailyTotal.total_co2_kg > 0
                ? (cat.value / dailyTotal.total_co2_kg) * 100
                : 0;
            return (
              <div key={cat.label} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{cat.label}</span>
                  <span className="text-muted-foreground">
                    {cat.value.toFixed(2)} kg ({pct.toFixed(0)}%)
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${cat.color}`}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparisons */}
      <div className="rounded-xl border bg-card p-6">
        <h2 className="text-sm font-medium mb-4">Comparisons</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              Global Average (11 kg/day)
            </p>
            <p className="text-xl font-bold">
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
            <p className="text-xl font-bold">
              {data.userVsTarget > 0 ? "+" : ""}
              {data.userVsTarget.toFixed(1)} kg
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {data.multiple}x the target
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-4 space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xl font-bold">{value}</p>
      {detail && (
        <p className="text-xs text-muted-foreground">{detail}</p>
      )}
    </div>
  );
}
