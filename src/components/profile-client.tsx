"use client";

import Link from "next/link";
import { trpc } from "@/lib/trpc-client";
import { useAuth } from "@/hooks/use-auth";

const countryLabels: Record<string, string> = {
  "United States": "US",
  "United Kingdom": "UK",
  Germany: "DE",
  India: "IN",
  Other: "Other",
};

export function ProfileClient() {
  const { user } = useAuth();
  const { data: profile, isLoading } = trpc.profile.get.useQuery();
  const { data: streak } = trpc.dashboard.getMetrics.useQuery();

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-8">
      {/* Avatar / Email */}
      <div className="rounded-xl border bg-card p-5 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
            {user?.email?.charAt(0).toUpperCase() ?? "U"}
          </div>
          <div>
            <p className="font-medium">{user?.email}</p>
            <p className="text-xs text-muted-foreground">EcoLoop member</p>
          </div>
        </div>
      </div>

      {/* Profile details */}
      {profile ? (
        <div className="rounded-xl border bg-card p-5 space-y-4">
          <h2 className="text-sm font-medium">Your Profile</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Country</p>
              <p className="font-medium">
                {profile.country}{" "}
                <span className="text-xs text-muted-foreground">
                  ({countryLabels[profile.country] ?? profile.country})
                </span>
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Transport</p>
              <p className="font-medium capitalize">
                {profile.transport_mode.replace("_", " ")}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Diet</p>
              <p className="font-medium capitalize">
                {profile.diet.replace("_", " ")}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Joined</p>
              <p className="font-medium">
                {new Date(profile.created_at).toLocaleDateString("en", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <Link
            href="/settings"
            className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-border bg-background text-sm font-medium hover:bg-muted transition-colors"
          >
            Edit Preferences
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border bg-card p-5 text-center space-y-3">
          <p className="text-sm text-muted-foreground">
            Complete onboarding to set up your profile.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/80 transition-colors"
          >
            Set Up Profile
          </Link>
        </div>
      )}

      {/* Stats */}
      {streak && (
        <div className="rounded-xl border bg-card p-5 space-y-3">
          <h2 className="text-sm font-medium">Your Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-bold">
                {streak.streak?.current_streak ?? 0}
              </p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {streak.co2Saved.toFixed(1)} kg
              </p>
              <p className="text-xs text-muted-foreground">CO₂ Saved</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {streak.forecast.toFixed(0)}
              </p>
              <p className="text-xs text-muted-foreground">Annual Forecast (kg)</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {streak.streak?.longest_streak ?? 0}
              </p>
              <p className="text-xs text-muted-foreground">Best Streak</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
