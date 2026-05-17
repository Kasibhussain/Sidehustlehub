"use client";

import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function AppHeader() {
  const { isSignedIn, isLoaded } = useAuth();
  const pathname = usePathname();
  const jobsActive =
    pathname === "/jobs" || pathname.startsWith("/jobs/");
  const servicesActive =
    pathname === "/services" || pathname.startsWith("/services/");

  return (
    <header>
      <nav
        aria-label="Primary navigation"
        data-session={isLoaded && isSignedIn ? "workspace" : "guest"}
      >
        <Link href="/" className="logo">
          Side<span>Hustle</span>Hub
        </Link>

        <div className="nav-links">
          <Link
            href="/jobs"
            className={`nav-link${jobsActive ? " nav-link--active" : ""}`}
          >
            Jobs
          </Link>
          <Link
            href="/services"
            className={`nav-link${servicesActive ? " nav-link--active" : ""}`}
          >
            Services
          </Link>
        </div>

        <div className="nav-actions">
          <ThemeToggle />
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
