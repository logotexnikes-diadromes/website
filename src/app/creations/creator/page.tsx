"use client";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as NButton from "@/components/button";
import { Fragment, useEffect, useState } from "react";
import { Creation } from "@/utils/types";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Fullscreen, MoreVertical, TrashIcon } from "lucide-react";
import toast from "react-hot-toast";
import { H3 } from "@/components/typography";
import { Dialog, Popover, Transition } from "@headlessui/react";
import deletefunc from "@/utils/delete";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "@/utils/firebase";
export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Creation[] | null>(null);
  let [isOpen, setIsOpen] = useState(false);
  const [ditem, setDitem] = useState<number | null>(null);
  useEffect(() => {
    const q = query(
      collection(db, "creations"),
      where("createdBy", "==", auth.currentUser!.uid)
    );
    onSnapshot(q, (docs) => {
      const creations: any = [];
      docs.forEach((doc) => {
        let data = doc.data();
        data = { ...data, id: doc.id };
        creations.push(data);
      });
      if (creations.length > 0) {
        setData(creations);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);
  function loader() {
    if (loading) {
      return (
        <div className="w-full h-[80vh]">
          <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-3">
            <div className="w-full h-52 p-5">
              <div>
                <Skeleton className="w-full h-7 mb-2" />
                <Skeleton className="w-full h-7 mb-2" />
                <Skeleton className="w-2/3 h-7" />
              </div>
              <Skeleton className="w-20 h-5 mt-5" />
            </div>
          </div>
        </div>
      );
    } else {
      if (data) {
        return (
          <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-3">
            {data.map((creation, key) => (
              <div
                key={key}
                className="p-5 w-full relative border border-black-50"
              >
                <Popover className="relative bottom-4 left-4">
                  <Popover.Button className={"absolute top-2 right-2"}>
                    <NButton.default className="!px-2">
                      <MoreVertical />
                    </NButton.default>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel
                      className={
                        "absolute -bottom-36 right-2 bg-white border border-black-50 "
                      }
                    >
                      <Link
                        href={`/creations/${creation.id}`}
                        className="flex border-b w-full px-4 py-2 hover:bg-slate-50 duration-300"
                      >
                        <Fullscreen className="mr-2 h-5 w-5" />
                        Προβολή
                      </Link>
                      <button
                        onClick={() => {
                          setIsOpen(true);
                          setDitem(key);
                        }}
                        className="flex border-b w-full px-4 py-2 hover:bg-slate-50 duration-300"
                      >
                        <TrashIcon className="mr-2 h-5 w-5" />
                        <span>Διαγραφή</span>
                      </button>
                    </Popover.Panel>
                  </Transition>
                </Popover>
                <CardTitle className="mb-1 leading-8">
                  {creation.title}
                </CardTitle>
                <div className="space-y-1 space-x-1">
                  {creation.files && (
                    <div className="inline-flex border text-xs p-1 py-0.5">
                      {creation.files.length}{" "}
                      {creation.files.length === 1 ? "αρχείο" : "αρχεία"}
                    </div>
                  )}
                  {creation.spotify !== "" && (
                    <Link
                      href={creation.spotify}
                      target="_blank"
                      className="inline-flex border text-xs p-1 py-0.5"
                    >
                      spotify
                    </Link>
                  )}
                  {creation.youtube !== "" && (
                    <Link
                      href={creation.youtube}
                      target="_blank"
                      className="inline-flex border text-xs p-1 py-0.5"
                    >
                      youtube
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      }
    }
  }
  return (
    <div className="space-y-5 sm:mx-10 mx-6">
      <section>
        <div className="flex items-center space-x-2 relative">
          <H3>Οι δημιουργίες μου</H3>
          <Link href={"creator/add"} className="absolute right-0">
            <NButton.default className="">Προσθήκη</NButton.default>
          </Link>
        </div>
        <div className="mb-8" />
        {loader()}
        <Transition appear show={isOpen} as={"div"}>
          {ditem && data && (
            <Dialog
              as="div"
              className="relative z-50"
              onClose={() => setIsOpen(false)}
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
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel
                      className={
                        "bg-white text-left max-w-lg w-full relative z-20 border border-black-50"
                      }
                    >
                      <CardHeader>
                        <CardTitle>{data[ditem].title}</CardTitle>
                        <p className="text-sm">
                          Πρόκειται να διαγράψετε την δημιουργία οριστικά,
                          θέλετε να συνεχίσετε;
                        </p>
                      </CardHeader>
                      <CardContent>
                        <NButton.default
                          onClick={() => {
                            setIsOpen(false);
                            setDitem(null);
                            deletefunc(data[ditem])
                              .then(() => {
                                toast.success(
                                  `${data[ditem].title} διαγράφηκε`
                                );
                              })
                              .catch((e) => {
                                toast.error(
                                  `${data[ditem].title}: Σφάλμα κατά την ολική διαγραφή`
                                );
                                console.error(e);
                              });
                          }}
                        >
                          Διαγραφή
                        </NButton.default>
                      </CardContent>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          )}
        </Transition>
      </section>
    </div>
  );
}
