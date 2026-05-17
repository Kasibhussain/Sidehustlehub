import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import type { ReactNode } from "react";
import { AppHeader } from "@/components/AppHeader";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { Providers } from "./providers";
import "@/styles/colors.css";
import "./globals.css";

/** Display — expressive grotesk: personality without “AI template” poster fonts. */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
});

/** UI + paragraphs — friendly, readable, a bit more energy than generic sans. */
const sans = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SideHustleHub — Your Next Hustle Starts Here",
  description:
    "The marketplace connecting people who want work done with people ready to do it.",
};

export const viewport: Viewport = {
  themeColor: "#fff5f0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${display.variable} ${sans.variable}`}
        suppressHydrationWarning
      >
        <Providers>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <AppHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
