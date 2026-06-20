"use client";

import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc-client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const countryOptions = [
  "United States",
  "United Kingdom",
  "Germany",
  "India",
  "Other",
];

const transportOptions = [
  { value: "car", label: "Car" },
  { value: "public_transport", label: "Public Transport" },
  { value: "bike", label: "Bike" },
  { value: "walk", label: "Walk" },
  { value: "mixed", label: "Mixed" },
] as const;

const dietOptions = [
  { value: "vegan", label: "Vegan" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "pescatarian", label: "Pescatarian" },
  { value: "omnivore", label: "Omnivore" },
  { value: "heavy_meat", label: "Heavy Meat" },
] as const;

export function SettingsForm() {
  const { user } = useAuth();
  const { data: profile, isLoading } = trpc.profile.get.useQuery();

  const updateProfile = trpc.profile.update.useMutation();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [country, setCountry] = useState("");
  const [transport, setTransport] = useState("");
  const [diet, setDiet] = useState("");

  useEffect(() => {
    if (profile) {
      setCountry(profile.country);
      setTransport(profile.transport_mode);
      setDiet(profile.diet);
    }
  }, [profile]);

  const handleSave = async () => {
    setError(null);
    try {
      await updateProfile.mutateAsync({
        country: country || undefined,
        transport_mode: (transport as "car" | "public_transport" | "bike" | "walk" | "mixed") || undefined,
        diet: (diet as "vegan" | "vegetarian" | "pescatarian" | "omnivore" | "heavy_meat") || undefined,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError("Failed to save settings.");
    }
  };

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading settings...</p>;
  }

  return (
    <div className="space-y-8">
      {/* Account info */}
      <div className="rounded-xl border bg-card p-5 space-y-2">
        <h2 className="text-sm font-medium">Account</h2>
        <p className="text-sm text-muted-foreground">{user?.email}</p>
      </div>

      {/* Country */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Country</h3>
        <div className="grid grid-cols-2 gap-2">
          {countryOptions.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCountry(c)}
              className={cn(
                "h-10 rounded-lg border text-sm transition-colors",
                country === c
                  ? "border-primary bg-primary/10 text-primary font-medium"
                  : "border-border hover:border-primary/50",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Transport */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Primary Transport</h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {transportOptions.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTransport(t.value)}
              className={cn(
                "h-10 rounded-lg border text-sm transition-colors",
                transport === t.value
                  ? "border-primary bg-primary/10 text-primary font-medium"
                  : "border-border hover:border-primary/50",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Diet */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Diet Preference</h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {dietOptions.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => setDiet(d.value)}
              className={cn(
                "h-10 rounded-lg border text-sm transition-colors",
                diet === d.value
                  ? "border-primary bg-primary/10 text-primary font-medium"
                  : "border-border hover:border-primary/50",
              )}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      {saved && (
        <p className="text-sm text-green-600 dark:text-green-400">
          Settings saved.
        </p>
      )}

      <Button
        className="w-full"
        size="lg"
        onClick={handleSave}
        disabled={updateProfile.isPending}
      >
        {updateProfile.isPending ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}
