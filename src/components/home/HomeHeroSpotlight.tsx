import Link from "next/link";

/** Static hero card for guests — points to the live hub below (no duplicate listings). */
export function HomeHeroSpotlight() {
  return (
    <aside className="home-spotlight" aria-label="What you get on SideHustleHub">
      <ul className="home-spotlight__list">
        <li className="home-spotlight__item">
          <span className="home-spotlight__icon home-spotlight__icon--jobs" aria-hidden>
            J
          </span>
          <span className="home-spotlight__copy">
            <strong>Job board</strong>
            <span>Open roles with pay, location, and briefs in plain view.</span>
          </span>
        </li>
        <li className="home-spotlight__item">
          <span className="home-spotlight__icon home-spotlight__icon--services" aria-hidden>
            S
          </span>
          <span className="home-spotlight__copy">
            <strong>Service listings</strong>
            <span>Fixed-price packages from people ready to deliver.</span>
          </span>
        </li>
        <li className="home-spotlight__item">
          <span className="home-spotlight__icon home-spotlight__icon--direct" aria-hidden>
            %
          </span>
          <span className="home-spotlight__copy">
            <strong>Direct deals</strong>
            <span>No platform cut on the handshake — you keep the margin.</span>
          </span>
        </li>
      </ul>
      <Link href="#marketplace" className="home-spotlight__cta">
        See what&apos;s live on the board →
      </Link>
    </aside>
  );
}
