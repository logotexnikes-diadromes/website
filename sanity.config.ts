import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import announcement from "./sanity/schemas/announcement-shema";

const config = defineConfig({
  name: "default",
  title: "Λογοτεχνικές διαδρομές",
  projectId: process.env.NEXT_PUBLIC_SANITY as string,
  apiVersion: "2023-12-01",
  useCdn: false,
  dataset: "production",
  basePath: "/announcements/s",
  plugins: [deskTool()],
  schema: {
    types: [announcement],
  },
});

export default config;
