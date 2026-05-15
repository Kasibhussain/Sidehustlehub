import { PageShell } from "@/components/layout/PageShell";
import { formatPay, formatPostedDate } from "@/lib/jobs/format";
import { jobsStore } from "@/lib/jobs/store";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const service = jobsStore.getService(id);
  if (!service) notFound();

  const price = formatPay("fixed", service.price);

  return (
    <PageShell>
      <div className="page-header">
        <Link href="/services" className="btn btn-ghost">
          ← All services
        </Link>
      </div>

      <article className="job-detail">
        <p className="job-detail-top">
          <span className="badge badge-service">Service</span>
          <span>{formatPostedDate(service.createdAt)}</span>
        </p>
        <h1>{service.title}</h1>
        <p className="job-detail-meta">
          {service.category}
          {service.subcategory ? ` · ${service.subcategory}` : ""} ·{" "}
          <strong>{price}</strong>
        </p>
        <p className="job-detail-poster">
          Offered by{" "}
          <Link href={`/u/${service.sellerId}`} className="dash-list-link">
            {service.sellerName}
          </Link>
        </p>
        {service.deliveryNote && (
          <p className="job-detail-tags">{service.deliveryNote}</p>
        )}
        <div className="job-detail-body">
          <p>{service.description}</p>
        </div>
      </article>
    </PageShell>
  );
}
