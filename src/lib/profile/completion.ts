import type { WorkerProfile } from "@/types/profile";

export type ProfileCompletionItem = {
  id: string;
  label: string;
  done: boolean;
};

const BIO_MIN = 30;

export function getProfileCompletion(
  profile: WorkerProfile | undefined,
): { percent: number; items: ProfileCompletionItem[] } {
  const items: ProfileCompletionItem[] = [
    {
      id: "bio",
      label: `Bio (${BIO_MIN}+ characters)`,
      done: (profile?.bio?.trim().length ?? 0) >= BIO_MIN,
    },
    {
      id: "skills",
      label: "At least one skill",
      done: (profile?.skills?.length ?? 0) > 0,
    },
    {
      id: "location",
      label: "Location or service area",
      done: Boolean(profile?.location?.trim()),
    },
    {
      id: "photo",
      label: "Profile photo URL",
      done: Boolean(profile?.photoUrl?.trim()),
    },
    {
      id: "portfolio",
      label: "Portfolio or sample link",
      done: (profile?.portfolioUrls?.length ?? 0) > 0,
    },
    {
      id: "availability",
      label: "Availability",
      done: Boolean(profile?.availabilityNote?.trim()),
    },
    {
      id: "radius",
      label: "Service radius (for local work)",
      done:
        profile?.serviceRadiusKm != null && profile.serviceRadiusKm > 0,
    },
  ];

  const doneCount = items.filter((i) => i.done).length;
  const percent = Math.round((doneCount / items.length) * 100);
  return { percent, items };
}
