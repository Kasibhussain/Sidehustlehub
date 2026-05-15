"use client";

import { Show } from "@clerk/nextjs";
import Link from "next/link";

export function HeroCta() {
  return (
    <>
      <Show when="signed-out">
        <div className="home-hero__ctas">
          <Link href="/sign-up" className="btn btn-primary btn-lg">
            Create free account
          </Link>
          <Link href="/sign-in" className="btn btn-secondary btn-lg">
            Sign in
          </Link>
        </div>
        <p className="home-hero__note">
          No credit card required. Post jobs, apply, and list services after you
          sign in.
        </p>
      </Show>
      <Show when="signed-in">
        <div className="home-hero__ctas">
          <Link href="/dashboard" className="btn btn-primary btn-lg">
            Dashboard
          </Link>
          <Link href="/jobs" className="btn btn-secondary btn-lg">
            Jobs
          </Link>
          <Link href="/services" className="btn btn-secondary btn-lg">
            Services
          </Link>
        </div>
        <p className="home-hero__note">
          You&apos;re signed in — head to your dashboard to manage posts and
          applications.
        </p>
      </Show>
    </>
  );
}
