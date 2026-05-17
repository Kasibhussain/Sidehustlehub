export const THEME_STORAGE_KEY = "sidehustlehub-theme";

export type Theme = "light" | "dark";

export const THEME_COLOR = {
  light: "#fff5f0",
  dark: "#121110",
} as const;

export function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

export function themeColor(theme: Theme): string {
  return THEME_COLOR[theme];
}
