import { ServiceCard } from "@/components/services/ServiceCard";
import { PageShell } from "@/components/layout/PageShell";
import { getSession } from "@/lib/session";
import { jobsStore } from "@/lib/jobs/store";
import { JOB_CATEGORIES } from "@/lib/jobs/constants";
import Link from "next/link";

type SearchParams = Promise<{ category?: string; q?: string }>;

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const session = await getSession();
  const category =
    sp.category && JOB_CATEGORIES.includes(sp.category as (typeof JOB_CATEGORIES)[number])
      ? sp.category
      : undefined;
  const q = sp.q?.trim() || undefined;

  const services = jobsStore.listServices({ category, search: q });

  return (
    <PageShell>
      <div className="page-header">
        <p className="eyebrow page-eyebrow">Services</p>
        <h1>Fixed-price offers</h1>
        <p className="page-lead">
          Browse what other hustlers are selling — like a mini Fiverr inside the hub.
        </p>
        <div className="page-actions">
          {session ? (
            <Link href="/services/new" className="btn btn-primary">
              List a service
            </Link>
          ) : (
            <Link href="/sign-in" className="btn btn-primary">
              Sign in to list
            </Link>
          )}
          <Link href="/jobs" className="btn btn-secondary">
            Browse jobs
          </Link>
        </div>
      </div>

      <form className="jobs-search" method="get" action="/services">
        <label className="form-field jobs-search-field">
          <span className="sr-only">Search services</span>
          <input
            name="q"
            type="search"
            placeholder="Search titles and descriptions…"
            defaultValue={q ?? ""}
            className="jobs-search-input"
          />
        </label>
        {category && <input type="hidden" name="category" value={category} />}
        <button type="submit" className="btn btn-secondary">
          Search
        </button>
      </form>

      <div className="job-filters">
        <Link
          href="/services"
          className={`filter-pill${!category ? " filter-pill-active" : ""}`}
        >
          All
        </Link>
        {JOB_CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/services?category=${encodeURIComponent(cat)}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
            className={`filter-pill${category === cat ? " filter-pill-active" : ""}`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {services.length === 0 ? (
        <div className="empty-state">
          <h3>No services match</h3>
          <p>Try another category or list your own.</p>
          <Link href="/services/new" className="btn btn-primary">
            List a service
          </Link>
        </div>
      ) : (
        <div className="job-grid">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      )}
    </PageShell>
  );
}
