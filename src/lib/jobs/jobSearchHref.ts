import type { EngagementType, PayType, Urgency } from "@/types/job";

export type JobsUrlState = {
  category?: string;
  subcategory?: string;
  urgency?: Urgency;
  engagementType?: EngagementType;
  payType?: PayType;
  q?: string;
};

function first(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

export function parseJobsUrl(
  sp: Record<string, string | string[] | undefined>,
): JobsUrlState {
  const category = first(sp.category);
  const subcategory = first(sp.subcategory);
  const q = first(sp.q);
  const u = first(sp.urgency);
  const urgency: Urgency | undefined =
    u === "asap" || u === "flexible" ? u : undefined;
  const e = first(sp.engagementType);
  const engagementType: EngagementType | undefined =
    e === "one_off" || e === "ongoing" ? e : undefined;
  const pt = first(sp.payType);
  const payType: PayType | undefined =
    pt === "fixed" || pt === "hourly" || pt === "offer" ? pt : undefined;

  return {
    category: category || undefined,
    subcategory: subcategory || undefined,
    urgency,
    engagementType,
    payType,
    q: q || undefined,
  };
}

export function jobsHref(
  base: JobsUrlState,
  patch: Partial<JobsUrlState>,
): string {
  const merged: JobsUrlState = { ...base, ...patch };

  if (patch.category !== undefined && patch.category !== base.category) {
    merged.subcategory = undefined;
  }

  const p = new URLSearchParams();
  if (merged.category) p.set("category", merged.category);
  if (merged.subcategory) p.set("subcategory", merged.subcategory);
  if (merged.urgency) p.set("urgency", merged.urgency);
  if (merged.engagementType) {
    p.set("engagementType", merged.engagementType);
  }
  if (merged.payType) p.set("payType", merged.payType);
  if (merged.q) p.set("q", merged.q);

  const qs = p.toString();
  return qs ? `/jobs?${qs}` : "/jobs";
}
