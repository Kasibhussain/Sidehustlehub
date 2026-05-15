import { ServiceCard } from "@/components/services/ServiceCard";
import { PageShell } from "@/components/layout/PageShell";
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

  if (!profile && services.length === 0 && postedJobs.length === 0) {
    notFound();
  }

  const displayName =
    profile?.displayName ??
    services[0]?.sellerName ??
    postedJobs[0]?.posterName ??
    "Hustler";

  const session = await getSession();
  const isOwn = session?.userId === userId;

  return (
    <PageShell>
      <div className="page-header">
        <p className="eyebrow page-eyebrow">Profile</p>
        <h1>{displayName}</h1>
        {profile?.location && (
          <p className="page-lead">{profile.location}</p>
        )}
        {isOwn && (
          <div className="page-actions">
            <Link href="/profile" className="btn btn-primary">
              Edit profile
            </Link>
            <Link href="/services/new" className="btn btn-secondary">
              New service
            </Link>
          </div>
        )}
      </div>

      {profile?.bio && (
        <div className="job-detail profile-about">
          <p>{profile.bio}</p>
        </div>
      )}

      {profile && profile.skills.length > 0 && (
        <p className="profile-skills">
          <strong>Skills:</strong> {profile.skills.join(", ")}
        </p>
      )}

      {profile?.availabilityNote && (
        <p className="profile-meta">
          <strong>Availability:</strong> {profile.availabilityNote}
        </p>
      )}

      {profile?.portfolioUrls && profile.portfolioUrls.length > 0 && (
        <ul className="profile-links">
          {profile.portfolioUrls.map((url) => (
            <li key={url}>
              <a href={url} rel="noopener noreferrer" target="_blank">
                {url}
              </a>
            </li>
          ))}
        </ul>
      )}

      <section className="section-block">
        <h2 className="section-block-title">Posted jobs</h2>
        {postedJobs.length === 0 ? (
          <p className="form-note">No public job posts from this member.</p>
        ) : (
          <ul className="dash-list">
            {postedJobs.slice(0, 8).map((job) => (
              <li key={job.id} className="dash-list-item">
                <p className="dash-list-row">
                  <Link href={`/jobs/${job.id}`} className="dash-list-link">
                    {job.title}
                  </Link>
                </p>
                <p className="dash-list-meta">{job.location}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="section-block">
        <h2 className="section-block-title">Services</h2>
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
    </PageShell>
  );
}
