import type { Metadata } from "next";
import { JetBrains_Mono, Roboto } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout";

const font = JetBrains_Mono({
  subsets: ["latin", "greek"],
});
const roboto = Roboto({
  weight: ["300", "400", "500"],
  variable: "--font-roboto",
  subsets: ["latin", "greek"],
});

export const metadata: Metadata = {
  title: "λογοτεχνικές διαδρομές",
  description: `Οι "Λογοτεχνικές διαδρομές στην ιστορία" είναι ετήσιου πρόγραμμα φιλαναγνωσίας. 
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
      <body className={font.className + " min-h-screen " + roboto.variable}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
