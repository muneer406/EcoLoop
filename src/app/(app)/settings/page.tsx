export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="h-16 border-b flex items-center px-6 shrink-0">
        <h1 className="text-lg font-semibold">Settings</h1>
      </header>
      <div className="flex-1 p-6">
        <div className="max-w-md mx-auto space-y-6">
          <div className="rounded-xl border bg-card p-4">
            <h2 className="text-sm font-medium">Preferences</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Adjust your application preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
