import { ApplicationDecisionForms } from "@/components/jobs/ApplicationDecisionForms";
import { ApplicationStatusBadge, JobStatusBadge } from "@/components/jobs/StatusBadge";
import { CloseJobButton } from "@/components/jobs/CloseJobButton";
import { PageShell } from "@/components/layout/PageShell";
import {
  formatDeadline,
  formatJobPay,
  formatPay,
  formatPostedDate,
} from "@/lib/jobs/format";
import { getSession } from "@/lib/session";
import { jobsStore } from "@/lib/jobs/store";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ applied?: string }>;
};

export default async function JobDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { applied } = await searchParams;
  const job = jobsStore.getJob(id);

  if (!job) notFound();

  const session = await getSession();
  const isPoster = session?.userId === job.posterId;
  const hasApplied =
    session?.userId != null &&
    jobsStore.hasApplied(job.id, session.userId);
  const applications = isPoster
    ? jobsStore.listApplicationsForJob(job.id)
    : [];

  const deadlineLabel = formatDeadline(job.deadlineAt);
  const engagementLabel =
    job.engagementType === "ongoing" ? "Ongoing" : "One-off";
  const urgencyLabel = job.urgency === "asap" ? "ASAP" : "Flexible";

  return (
    <PageShell>
      <div className="page-header">
        <Link href="/jobs" className="btn btn-ghost">
          ← All jobs
        </Link>
      </div>

      {applied === "1" && (
        <p className="banner-success" role="status">
          Application submitted — the poster will review your message.
        </p>
      )}

      <article className="job-detail">
        <p className="job-detail-top">
          <JobStatusBadge status={job.status} />
          <span>{formatPostedDate(job.createdAt)}</span>
        </p>
        <h1>{job.title}</h1>
        <p className="job-detail-meta">
          {job.category}
          {job.subcategory ? ` · ${job.subcategory}` : ""} · {job.location} ·{" "}
          <strong>{formatJobPay(job)}</strong>
        </p>
        <p className="job-detail-tags">
          {engagementLabel} · {urgencyLabel}
          {deadlineLabel ? ` · Deadline ${deadlineLabel}` : ""}
        </p>
        <p className="job-detail-poster">Posted by {job.posterName}</p>
        <div className="job-detail-body">
          <p>{job.description}</p>
        </div>

        <div className="job-detail-actions">
          {isPoster ? (
            <>
              {job.status === "assigned" && (
                <p className="form-note">
                  Someone has been chosen for this job. You can close the listing
                  when the work is complete.
                </p>
              )}
              {(job.status === "open" || job.status === "assigned") && (
                <CloseJobButton jobId={job.id} />
              )}
              <Link href="/dashboard" className="btn btn-secondary">
                View on dashboard
              </Link>
            </>
          ) : job.status === "open" ? (
            hasApplied ? (
              <p className="form-note">You&apos;ve already applied to this job.</p>
            ) : session ? (
              <Link href={`/jobs/${job.id}/apply`} className="btn btn-primary btn-lg">
                Apply for this job
              </Link>
            ) : (
              <Link href="/sign-in" className="btn btn-primary btn-lg">
                Sign in to apply
              </Link>
            )
          ) : job.status === "assigned" ? (
            <p className="form-note">This job has been filled.</p>
          ) : (
            <p className="form-note">This job is closed.</p>
          )}
        </div>
      </article>

      {isPoster && applications.length > 0 && (
        <section className="section-block">
          <h2 className="section-block-title">
            Applications ({applications.length})
          </h2>
          <ul className="application-list">
            {applications.map((app) => (
              <li key={app.id} className="application-item">
                <p className="application-item-header">
                  <strong>{app.applicantName}</strong>
                  <ApplicationStatusBadge status={app.status} />
                </p>
                <p className="application-item-date">
                  {formatPostedDate(app.createdAt)}
                  {app.proposedAmount != null && app.proposedAmount > 0 && (
                    <>
                      {" "}
                      · Proposed{" "}
                      <strong>
                        {formatPay("fixed", app.proposedAmount)}
                      </strong>
                    </>
                  )}
                </p>
                <p className="application-item-message">{app.message}</p>
                {job.status === "open" && app.status === "pending" && (
                  <ApplicationDecisionForms
                    jobId={job.id}
                    applicationId={app.id}
                  />
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </PageShell>
  );
}
