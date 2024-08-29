"use client";
import { H1, H3 } from "@/components/typography";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import authors, { Author } from "./data";

export default function Page() {
  const router = useRouter();
  const [selected, setSelected] = useState<null | Author>(null);

  return (
    <>
      <div className="py-8">
        <H1 className="sm:mx-10 mx-6">Συγγραφείς</H1>
        <p className="max-lg:w-[90%] w-1/2 mb-8 sm:mx-10 mx-6">
          Οι «Λογοτεχνικές διαδρομές στην ιστορία» ξεκινούν τον Οκτώβριο και
          εκτυλίσσονται σε δύο κύκλους. Ο πρώτος κύκλος αποτελεί ένα αφιέρωμα σε
          δύο σημαντικές μορφές της σύγχρονης ελληνικής λογοτεχνίας, την Άλκη
          Ζέη και την Ζωρζ Σαρή, με αφορμή τα 100 χρόνια από τη γέννηση τους και
          ολοκληρώνεται με τη λήξη του 2023. Ο δεύτερος κύκλος αποτελεί τη
          μετάβαση σε βραβευμένες σύγχρονες συγγραφείς που αναδεικνύουν την
          ιστορία μέσα από την λογοτεχνία τους, κινούμενες στην ίδια
          ιστοριογραμμή όπου περπάτησαν λογοτεχνικά η Άλκη Ζέη και η Ζωρζ Σαρή.
        </p>
      </div>
      <div
        className={`fixed top-0 left-0 w-screen h-screen grid place-items-center ${
          selected ? "z-10" : "z-0"
        }`}
      >
        <Transition
          as="div"
          className={`absolute top-0 left-0 w-screen h-screen bg-white  `}
          show={selected ? true : false}
          afterEnter={() => router.push(`/authors/${selected?.id}`)}
          enter="duration-200 delay-500"
          leave="duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        />
        <Transition
          show={selected ? true : false}
          enter="duration-300 delay-200"
          leave="duration-300 delay-200"
          enterFrom="translate-y-12 opacity-0"
          enterTo="translate-y-0 opacity-100"
          leaveFrom="translate-y-0 opacity-100"
          leaveTo="translate-y-12 opacity-0"
        >
          {selected ? (
            <div>
              <Image
                src={selected.path}
                alt={selected.name}
                width={9999}
                height={9999}
                className="max-h-[60vh] w-auto"
              />
            </div>
          ) : (
            <></>
          )}
        </Transition>
      </div>
      <div className="w-full grid lg:grid-cols-3 grid-cols-2 max-sm:grid-cols-1">
        {authors.map((i, key) => (
          <div
            onClick={() => setSelected(i)}
            key={key}
            className="relative group hover:scale-95  duration-500 cursor-pointer"
          >
            <Image
              src={i.path}
              alt={i.name}
              width={9999}
              height={9999}
              className="aspect-square object-cover object-top group-hover:brightness-50 group-hover:rounded-lg  duration-200"
            />
            <div className="absolute bottom-0 left-0 p-5 text-white group-hover:translate-y-0 group-hover:opacity-100 translate-y-5 opacity-0 duration-500">
              <H3>{i.name}</H3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
