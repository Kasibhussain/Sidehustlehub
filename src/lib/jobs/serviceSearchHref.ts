import { JOB_CATEGORIES } from "@/lib/jobs/constants";

export type ServicesUrlState = {
  category?: string;
  subcategory?: string;
  q?: string;
};

function first(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

export function parseServicesUrl(
  sp: Record<string, string | string[] | undefined>,
): ServicesUrlState {
  const category = first(sp.category);
  const subcategory = first(sp.subcategory);
  const q = first(sp.q);

  const catOk =
    category && JOB_CATEGORIES.includes(category as (typeof JOB_CATEGORIES)[number])
      ? category
      : undefined;

  return {
    category: catOk,
    subcategory: subcategory || undefined,
    q: q || undefined,
  };
}

export function servicesHref(
  base: ServicesUrlState,
  patch: Partial<ServicesUrlState>,
): string {
  const merged: ServicesUrlState = { ...base, ...patch };

  if (patch.category !== undefined && patch.category !== base.category) {
    merged.subcategory = undefined;
  }

  const p = new URLSearchParams();
  if (merged.category) p.set("category", merged.category);
  if (merged.subcategory) p.set("subcategory", merged.subcategory);
  if (merged.q) p.set("q", merged.q);

  const qs = p.toString();
  return qs ? `/services?${qs}` : "/services";
}
