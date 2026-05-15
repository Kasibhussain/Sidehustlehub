import { HeroCta } from "@/components/HeroCta";
import { HomeClosingCta } from "@/components/HomeClosingCta";
import { SiteFooter } from "@/components/SiteFooter";
import Link from "next/link";

export default function Home() {
  return (
    <main className="home">
      <div className="glow" aria-hidden />
      <div className="glow glow-left" aria-hidden />

      <section className="home-hero" aria-labelledby="home-hero-heading">
        <div className="home-hero__grid">
          <div className="home-hero__copy home-reveal">
            <p className="home-eyebrow">Side work marketplace</p>
            <h1 id="home-hero-heading" className="home-hero__title">
              Hire skill.{" "}
              <span className="home-hero__title-accent">Pick up work.</span>{" "}
              Skip the noise.
            </h1>
            <p className="home-hero__lead">
              Post jobs, list fixed-price services, and connect with hustlers
              directly. Clear briefs, transparent budgets, and a workflow built
              for people who treat side work like real work.
            </p>
            <HeroCta />
            <nav className="home-hero__quick" aria-label="Explore marketplace">
              <Link href="/jobs" className="home-hero__quick-link">
                Browse open jobs
              </Link>
              <span className="home-hero__quick-divider" aria-hidden>
                ·
              </span>
              <Link href="/services" className="home-hero__quick-link">
                Browse services
              </Link>
            </nav>
          </div>

          <aside className="home-hero__panel home-reveal home-reveal--delay" aria-hidden>
            <div className="home-preview">
              <div className="home-preview__header">
                <span className="home-preview__label">Live activity</span>
                <span className="home-preview__pill">Open gigs</span>
              </div>
              <ul className="home-preview__list">
                <li>
                  <span className="home-preview__tag">Job</span>
                  <span className="home-preview__copy">
                    Flat-pack assembly · Manchester
                  </span>
                  <span className="home-preview__meta">£85 fixed</span>
                </li>
                <li>
                  <span className="home-preview__tag">Service</span>
                  <span className="home-preview__copy">
                    Logo concepts (3) · Design
                  </span>
                  <span className="home-preview__meta">£120</span>
                </li>
                <li>
                  <span className="home-preview__tag">Job</span>
                  <span className="home-preview__copy">
                    Weekend flyer drop · City centre
                  </span>
                  <span className="home-preview__meta">£60–£80</span>
                </li>
              </ul>
              <p className="home-preview__footnote">
                Illustrative examples — your hub populates as members post real
                work.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="home-trust" aria-label="Why use SideHustleHub">
        <ul className="home-trust__grid">
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

      <section className="home-section" aria-labelledby="how-heading">
        <div className="home-section__intro">
          <h2 id="how-heading" className="home-section__title">
            How it works
          </h2>
          <p className="home-section__subtitle">
            Three straightforward steps from account to outcome — whether
            you&apos;re buying or selling time.
          </p>
        </div>
        <ol className="home-steps">
          <li className="home-step">
            <span className="home-step__num">01</span>
            <h3 className="home-step__title">Create your account</h3>
            <p className="home-step__body">
              <Link href="/sign-up">Sign up</Link> in moments. Use one profile
              to post jobs, apply to gigs, list services, and build visibility.
            </p>
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
        className="home-section home-audience"
        aria-labelledby="audience-heading"
      >
        <div className="home-section__intro">
          <h2 id="audience-heading" className="home-section__title">
            Built for both sides of the marketplace
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
