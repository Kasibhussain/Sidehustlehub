"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { saveProfileAction, type JobActionState } from "@/lib/jobs/actions";
import type { WorkerProfile } from "@/types/profile";
import { PhotoUrlInput } from "./PhotoUrlInput";

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
    <form className="job-form profile-edit-form" action={formAction}>
      {state?.error && <p className="form-error">{state.error}</p>}

      <fieldset className="profile-form-section">
        <legend className="profile-form-section-title">Identity</legend>
        <label className="form-field">
          <span>Display name</span>
          <input name="displayName" required defaultValue={displayName} />
        </label>

        <label className="form-field">
          <span>Bio</span>
          <textarea
            name="bio"
            rows={5}
            placeholder="What do you do? Who do you help? What makes you reliable?"
            defaultValue={initial?.bio ?? ""}
          />
          <span className="form-hint">
            Aim for at least 30 characters — it boosts your profile strength score.
          </span>
        </label>

        <label className="form-field">
          <span>Location</span>
          <input
            name="location"
            placeholder="e.g. Manchester, London, or Remote"
            defaultValue={initial?.location ?? ""}
          />
        </label>

        <label className="form-field">
          <span>Profile photo URL</span>
          <span className="form-hint">
            Link to an image (e.g. from your site or a trusted host). Shown on your
            public page; falls back to your account avatar if empty.
          </span>
          <PhotoUrlInput defaultValue={initial?.photoUrl ?? ""} />
        </label>
      </fieldset>

      <fieldset className="profile-form-section">
        <legend className="profile-form-section-title">Skills & work</legend>
        <label className="form-field">
          <span>Skills (comma-separated)</span>
          <input
            name="skills"
            placeholder="Design, delivery, tutoring, assembly…"
            defaultValue={skills}
          />
        </label>

        <label className="form-field">
          <span>Portfolio links (one per line)</span>
          <textarea
            name="portfolioUrls"
            rows={4}
            placeholder="https://…"
            defaultValue={initial?.portfolioUrls?.join("\n") ?? ""}
          />
        </label>
      </fieldset>

      <fieldset className="profile-form-section">
        <legend className="profile-form-section-title">Availability</legend>
        <label className="form-field">
          <span>When you&apos;re typically free</span>
          <input
            name="availabilityNote"
            placeholder="e.g. Weekday evenings · Not Sundays"
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
            placeholder="Leave blank for remote-only or unspecified"
            defaultValue={initial?.serviceRadiusKm ?? ""}
          />
          <span className="form-hint">
            Rough distance you&apos;ll travel from your location for in-person gigs.
          </span>
        </label>
      </fieldset>

      <SubmitProfileButton />
    </form>
  );
}
