import { palette } from "./colors";

const inkBorder = `color-mix(in srgb, ${palette.ink} 12%, transparent)`;
const inkMuted = "rgba(20, 17, 16, 0.55)";

export const clerkAppearance = {
  variables: {
    colorPrimary: palette.brand,
    colorDanger: "#c94a4a",
    colorSuccess: "#15803d",
    colorWarning: "#a16207",
    colorNeutral: palette.charcoal,
    colorForeground: palette.ink,
    colorBackground: palette.cream,
    colorInputBackground: palette.cream,
    colorInputText: palette.ink,
    colorText: palette.ink,
    colorTextSecondary: inkMuted,
    borderRadius: "0.5rem",
    fontFamily: "var(--font-sans), system-ui, sans-serif",
    fontFamilyButtons: "var(--font-sans), system-ui, sans-serif",
  },
  elements: {
    rootBox: { width: "100%" },
    card: {
      background: palette.cream,
      border: `1px solid ${inkBorder}`,
      boxShadow: "none",
    },
    headerTitle: {
      fontFamily: "var(--font-display), system-ui, sans-serif",
      fontWeight: "700",
    },
    formButtonPrimary: {
      background: palette.brand,
      color: "#ffffff",
      fontFamily: "var(--font-sans), system-ui, sans-serif",
      fontWeight: "600",
      "&:hover": {
        background: palette.brandDeep,
      },
    },
    footerActionLink: { color: palette.brand },
    identityPreviewEditButton: { color: palette.brand },
    formFieldInput: {
      background: palette.cream,
      border: `1px solid ${inkBorder}`,
    },
    dividerLine: { background: inkBorder },
    dividerText: { color: inkMuted },
    socialButtonsBlockButton: {
      border: `1px solid ${inkBorder}`,
      background: palette.cream,
    },
    navbarButton: { color: palette.ink },
    userButtonPopoverCard: {
      background: palette.cream,
      border: `1px solid ${inkBorder}`,
    },
  },
};
