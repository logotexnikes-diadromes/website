"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import Link from "next/link";
import { useState } from "react";
import { H3 } from "./typography";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const menuitems = [
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
  ];
  return (
    <ReactLenis root>
      <header className="z-20 h-[60px] max-sm:h-[85px] border-b border-b-black-50 w-full fixed top-0 left-0 px-10 py-2 flex bg-white">
        <Link
          href={"/"}
          className="w-2/3 max-w-[300px] my-auto select-none font-semibold text-red"
        >
          Λογοτεχνικές διαδρομές στην Ιστορία
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="mr-0 ml-auto flex flex-col space-y-1.5 my-auto"
        >
          <span
            className={`w-6 h-[1px] bg-black duration-300 ${
              open && "rotate-45 translate-y-1.5 bg-red"
            } `}
          ></span>
          <span
            className={`w-6 h-[1px] bg-black duration-300 ${
              open && "opacity-0"
            } `}
          ></span>
          <span
            className={`w-6 h-[1px] bg-black duration-300 ${
              open && "-rotate-45 -translate-y-2 bg-red"
            } `}
          ></span>
        </button>
      </header>
      <div
        className={`${
          open ? "left-0" : "left-[120vw]"
        }  bg-white sm:ml-[50vw] z-10 lg:ml-[66vw] border border-black-50 fixed w-full h-full top-0 duration-500`}
      >
        <div className="space-y-3 grid my-auto mt-[60px] max-sm:mt-[85px] pt-10">
          {menuitems.map((item, key) => (
            <Link
              key={key}
              href={item.link}
              className="p-5 border-y group"
              onClick={() => setTimeout(() => setOpen(false), 200)}
            >
              <H3 className="group-hover:pl-5 group-hover:text-red duration-500 ">
                {item.text}
              </H3>
            </Link>
          ))}
        </div>
      </div>
      <div className="mb-[70px] max-sm:mb-[95px]" />
      {children}
      <footer className="border-t border-black-50 p-10 md:flex mt-10">
        <div className="md:w-1/2 grid md:mr-5 max-md:mb-5">
          <h2 className="w-2/3 max-w-[300px] my-auto select-none font-semibold">
            Λογοτεχνικές διαδρομές στην Ιστορία
          </h2>
        </div>
        <div>
          {menuitems.map((item, key) => (
            <Link key={key} href={item.link}>
              <p>{item.text}</p>
            </Link>
          ))}
          <Link href={"/creations/creator"}>
            <p className="pl-3">υποβολή εργασιών</p>
          </Link>
          <Link href={"/creations/help"}>
            <p className="pl-3">βοήθεια</p>
          </Link>
        </div>
      </footer>
    </ReactLenis>
  );
}
