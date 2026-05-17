"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  toggleSavedJobAction,
  type SavedJobToggleState,
} from "@/lib/jobs/actions";

function SaveJobSubmit({ saved }: { saved: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`btn btn-secondary btn-sm save-job-btn${saved ? " save-job-btn--saved" : ""}`}
      disabled={pending}
      aria-pressed={saved}
    >
      {pending ? "…" : saved ? "Saved" : "Save job"}
    </button>
  );
}

export function SaveJobButton({
  jobId,
  initialSaved,
}: {
  jobId: string;
  initialSaved: boolean;
}) {
  const [saved, setSaved] = useState(initialSaved);
  const [state, formAction] = useActionState<SavedJobToggleState, FormData>(
    toggleSavedJobAction,
    { saved: initialSaved },
  );

  useEffect(() => {
    if (state?.saved !== undefined) {
      setSaved(state.saved);
    }
  }, [state]);

  return (
    <form action={formAction} className="save-job-inline-form">
      <input type="hidden" name="jobId" value={jobId} />
      <SaveJobSubmit saved={saved} />
    </form>
  );
}
