import Link from "next/link";
import { formatPay, formatPostedDate } from "@/lib/jobs/format";
import type { Service } from "@/types/service";

export function ServiceCard({ service }: { service: Service }) {
  const price = formatPay("fixed", service.price);

  return (
    <article className="job-card service-card">
      <p className="job-card-top">
        <span className="badge badge-service">Service</span>
        <span className="job-card-date">{formatPostedDate(service.createdAt)}</span>
      </p>
      <h3 className="job-card-title">
        <Link href={`/services/${service.id}`}>{service.title}</Link>
      </h3>
      <p className="job-card-meta">
        {service.category}
        {service.subcategory ? ` · ${service.subcategory}` : ""} ·{" "}
        <Link href={`/u/${service.sellerId}`}>{service.sellerName}</Link>
      </p>
      <p className="job-card-desc">{service.description}</p>
      <p className="job-card-footer">
        <span className="job-card-pay">{price}</span>
        {service.deliveryNote && (
          <span className="job-card-poster">{service.deliveryNote}</span>
        )}
      </p>
    </article>
  );
}
