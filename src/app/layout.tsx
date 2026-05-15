import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { AppHeader } from "@/components/AppHeader";
import { clerkAppearance } from "@/lib/clerk-appearance";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "SideHustleHub — Your Next Hustle Starts Here",
  description:
    "The marketplace connecting people who want work done with people ready to do it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${dmSans.variable}`}>
        <ClerkProvider appearance={clerkAppearance}>
          <AppHeader />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
