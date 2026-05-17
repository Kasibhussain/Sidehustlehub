import { PageShell } from "@/components/layout/PageShell";

export default function Loading() {
  return (
    <PageShell>
      <div
        className="page-skeleton"
        aria-busy="true"
        aria-live="polite"
        aria-label="Loading page"
      >
        <div className="skeleton-line skeleton-line--lg" />
        <div className="skeleton-line skeleton-line--md" />
        <div className="skeleton-line skeleton-line--md" />
        <div className="skeleton-block" />
      </div>
    </PageShell>
  );
}
