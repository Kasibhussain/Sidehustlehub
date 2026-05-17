"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { applyToJobAction, type JobActionState } from "@/lib/jobs/actions";
import type { Job } from "@/types/job";

function SubmitApplicationButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary btn-lg"
      disabled={pending}
    >
      {pending ? "Submitting…" : "Submit application"}
    </button>
  );
}

export function ApplicationForm({
  jobId,
  job,
}: {
  jobId: string;
  job: Pick<Job, "payType">;
}) {
  const [state, formAction] = useActionState<JobActionState, FormData>(
    applyToJobAction,
    null,
  );

  const needsQuote = job.payType === "offer";

  return (
    <form className="job-form" action={formAction}>
      <input type="hidden" name="jobId" value={jobId} />
      {state?.error && <p className="form-error">{state.error}</p>}

      <label className="form-field">
        <span>Why you&apos;re a good fit</span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Your experience, availability, and how you'd approach the job..."
        />
      </label>

      <label className="form-field">
        <span>
          {needsQuote
            ? "Your proposed quote (£) — required"
            : "Proposed amount (£) — optional"}
        </span>
        <input
          name="proposedAmount"
          type="number"
          min={needsQuote ? 1 : 0}
          step={1}
          required={needsQuote}
          placeholder={needsQuote ? "e.g. 120" : "Optional counter-offer"}
        />
      </label>

      <label className="form-field">
        <span>
          Contact line for the poster (optional, max 120 characters)
        </span>
        <input
          name="contactNote"
          type="text"
          maxLength={120}
          autoComplete="off"
          placeholder="e.g. best email or phone for quick replies"
        />
      </label>

      <SubmitApplicationButton />
    </form>
  );
}
