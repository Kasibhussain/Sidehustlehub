/** Base palette — keep in sync with src/styles/colors.css */
export const palette = {
  cream: "#FEF8EE",
  ink: "#101010",
  charcoal: "#242424",
} as const;

export type PaletteColor = keyof typeof palette;
