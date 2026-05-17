import Link from "next/link";
import { formatJobPay, formatPay } from "@/lib/jobs/format";
import { jobsStore } from "@/lib/jobs/store";

type ListingRow = {
  kind: "job" | "service";
  id: string;
  title: string;
  sub: string;
  meta: string;
};

function buildRows(): ListingRow[] {
  const openJobs = jobsStore.listJobs({ status: "open", sort: "newest" });
  const services = jobsStore.listServices({});

  const rows: ListingRow[] = [];

  if (openJobs[0]) {
    const j = openJobs[0];
    rows.push({
      kind: "job",
      id: j.id,
      title: j.title,
      sub: `${j.category} · ${j.location}`,
      meta: formatJobPay(j),
    });
  }
  if (services[0]) {
    const s = services[0];
    rows.push({
      kind: "service",
      id: s.id,
      title: s.title,
      sub: s.category,
      meta: formatPay("fixed", s.price),
    });
  }
  if (openJobs[1]) {
    const j = openJobs[1];
    rows.push({
      kind: "job",
      id: j.id,
      title: j.title,
      sub: `${j.category} · ${j.location}`,
      meta: formatJobPay(j),
    });
  }

  return rows;
}

function listingHref(row: ListingRow) {
  return row.kind === "job" ? `/jobs/${row.id}` : `/services/${row.id}`;
}

/** Compact snapshot for signed-in home hero only (guests use HomeHeroSpotlight + hub). */
export async function HomeMarketPreview() {
  const rows = buildRows();
  const empty = rows.length === 0;

  return (
    <div className="home-preview home-preview--workspace">
      <div className="home-preview__header">
        <span className="home-preview__label">Quick snapshot</span>
        <Link href="/jobs" className="home-preview__pill home-preview__pill--link">
          Open board
        </Link>
      </div>
      <ul className="home-preview__list">
        {rows.map((row, i) => (
          <li key={`${row.kind}-${row.id}-${i}`}>
            <span className="home-preview__tag">
              {row.kind === "job" ? "Job" : "Service"}
            </span>
            <Link href={listingHref(row)} className="home-preview__link">
              <span className="home-preview__copy">{row.title}</span>
              <span className="home-preview__sub">{row.sub}</span>
            </Link>
            <span className="home-preview__meta">{row.meta}</span>
          </li>
        ))}
      </ul>
      <p className="home-preview__footnote">
        {empty ? (
          <>
            Nothing live yet —{" "}
            <Link href="/jobs/new" className="home-preview__inline-link">
              post a job
            </Link>{" "}
            or{" "}
            <Link href="/services/new" className="home-preview__inline-link">
              list a service
            </Link>
            .
          </>
        ) : (
          <>
            <Link href="/jobs" className="home-preview__inline-link">
              Browse all jobs
            </Link>
            {" · "}
            <Link href="/services" className="home-preview__inline-link">
              all services
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
