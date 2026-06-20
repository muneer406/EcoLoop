import { create } from "zustand";
import type { CalculatedActivity } from "@/types";

export interface ChatEntry {
  id: string;
  message: string;
  activities: CalculatedActivity[];
  totalCo2Kg: number;
  timestamp: Date;
  error?: string;
}

interface ChatState {
  entries: ChatEntry[];
  loaded: boolean;
  addEntry: (entry: ChatEntry) => void;
  setEntries: (entries: ChatEntry[]) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  entries: [],
  loaded: false,
  addEntry: (entry) =>
    set((state) => {
      const updated = [entry, ...state.entries];
      return { entries: updated.slice(0, 50) };
    }),
  setEntries: (entries) => set({ entries, loaded: true }),
}));
