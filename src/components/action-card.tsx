"use client";

import { trpc } from "@/lib/trpc-client";
import { Button } from "@/components/ui/button";

export function ActionCard() {
  const { data, isLoading, refetch } = trpc.habits.getAction.useQuery();
  const completeMutation = trpc.habits.complete.useMutation({
    onSuccess: () => refetch(),
  });

  if (isLoading) return null;
  if (!data?.action) return null;

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
