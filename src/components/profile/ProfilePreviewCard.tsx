import Link from "next/link";
import { JobStatusBadge } from "@/components/jobs/StatusBadge";
import { formatJobPay, formatPay } from "@/lib/jobs/format";
import { initialsFromName } from "@/lib/profile/initials";
import { shortLinkLabel } from "@/lib/profile/shortLink";
import type { Job } from "@/types/job";
import type { WorkerProfile } from "@/types/profile";
import type { Service } from "@/types/service";

const PREVIEW_JOBS = 3;
const PREVIEW_SERVICES = 3;
const PREVIEW_PORTFOLIO = 4;

export function ProfilePreviewCard({
  profile,
  fallbackName,
  userId,
  clerkImageUrl,
  postedJobs,
  services,
}: {
  profile?: WorkerProfile;
  fallbackName: string;
  userId: string;
  clerkImageUrl: string | null;
  postedJobs: Job[];
  services: Service[];
}) {
  const name = profile?.displayName?.trim() || fallbackName;
  const photoSrc =
    profile?.photoUrl?.trim() || clerkImageUrl?.trim() || null;

  const openJobs = postedJobs.filter((j) => j.status === "open").length;
  const jobPreview = postedJobs.slice(0, PREVIEW_JOBS);
  const servicePreview = services.slice(0, PREVIEW_SERVICES);
  const extraJobs = Math.max(0, postedJobs.length - PREVIEW_JOBS);
  const extraServices = Math.max(0, services.length - PREVIEW_SERVICES);

  const portfolioUrls = profile?.portfolioUrls ?? [];
  const portfolioPreview = portfolioUrls.slice(0, PREVIEW_PORTFOLIO);

  return (
    <div className="profile-preview-card">
      <p className="eyebrow profile-preview-card__eyebrow">Public page preview</p>
      <p className="profile-preview-card__hint">
        How visitors see your hub presence — matches{" "}
        <Link href={`/u/${userId}`}>your live page</Link>.
      </p>

      <div className="profile-preview-card__head">
        {photoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element -- arbitrary user-supplied image URLs
          <img
            src={photoSrc}
            alt=""
            className="profile-preview-card__avatar"
          />
        ) : (
          <div
            className="profile-preview-card__avatar profile-preview-card__avatar--initials"
            aria-hidden
          >
            {initialsFromName(name)}
          </div>
        )}
        <div className="profile-preview-card__title-block">
          <p className="profile-preview-card__name">{name}</p>
          {profile?.location?.trim() ? (
            <p className="profile-preview-card__location">{profile.location}</p>
          ) : (
            <p className="profile-preview-card__muted">Add a location</p>
          )}
        </div>
      </div>

      {(services.length > 0 || postedJobs.length > 0) && (
        <p className="profile-preview-card__stats">
          {[
            services.length > 0
              ? `${services.length} service${services.length === 1 ? "" : "s"}`
              : null,
            postedJobs.length > 0
              ? `${postedJobs.length} job${postedJobs.length === 1 ? "" : "s"}${
                  openJobs > 0 ? ` (${openJobs} open)` : ""
                }`
              : null,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
      )}

      {profile?.bio?.trim() ? (
        <p className="profile-preview-card__bio profile-preview-card__bio--clamp">
          {profile.bio.trim()}
        </p>
      ) : (
        <p className="profile-preview-card__muted">
          Your bio appears under your name on the public page.
        </p>
      )}

      {profile && profile.skills.length > 0 ? (
        <ul className="profile-preview-card__skills" aria-label="Skills">
          {profile.skills.map((s) => (
            <li key={s} className="profile-skill-pill">
              {s}
            </li>
          ))}
        </ul>
      ) : null}

      {(profile?.availabilityNote?.trim() ||
        (profile?.serviceRadiusKm != null && profile.serviceRadiusKm > 0)) && (
        <div className="profile-preview-card__meta">
          {profile?.availabilityNote?.trim() ? (
            <p>
              <strong>Availability</strong> · {profile.availabilityNote}
            </p>
          ) : null}
          {profile?.serviceRadiusKm != null && profile.serviceRadiusKm > 0 ? (
            <p>
              <strong>Radius</strong> · {profile.serviceRadiusKm} km
            </p>
          ) : null}
        </div>
      )}

      {portfolioPreview.length > 0 ? (
        <div className="profile-preview-card__portfolio">
          <p className="profile-preview-card__portfolio-label">Portfolio</p>
          <ul>
            {portfolioPreview.map((url) => (
              <li key={url}>
                <span className="profile-preview-card__portfolio-link">
                  {shortLinkLabel(url)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="profile-preview-card__listings">
        <p className="profile-preview-card__listings-title">Live listings</p>

        {jobPreview.length === 0 && servicePreview.length === 0 ? (
          <p className="profile-preview-card__muted profile-preview-card__muted--tight">
            Post a job or list a service to show activity here.
          </p>
        ) : null}

        {jobPreview.length > 0 ? (
          <div className="profile-preview-card__listing-group">
            <p className="profile-preview-card__listing-eyebrow">Jobs you posted</p>
            <ul className="profile-preview-mini-list">
              {jobPreview.map((job) => (
                <li key={job.id}>
                  <Link href={`/jobs/${job.id}`} className="profile-preview-mini-row">
                    <span className="profile-preview-mini-row__title">
                      {job.title}
                    </span>
                    <span className="profile-preview-mini-row__meta">
                      <JobStatusBadge status={job.status} />
                      <span className="profile-preview-mini-row__pay">
                        {formatJobPay(job)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {extraJobs > 0 ? (
              <p className="profile-preview-card__more">
                +{extraJobs} more on your public page
              </p>
            ) : null}
          </div>
        ) : null}

        {servicePreview.length > 0 ? (
          <div className="profile-preview-card__listing-group">
            <p className="profile-preview-card__listing-eyebrow">Services</p>
            <ul className="profile-preview-mini-list">
              {servicePreview.map((svc) => (
                <li key={svc.id}>
                  <Link
                    href={`/services/${svc.id}`}
                    className="profile-preview-mini-row"
                  >
                    <span className="profile-preview-mini-row__title">
                      {svc.title}
                    </span>
                    <span className="profile-preview-mini-row__meta">
                      <span className="profile-preview-mini-row__pay">
                        {formatPay("fixed", svc.price)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {extraServices > 0 ? (
              <p className="profile-preview-card__more">
                +{extraServices} more on your public page
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <Link
        href={`/u/${userId}`}
        className="btn btn-secondary btn-sm profile-preview-card__link"
      >
        Open full public page
      </Link>
    </div>
  );
}
