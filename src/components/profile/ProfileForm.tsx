"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { saveProfileAction, type JobActionState } from "@/lib/jobs/actions";
import type { WorkerProfile } from "@/types/profile";

function SubmitProfileButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary btn-lg" disabled={pending}>
      {pending ? "Saving…" : "Save profile"}
    </button>
  );
}

export function ProfileForm({
  initial,
  userName,
}: {
  initial?: WorkerProfile;
  userName: string;
}) {
  const [state, formAction] = useActionState<JobActionState, FormData>(
    saveProfileAction,
    null,
  );

  const displayName = initial?.displayName ?? userName;
  const skills = initial?.skills?.join(", ") ?? "";

  return (
    <form className="job-form" action={formAction}>
      {state?.error && <p className="form-error">{state.error}</p>}

      <label className="form-field">
        <span>Display name</span>
        <input name="displayName" required defaultValue={displayName} />
      </label>

      <label className="form-field">
        <span>Bio</span>
        <textarea
          name="bio"
          rows={4}
          placeholder="What do you do? Who do you help?"
          defaultValue={initial?.bio ?? ""}
        />
      </label>

      <label className="form-field">
        <span>Skills (comma-separated)</span>
        <input
          name="skills"
          placeholder="Design, delivery, tutoring…"
          defaultValue={skills}
        />
      </label>

      <label className="form-field">
        <span>Location</span>
        <input
          name="location"
          placeholder="e.g. Manchester or Remote"
          defaultValue={initial?.location ?? ""}
        />
      </label>

      <label className="form-field">
        <span>Photo URL (optional)</span>
        <input
          name="photoUrl"
          type="url"
          placeholder="https://…"
          defaultValue={initial?.photoUrl ?? ""}
        />
      </label>

      <label className="form-field">
        <span>Portfolio links (one per line)</span>
        <textarea
          name="portfolioUrls"
          rows={3}
          placeholder="https://…"
          defaultValue={initial?.portfolioUrls?.join("\n") ?? ""}
        />
      </label>

      <label className="form-field">
        <span>Availability</span>
        <input
          name="availabilityNote"
          placeholder="e.g. Weekday evenings"
          defaultValue={initial?.availabilityNote ?? ""}
        />
      </label>

      <label className="form-field">
        <span>Service radius (km, optional)</span>
        <input
          name="serviceRadiusKm"
          type="number"
          min={0}
          step={1}
          placeholder="Leave blank for remote / not specified"
          defaultValue={initial?.serviceRadiusKm ?? ""}
        />
      </label>

      <SubmitProfileButton />
    </form>
  );
}
