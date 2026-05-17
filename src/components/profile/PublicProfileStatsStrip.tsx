export function PublicProfileStatsStrip({
  servicesCount,
  jobsCount,
  openJobsCount,
}: {
  servicesCount: number;
  jobsCount: number;
  openJobsCount: number;
}) {
  if (servicesCount === 0 && jobsCount === 0) {
    return null;
  }

  const parts: string[] = [];
  if (servicesCount > 0) {
    parts.push(
      `${servicesCount} service${servicesCount === 1 ? "" : "s"}`,
    );
  }
  if (jobsCount > 0) {
    parts.push(`${jobsCount} job${jobsCount === 1 ? "" : "s"} posted`);
  }
  if (openJobsCount > 0) {
    parts.push(`${openJobsCount} open now`);
  }

  return (
    <p className="public-profile-stats-strip">
      {parts.map((p, i) => (
        <span key={`${i}-${p}`} className="public-profile-stats-strip__item">
          {i > 0 ? (
            <span className="public-profile-stats-strip__dot" aria-hidden>
              ·
            </span>
          ) : null}
          {p}
        </span>
      ))}
    </p>
  );
}
