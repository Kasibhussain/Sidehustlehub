import { HeroCta } from "@/components/HeroCta";
import { SiteFooter } from "@/components/SiteFooter";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="glow" />
      <div className="glow glow-left" />
      <section className="hero">
        <div className="eyebrow">Marketplace for side hustles</div>
        <h1>
          Find your
          <br />
          <em>next hustle.</em>
          <span className="line2">Or get it done.</span>
        </h1>
        <p className="hero-sub">
          Post gigs, pick up work, and connect directly — no middlemen. Sign up
          free and start building your profile today.
        </p>
        <HeroCta />
      </section>

      <div className="stats">
        <div className="stat">
          <div className="stat-num">Free</div>
          <div className="stat-label">Create an account in seconds</div>
        </div>
        <div className="stat">
          <div className="stat-num">2-sided</div>
          <div className="stat-label">Post gigs or complete them</div>
        </div>
        <div className="stat">
          <div className="stat-num">MCR</div>
          <div className="stat-label">Built in Manchester</div>
        </div>
      </div>

      <section className="section">
        <div className="section-label">How it works</div>
        <div className="cards">
          <div className="card">
            <div className="card-num">01</div>
            <h3>Create your account</h3>
            <p>
              <Link href="/sign-up">Sign up</Link> as a hustler, poster, or
              both. Your profile travels with every gig you take or post.
            </p>
          </div>
          <div className="card">
            <div className="card-num">02</div>
            <h3>Post or browse</h3>
            <p>
              Need something done? Post it. Looking for work? Browse available
              gigs in your area or remotely.
            </p>
          </div>
          <div className="card">
            <div className="card-num">03</div>
            <h3>Get it done</h3>
            <p>
              Connect directly, agree on terms, complete the work, and build
              your reputation with every hustle.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-cta">
        <div className="cta-panel">
          <div>
            <p className="eyebrow cta-eyebrow">Ready?</p>
            <h2 className="cta-title">Start your next hustle today</h2>
            <p className="cta-sub">
              Join hustlers and posters getting started on SideHustleHub.
            </p>
          </div>
          <div className="cta-actions">
            <Link href="/sign-up" className="btn btn-primary btn-lg">
              Get started free
            </Link>
            <Link href="/sign-in" className="btn btn-secondary btn-lg">
              I have an account
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-label">Who it&apos;s for</div>
        <div className="two-sides">
          <div className="side hustler">
            <div className="side-tag">Hustlers</div>
            <h3>Pick up gigs on your schedule</h3>
            <p>
              Earn on your terms. Whether it&apos;s a one-off job or recurring
              work, find opportunities that fit around your life.
            </p>
            <Link href="/sign-up" className="side-link">
              Join as a hustler →
            </Link>
          </div>
          <div className="side poster">
            <div className="side-tag">Posters</div>
            <h3>Get things done without the hassle</h3>
            <p>
              From odd jobs to skilled work — post what you need and connect
              with reliable people ready to help.
            </p>
            <Link href="/sign-up" className="side-link side-link-warm">
              Join as a poster →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
