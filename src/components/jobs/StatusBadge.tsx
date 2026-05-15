import type { ApplicationStatus, JobStatus } from "@/types/job";

const JOB_LABEL: Record<JobStatus, string> = {
  open: "Open",
  closed: "Closed",
  assigned: "Filled",
};

export function JobStatusBadge({ status }: { status: JobStatus }) {
  return (
    <span className={`badge badge-job-${status}`}>{JOB_LABEL[status]}</span>
  );
}

export function ApplicationStatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span className={`badge badge-app-${status}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
