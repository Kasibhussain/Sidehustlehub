"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { closeJobFormAction, type JobActionState } from "@/lib/jobs/actions";

function CloseSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-secondary" disabled={pending}>
      {pending ? "Closing…" : "Close job"}
    </button>
  );
}

export function CloseJobButton({ jobId }: { jobId: string }) {
  const [state, formAction] = useActionState<JobActionState, FormData>(
    closeJobFormAction,
    null,
  );

  return (
    <form action={formAction} className="inline-form">
      <input type="hidden" name="jobId" value={jobId} />
      {state?.error && <p className="form-error">{state.error}</p>}
      <CloseSubmitButton />
    </form>
  );
}
