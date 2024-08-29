import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Search } from "./creator/svgs";
import { Detail, H2 } from "./typography";
import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SearchDialog({ creations }: { creations: any }) {
  const [open, setOpen] = useState<boolean>(false);
  const [results, setResults] = useState<any | null>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("s") as string;
  const router = useRouter();
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
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-7 h-7 ml-auto mr-0 self-center"
      >
        <Search  />
      </button>
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
                      "bg-white border border-black-50 max-w-2xl w-[95vw] relative z-20 p-5 min-h-[50vh] "
                    }
                  >
                    <H2 className="mb-5 text-red">Αναζήτηση</H2>
                    <input
                      placeholder="Ψάξτε για τίτλο, σχολείο, περιγραφή"
                      className="w-full h-10 border-b p-5 py-6 border-b-black-50 focus:outline-none mb-5"
                      value={search}
                      onChange={(e) =>
                        router.push(
                          `?s=${encodeURIComponent(e.target.value)}`,
                          { scroll: false }
                        )
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
                                {results[0].item.createdAt.toDate().getDate() +
                                  "/" +
                                  (results[0].item.createdAt.toDate().getMonth() + 1)}{" "}
                              </p>
                            </div>
                          </Link>

                          {results.map((i: any, key: number) => (
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
    </>
  );
}
