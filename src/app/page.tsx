import { WaitlistForm } from "@/components/WaitlistForm";

export default function Home() {
  return (
    <>
      <div className="glow" />
      <nav>
        <div className="logo">
          Side<span>Hustle</span>Hub
        </div>
        <div className="nav-tag">Coming Soon</div>
      </nav>

      <section className="hero">
        <div className="eyebrow">Launching 2025</div>
        <h1>
          Find your
          <br />
          <em>next hustle.</em>
          <span className="line2">Or get it done.</span>
        </h1>
        <p className="hero-sub">
          The marketplace connecting people who want work done with people
          ready to do it. Post a gig, pick up a hustle — all in one place.
        </p>
        <WaitlistForm />
      </section>

      <div className="stats">
        <div className="stat">
          <div className="stat-num">100%</div>
          <div className="stat-label">Free to join</div>
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
            <h3>Post or browse</h3>
            <p>
              Need something done? Post it. Looking for work? Browse available
              gigs in your area or remotely.
            </p>
          </div>
          <div className="card">
            <div className="card-num">02</div>
            <h3>Connect directly</h3>
            <p>
              No middlemen. Connect with the right person, agree on the terms,
              and get moving fast.
            </p>
          </div>
          <div className="card">
            <div className="card-num">03</div>
            <h3>Get it done</h3>
            <p>
              Complete the work, get paid, build your reputation. Every hustle
              completed builds your profile.
            </p>
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
          </div>
          <div className="side poster">
            <div className="side-tag">Posters</div>
            <h3>Get things done without the hassle</h3>
            <p>
              From odd jobs to skilled work — post what you need and connect
              with reliable people ready to help.
            </p>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-logo">
          Side<span>Hustle</span>Hub
        </div>
        <p>© 2025 SideHustleHub. Built in Manchester.</p>
      </footer>
    </>
  );
}
