import { create } from "zustand";
import type { CalculatedActivity } from "@/types";

export interface ChatEntry {
  id: string;
  message: string;
  activities: CalculatedActivity[];
  totalCo2Kg: number;
  timestamp: Date;
}

interface ChatState {
  entries: ChatEntry[];
  addEntry: (entry: ChatEntry) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  entries: [],
  addEntry: (entry) =>
    set((state) => {
      const updated = [entry, ...state.entries];
      return { entries: updated.slice(0, 50) };
    }),
}));
