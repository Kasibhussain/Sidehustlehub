"use client";

import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { clerkAppearance } from "@/lib/clerk-appearance";

/** After auth, jobs are the hub (browse + post); dashboard stays one click away. */
const JOBS_HUB = "/jobs";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={clerkAppearance}
      signUpForceRedirectUrl={JOBS_HUB}
      signInFallbackRedirectUrl={JOBS_HUB}
    >
      <ThemeProvider>{children}</ThemeProvider>
    </ClerkProvider>
  );
}
