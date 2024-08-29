import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
const font = JetBrains_Mono({
  subsets: ["latin", "greek"],
});
const font_sec = IBM_Plex_Sans({
  variable: "--plex-sans",
  weight: ["300"],
  subsets: ["greek", "latin"],
});

export const metadata: Metadata = {
  title: "Λογοτεχνικές διαδρομές στην ιστορία",
  description: `ετήσιο πρόγραμμα φιλαναγνωσίας`,
  authors: [{ name: "Αλεξάνδρα Μητσιάλη" }, { name: "Στράτος Ιλερής" }],
  creator: "Στράτος Ιλερής",
  keywords:
    "λογοτεχνικές διαδρομές στην ιστορία, ετήσιο πρόγραμμα φιλαναγνωσίας, λογοτεχνικές διαδρομές",
  openGraph: {
    emails: [
      "info@logotexnikes-diadromes.gr",
      "support@logotexnikes-diadromes.gr",
    ],
    type: "website",
    siteName: "Λογοτεχνικές διαδρομές στην ιστορία",
    title: "Λογοτεχνικές διαδρομές στην ιστορία",
    url: "https://logotexnikes-diadromes.gr",
    description: `ετήσιο πρόγραμμα φιλαναγνωσίας`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.className} ${font_sec.variable}`}>
        <Layout>{children}</Layout>
        <SpeedInsights
          //@ts-ignore
          beforeSend={async (data) => {
            "use server";
            if (data.url.includes("/announcements/s")) {
              return null;
            }
            return data;
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
