"use client";

import { useEffect } from "react";
import { trpc } from "@/lib/trpc-client";
import { useChatStore } from "@/stores/chat-store";

export function ChatHistoryLoader() {
  const setEntries = useChatStore((s) => s.setEntries);
  const loaded = useChatStore((s) => s.loaded);
  const { data, isLoading } = trpc.chat.getHistory.useQuery(undefined, {
    enabled: !loaded,
  });

  useEffect(() => {
    if (data && !loaded) {
      setEntries(
        data.map((log) => ({
          id: log.id,
          message: log.message,
          activities: (log.activities ?? []).map((a) => ({
            category: a.category,
            mode: a.mode,
            quantity: a.quantity,
            unit: a.unit,
            co2Kg: a.co2_kg,
            factorUsed: 0,
            source: "",
            description: a.description ?? undefined,
          })),
          totalCo2Kg: log.total_co2_kg,
          timestamp: new Date(log.created_at),
        })),
      );
    }
  }, [data, loaded, setEntries]);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 rounded-xl bg-card border border-border animate-pulse"
          />
        ))}
      </div>
    );
  }

  return null;
}
