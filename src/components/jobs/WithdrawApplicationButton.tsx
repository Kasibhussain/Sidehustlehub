"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  withdrawApplicationFormAction,
  type JobActionState,
} from "@/lib/jobs/actions";

function WithdrawSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-ghost btn-sm withdraw-app-btn"
      disabled={pending}
    >
      {pending ? "…" : "Withdraw"}
    </button>
  );
}

export function WithdrawApplicationButton({
  applicationId,
  jobId,
}: {
  applicationId: string;
  jobId: string;
}) {
  const [state, formAction] = useActionState<
    JobActionState,
    FormData
  >(withdrawApplicationFormAction, null);

  return (
    <form action={formAction} className="withdraw-app-inline-form">
      <input type="hidden" name="applicationId" value={applicationId} />
      <input type="hidden" name="jobId" value={jobId} />
      {state?.error && (
        <span className="form-error-inline">{state.error}</span>
      )}
      <WithdrawSubmit />
    </form>
  );
}
