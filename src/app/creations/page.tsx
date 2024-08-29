"use client";
import { H1 } from "@/components/typography";
import { useEffect, useState } from "react";
import {
  Timestamp,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import Link from "next/link";
import SearchDialog from "@/components/search";
interface Creation {
  title: string;
  fileURLS: string[];
  spotify: string;
  youtube: string;
  school: string;
  description: string;
  id: string;
  createdAt: Timestamp;
}

export default function Page() {
  const [exists, setExists] = useState<boolean>(true);
  const [creations, setCreations] = useState<Creation[] | null>(null);

  // fetch data
  useEffect(() => {
    const ref = collection(db, "creations");
    const q = query(ref, orderBy("createdAt"));
    onSnapshot(q, (docs) => {
      const creations: any = [];
      docs.forEach((doc) => {
        let data = doc.data();
        data = { ...data, id: doc.id };
        creations.push(data);
      });
      if (creations.length > 0) {
        setCreations(creations.reverse());
      } else {
        setExists(false);
      }
    });
  }, []);

  return (
    <div className="sm:mx-10 mx-6">
      <div className="flex md:flex-row flex-col w-full py-24">
        <H1>Aναρτημένες δημιουργίες</H1>
        <SearchDialog creations={creations} />
      </div>
      <div
        className={`grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-3 grid`}
      >
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
                <p className="opacity-50 ml-auto">
                  {i.createdAt.toDate().getDate() +
                    "/" +
                    (i.createdAt.toDate().getMonth() + 1)}
                </p>
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
