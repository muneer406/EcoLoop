import { DashboardClient } from "@/components/dashboard-client";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="h-16 border-b flex items-center px-6 shrink-0">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </header>
      <div className="flex-1 overflow-y-auto">
        <DashboardClient />
      </div>
    </div>
  );
}
