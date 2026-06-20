import { SettingsForm } from "@/components/settings-form";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="h-16 border-b flex items-center px-6 shrink-0">
        <h1 className="text-lg font-semibold">Settings</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-md mx-auto space-y-8">
          <SettingsForm />
        </div>
      </div>
    </div>
  );
}
