import { ServiceCard } from "@/components/services/ServiceCard";
import { ServiceFilters } from "@/components/services/ServiceFilters";
import { PageShell } from "@/components/layout/PageShell";
import { getSession } from "@/lib/session";
import { jobsStore } from "@/lib/jobs/store";
import { parseServicesUrl } from "@/lib/jobs/serviceSearchHref";
import Link from "next/link";

type SearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const spRaw = await searchParams;
  const urlState = parseServicesUrl(spRaw);
  const session = await getSession();

  const services = jobsStore.listServices({
    category: urlState.category,
    subcategory: urlState.subcategory,
    search: urlState.q,
  });

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
        {urlState.category && (
          <input type="hidden" name="category" value={urlState.category} />
        )}
        {urlState.subcategory && (
          <input type="hidden" name="subcategory" value={urlState.subcategory} />
        )}
        <label className="form-field jobs-search-field">
          <span className="sr-only">Search services</span>
          <input
            name="q"
            type="search"
            placeholder="Search titles and descriptions…"
            defaultValue={urlState.q ?? ""}
            className="jobs-search-input"
          />
        </label>
        <button type="submit" className="btn btn-secondary">
          Search
        </button>
      </form>

      <ServiceFilters state={urlState} />

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
