"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(e?: FormEvent) {
    e?.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setError(true);
      setTimeout(() => setError(false), 1500);
      return;
    }
    setSubmitted(true);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSubmit();
  }

  if (submitted) {
    return (
      <div className="success-msg show" role="status">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <circle cx="8" cy="8" r="7" stroke="#c8f135" strokeWidth="1.5" />
          <path
            d="M5 8l2 2 4-4"
            stroke="#c8f135"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        You&apos;re on the list — we&apos;ll be in touch.
      </div>
    );
  }

  return (
    <>
      <form className="waitlist" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          style={error ? { borderColor: "#ff4444" } : undefined}
        />
        <button type="submit">Join the Waitlist</button>
      </form>
      <p className="form-note">No spam. We&apos;ll notify you when we launch.</p>
    </>
  );
}
