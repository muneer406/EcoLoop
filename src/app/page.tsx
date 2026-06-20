import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Cloud,
  Zap,
  TrendingDown,
} from "lucide-react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const params = await searchParams;

  // Handle OAuth code on root (Vercel redirect mismatch)
  if (params.code) {
    redirect(`/auth/callback?code=${params.code}`);
  }
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="min-h-[100dvh] flex flex-col items-center justify-center px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 via-background to-background -z-10" />

        <div className="text-center space-y-6 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            See What Your Carbon
            <br />
            <span className="text-primary">Can&apos;t Hide</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto sm:text-xl">
            Know your carbon. Build the habit. See the change.
            EcoLoop reveals your invisible environmental impact
            and helps you reduce it — one day at a time.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/80 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium hover:bg-muted transition-colors"
            >
              View Demo
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="animate-bounce opacity-40">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Just describe your day. EcoLoop handles the rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              step="1"
              title="Log Your Day"
              description='Type naturally. "I drove 12km, ate a burger, and used AC for 6 hours."'
            />
            <StepCard
              step="2"
              title="See Your Impact"
              description="AI extracts activities. Our engine calculates your carbon footprint instantly."
            />
            <StepCard
              step="3"
              title="Build The Habit"
              description="Get one personalized micro-action each day to reduce your emissions."
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto space-y-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-4">
              <Cloud className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold">Understand</h3>
              <p className="text-muted-foreground">
                See exactly where your emissions come from. No forms. No
                spreadsheets. Just natural language transformed into clear
                insights.
              </p>
            </div>
            <div className="rounded-2xl border bg-card p-6 space-y-3">
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-3/4 rounded-full bg-blue-500" />
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>Transport · 2.3 kg</span>
                  <span>42%</span>
                </div>
                <div className="flex justify-between">
                  <span>Food · 4.1 kg</span>
                  <span>35%</span>
                </div>
                <div className="flex justify-between">
                  <span>Energy · 4.8 kg</span>
                  <span>23%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="rounded-2xl border bg-card p-6 order-2 md:order-1">
              <div className="flex items-end gap-2 h-32">
                {[40, 55, 30, 70, 45, 60, 80].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-primary/30"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                This week
              </p>
            </div>
            <div className="space-y-4 order-1 md:order-2">
              <TrendingDown className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold">Track</h3>
              <p className="text-muted-foreground">
                Watch your progress over time. Compare against the global
                average and Paris Agreement targets to stay motivated.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-4">
              <Zap className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold">Reduce</h3>
              <p className="text-muted-foreground">
                Every day you get one achievable micro-action tailored to your
                biggest emission source. Small changes compound into real
                impact.
              </p>
            </div>
            <div className="rounded-2xl border bg-card p-6 space-y-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Daily Micro-Action
              </p>
              <p className="font-semibold">Swap beef for chicken today</p>
              <p className="text-sm text-muted-foreground">
                Replace one beef meal with chicken to save ~3kg CO₂
              </p>
              <span className="inline-flex h-8 items-center justify-center rounded-lg border border-border px-3 text-xs font-medium">
                Done
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to See Your Impact?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join EcoLoop and start understanding, tracking, and reducing your
            carbon footprint today.
          </p>
          <Link
            href="/login"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground hover:bg-primary/80 transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-2">EcoLoop</p>
          <p>Know your carbon. Build the habit. See the change.</p>
        </div>
      </footer>
    </div>
  );
}

function StepCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-6 space-y-3 text-center">
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">
        {step}
      </span>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
