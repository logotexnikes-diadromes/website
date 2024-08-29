"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import Link from "next/link";
import Header from "./header";
export const menuitems = [
  {
    link: "/authors",
    text: "συγγραφείς",
  },
  {
    link: "/recommendations",
    text: "αναγνωστικές προτάσεις",
  },
  {
    link: "/announcements",
    text: "ανακοινώσεις",
  },
  {
    link: "/schools",
    text: "σχολεία του δικτύου",
  },
  {
    link: "/creations",
    text: "αναρτημένες δημιουγίες",
  },
  {
    link: "/links",
    text: "χρήσιμοι σύνδεσμοι",
  },
  {
    link: "/contact",
    text: "επικοινωνία",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <ReactLenis root>
      <Header />
      {children}
      <footer>
        <div className="border-t border-black-50 sm:p-10 p-6 md:flex mt-10">
          <div className="md:w-1/2 grid md:mr-5 max-md:mb-5">
            <h2 className="w-2/3 max-w-[300px] my-auto select-none font-semibold text-red">
              Λογοτεχνικές διαδρομές στην ιστορία
            </h2>
          </div>
          <div>
            {menuitems.slice(0, 5).map((item, key) => (
              <Link key={key} href={item.link}>
                <p>{item.text}</p>
              </Link>
            ))}
            <Link href={"/creations/creator"}>
              <p className="pl-3">υποβολή εργασιών</p>
            </Link>
            <Link href={"/links"}>
              <p>χρήσιμοι σύνδεσμοι</p>
            </Link>
            <Link href={"/contact"}>
              <p>επικοινωνία</p>
            </Link>
            <Link href={"/help"}>
              <p>βοήθεια</p>
            </Link>
          </div>
        </div>
        <div className="border-t border-black-50 py-2 text-center text-xs">
          © Στράτος Ιλερής {new Date().getFullYear()}
        </div>
      </footer>
    </ReactLenis>
  );
}
