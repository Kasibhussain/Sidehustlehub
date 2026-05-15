import { ProfileForm } from "@/components/profile/ProfileForm";
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
      <div className="page-header">
        <p className="eyebrow page-eyebrow">Profile</p>
        <h1>Your hustler profile</h1>
        <p className="page-lead">
          This shows on your public page and helps posters trust your applications.
        </p>
        <Link href={`/u/${session.userId}`} className="btn btn-ghost">
          View public profile →
        </Link>
      </div>

      {saved === "1" && (
        <p className="banner-success" role="status">
          Profile saved.
        </p>
      )}

      <div className="form-panel">
        <ProfileForm initial={profile} userName={session.name} />
      </div>
    </PageShell>
  );
}
