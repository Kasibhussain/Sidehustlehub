import { ServiceForm } from "@/components/services/ServiceForm";
import { PageShell } from "@/components/layout/PageShell";
import { requireSession } from "@/lib/session";
import Link from "next/link";

export default async function NewServicePage() {
  await requireSession();

  return (
    <PageShell>
      <div className="page-header">
        <p className="eyebrow page-eyebrow">New service</p>
        <h1>List something you deliver</h1>
        <p className="page-lead">
          Clear title, fixed price, and what the buyer gets. You can tweak your
          public profile separately.
        </p>
        <Link href="/services" className="btn btn-ghost">
          ← All services
        </Link>
      </div>

      <div className="form-panel">
        <ServiceForm />
      </div>
    </PageShell>
  );
}
