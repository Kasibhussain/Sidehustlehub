import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <div className="not-found">
        <p className="eyebrow page-eyebrow">404</p>
        <h1>This page isn&apos;t here</h1>
        <p className="page-lead">
          The link may be wrong, or the listing was removed. Try the home page
          or browse open work.
        </p>
        <div className="page-actions">
          <Link href="/" className="btn btn-primary">
            Home
          </Link>
          <Link href="/jobs" className="btn btn-secondary">
            Browse jobs
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
