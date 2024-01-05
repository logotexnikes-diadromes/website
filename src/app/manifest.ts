import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Λογοτεχνικές διαδρομές στην ιστορία",
    short_name: "Λογοτεχνικές διαδρομές",
    description: "ετήσιο πρόγραμμα φιλαναγνωσίας",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#BB4430",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
