/** Readable label for portfolio / external URLs on profile UIs. */
export function shortLinkLabel(url: string): string {
  const raw = url.trim();
  if (!raw) return "";
  try {
    const u = new URL(raw);
    const path =
      u.pathname.length > 22
        ? `${u.pathname.slice(0, 20)}…`
        : u.pathname;
    const pathPart = path === "/" ? "" : path;
    return `${u.hostname}${pathPart}`;
  } catch {
    return raw.length > 42 ? `${raw.slice(0, 40)}…` : raw;
  }
}
