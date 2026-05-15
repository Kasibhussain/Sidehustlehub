import type { NextConfig } from "next";

const clerkEnvVars = [
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  "CLERK_SECRET_KEY",
] as const;

/** Fail Vercel builds early if Clerk keys are missing (avoids MIDDLEWARE_INVOCATION_FAILED). */
if (process.env.VERCEL) {
  const missing = clerkEnvVars.filter((key) => !process.env[key]?.trim());
  if (missing.length > 0) {
    throw new Error(
      `Missing Clerk environment variables on Vercel: ${missing.join(", ")}. ` +
        "Add them under Project Settings → Environment Variables for Production, Preview, and Development, then redeploy.",
    );
  }
}

const nextConfig: NextConfig = {};

export default nextConfig;
