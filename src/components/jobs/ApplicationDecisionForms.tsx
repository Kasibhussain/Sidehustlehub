"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  acceptApplicationFormAction,
  rejectApplicationFormAction,
  type JobActionState,
} from "@/lib/jobs/actions";

function AcceptButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Accepting…" : "Accept"}
    </button>
  );
}

function RejectButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-secondary" disabled={pending}>
      {pending ? "Rejecting…" : "Reject"}
    </button>
  );
}

export function ApplicationDecisionForms({
  jobId,
  applicationId,
}: {
  jobId: string;
  applicationId: string;
}) {
  const [acceptState, acceptAction] = useActionState<JobActionState, FormData>(
    acceptApplicationFormAction,
    null,
  );
  const [rejectState, rejectAction] = useActionState<JobActionState, FormData>(
    rejectApplicationFormAction,
    null,
  );

  const err = acceptState?.error ?? rejectState?.error;

  return (
    <div className="application-actions">
      {err && <p className="form-error application-action-error">{err}</p>}
      <form action={acceptAction} className="inline-form">
        <input type="hidden" name="jobId" value={jobId} />
        <input type="hidden" name="applicationId" value={applicationId} />
        <AcceptButton />
      </form>
      <form action={rejectAction} className="inline-form">
        <input type="hidden" name="jobId" value={jobId} />
        <input type="hidden" name="applicationId" value={applicationId} />
        <RejectButton />
      </form>
    </div>
  );
}
