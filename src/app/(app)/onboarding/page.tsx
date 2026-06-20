import { OnboardingForm } from "@/components/onboarding-form";

export const dynamic = "force-dynamic";

export default function OnboardingPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Personalize Your Experience
          </h1>
          <p className="text-muted-foreground">
            Help us tailor EcoLoop to your lifestyle.
          </p>
        </div>
        <OnboardingForm />
      </div>
    </div>
  );
}
