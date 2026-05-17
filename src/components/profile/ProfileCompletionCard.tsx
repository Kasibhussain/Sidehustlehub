import { getProfileCompletion } from "@/lib/profile/completion";
import type { WorkerProfile } from "@/types/profile";

export function ProfileCompletionCard({
  profile,
}: {
  profile?: WorkerProfile;
}) {
  const { percent, items } = getProfileCompletion(profile);

  return (
    <div className="profile-completion-card">
      <div className="profile-completion-card__head">
        <p className="eyebrow profile-completion-card__eyebrow">Profile strength</p>
        <p className="profile-completion-card__percent" aria-live="polite">
          {percent}%
        </p>
      </div>
      <div
        className="profile-completion-bar"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Profile completion"
      >
        <div
          className="profile-completion-bar__fill"
          style={{ width: `${percent}%` }}
        />
      </div>
      <ul className="profile-completion-list">
        {items.map((item) => (
          <li
            key={item.id}
            className={`profile-completion-list__item${item.done ? " profile-completion-list__item--done" : ""}`}
          >
            <span className="profile-completion-list__mark" aria-hidden>
              {item.done ? "✓" : "○"}
            </span>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
