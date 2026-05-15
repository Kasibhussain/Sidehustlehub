"use client";

import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { createServiceAction, type JobActionState } from "@/lib/jobs/actions";
import { JOB_CATEGORIES, subcategoriesFor } from "@/lib/jobs/constants";

function SubmitServiceButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary btn-lg"
      disabled={pending}
    >
      {pending ? "Publishing…" : "Publish service"}
    </button>
  );
}

export function ServiceForm() {
  const [category, setCategory] = useState("");
  const [state, formAction] = useActionState<JobActionState, FormData>(
    createServiceAction,
    null,
  );

  const subcats = useMemo(() => subcategoriesFor(category), [category]);

  return (
    <form className="job-form" action={formAction}>
      {state?.error && <p className="form-error">{state.error}</p>}

      <label className="form-field">
        <span>Title</span>
        <input
          name="title"
          required
          placeholder="e.g. I will design a one-page landing in Figma"
        />
      </label>

      <label className="form-field">
        <span>Description</span>
        <textarea
          name="description"
          required
          rows={5}
          placeholder="What’s included, what you need from the buyer, and timeline."
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
          <select name="subcategory" disabled={!category} defaultValue="">
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

      <div className="form-row">
        <label className="form-field">
          <span>Fixed price (£)</span>
          <input
            name="price"
            type="number"
            min={1}
            step={1}
            required
            placeholder="99"
          />
        </label>

        <label className="form-field">
          <span>Delivery note (optional)</span>
          <input name="deliveryNote" placeholder="e.g. 3-day turnaround" />
        </label>
      </div>

      <SubmitServiceButton />
    </form>
  );
}
