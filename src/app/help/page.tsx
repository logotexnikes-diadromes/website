import { H1, H2, H3 } from "@/components/typography";
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
      <H1 className="py-24">Βοήθεια</H1>
      {links.map((i, key) => (
        <Link href={i.link} key={key}>
          <H3
            className={`border-y-black-50 bg-white mb-6 hover:translate-x-5 duration-500 hover:opacity-50`}
            key={key}
          >
            {i.text}
          </H3>{" "}
        </Link>
      ))}
    </>
  );
}
