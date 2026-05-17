import Link from "next/link";
import { formatJobPay, formatPay } from "@/lib/jobs/format";
import { jobsHref } from "@/lib/jobs/jobSearchHref";
import { jobsStore } from "@/lib/jobs/store";
import { HomeListingCompact } from "./HomeListingCompact";

const FEATURED_CATEGORIES = [
  "Delivery & errands",
  "Cleaning",
  "Tech & web",
  "Creative",
  "Moving & lifting",
  "Events",
] as const;

export async function HomeMarketplaceHub({
  signedIn = false,
}: {
  signedIn?: boolean;
}) {
  const openJobs = jobsStore.listJobs({ status: "open", sort: "newest" });
  const services = jobsStore.listServices({});
  const jobPreview = openJobs.slice(0, 5);
  const servicePreview = services.slice(0, 5);

  return (
    <section
      id="marketplace"
      className="home-hub"
      aria-labelledby="home-hub-heading"
    >
      <div className="home-hub__shell">
        <header className="home-hub__header">
          <p className="home-hub__eyebrow">Live marketplace</p>
          <h2 id="home-hub-heading" className="home-hub__title">
            Open gigs &amp; services
          </h2>
          <p className="home-hub__lead">
            Real listings you can open now — filter by category or jump into
            jobs and services.
          </p>
        </header>

        <nav className="home-hub__categories" aria-label="Browse by category">
          {FEATURED_CATEGORIES.map((category) => (
            <Link
              key={category}
              href={jobsHref({}, { category })}
              className="home-hub__chip"
            >
              {category}
            </Link>
          ))}
          <Link href="/jobs" className="home-hub__chip home-hub__chip--all">
            All categories
          </Link>
        </nav>

        <div className="home-hub__boards">
          <article
            className="home-hub__board home-hub__board--jobs"
            aria-labelledby="home-hub-jobs-heading"
          >
            <header className="home-hub__board-header">
              <div className="home-hub__board-heading">
                <h3 id="home-hub-jobs-heading">Job board</h3>
                <p className="home-hub__board-meta">
                  {openJobs.length} open role{openJobs.length === 1 ? "" : "s"}
                </p>
              </div>
              <Link href="/jobs" className="home-hub__board-link">
                View all jobs
              </Link>
            </header>

            {jobPreview.length === 0 ? (
              <p className="home-hub__empty">
                No open jobs yet.{" "}
                {signedIn ? (
                  <Link href="/jobs/new">Post the first role</Link>
                ) : (
                  <Link href="/sign-up">Sign up to post</Link>
                )}
                .
              </p>
            ) : (
              <ul className="home-hub__list">
                {jobPreview.map((job) => (
                  <HomeListingCompact
                    key={job.id}
                    kind="job"
                    id={job.id}
                    title={job.title}
                    sub={`${job.category}${job.subcategory ? ` · ${job.subcategory}` : ""} · ${job.location}`}
                    pay={formatJobPay(job)}
                  />
                ))}
              </ul>
            )}

            <footer className="home-hub__board-footer">
              {signedIn ? (
                <Link href="/jobs/new" className="home-hub__board-cta">
                  Post a job →
                </Link>
              ) : (
                <Link href="/sign-up" className="home-hub__board-cta">
                  Sign up to post a job →
                </Link>
              )}
            </footer>
          </article>

          <article
            className="home-hub__board home-hub__board--services"
            aria-labelledby="home-hub-services-heading"
          >
            <header className="home-hub__board-header">
              <div className="home-hub__board-heading">
                <h3 id="home-hub-services-heading">Service listings</h3>
                <p className="home-hub__board-meta">
                  {services.length} package{services.length === 1 ? "" : "s"}
                </p>
              </div>
              <Link href="/services" className="home-hub__board-link">
                View all services
              </Link>
            </header>

            {servicePreview.length === 0 ? (
              <p className="home-hub__empty">
                No services listed yet.{" "}
                {signedIn ? (
                  <Link href="/services/new">List your first package</Link>
                ) : (
                  <Link href="/sign-up">Sign up to list</Link>
                )}
                .
              </p>
            ) : (
              <ul className="home-hub__list">
                {servicePreview.map((service) => (
                  <HomeListingCompact
                    key={service.id}
                    kind="service"
                    id={service.id}
                    title={service.title}
                    sub={`${service.category}${service.subcategory ? ` · ${service.subcategory}` : ""}`}
                    pay={formatPay("fixed", service.price)}
                  />
                ))}
              </ul>
            )}

            <footer className="home-hub__board-footer">
              {signedIn ? (
                <Link href="/services/new" className="home-hub__board-cta">
                  List a service →
                </Link>
              ) : (
                <Link href="/sign-up" className="home-hub__board-cta">
                  Sign up to sell a service →
                </Link>
              )}
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}
