import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "λογοτεχνικές διαδρομές",
    short_name: "λογοτεχνικές διαδρομές",
    description: "Next.js App",
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
