import Link from "next/link";
import { formatJobPay, formatPostedDate } from "@/lib/jobs/format";
import type { Job } from "@/types/job";
import { JobStatusBadge } from "./StatusBadge";

export function JobCard({
  job,
  applicationCount,
}: {
  job: Job;
  applicationCount?: number;
}) {
  return (
    <article className="job-card">
      <p className="job-card-top">
        <JobStatusBadge status={job.status} />
        <span className="job-card-date">{formatPostedDate(job.createdAt)}</span>
      </p>
      <h3 className="job-card-title">
        <Link href={`/jobs/${job.id}`}>{job.title}</Link>
      </h3>
      <p className="job-card-meta">
        {job.category}
        {job.subcategory ? ` · ${job.subcategory}` : ""} · {job.location}
      </p>
      <p className="job-card-desc">{job.description}</p>
      <p className="job-card-footer">
        <span className="job-card-pay">{formatJobPay(job)}</span>
        <span className="job-card-poster">Posted by {job.posterName}</span>
      </p>
      {applicationCount !== undefined && (
        <p className="job-card-apps">
          {applicationCount} application{applicationCount === 1 ? "" : "s"}
        </p>
      )}
    </article>
  );
}
