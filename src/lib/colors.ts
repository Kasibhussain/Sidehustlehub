/** Base + brand — keep in sync with src/styles/colors.css */
export const palette = {
  cream: "#FFF5F0",
  ink: "#141110",
  charcoal: "#2A2624",
  brand: "#e11d48",
  brandDeep: "#9f1239",
} as const;

export type PaletteColor = keyof typeof palette;
