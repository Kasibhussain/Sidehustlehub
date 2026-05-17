import { SignUp } from "@clerk/nextjs";
import { AuthShell } from "@/components/AuthShell";
import { clerkAppearance } from "@/lib/clerk-appearance";

export default function SignUpPage() {
  return (
    <AuthShell
      title="Join the hustle"
      subtitle="Create your account to post gigs, find work, and build your reputation."
    >
      <SignUp appearance={clerkAppearance} forceRedirectUrl="/jobs" />
    </AuthShell>
  );
}
