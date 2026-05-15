"use client";

import { Show } from "@clerk/nextjs";
import Link from "next/link";

export function HomeClosingCta() {
  return (
    <section className="home-cta-block" aria-labelledby="cta-heading">
      <div className="home-cta-block__inner">
        <div className="home-cta-block__copy">
          <p className="home-cta-block__eyebrow">Next step</p>
          <h2 id="cta-heading" className="home-cta-block__title">
            Ready to open your next opportunity?
          </h2>
          <Show when="signed-out">
            <p className="home-cta-block__lead">
              Join SideHustleHub and start posting or picking up work in minutes.
            </p>
          </Show>
          <Show when="signed-in">
            <p className="home-cta-block__lead">
              You&apos;re in — jump to your dashboard or keep browsing the
              marketplace.
            </p>
          </Show>
        </div>
        <div className="home-cta-block__actions">
          <Show when="signed-out">
            <>
              <Link
                href="/sign-up"
                className="btn btn-primary btn-lg home-cta-block__btn-primary"
              >
                Create free account
              </Link>
              <Link
                href="/sign-in"
                className="btn btn-secondary btn-lg home-cta-block__btn-secondary"
              >
                Sign in
              </Link>
            </>
          </Show>
          <Show when="signed-in">
            <>
              <Link
                href="/dashboard"
                className="btn btn-primary btn-lg home-cta-block__btn-primary"
              >
                Dashboard
              </Link>
              <Link
                href="/jobs"
                className="btn btn-secondary btn-lg home-cta-block__btn-secondary"
              >
                Browse jobs
              </Link>
            </>
          </Show>
        </div>
      </div>
    </section>
  );
}
