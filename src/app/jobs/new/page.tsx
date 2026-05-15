import { JobForm } from "@/components/jobs/JobForm";
import { PageShell } from "@/components/layout/PageShell";
import { requireSession } from "@/lib/session";
import Link from "next/link";

export default async function NewJobPage() {
  await requireSession();

  return (
    <PageShell>
      <div className="page-header">
        <p className="eyebrow page-eyebrow">Poster</p>
        <h1>Post a job</h1>
        <p className="page-lead">
          Describe what you need done, set the pay, and start receiving applications
          from hustlers.
        </p>
        <Link href="/jobs" className="btn btn-ghost">
          ← Back to jobs
        </Link>
      </div>

      <div className="form-panel">
        <JobForm />
      </div>
    </PageShell>
  );
}
