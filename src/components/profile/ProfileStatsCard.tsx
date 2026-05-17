import Link from "next/link";
import { jobsStore } from "@/lib/jobs/store";

export function ProfileStatsCard({ userId }: { userId: string }) {
  const services = jobsStore.listServicesBySeller(userId);
  const postedJobs = jobsStore.listByPoster(userId);
  const applications = jobsStore.listApplicationsByApplicant(userId);

  const openPosted = postedJobs.filter((j) => j.status === "open").length;

  return (
    <div className="profile-stats-card">
      <p className="eyebrow profile-stats-card__eyebrow">Your activity</p>
      <ul className="profile-stats-card__list">
        <li>
          <strong>{services.length}</strong>
          <span>Service{services.length === 1 ? "" : "s"} listed</span>
          {services.length === 0 && (
            <Link href="/services/new" className="profile-stats-card__mini-link">
              List one
            </Link>
          )}
        </li>
        <li>
          <strong>{postedJobs.length}</strong>
          <span>Job{postedJobs.length === 1 ? "" : "s"} posted</span>
          {openPosted > 0 ? (
            <span className="profile-stats-card__sub">{openPosted} open</span>
          ) : null}
        </li>
        <li>
          <strong>{applications.length}</strong>
          <span>Application{applications.length === 1 ? "" : "s"}</span>
        </li>
      </ul>
      <div className="profile-stats-card__actions">
        <Link href="/dashboard" className="profile-stats-card__text-link">
          Dashboard →
        </Link>
      </div>
    </div>
  );
}
