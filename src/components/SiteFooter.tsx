import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <div className="site-footer__logo">
            Side<span>Hustle</span>Hub
          </div>
          <p className="site-footer__tagline">
            A focused marketplace for side work — Manchester roots, open to
            everyone.
          </p>
        </div>

        <div className="site-footer__columns">
          <div className="site-footer__col">
            <h3 className="site-footer__heading">Explore</h3>
            <ul className="site-footer__list">
              <li>
                <Link href="/jobs">Browse jobs</Link>
              </li>
              <li>
                <Link href="/services">Browse services</Link>
              </li>
              <li>
                <Link href="/jobs/new">Post a job</Link>
              </li>
            </ul>
          </div>
          <div className="site-footer__col">
            <h3 className="site-footer__heading">Account</h3>
            <ul className="site-footer__list">
              <li>
                <Link href="/sign-in">Sign in</Link>
              </li>
              <li>
                <Link href="/sign-up">Create account</Link>
              </li>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="site-footer__legal">
        © {year} SideHustleHub. All rights reserved.
      </p>
    </footer>
  );
}
