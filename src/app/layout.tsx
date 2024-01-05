import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
const font = JetBrains_Mono({
  subsets: ["latin", "greek"],
});

export const metadata: Metadata = {
  title: "Λογοτεχνικές διαδρομές στην ιστορία",
  description: `ετήσιο πρόγραμμα φιλαναγνωσίας`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Layout>{children}</Layout>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
