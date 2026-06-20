"use client";

import { useChatStore } from "@/stores/chat-store";
import { MotionCard } from "@/components/motion-card";

export function ChatHistory() {
  const entries = useChatStore((s) => s.entries);

  if (entries.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <div className="text-center space-y-3 max-w-md px-4">
          <p className="text-lg font-medium text-foreground">
            Your footprint story starts here
          </p>
          <p className="text-sm text-muted-foreground">
            Describe your day in plain language. EcoLoop will extract your
            activities and calculate your carbon impact.
          </p>
          <div className="flex flex-wrap gap-2 justify-center pt-2">
            {[
              "I drove 12km and ate a burger",
              "Took the bus, had chicken salad",
              "Used AC for 6 hours today",
            ].map((example) => (
              <span
                key={example}
                className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground border border-border/50"
              >
                {example}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4 p-4">
      {entries.map((entry) => (
        <MotionCard
          key={entry.id}
          className="card-eco p-6 space-y-3"
        >
          <p className="text-sm text-muted-foreground">{entry.message}</p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-foreground">
              {entry.totalCo2Kg.toFixed(1)} kg CO₂
            </span>
          </div>

          {entry.error && (
            <p
              className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2 border border-destructive/20"
              role="alert"
            >
              {entry.error}
            </p>
          )}

          {entry.activities.length > 0 && (
            <div className="space-y-1.5">
              {entry.activities.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-sm py-1.5 px-3 rounded-lg bg-accent/50"
                >
                  <div className="flex items-center gap-2">
                    <CategoryBadge category={a.category} />
                    <span className="text-foreground">
                      {a.description ?? a.mode}
                    </span>
                  </div>
                  <span className="font-medium tabular-nums text-muted-foreground">
                    {a.co2Kg.toFixed(2)} kg
                  </span>
                </div>
              ))}
            </div>
          )}
        </MotionCard>
      ))}
    </div>
  );
}

function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    transport: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
    food: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    energy: "bg-purple-500/15 text-purple-400 border-purple-500/20",
    shopping: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  };

  return (
    <span
      className={`text-xs px-1.5 py-0.5 rounded border font-medium ${colors[category] ?? "bg-muted"}`}
    >
      {category}
    </span>
  );
}
