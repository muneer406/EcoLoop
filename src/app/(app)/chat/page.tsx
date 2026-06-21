import { ChatInput } from "@/components/chat-input";
import { ChatHistory } from "@/components/chat-history";
import { ChatHistoryLoader } from "@/components/chat-history-loader";
import { ActionCard } from "@/components/action-card";

export const dynamic = "force-dynamic";

export default function ChatPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <header className="h-16 border-b border-border flex items-center px-6 shrink-0">
        <h1 className="text-lg font-semibold text-foreground">Carbon Log</h1>
      </header>

      <div className="flex-1 overflow-y-auto">
        <ChatHistoryLoader />
        <ChatHistory />
      </div>

      <div className="shrink-0 px-4 pt-2">
        <ActionCard />
      </div>

      <div className="shrink-0 p-4 border-t border-border bg-background/80 backdrop-blur-lg">
        <div className="max-w-2xl mx-auto">
          <ChatInput />
        </div>
      </div>
    </div>
  );
}
