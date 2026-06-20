import { DashboardClient } from "@/components/dashboard-client";
import { CarbonField } from "@/components/carbon-field";
import { HydrationSafeCarbonField } from "@/components/hydration-safe-carbon-field";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col relative">
      <HydrationSafeCarbonField />

      <header className="h-16 border-b flex items-center px-6 shrink-0 relative z-10 backdrop-blur-sm bg-background/60">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </header>
      <div className="flex-1 overflow-y-auto relative z-10">
        <DashboardClient />
      </div>
    </div>
  );
}
