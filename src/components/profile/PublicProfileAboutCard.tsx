import { shortLinkLabel } from "@/lib/profile/shortLink";
import type { WorkerProfile } from "@/types/profile";

export function PublicProfileAboutCard({
  profile,
  variant = "full",
}: {
  profile?: WorkerProfile;
  variant?: "full" | "compact";
}) {
  if (!profile) {
    return null;
  }

  const hasBio = Boolean(profile.bio?.trim());
  const hasSkills = profile.skills.length > 0;
  const hasAvailability = Boolean(profile.availabilityNote?.trim());
  const availabilityText = profile.availabilityNote?.trim() ?? "";
  const hasRadius =
    profile.serviceRadiusKm != null && profile.serviceRadiusKm > 0;
  const hasPortfolio = profile.portfolioUrls.length > 0;

  if (
    !hasBio &&
    !hasSkills &&
    !hasAvailability &&
    !hasRadius &&
    !hasPortfolio
  ) {
    return null;
  }

  return (
    <div
      className={`public-profile-about${variant === "compact" ? " public-profile-about--compact" : ""}`}
    >
      {hasBio ? (
        <div className="public-profile-about__block">
          <h2 className="public-profile-about__heading">About</h2>
          <p className="public-profile-about__bio">{profile.bio.trim()}</p>
        </div>
      ) : null}

      {hasSkills ? (
        <div className="public-profile-about__block">
          <h2 className="public-profile-about__heading">Skills</h2>
          <ul className="public-profile-about__skills" aria-label="Skills">
            {profile.skills.map((s) => (
              <li key={s} className="profile-skill-pill">
                {s}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {(hasAvailability || hasRadius) && (
        <div className="public-profile-about__block public-profile-about__meta-grid">
          {hasAvailability ? (
            <div>
              <h3 className="public-profile-about__subheading">Availability</h3>
              <p className="public-profile-about__meta-text">
                {availabilityText}
              </p>
            </div>
          ) : null}
          {hasRadius ? (
            <div>
              <h3 className="public-profile-about__subheading">Travel radius</h3>
              <p className="public-profile-about__meta-text">
                Up to {profile.serviceRadiusKm} km for in-person work
              </p>
            </div>
          ) : null}
        </div>
      )}

      {hasPortfolio ? (
        <div className="public-profile-about__block">
          <h2 className="public-profile-about__heading">Portfolio & links</h2>
          <ul className="public-profile-portfolio">
            {profile.portfolioUrls.map((url) => (
              <li key={url}>
                <a href={url} rel="noopener noreferrer" target="_blank">
                  {shortLinkLabel(url)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
