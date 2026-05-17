import Link from "next/link";

type HomeListingCompactProps = {
  kind: "job" | "service";
  id: string;
  title: string;
  sub: string;
  pay: string;
};

export function HomeListingCompact({
  kind,
  id,
  title,
  sub,
  pay,
}: HomeListingCompactProps) {
  const href = kind === "job" ? `/jobs/${id}` : `/services/${id}`;
  const initial = title.trim().charAt(0).toUpperCase() || (kind === "job" ? "J" : "S");

  return (
    <li className="home-hub-card">
      <Link href={href} className="home-hub-card__link">
        <span
          className={`home-hub-card__icon home-hub-card__icon--${kind}`}
          aria-hidden
        >
          {initial}
        </span>
        <span className="home-hub-card__body">
          <span className="home-hub-card__title">{title}</span>
          <span className="home-hub-card__sub">{sub}</span>
        </span>
        <span className="home-hub-card__pay">{pay}</span>
        <span className="home-hub-card__chev" aria-hidden>
          →
        </span>
      </Link>
    </li>
  );
}
