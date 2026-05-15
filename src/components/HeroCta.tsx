"use client";

import { Show } from "@clerk/nextjs";
import Link from "next/link";

export function HeroCta() {
  return (
  <>
      <Show when="signed-out">
        <div className="hero-cta">
          <Link href="/sign-up" className="btn btn-primary btn-lg">
            Create free account
          </Link>
          <Link href="/sign-in" className="btn btn-secondary btn-lg">
            Sign in
          </Link>
        </div>
        <p className="form-note">
          Free to join. Post gigs or pick up hustles in minutes.
        </p>
      </Show>
      <Show when="signed-in">
        <div className="hero-cta">
          <Link href="/dashboard" className="btn btn-primary btn-lg">
            Go to dashboard
          </Link>
        </div>
        <p className="form-note">You&apos;re signed in. Head to your dashboard to get started.</p>
      </Show>
    </>
  );
}
