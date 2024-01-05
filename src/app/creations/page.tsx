"use client";
import { Detail, H1, H2, H3 } from "@/components/typography";
import { Fragment, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase";
import Fuse from "fuse.js";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Search } from "@/components/creator/svgs";
interface Creation {
  title: string;
  fileURLS: string[];
  spotify: string;
  youtube: string;
  school: string;
  description: string;
  id: string;
  createdAt: string;
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
        setCreations(creations.reverse());
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
  return (
    <div className="sm:mx-10 mx-6">
      <div className="flex">
        <H1 className={`mb-8`}>Aναρτημένες δημιουγίες</H1>
        <span
          onClick={() => setOpen(true)}
          className="w-6 h-6 mr-0 ml-auto self-center"
        >
          <Search />
        </span>
      </div>

      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
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
                      {results ? (
                        <>
                          <Link
                            className="border-b group border-black-50 my-1 flex flex-col p-2 "
                            href={"/creations/" + results[0].item.id}
                          >
                            <p>{results[0].item.title}</p>
                            <div className="flex mb-0 mt-auto">
                              <p className="opacity-50">
                                {results[0].item.school}
                              </p>
                              <p className="opacity-50 ml-auto">
                                {results[0].item.createdAt}
                              </p>
                            </div>
                          </Link>

                          {results.map((i, key) => (
                            <Link
                              key={key}
                              style={{ display: key === 0 ? "none" : "block" }}
                              className="border-b group border-black-50 my-1 flex flex-col p-2 "
                              href={"/creations/" + i.item.id}
                            >
                              <p>{i.item.title}</p>
                            </Link>
                          ))}
                        </>
                      ) : (
                        search !== "" && (
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
                        )
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className={`grid sm:grid-cols-2 2xl:grid-cols-3 sm:gap-7 gap-3`}>
        {exists ? (
          creations &&
          creations.map((i, key) => (
            <Link
              key={key}
              className="flex flex-col border py-3 border-black-50 relative bg-white group"
              href={"/creations/" + i.id}
            >
              <div className="w-full h-full absolute top-0 left-0 -z-10 border border-black-50 group-hover:-translate-x-2 group-hover:translate-y-1 duration-300" />

              <p className="px-3">{i.title}</p>
              <div className="flex mb-0 mt-auto pt-2 text-sm px-3">
                <p className="opacity-50">{i.school}</p>
                <p className="opacity-50 ml-auto">{i.createdAt}</p>
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
