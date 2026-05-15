import { ApplicationStatusBadge, JobStatusBadge } from "@/components/jobs/StatusBadge";
import { PageShell } from "@/components/layout/PageShell";
import { formatJobPay, formatPay, formatPostedDate } from "@/lib/jobs/format";
import { requireSession } from "@/lib/session";
import { jobsStore } from "@/lib/jobs/store";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await requireSession();

  const myJobs = jobsStore.listByPoster(session.userId);
  const myApplications = jobsStore.listApplicationsByApplicant(session.userId);

  const applicationsWithJobs = myApplications
    .map((app) => ({
      app,
      job: jobsStore.getJob(app.jobId),
    }))
    .filter((row): row is { app: (typeof myApplications)[0]; job: NonNullable<ReturnType<typeof jobsStore.getJob>> } =>
      row.job != null,
    );

  const myServices = jobsStore.listServicesBySeller(session.userId);

  return (
    <PageShell>
      <div className="dashboard">
        <div className="dashboard-header">
          <p className="eyebrow">Your workspace</p>
          <h1>
            Hey, <em>{session.name}</em>
          </h1>
          <p className="dashboard-sub">
            Post jobs, track applications, and pick up your next hustle.
          </p>
          <div className="page-actions">
            <Link href="/jobs/new" className="btn btn-primary">
              Post a job
            </Link>
            <Link href="/jobs" className="btn btn-secondary">
              Browse jobs
            </Link>
            <Link href="/services" className="btn btn-secondary">
              Browse services
            </Link>
            <Link href="/services/new" className="btn btn-secondary">
              List a service
            </Link>
            <Link href="/profile" className="btn btn-secondary">
              Profile
            </Link>
          </div>
        </div>

        <section className="section-block">
          <h2 className="section-block-title">Your services</h2>
          {myServices.length === 0 ? (
            <div className="empty-state empty-state-compact">
              <p>You haven&apos;t listed any services yet.</p>
              <Link href="/services/new" className="btn btn-primary">
                List a service
              </Link>
            </div>
          ) : (
            <ul className="dash-list">
              {myServices.map((s) => (
                <li key={s.id} className="dash-list-item">
                  <p className="dash-list-row">
                    <Link href={`/services/${s.id}`} className="dash-list-link">
                      {s.title}
                    </Link>
                  </p>
                  <p className="dash-list-meta">
                    {formatPay("fixed", s.price)} · {formatPostedDate(s.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="section-block">
          <h2 className="section-block-title">Jobs you posted</h2>
          {myJobs.length === 0 ? (
            <div className="empty-state empty-state-compact">
              <p>You haven&apos;t posted any jobs yet.</p>
              <Link href="/jobs/new" className="btn btn-primary">
                Post your first job
              </Link>
            </div>
          ) : (
            <ul className="dash-list">
              {myJobs.map((job) => (
                <li key={job.id} className="dash-list-item">
                  <p className="dash-list-row">
                    <Link href={`/jobs/${job.id}`} className="dash-list-link">
                      {job.title}
                    </Link>
                    <JobStatusBadge status={job.status} />
                  </p>
                  <p className="dash-list-meta">
                    {formatJobPay(job)} ·{" "}
                    {jobsStore.countApplicationsForJob(job.id)} applications ·{" "}
                    {formatPostedDate(job.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="section-block">
          <h2 className="section-block-title">Your applications</h2>
          {applicationsWithJobs.length === 0 ? (
            <div className="empty-state empty-state-compact">
              <p>You haven&apos;t applied to any jobs yet.</p>
              <Link href="/jobs" className="btn btn-primary">
                Find a hustle
              </Link>
            </div>
          ) : (
            <ul className="dash-list">
              {applicationsWithJobs.map(({ app, job }) => (
                <li key={app.id} className="dash-list-item">
                  <p className="dash-list-row">
                    <Link href={`/jobs/${job.id}`} className="dash-list-link">
                      {job.title}
                    </Link>
                    <ApplicationStatusBadge status={app.status} />
                  </p>
                  <p className="dash-list-meta">
                    {job.location} · Applied {formatPostedDate(app.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </PageShell>
  );
}
