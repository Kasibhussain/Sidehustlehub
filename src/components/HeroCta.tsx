"use client";

import { Show } from "@clerk/nextjs";
import Link from "next/link";
import { useTheme } from "@/components/theme/ThemeProvider";

export function HeroCta() {
  const { theme } = useTheme();

  return (
    <>
      <Show when="signed-out">
        <div className="home-hero__cta-slot home-hero__cta-slot--guest">
          <div className="home-hero__ctas home-hero__ctas--guest">
            <Link href="/sign-up" className="btn btn-primary btn-lg">
              Create free account
            </Link>
            <Link
              href="/jobs"
              className={`btn btn-lg ${
                theme === "dark" ? "btn-guest-shell-outline" : "btn-guest-outline"
              }`}
            >
              Browse open jobs
            </Link>
          </div>
          <p className="home-hero__guest-signin">
            <span>Already have an account?</span>{" "}
            <Link href="/sign-in" className="home-hero__guest-signin-link">
              Sign in
            </Link>
          </p>
          <p className="home-hero__note home-hero__note--guest">
            Free to join — after signup you land on open jobs so you see what&apos;s
            live.
          </p>
        </div>
      </Show>
      <Show when="signed-in">
        <div className="home-hero__cta-slot home-hero__cta-slot--workspace">
          <div className="home-hero__ctas home-hero__ctas--workspace">
            <Link href="/jobs" className="btn btn-primary btn-lg">
              Browse jobs
            </Link>
            <Link href="/jobs/new" className="btn btn-secondary btn-lg">
              Post a job
            </Link>
            <Link href="/dashboard" className="btn btn-secondary btn-lg">
              Dashboard
            </Link>
            <Link href="/services" className="btn btn-secondary btn-lg">
              Services
            </Link>
          </div>
          <p className="home-hero__note home-hero__note--workspace">
            Your <Link href="/dashboard">dashboard</Link> is home base: post jobs,
            list services, track applications, and see saves. Browse{" "}
            <Link href="/jobs">open jobs</Link> to apply, or open a listing you
            posted to read new applicants. Polish your{" "}
            <Link href="/profile">profile</Link> so both sides know who they&apos;re
            talking to.
          </p>
        </div>
      </Show>
    </>
  );
}
