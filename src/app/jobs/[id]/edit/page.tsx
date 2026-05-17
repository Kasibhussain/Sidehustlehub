import { JobEditForm } from "@/components/jobs/JobEditForm";
import { PageShell } from "@/components/layout/PageShell";
import { formatJobPay } from "@/lib/jobs/format";
import { requireSession } from "@/lib/session";
import { jobsStore } from "@/lib/jobs/store";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditJobPage({ params }: PageProps) {
  const session = await requireSession();
  const { id } = await params;
  const job = jobsStore.getJob(id);

  if (!job) notFound();
  if (job.posterId !== session.userId) {
    redirect(`/jobs/${id}`);
  }
  if (job.status !== "open") {
    redirect(`/jobs/${id}`);
  }

  return (
    <PageShell>
      <div className="page-header">
        <p className="eyebrow page-eyebrow">Edit listing</p>
        <h1>{job.title}</h1>
        <p className="page-lead">
          {job.category}
          {job.subcategory ? ` · ${job.subcategory}` : ""} · {job.location} ·{" "}
          {formatJobPay(job)}
        </p>
        <Link href={`/jobs/${id}`} className="btn btn-ghost">
          ← Back to job
        </Link>
      </div>

      <div className="form-panel">
        <JobEditForm job={job} />
      </div>
    </PageShell>
  );
}
