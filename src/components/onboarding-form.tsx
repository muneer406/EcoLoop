"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc-client";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const countries = [
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

export function OnboardingForm() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const createProfile = trpc.profile.create.useMutation();

  const [step, setStep] = useState(0);
  const [country, setCountry] = useState("");
  const [transport, setTransport] = useState("");
  const [diet, setDiet] = useState("");

  const handleSubmit = async () => {
    if (!user?.email) return;

    try {
      await createProfile.mutateAsync({
        display_name: user.email.split("@")[0] ?? "User",
        country: country || "Other",
        transport_mode: (transport || "mixed") as
          | "car"
          | "public_transport"
          | "bike"
          | "walk"
          | "mixed",
        diet: (diet || "omnivore") as
          | "vegan"
          | "vegetarian"
          | "pescatarian"
          | "omnivore"
          | "heavy_meat",
      });
      router.push("/chat");
      router.refresh();
    } catch {
      // Retry silently
    }
  };

  const selectStyle = (selected: boolean) =>
    cn(
      "w-full h-14 rounded-xl border text-sm font-medium transition-all",
      selected
        ? "border-primary bg-primary/10 text-primary"
        : "border-border bg-card hover:border-primary/50",
    );

  return (
    <div className="space-y-6">
      {step === 0 && (
        <div className="space-y-4" role="group" aria-label="Select country">
          <p className="text-sm font-medium">
            Where are you based?
          </p>
          <div className="grid gap-2">
            {countries.map((c) => (
              <button
                key={c}
                type="button"
                className={selectStyle(country === c)}
                onClick={() => {
                  setCountry(c);
                  setStep(1);
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4" role="group" aria-label="Select transport">
          <p className="text-sm font-medium">
            How do you usually get around?
          </p>
          <div className="grid gap-2">
            {transportOptions.map((t) => (
              <button
                key={t.value}
                type="button"
                className={selectStyle(transport === t.value)}
                onClick={() => {
                  setTransport(t.value);
                  setStep(2);
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4" role="group" aria-label="Select diet">
          <p className="text-sm font-medium">
            What best describes your diet?
          </p>
          <div className="grid gap-2">
            {dietOptions.map((d) => (
              <button
                key={d.value}
                type="button"
                className={selectStyle(diet === d.value)}
                onClick={() => {
                  setDiet(d.value);
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
          <Button
            className="w-full mt-4"
            size="lg"
            disabled={!diet || createProfile.isPending}
            onClick={handleSubmit}
          >
            {createProfile.isPending ? "Saving..." : "Get Started"}
          </Button>
        </div>
      )}

      {step > 0 && (
        <button
          type="button"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setStep(step - 1)}
        >
          Back
        </button>
      )}
    </div>
  );
}
