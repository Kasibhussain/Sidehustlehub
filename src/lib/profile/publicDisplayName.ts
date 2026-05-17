import type { Job } from "@/types/job";
import type { WorkerProfile } from "@/types/profile";
import type { Service } from "@/types/service";

export function publicDisplayName(
  profile: WorkerProfile | undefined,
  services: Service[],
  postedJobs: Job[],
  clerkFallback?: string | null,
): string {
  return (
    profile?.displayName?.trim() ||
    services[0]?.sellerName ||
    postedJobs[0]?.posterName ||
    clerkFallback?.trim() ||
    "Member"
  );
}
