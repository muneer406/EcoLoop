import { LoginForm } from "@/components/login-form";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 overflow-y-auto">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">EcoLoop</h1>
          <p className="text-muted-foreground">
            Know your carbon. Build the habit. See the change.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
