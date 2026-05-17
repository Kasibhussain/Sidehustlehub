import { ProfileCompletionCard } from "@/components/profile/ProfileCompletionCard";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfilePreviewCard } from "@/components/profile/ProfilePreviewCard";
import { ProfileStatsCard } from "@/components/profile/ProfileStatsCard";
import { PageShell } from "@/components/layout/PageShell";
import { requireSession } from "@/lib/session";
import { jobsStore } from "@/lib/jobs/store";
import Link from "next/link";

type SearchParams = Promise<{ saved?: string }>;

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await requireSession();
  const { saved } = await searchParams;
  const profile = jobsStore.getProfile(session.userId);

  return (
    <PageShell>
      <div className="page-header profile-page-header">
        <p className="eyebrow page-eyebrow">Profile</p>
        <h1>Your hustler profile</h1>
        <p className="page-lead">
          This is what other members see on your public page. A complete profile
          helps posters trust your applications.
        </p>
        <div className="page-actions profile-page-actions">
          <Link href={`/u/${session.userId}`} className="btn btn-secondary">
            Public page
          </Link>
          <Link href="/dashboard" className="btn btn-secondary">
            Dashboard
          </Link>
          <Link href="/jobs" className="btn btn-secondary">
            Browse jobs
          </Link>
          <Link href="/services/new" className="btn btn-secondary">
            List a service
          </Link>
        </div>
      </div>

      {saved === "1" && (
        <p className="banner-success profile-saved-banner" role="status">
          Profile saved — your public page is updated.
        </p>
      )}

      <div className="profile-edit-layout">
        <aside className="profile-edit-sidebar">
          <ProfilePreviewCard
            profile={profile}
            fallbackName={session.name}
            userId={session.userId}
            clerkImageUrl={session.imageUrl}
            postedJobs={jobsStore.listByPoster(session.userId)}
            services={jobsStore.listServicesBySeller(session.userId)}
          />
          <ProfileStatsCard userId={session.userId} />
          <ProfileCompletionCard profile={profile} />
        </aside>

        <div className="profile-edit-main">
          <div className="form-panel profile-form-panel">
            <h2 className="profile-form-heading">Edit your details</h2>
            <p className="profile-form-lead">
              Changes publish to{" "}
              <Link href={`/u/${session.userId}`}>your public profile</Link>{" "}
              right after you save.
            </p>
            <ProfileForm initial={profile} userName={session.name} />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
