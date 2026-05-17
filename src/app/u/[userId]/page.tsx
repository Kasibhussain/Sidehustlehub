import { ServiceCard } from "@/components/services/ServiceCard";
import { PublicProfileAboutCard } from "@/components/profile/PublicProfileAboutCard";
import { PublicProfileStatsStrip } from "@/components/profile/PublicProfileStatsStrip";
import { JobStatusBadge } from "@/components/jobs/StatusBadge";
import { PageShell } from "@/components/layout/PageShell";
import { fetchClerkPublicProfile } from "@/lib/clerk/fetchClerkPublicProfile";
import { formatJobPay } from "@/lib/jobs/format";
import { initialsFromName } from "@/lib/profile/initials";
import { publicDisplayName } from "@/lib/profile/publicDisplayName";
import { getSession } from "@/lib/session";
import { jobsStore } from "@/lib/jobs/store";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ userId: string }> };

export default async function PublicProfilePage({ params }: PageProps) {
  const { userId } = await params;
  const profile = jobsStore.getProfile(userId);
  const services = jobsStore.listServicesBySeller(userId);
  const postedJobs = jobsStore.listByPoster(userId);

  const hasHubActivity =
    profile != null || services.length > 0 || postedJobs.length > 0;

  const clerkPublic = await fetchClerkPublicProfile(userId);

  if (!hasHubActivity && !clerkPublic) {
    notFound();
  }

  const displayName = publicDisplayName(
    profile,
    services,
    postedJobs,
    clerkPublic?.displayName,
  );

  const session = await getSession();
  const isOwn = session?.userId === userId;
  const photoSrc =
    profile?.photoUrl?.trim() ||
    clerkPublic?.imageUrl?.trim() ||
    (isOwn ? session?.imageUrl?.trim() ?? null : null) ||
    null;

  const openJobsCount = postedJobs.filter((j) => j.status === "open").length;

  return (
    <PageShell>
      <article className="public-profile-page">
        <header className="page-header public-profile-header">
          <p className="eyebrow page-eyebrow">Member profile</p>
          <div className="public-profile-header__row">
            {photoSrc ? (
              // eslint-disable-next-line @next/next/no-img-element -- user-supplied / Clerk avatar URL
              <img
                src={photoSrc}
                alt=""
                className="public-profile-avatar"
              />
            ) : (
              <div
                className="public-profile-avatar public-profile-avatar--initials"
                aria-hidden
              >
                {initialsFromName(displayName)}
              </div>
            )}
            <div className="public-profile-header__copy">
              <h1>{displayName}</h1>
              {profile?.location?.trim() ? (
                <p className="page-lead public-profile-header__location">
                  {profile.location}
                </p>
              ) : null}
              <PublicProfileStatsStrip
                servicesCount={services.length}
                jobsCount={postedJobs.length}
                openJobsCount={openJobsCount}
              />
            </div>
          </div>
          {isOwn && (
            <div className="page-actions public-profile-header__actions">
              <Link href="/profile" className="btn btn-primary">
                Edit profile
              </Link>
              <Link href="/jobs/new" className="btn btn-secondary">
                Post a job
              </Link>
              <Link href="/services/new" className="btn btn-secondary">
                New service
              </Link>
            </div>
          )}
        </header>

        <PublicProfileAboutCard profile={profile} variant="full" />

        <section className="section-block public-profile-section">
          <h2 className="section-block-title">Posted jobs</h2>
          <p className="public-profile-section__lead">
            Active listings — open a job for the full brief and pay details.
          </p>
          {postedJobs.length === 0 ? (
            <p className="form-note">No job posts from this member yet.</p>
          ) : (
            <ul className="public-profile-job-list">
              {postedJobs.slice(0, 12).map((job) => (
                <li key={job.id} className="public-profile-job-row">
                  <div className="public-profile-job-row__main">
                    <Link href={`/jobs/${job.id}`} className="public-profile-job-row__title">
                      {job.title}
                    </Link>
                    <p className="public-profile-job-row__sub">
                      {job.category}
                      {job.subcategory ? ` · ${job.subcategory}` : ""} ·{" "}
                      {job.location}
                    </p>
                  </div>
                  <div className="public-profile-job-row__aside">
                    <JobStatusBadge status={job.status} />
                    <span className="public-profile-job-row__pay">
                      {formatJobPay(job)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {postedJobs.length > 12 ? (
            <p className="public-profile-section__footnote">
              Showing the 12 most recent listings. Older posts may still be visible
              on their individual pages.
            </p>
          ) : null}
        </section>

        <section className="section-block public-profile-section">
          <h2 className="section-block-title">Services</h2>
          <p className="public-profile-section__lead">
            Fixed-price packages you can book directly.
          </p>
          {services.length === 0 ? (
            <p className="form-note">No services listed yet.</p>
          ) : (
            <div className="job-grid">
              {services.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          )}
        </section>
      </article>
    </PageShell>
  );
}
