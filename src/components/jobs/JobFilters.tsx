import Link from "next/link";
import { JOB_CATEGORIES, subcategoriesFor } from "@/lib/jobs/constants";
import type { JobsUrlState } from "@/lib/jobs/jobSearchHref";
import { jobsHref } from "@/lib/jobs/jobSearchHref";

export function JobFilters({ state }: { state: JobsUrlState }) {
  const subcats = state.category ? subcategoriesFor(state.category) : [];

  return (
    <div className="job-filters-wrap">
      <div className="job-filters">
        <Link
          href={jobsHref(state, {
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
            href={jobsHref(state, { category: cat })}
            className={`filter-pill${state.category === cat ? " filter-pill-active" : ""}`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {state.category && subcats.length > 0 && (
        <div className="job-filters job-filters-sub">
          <Link
            href={jobsHref(state, { subcategory: undefined })}
            className={`filter-pill${!state.subcategory ? " filter-pill-active" : ""}`}
          >
            All in {state.category}
          </Link>
          {subcats.map((sub) => (
            <Link
              key={sub}
              href={jobsHref(state, { subcategory: sub })}
              className={`filter-pill${state.subcategory === sub ? " filter-pill-active" : ""}`}
            >
              {sub}
            </Link>
          ))}
        </div>
      )}

      <div className="job-filters job-filters-row">
        <Link
          href={jobsHref(state, {
            urgency: state.urgency === "asap" ? undefined : "asap",
          })}
          className={`filter-pill${state.urgency === "asap" ? " filter-pill-active" : ""}`}
        >
          ASAP
        </Link>
        <Link
          href={jobsHref(state, {
            engagementType:
              state.engagementType === "ongoing" ? undefined : "ongoing",
          })}
          className={`filter-pill${state.engagementType === "ongoing" ? " filter-pill-active" : ""}`}
        >
          Ongoing
        </Link>
        <Link
          href={jobsHref(state, {
            payType: state.payType === "offer" ? undefined : "offer",
          })}
          className={`filter-pill${state.payType === "offer" ? " filter-pill-active" : ""}`}
        >
          Open to offers
        </Link>
      </div>

      <p className="job-filters-section-label">Sort</p>
      <div className="job-filters job-filters-row">
        <Link
          href={jobsHref(state, { sort: undefined })}
          className={`filter-pill${!state.sort ? " filter-pill-active" : ""}`}
        >
          Newest
        </Link>
        <Link
          href={jobsHref(state, { sort: "budget_high" })}
          className={`filter-pill${state.sort === "budget_high" ? " filter-pill-active" : ""}`}
        >
          Budget high
        </Link>
        <Link
          href={jobsHref(state, { sort: "budget_low" })}
          className={`filter-pill${state.sort === "budget_low" ? " filter-pill-active" : ""}`}
        >
          Budget low
        </Link>
        <Link
          href={jobsHref(state, { sort: "deadline_soon" })}
          className={`filter-pill${state.sort === "deadline_soon" ? " filter-pill-active" : ""}`}
        >
          Deadline soon
        </Link>
      </div>
    </div>
  );
}
