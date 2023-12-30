import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Button from "@/components/button";
const font = JetBrains_Mono({
  subsets: ["latin", "greek"],
});

export const metadata: Metadata = {
  title: "λογοτεχνικές διαδρομές",
  description: `Οι "Λογοτεχνικές διαδρομές στην ιστορία" είναι ετήσιο πρόγραμμα φιλαναγνωσίας. 
      Με κέντρο τη νεώτερη ιστορία της Ελλάδας επιδιώκει να φέρει τα παιδιά σε επαφή με τη μνήμη
       και την ιστορία, όπως την κατέγραψαν μέσα στο έργο τους σημαντικές συγγραφείς της ελληνικής λογοτεχνίας.`,
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
