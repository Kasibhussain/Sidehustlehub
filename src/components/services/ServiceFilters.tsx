import Link from "next/link";
import { JOB_CATEGORIES, subcategoriesFor } from "@/lib/jobs/constants";
import type { ServicesUrlState } from "@/lib/jobs/serviceSearchHref";
import { servicesHref } from "@/lib/jobs/serviceSearchHref";

export function ServiceFilters({ state }: { state: ServicesUrlState }) {
  const subcats = state.category ? subcategoriesFor(state.category) : [];

  return (
    <div className="job-filters-wrap">
      <div className="job-filters">
        <Link
          href={servicesHref(state, {
            category: undefined,
            subcategory: undefined,
          })}
          className={`filter-pill${!state.category ? " filter-pill-active" : ""}`}
        >
          All
        </Link>
        {JOB_CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={servicesHref(state, { category: cat })}
            className={`filter-pill${state.category === cat ? " filter-pill-active" : ""}`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {state.category && subcats.length > 0 && (
        <div className="job-filters job-filters-sub">
          <Link
            href={servicesHref(state, { subcategory: undefined })}
            className={`filter-pill${!state.subcategory ? " filter-pill-active" : ""}`}
          >
            All in {state.category}
          </Link>
          {subcats.map((sub) => (
            <Link
              key={sub}
              href={servicesHref(state, { subcategory: sub })}
              className={`filter-pill${state.subcategory === sub ? " filter-pill-active" : ""}`}
            >
              {sub}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
