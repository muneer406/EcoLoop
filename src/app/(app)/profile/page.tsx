import { ProfileClient } from "@/components/profile-client";

export const dynamic = "force-dynamic";

export default function ProfilePage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="h-16 border-b flex items-center px-6 shrink-0">
        <h1 className="text-lg font-semibold">Profile</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-6">
        <ProfileClient />
      </div>
    </div>
  );
}
