import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";

export default async function DashboardPage() {
  const user = await currentUser();
  const name =
    user?.firstName ||
    user?.emailAddresses[0]?.emailAddress?.split("@")[0] ||
    "there";

  return (
    <>
      <div className="glow" />
      <main className="dashboard">
        <div className="dashboard-header">
          <p className="eyebrow">Your workspace</p>
          <h1>
            Hey, <em>{name}</em>
          </h1>
          <p className="dashboard-sub">
            Your account is ready. Soon you&apos;ll post gigs, browse hustles,
            and track your reputation — all from here.
          </p>
        </div>

        <div className="dashboard-grid">
          <article className="dashboard-card dashboard-card-accent">
            <span className="side-tag">Hustler</span>
            <h3>Find your next gig</h3>
            <p>Browse available hustles in your area or work remotely.</p>
            <span className="dashboard-badge">Coming soon</span>
          </article>
          <article className="dashboard-card dashboard-card-warm">
            <span className="side-tag">Poster</span>
            <h3>Post what you need done</h3>
            <p>Describe the job and connect with reliable people fast.</p>
            <span className="dashboard-badge">Coming soon</span>
          </article>
          <article className="dashboard-card dashboard-card-muted">
            <h3>Your profile</h3>
            <p>
              Email:{" "}
              <strong>
                {user?.emailAddresses[0]?.emailAddress ?? "—"}
              </strong>
            </p>
            <p className="dashboard-meta">
              Member since{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                    month: "long",
                    year: "numeric",
                  })
                : "—"}
            </p>
          </article>
        </div>

        <Link href="/" className="btn btn-ghost">
          ← Back to home
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
