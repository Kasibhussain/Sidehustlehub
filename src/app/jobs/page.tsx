import { JobCard } from "@/components/jobs/JobCard";
import { JobFilters } from "@/components/jobs/JobFilters";
import { SaveJobButton } from "@/components/jobs/SaveJobButton";
import { PageShell } from "@/components/layout/PageShell";
import { getSession } from "@/lib/session";
import { jobsStore } from "@/lib/jobs/store";
import { parseJobsUrl } from "@/lib/jobs/jobSearchHref";
import Link from "next/link";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function JobsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const raw = await searchParams;
  const urlState = parseJobsUrl(raw);
  const session = await getSession();
  const jobs = jobsStore.listJobs({
    status: "open",
    category: urlState.category,
    subcategory: urlState.subcategory,
    search: urlState.q,
    urgency: urlState.urgency,
    engagementType: urlState.engagementType,
    payType: urlState.payType,
    sort: urlState.sort ?? "newest",
  });

  return (
    <PageShell>
      <div className="page-header">
        <p className="eyebrow page-eyebrow">Browse gigs</p>
        <h1>Open hustles</h1>
        <p className="page-lead">
          Find side work near you or remotely. Apply in a few clicks when you&apos;re
          signed in.
        </p>
        <div className="page-actions">
          {session ? (
            <Link href="/jobs/new" className="btn btn-primary">
              Post a job
            </Link>
          ) : (
            <Link href="/sign-in" className="btn btn-primary">
              Sign in to post
            </Link>
          )}
          <Link href="/services" className="btn btn-secondary">
            Browse services
          </Link>
          <Link href="/dashboard" className="btn btn-secondary">
            Dashboard
          </Link>
        </div>
      </div>

      <form className="jobs-search" method="get" action="/jobs">
        {urlState.category && (
          <input type="hidden" name="category" value={urlState.category} />
        )}
        {urlState.subcategory && (
          <input type="hidden" name="subcategory" value={urlState.subcategory} />
        )}
        {urlState.urgency && (
          <input type="hidden" name="urgency" value={urlState.urgency} />
        )}
        {urlState.engagementType && (
          <input type="hidden" name="engagementType" value={urlState.engagementType} />
        )}
        {urlState.payType && (
          <input type="hidden" name="payType" value={urlState.payType} />
        )}
        {urlState.sort && (
          <input type="hidden" name="sort" value={urlState.sort} />
        )}
        <label className="form-field jobs-search-field">
          <span className="sr-only">Search jobs</span>
          <input
            name="q"
            type="search"
            placeholder="Search title, description, location…"
            defaultValue={urlState.q ?? ""}
            className="jobs-search-input"
          />
        </label>
        <button type="submit" className="btn btn-secondary">
          Search
        </button>
      </form>

      <JobFilters state={urlState} />

      {jobs.length === 0 ? (
        <div className="empty-state">
          <h3>No open jobs match</h3>
          <p>Try another filter or post the first gig yourself.</p>
          <Link href="/jobs/new" className="btn btn-primary">
            Post a job
          </Link>
        </div>
      ) : (
        <div className="job-grid">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job}>
              {session &&
                job.status === "open" &&
                session.userId !== job.posterId && (
                  <SaveJobButton
                    jobId={job.id}
                    initialSaved={jobsStore.isJobSaved(
                      session.userId,
                      job.id,
                    )}
                  />
                )}
            </JobCard>
          ))}
        </div>
      )}
    </PageShell>
  );
}
