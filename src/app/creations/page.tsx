"use client";
import { Detail, H1, H2, H3Small } from "@/components/typography";
import { Fragment, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase";
import Fuse from "fuse.js";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
interface Creation {
  title: string;
  fileURLS: string[];
  spotify: string;
  youtube: string;
  school: string;
  description: string;
  id: string;
  createdAt: Date;
}
interface FuseCreation {
  item: Creation;
}

export default function Page() {
  const router = useRouter();
  const [exists, setExists] = useState<boolean>(true);
  const [creations, setCreations] = useState<Creation[] | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [results, setResults] = useState<FuseCreation[] | null>(null);

  const searchParams = useSearchParams();
  const search = searchParams.get("s") as string;

  // fetch data
  useEffect(() => {
    onSnapshot(collection(db, "creations"), (docs) => {
      const creations: any = [];
      docs.forEach((doc) => {
        let data = doc.data();
        data = { ...data, id: doc.id };
        creations.push(data);
      });
      if (creations.length > 0) {
        setCreations(creations);
        setResults(null);
      } else {
        setExists(false);
      }
    });
  }, []);

  // update search
  useEffect(() => {
    if (creations) {
      const fuseOptions = {
        keys: ["title", "school", "description"],
        threshold: 0.4,
      };
      const fuse = new Fuse(creations, fuseOptions);
      const result = fuse.search(search);
      if (result.length === 0) {
        setResults(null);
      } else {
        setResults(fuse.search(search));
      }
    }
  }, [search]);

  function date(date: Date) {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();
    return day + "/" + month + "/" + year;
  }
  return (
    <div className="sm:mx-10 mx-6">
      <div className="flex">
        <H1 className={`mb-8`}>Aναρτημένες δημιουγίες</H1>
        <svg
          onClick={() => setOpen(true)}
          className="w-6 h-6 mr-0 ml-auto self-center"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 214.61 205.11"
        >
          <defs>
            <style>
              {`
      .cls-1, .cls-2 {
        fill: #00000090;
        stroke-width: 0px;
      }

      .cls-2, .cls-3 {
        fill: #fff;
      }

      .cls-3 {
        stroke: #00000090;
        stroke-miterlimit: 10;
        stroke-width: 8px;
      }`}
            </style>
          </defs>
          <g>
            <path
              className="cls-2"
              d="m145.02,138c-16.47,0-32.3-6.03-44.58-16.98-14.25-12.71-22.42-30.94-22.42-50.02,0-36.94,30.06-67,67-67s67,30.06,67,67-30.06,67-67,67Z"
            />
            <path
              className="cls-1"
              d="m145.02,8c34.74,0,63,28.26,63,63s-28.26,63-63,63c-15.49,0-30.37-5.67-41.92-15.97-13.4-11.95-21.08-29.09-21.08-47.03,0-34.74,28.26-63,63-63m0-8c-39.21,0-71,31.79-71,71,0,21.07,9.18,40,23.76,53,12.55,11.19,29.1,18,47.24,18,39.21,0,71-31.79,71-71S184.23,0,145.02,0h0Z"
            />
          </g>
          <line className="cls-3" x1="89.8" y1="115.31" x2="1.41" y2="203.69" />
        </svg>
      </div>

      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-5">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transition-all">
                  <div
                    className={
                      "bg-white border border-black-50 max-w-2xl w-screen relative z-20 p-5 min-h-[50vh] rounded-lg"
                    }
                  >
                    <H2 className="mb-5 text-red">Αναζήτηση</H2>
                    <input
                      placeholder="Τίτλος, σχολείο, περιγραφή"
                      className="w-full h-10 border-b p-5 py-6 border-b-black-50 focus:outline-none mb-5"
                      value={search}
                      onChange={(e) =>
                        router.push(`?s=${e.target.value}`, { scroll: false })
                      }
                    ></input>
                    <div className="space-y-3 grid my-auto overflow-y-auto overflow-x-hidden max-h-64">
                      {results
                        ? results.map((i, key) => (
                            <Link
                              key={key}
                              className="border-b group border-black-50 my-1 flex flex-col p-2 "
                              href={"/creations/" + i.item.id}
                            >
                              <p>{i.item.title}</p>
                              {results.length < 4 && (
                                <div className="flex mb-0 mt-auto">
                                  <p className="opacity-50">{i.item.school}</p>
                                  <p className="opacity-50 ml-auto">
                                    {date(i.item.createdAt)}
                                  </p>
                                </div>
                              )}
                            </Link>
                          ))
                        : search !== "" && (
                            <Transition
                              appear
                              show={search !== ""}
                              enter="ease-out duration-700 delay-300"
                              leave="ease-in duration-700 delay-300"
                              enterFrom="opacity-0 -translate-x-2"
                              enterTo="opacity-100 translate-x-0"
                              leaveFrom="opacity-100 translate-x-0"
                              leaveTo="opacity-0 -translate-x-2"
                            >
                              <div className="grid h-64">
                                <Detail className="place-self-center">
                                  κανένα αποτέλεσμα
                                </Detail>
                              </div>
                            </Transition>
                          )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div
        className={`grid max-sm:grid-cols-1 grid-cols-2 2xl:grid-cols-3 gap-2`}
      >
        {exists ? (
          creations &&
          creations.map((i, key) => (
            <Link
              key={key}
              className="border-b group border-black-50 my-1 flex flex-col p-2"
              href={"/creations/" + i.id}
            >
              <p>{i.title}</p>
              <div className="flex mb-0 mt-auto">
                <p className="opacity-50">{i.school}</p>
                <p className="opacity-50 ml-auto">{date(i.createdAt)}</p>
              </div>
            </Link>
          ))
        ) : (
          <>καμία ακόμα :/</>
        )}
      </div>
    </div>
  );
}
