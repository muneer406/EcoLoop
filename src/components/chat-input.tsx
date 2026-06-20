"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc-client";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/stores/chat-store";
import type { CalculatedActivity } from "@/types";

export function ChatInput() {
  const [message, setMessage] = useState("");
  const sendMessage = trpc.chat.sendMessage.useMutation();
  const addEntry = useChatStore((s) => s.addEntry);

  const handleSubmit = async () => {
    const text = message.trim();
    if (!text || sendMessage.isPending) return;

    setMessage("");

    try {
      const result = await sendMessage.mutateAsync({ message: text });
      addEntry({
        id: result.logId,
        message: result.message,
        activities: result.activities as CalculatedActivity[],
        totalCo2Kg: result.totalCo2Kg,
        timestamp: new Date(),
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong.";
      addEntry({
        id: `error-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        message: text,
        activities: [],
        totalCo2Kg: 0,
        timestamp: new Date(),
        error: errorMessage,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-2 items-end">
      <label htmlFor="carbon-log-input" className="sr-only">
        Describe your day
      </label>
      <textarea
        id="carbon-log-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='Describe your day... (e.g. "I drove 12km, ate a burger, and used AC for 6 hours")'
        rows={2}
        className="flex-1 resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <Button
        onClick={handleSubmit}
        disabled={!message.trim() || sendMessage.isPending}
        size="lg"
        aria-label={sendMessage.isPending ? "Processing your message" : "Send message"}
      >
        {sendMessage.isPending ? "..." : "Send"}
      </Button>
    </div>
  );
}
