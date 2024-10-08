import { createClient, groq } from "next-sanity";
export async function getAnnouncements() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY as string,
    dataset: "production",
    useCdn: true,
    apiVersion: "2023-12-01",
  });
  return client.fetch(
    groq`*[_type == "announcement"]{
      _id,
      _createdAt,
      title,
      "slug":slug.current,
      "image":images[0].asset -> url,
      "alt":images[0].alt,
      url,
        content
    }`
  );
}
