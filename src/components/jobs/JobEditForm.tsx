"use client";

import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { updateJobAction, type JobActionState } from "@/lib/jobs/actions";
import { JOB_CATEGORIES, subcategoriesFor } from "@/lib/jobs/constants";
import { toDatetimeLocalValue } from "@/lib/jobs/format";
import type { Job } from "@/types/job";

function SubmitJobEditButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary btn-lg"
      disabled={pending}
    >
      {pending ? "Saving…" : "Save changes"}
    </button>
  );
}

export function JobEditForm({ job }: { job: Job }) {
  const [category, setCategory] = useState(job.category);
  const [state, formAction] = useActionState<JobActionState, FormData>(
    updateJobAction,
    null,
  );

  const subcats = useMemo(() => subcategoriesFor(category), [category]);

  return (
    <form className="job-form" action={formAction}>
      <input type="hidden" name="jobId" value={job.id} />
      {state?.error && <p className="form-error">{state.error}</p>}

      <label className="form-field">
        <span>Job title</span>
        <input name="title" required defaultValue={job.title} />
      </label>

      <label className="form-field">
        <span>Description</span>
        <textarea
          name="description"
          required
          rows={5}
          defaultValue={job.description}
        />
      </label>

      <div className="form-row">
        <label className="form-field">
          <span>Category</span>
          <select
            name="category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {JOB_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span>Subcategory</span>
          <select
            name="subcategory"
            disabled={!category}
            defaultValue={job.subcategory ?? ""}
          >
            <option value="">Optional</option>
            {subcats.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="form-field">
        <span>Location</span>
        <input name="location" required defaultValue={job.location} />
      </label>

      <div className="form-row">
        <label className="form-field">
          <span>Engagement</span>
          <select
            name="engagementType"
            defaultValue={job.engagementType}
          >
            <option value="one_off">One-off</option>
            <option value="ongoing">Ongoing</option>
          </select>
        </label>
        <label className="form-field">
          <span>Urgency</span>
          <select name="urgency" defaultValue={job.urgency}>
            <option value="flexible">Flexible</option>
            <option value="asap">ASAP</option>
          </select>
        </label>
      </div>

      <label className="form-field">
        <span>Deadline (optional)</span>
        <input
          name="deadlineAt"
          type="datetime-local"
          defaultValue={toDatetimeLocalValue(job.deadlineAt)}
        />
      </label>

      <div className="form-row">
        <label className="form-field">
          <span>Pay type</span>
          <select name="payType" defaultValue={job.payType}>
            <option value="fixed">Fixed price</option>
            <option value="hourly">Hourly</option>
            <option value="offer">Accept offers / quotes</option>
          </select>
        </label>

        <label className="form-field">
          <span>Amount (£)</span>
          <input
            name="payAmount"
            type="number"
            min={0}
            step={1}
            defaultValue={job.payAmount}
          />
        </label>
      </div>

      <label className="form-field">
        <span>Max budget (optional, for a range)</span>
        <input
          name="payAmountMax"
          type="number"
          min={0}
          step={1}
          defaultValue={job.payAmountMax ?? ""}
          placeholder="e.g. upper limit"
        />
      </label>

      <SubmitJobEditButton />
    </form>
  );
}
