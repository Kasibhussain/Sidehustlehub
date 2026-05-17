import { SignIn } from "@clerk/nextjs";
import { AuthShell } from "@/components/AuthShell";
import { clerkAppearance } from "@/lib/clerk-appearance";

export default function SignInPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage your gigs, pick up hustles, and grow your profile."
    >
      <SignIn appearance={clerkAppearance} fallbackRedirectUrl="/jobs" />
    </AuthShell>
  );
}
