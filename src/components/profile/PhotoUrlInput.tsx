"use client";

import { useState } from "react";

export function PhotoUrlInput({
  defaultValue,
}: {
  defaultValue: string;
}) {
  const [val, setVal] = useState(defaultValue);

  return (
    <div className="profile-photo-url-field">
      <input
        name="photoUrl"
        type="url"
        inputMode="url"
        autoComplete="photo"
        placeholder="https://…"
        className="profile-photo-url-field__input"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <div className="profile-photo-url-field__preview">
        {val.trim() ? (
          // eslint-disable-next-line @next/next/no-img-element -- arbitrary user-supplied image URLs
          <img
            src={val.trim()}
            alt=""
            className="profile-photo-url-field__thumb"
          />
        ) : (
          <span className="profile-photo-url-field__placeholder">
            Preview
          </span>
        )}
      </div>
    </div>
  );
}
