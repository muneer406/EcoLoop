export const dynamic = "force-dynamic";

export default function ProfilePage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="h-16 border-b flex items-center px-6 shrink-0">
        <h1 className="text-lg font-semibold">Profile</h1>
      </header>
      <div className="flex-1 p-6">
        <div className="max-w-md mx-auto space-y-6">
          <div className="rounded-xl border bg-card p-4">
            <h2 className="text-sm font-medium">Account</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your profile preferences and country settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
