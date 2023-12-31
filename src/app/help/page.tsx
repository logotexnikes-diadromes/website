import { H1, H2 } from "@/components/typography";
import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Βοήθεια | Λογοτεχνικές Διαδρομές",
};
export default function Page() {
  const links = [
    {
      text: "Αίτηση συμμετοχής",
      link: "/help/request",
    },
    {
      text: "Μεταφορτώστε ένα αρχείο ήχου μέσω spotify",
      link: "/help/spotify",
    },
    {
      text: "Μεταφορτώστε ένα βίντεο μέσω youtube",
      link: "/help/youtube",
    },
    {
      text: "Τα σχολεία μου",
      link: "/help/schools",
    },
  ];
  return (
    <>
      <H1 className="mb-8">Βοήθεια</H1>
      {links.map((i, key) => (
        <Link href={i.link} key={key}>
          <H2
            className={`border-y border-y-black-50 bg-white py-3 my-2`}
            key={key}
          >
            {i.text}
          </H2>{" "}
        </Link>
      ))}
    </>
  );
}
