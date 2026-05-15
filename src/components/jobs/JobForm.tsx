"use client";

import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { createJobAction, type JobActionState } from "@/lib/jobs/actions";
import { JOB_CATEGORIES, subcategoriesFor } from "@/lib/jobs/constants";

function SubmitJobButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary btn-lg"
      disabled={pending}
    >
      {pending ? "Posting…" : "Post job"}
    </button>
  );
}

export function JobForm() {
  const [category, setCategory] = useState("");
  const [state, formAction] = useActionState<JobActionState, FormData>(
    createJobAction,
    null,
  );

  const subcats = useMemo(() => subcategoriesFor(category), [category]);

  return (
    <form className="job-form" action={formAction}>
      {state?.error && <p className="form-error">{state.error}</p>}

      <label className="form-field">
        <span>Job title</span>
        <input name="title" required placeholder="e.g. Help move boxes" />
      </label>

      <label className="form-field">
        <span>Description</span>
        <textarea
          name="description"
          required
          rows={5}
          placeholder="What needs doing, when, and any requirements..."
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
            <option value="" disabled>
              Select category
            </option>
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
            defaultValue=""
          >
            <option value="">
              {category ? "Optional" : "Pick a category first"}
            </option>
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
        <input
          name="location"
          required
          placeholder="e.g. Manchester or Remote"
        />
      </label>

      <div className="form-row">
        <label className="form-field">
          <span>Engagement</span>
          <select name="engagementType" defaultValue="one_off">
            <option value="one_off">One-off</option>
            <option value="ongoing">Ongoing</option>
          </select>
        </label>
        <label className="form-field">
          <span>Urgency</span>
          <select name="urgency" defaultValue="flexible">
            <option value="flexible">Flexible</option>
            <option value="asap">ASAP</option>
          </select>
        </label>
      </div>

      <label className="form-field">
        <span>Deadline (optional)</span>
        <input name="deadlineAt" type="datetime-local" />
      </label>

      <div className="form-row">
        <label className="form-field">
          <span>Pay type</span>
          <select name="payType" defaultValue="fixed">
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
            placeholder="50 (or 0 for offers)"
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
          placeholder="e.g. upper limit"
        />
      </label>

      <SubmitJobButton />
    </form>
  );
}
