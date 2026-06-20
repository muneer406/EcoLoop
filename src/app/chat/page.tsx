import { ChatInput } from "@/components/chat-input";
import { ChatHistory } from "@/components/chat-history";

export const dynamic = "force-dynamic";

export default function ChatPage() {
  return (
    <div className="flex flex-1 flex-col h-[100dvh]">
      <header className="h-16 border-b flex items-center px-6 shrink-0">
        <h1 className="text-lg font-semibold">Carbon Log</h1>
      </header>

      <div className="flex-1 overflow-y-auto">
        <ChatHistory />
      </div>

      <div className="shrink-0 p-4 border-t bg-background/80 backdrop-blur-lg">
        <div className="max-w-2xl mx-auto">
          <ChatInput />
        </div>
      </div>
    </div>
  );
}
