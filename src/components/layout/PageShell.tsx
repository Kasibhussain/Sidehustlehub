import { SiteFooter } from "@/components/SiteFooter";

export function PageShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <div className="glow" />
      <div className="glow glow-left" />
      <main className={`page-main ${className}`.trim()}>{children}</main>
      <SiteFooter />
    </>
  );
}
