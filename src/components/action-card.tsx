"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc-client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ActionCard() {
  const { data, isLoading, refetch } = trpc.habits.getAction.useQuery();
  const [completed, setCompleted] = useState<string | null>(null); // "done" | "skipped"

  const completeMutation = trpc.habits.complete.useMutation({
    onSuccess: (_, vars) => {
      setCompleted(vars.status);
      setTimeout(() => {
        setCompleted(null);
        refetch();
      }, 1500);
    },
  });

  if (isLoading) return null;
  if (!data?.action) return null;

  if (completed) {
    return (
      <div
        className={cn(
          "rounded-xl border p-5 max-w-2xl mx-auto text-center transition-colors",
          completed === "done"
            ? "border-green-500/30 bg-green-500/5"
            : "border-muted bg-muted/30",
        )}
      >
        <p className="text-sm font-medium">
          {completed === "done" ? "Action completed!" : "Action skipped."}
        </p>
        {completed === "done" && (
          <p className="text-xs text-muted-foreground mt-1">
            Saved {data.action.co2_saving_kg} kg CO₂
          </p>
        )}
      </div>
    );
  }

  const { action, context } = data;

  return (
    <div className="rounded-xl border bg-card p-5 space-y-3 max-w-2xl mx-auto">
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Daily Micro-Action
        </p>
        <h3 className="text-base font-semibold">{action.title}</h3>
        <p className="text-sm text-muted-foreground">{action.description}</p>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span>Save {action.co2_saving_kg} kg CO₂</span>
        <span>{action.equivalence}</span>
        <span>~{action.estimated_minutes} min</span>
      </div>

      <p className="text-xs text-muted-foreground italic">{context}</p>

      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() =>
            completeMutation.mutate({
              action_id: action.id,
              status: "done",
            })
          }
          disabled={completeMutation.isPending}
        >
          {completeMutation.isPending ? "..." : "Done"}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() =>
            completeMutation.mutate({
              action_id: action.id,
              status: "skipped",
            })
          }
          disabled={completeMutation.isPending}
        >
          Skip
        </Button>
      </div>
    </div>
  );
}
