"use client";

import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export function AppHeader() {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          Side<span>Hustle</span>Hub
        </Link>

        <div className="nav-links">
          <Link href="/jobs" className="nav-link">
            Jobs
          </Link>
          <Link href="/services" className="nav-link">
            Services
          </Link>
        </div>

        <div className="nav-actions">
          <Show when="signed-out">
            <SignInButton mode="redirect">
              <button type="button" className="btn btn-ghost">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="redirect">
              <button type="button" className="btn btn-primary">
                Get started
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link href="/dashboard" className="btn btn-ghost">
              Dashboard
            </Link>
            <Link href="/profile" className="btn btn-ghost">
              Profile
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: { width: 36, height: 36 },
                },
              }}
            />
          </Show>
        </div>
      </nav>
    </header>
  );
}
