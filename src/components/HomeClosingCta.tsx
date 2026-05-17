"use client";

import { Show, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export function HomeClosingCta() {
  const { isSignedIn, isLoaded } = useAuth();
  const workspace = Boolean(isLoaded && isSignedIn);

  return (
    <section
      className={`home-cta-block ${
        workspace ? "home-cta-block--workspace" : "home-cta-block--guest"
      }`}
      aria-labelledby="cta-heading"
    >
      <div
        className={`home-cta-block__inner ${
          workspace
            ? "home-cta-block__inner--workspace"
            : "home-cta-block__inner--guest"
        }`}
      >
        <div className="home-cta-block__copy">
          <p className="home-cta-block__eyebrow">
            {workspace ? "While you’re here" : "Next step"}
          </p>
          <Show when="signed-out">
            <h2 id="cta-heading" className="home-cta-block__title">
              Ready to open your{" "}
              <span className="home-cta-block__title-highlight">
                next opportunity
              </span>
              ?
            </h2>
          </Show>
          <Show when="signed-in">
            <h2 id="cta-heading" className="home-cta-block__title">
              What do you want to{" "}
              <span className="home-cta-block__title-highlight">do next</span>?
            </h2>
          </Show>
          <Show when="signed-out">
            <p className="home-cta-block__lead">
              Join SideHustleHub and start posting or picking up work in minutes.
            </p>
          </Show>
          <Show when="signed-in">
            <ol className="home-cta-block__flow">
              <li>
                <strong>Open jobs.</strong> The job board is home after you sign
                in — browse open roles, save shortlists, and apply in a few taps.
              </li>
              <li>
                <strong>Post or list.</strong> Need help? Post a job from the
                board or your dashboard; sell packaged work as a service when
                it fits.
              </li>
              <li>
                <strong>Review and ship.</strong> Posters read applicants on each
                listing; everyone aligns on scope, delivers, and keeps a paper
                trail here.
              </li>
            </ol>
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
                href="/jobs"
                className="btn btn-primary btn-lg home-cta-block__btn-primary home-cta-block__btn-primary--workspace"
              >
                Browse jobs
              </Link>
              <Link
                href="/dashboard"
                className="btn btn-secondary btn-lg home-cta-block__btn-secondary home-cta-block__btn-secondary--workspace"
              >
                Dashboard
              </Link>
              <Link
                href="/jobs/new"
                className="btn btn-secondary btn-lg home-cta-block__btn-secondary home-cta-block__btn-secondary--workspace"
              >
                Post a job
              </Link>
            </>
          </Show>
        </div>
      </div>
    </section>
  );
}
