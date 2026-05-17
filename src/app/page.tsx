import { HeroCta } from "@/components/HeroCta";
import { HomeHeroSpotlight } from "@/components/home/HomeHeroSpotlight";
import { HomeMarketplaceHub } from "@/components/home/HomeMarketplaceHub";
import { HomeClosingCta } from "@/components/HomeClosingCta";
import { HomeMarketPreview } from "@/components/HomeMarketPreview";
import { SiteFooter } from "@/components/SiteFooter";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const signedIn = Boolean(userId);

  return (
    <main
      id="main-content"
      className={`home ${signedIn ? "home--workspace" : "home--guest"}`}
    >
      {signedIn && (
        <>
          <div className="glow" aria-hidden />
          <div className="glow glow-left" aria-hidden />
        </>
      )}

      <section
        className={`home-hero${signedIn ? "" : " home-hero--jumbotron"}`}
        aria-labelledby="home-hero-heading"
      >
        {!signedIn && (
          <>
            <div className="home-jumbotron__fx" aria-hidden>
              <div className="home-jumbotron__gradient" />
              <div className="home-jumbotron__grid" />
            </div>
            <div className="home-jumbotron__overlay" aria-hidden />
          </>
        )}
        <div
          className={`home-hero__grid${signedIn ? "" : " home-hero__grid--jumbotron"}`}
        >
          <div
            className={`home-hero__copy ${
              signedIn
                ? "home-reveal home-hero__copy--workspace"
                : "home-hero__copy--guest home-jumbotron__stagger--1"
            }`}
          >
            {signedIn ? (
              <p className="home-eyebrow home-eyebrow--workspace">
                <span className="home-eyebrow__pulse" aria-hidden />
                <span className="home-eyebrow__label">Your hub</span>
              </p>
            ) : (
              <p className="home-eyebrow home-eyebrow--guest">
                Jobs · Services · Direct
              </p>
            )}
            {signedIn ? (
              <h1 id="home-hero-heading" className="home-hero__title">
                Hire skill.{" "}
                <span className="home-hero__title-accent">Pick up work.</span>{" "}
                Skip the noise.
              </h1>
            ) : (
              <h1 id="home-hero-heading" className="home-hero__title home-hero__title--guest">
                <span className="home-hero__guest-line home-hero__guest-line--1">
                  Hire skill.
                </span>
                <span className="home-hero__guest-line home-hero__guest-line--2">
                  <span className="home-hero__title-accent home-hero__title-accent--guest">
                    Pick up work.
                  </span>
                  <span className="home-hero__guest-line--muted"> Skip the noise.</span>
                </span>
              </h1>
            )}
            <p className="home-hero__lead">
              {signedIn
                ? "Post, browse, and track everything from one place — the hero actions below are your fastest path into the hub."
                : "Post roles or list packages, browse live listings, and move fast with budgets and briefs in plain view."}
            </p>
            <HeroCta />
            {signedIn && (
              <nav
                className="home-hero__quick home-hero__quick--workspace"
                aria-label="Post or browse marketplace"
              >
                <Link href="/jobs/new" className="home-hero__quick-link">
                  Post a job
                </Link>
                <span className="home-hero__quick-divider" aria-hidden>
                  ·
                </span>
                <Link href="/jobs" className="home-hero__quick-link">
                  Browse open jobs
                </Link>
                <span className="home-hero__quick-divider" aria-hidden>
                  ·
                </span>
                <Link href="/services/new" className="home-hero__quick-link">
                  List a service
                </Link>
                <span className="home-hero__quick-divider" aria-hidden>
                  ·
                </span>
                <Link href="/services" className="home-hero__quick-link">
                  Browse services
                </Link>
              </nav>
            )}
          </div>

          {signedIn ? (
            <aside
              className="home-hero__panel home-reveal home-reveal--delay"
              aria-label="Quick snapshot of open listings"
            >
              <HomeMarketPreview />
            </aside>
          ) : (
            <aside
              className="home-hero__panel home-hero__panel--jumbotron home-jumbotron__stagger--2"
              aria-label="Platform overview"
            >
              <HomeHeroSpotlight />
            </aside>
          )}
        </div>
      </section>

      {!signedIn && <HomeMarketplaceHub signedIn={false} />}

      <section
        className="home-trust home-trust--platform"
        aria-labelledby="platform-trust-heading"
      >
        <h2 id="platform-trust-heading" className="home-trust__heading">
          Built for side-work marketplaces
        </h2>
        <ul className={`home-trust__grid${signedIn ? "" : " home-trust__grid--guest"}`}>
          <li>
            <strong>Direct relationships</strong>
            <span>Negotiate and deliver with no platform cut on the handshake.</span>
          </li>
          <li>
            <strong>Jobs + services</strong>
            <span>
              Post open roles or sell packaged work — one profile for both.
            </span>
          </li>
          <li>
            <strong>Built for clarity</strong>
            <span>Budget types, deadlines, and applications stay easy to scan.</span>
          </li>
        </ul>
      </section>

      <section className="home-section home-section--how" aria-labelledby="how-heading">
        <div className="home-section__intro">
          <p className="home-section__eyebrow">How it works</p>
          <h2 id="how-heading" className="home-section__title">
            From signup to paid gig
          </h2>
          <p className="home-section__subtitle">
            {signedIn
              ? "You’re past signup — here’s how the loop works whether you’re hiring or hustling."
              : "Three straightforward steps from account to outcome — whether you’re buying or selling time."}
          </p>
        </div>
        <ol className="home-steps">
          <li className="home-step">
            <span className="home-step__num">01</span>
            {signedIn ? (
              <>
                <h3 className="home-step__title">Start from your dashboard</h3>
                <p className="home-step__body">
                  Everything you run on SideHustleHub lives in one{" "}
                  <Link href="/dashboard">dashboard</Link>: jobs you post,
                  applications you send, saves, and services you sell. Update{" "}
                  <Link href="/profile">your profile</Link> so people know who
                  they&apos;re working with.
                </p>
              </>
            ) : (
              <>
                <h3 className="home-step__title">Create your account</h3>
                <p className="home-step__body">
                  <Link href="/sign-up">Sign up</Link> in moments. Use one
                  profile to post jobs, apply to gigs, list services, and build
                  visibility.
                </p>
              </>
            )}
          </li>
          <li className="home-step">
            <span className="home-step__num">02</span>
            <h3 className="home-step__title">Publish or discover</h3>
            <p className="home-step__body">
              Need help? <Link href="/jobs/new">Post a job</Link> with budget
              and timing. Looking for work?{" "}
              <Link href="/jobs">Browse jobs</Link> or{" "}
              <Link href="/services/new">list a fixed-price service</Link>.
            </p>
          </li>
          <li className="home-step">
            <span className="home-step__num">03</span>
            <h3 className="home-step__title">Agree and deliver</h3>
            <p className="home-step__body">
              Message, agree terms off-platform if you prefer, complete the
              work, and keep a record of every hustle you ship.
            </p>
          </li>
        </ol>
      </section>

      <section
        className={`home-section home-audience${signedIn ? "" : " home-audience--guest"}`}
        aria-labelledby="audience-heading"
      >
        <div className="home-section__intro">
          <p className="home-section__eyebrow">Two sides, one board</p>
          <h2 id="audience-heading" className="home-section__title">
            Hire or hustle on the same platform
          </h2>
          <p className="home-section__subtitle">
            Whether you&apos;re hiring or earning, the same tools keep
            expectations clear.
          </p>
        </div>
        <div className="home-audience__grid">
          <article className="home-audience__card">
            <p className="home-audience__label">For hustlers</p>
            <h3 className="home-audience__title">
              Find serious gigs on your schedule
            </h3>
            <p className="home-audience__body">
              Filter by category, urgency, and budget. Apply with a real message
              and optional quote when posters invite offers.
            </p>
            <Link href="/jobs" className="home-audience__link">
              Explore open jobs →
            </Link>
          </article>
          <article className="home-audience__card home-audience__card--alt">
            <p className="home-audience__label">For posters</p>
            <h3 className="home-audience__title">
              Brief clearly, review applicants fast
            </h3>
            <p className="home-audience__body">
              Post once, collect applications in one place, and accept the
              right person without losing track of messages.
            </p>
            <Link href="/jobs/new" className="home-audience__link">
              Post a job →
            </Link>
          </article>
        </div>
      </section>

      <HomeClosingCta />

      <SiteFooter />
    </main>
  );
}
