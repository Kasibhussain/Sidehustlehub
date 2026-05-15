import Link from "next/link";
export function AuthShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <>
      <div className="glow" />
      <div className="glow glow-left" />
      <main className="auth-shell">
        <div className="auth-shell-copy">
          <p className="eyebrow auth-eyebrow">SideHustleHub</p>
          <h1 className="auth-title">{title}</h1>
          <p className="auth-subtitle">{subtitle}</p>
          <ul className="auth-perks">
            <li>Post gigs or pick up work on your schedule</li>
            <li>Connect directly — no middlemen</li>
            <li>Built for hustlers and posters in Manchester & beyond</li>
          </ul>
        </div>
        <div className="auth-shell-form">{children}</div>
      </main>
      <footer className="auth-footer">
        <Link href="/" className="footer-logo">
          Side<span>Hustle</span>Hub
        </Link>
      </footer>
    </>
  );
}
