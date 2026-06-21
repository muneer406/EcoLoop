import { AppNav } from "@/components/app-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <AppNav />
      <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  );
}
