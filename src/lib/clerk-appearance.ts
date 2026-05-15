import { palette } from "./colors";

const inkBorder = `color-mix(in srgb, ${palette.ink} 12%, transparent)`;
const inkMuted = "rgba(16, 16, 16, 0.55)";

export const clerkAppearance = {
  variables: {
    colorPrimary: palette.ink,
    colorDanger: "#c94a4a",
    colorSuccess: palette.ink,
    colorWarning: palette.charcoal,
    colorNeutral: palette.charcoal,
    colorForeground: palette.ink,
    colorBackground: palette.cream,
    colorInputBackground: palette.cream,
    colorInputText: palette.ink,
    colorText: palette.ink,
    colorTextSecondary: inkMuted,
    borderRadius: "0.5rem",
    fontFamily: "var(--font-dm-sans), sans-serif",
    fontFamilyButtons: "var(--font-syne), sans-serif",
  },
  elements: {
    rootBox: { width: "100%" },
    card: {
      background: palette.cream,
      border: `1px solid ${inkBorder}`,
      boxShadow: "none",
    },
    headerTitle: {
      fontFamily: "var(--font-syne), sans-serif",
      fontWeight: "800",
    },
    formButtonPrimary: {
      background: palette.ink,
      color: palette.cream,
      fontFamily: "var(--font-syne), sans-serif",
      fontWeight: "700",
      "&:hover": {
        background: palette.charcoal,
      },
    },
    footerActionLink: { color: palette.ink },
    identityPreviewEditButton: { color: palette.ink },
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
