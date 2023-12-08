import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import announcement from "./sanity/schemas/announcement-shema";

const config = defineConfig({
  name: "default",
  title: "Λογοτεχνικές διαδρομές στην ιστορία",
  projectId: "5lftpxg4",
  apiVersion: "2023-12-01",
  useCdn: false,
  dataset: "production",
  basePath: "/content",
  plugins: [deskTool()],

  schema: {
    types: [announcement],
  },
});

export default config;
