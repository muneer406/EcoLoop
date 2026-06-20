"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc-client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ActionCard() {
  const { data, isLoading, refetch } = trpc.habits.getAction.useQuery();
  const [completed, setCompleted] = useState<string | null>(null);

  const completeMutation = trpc.habits.complete.useMutation({
    onSuccess: (_, vars) => {
      setCompleted(vars.status);
    },
  });

  if (isLoading) return null;
  if (!data?.action) return null;

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "glass rounded-2xl p-5 max-w-2xl mx-auto text-center border",
          completed === "done"
            ? "border-emerald-500/30"
            : "border-border",
        )}
      >
        <p className="text-sm font-medium text-foreground">
          {completed === "done"
            ? "Action completed! Come back tomorrow."
            : "Action skipped. New action tomorrow."}
        </p>
        {completed === "done" && (
          <p className="text-xs text-muted-foreground mt-1">
            Saved {data.action.co2_saving_kg} kg CO₂
          </p>
        )}
      </motion.div>
    );
  }

  const { action, context } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-5 space-y-3 max-w-2xl mx-auto border border-primary/10"
    >
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">
          Daily Micro-Action
        </p>
        <h3 className="text-base font-semibold text-foreground">
          {action.title}
        </h3>
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
          {completeMutation.isPending ? "Saving..." : "Done"}
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
    </motion.div>
  );
}
