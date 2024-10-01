"use client";
import Image from "next/image";
import authors from "../data";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { H2 } from "@/components/typography";

export default function Page({ params }: { params: { id: string } }) {
  const i = authors.find((x) => x.id === params.id);

  if (typeof i === "undefined") {
    window.location.assign("/authors");
  } else {
    return (
      <div className="sm:mx-10 mx-6 min-h-screen">
        <section className="grid place-items-center w-full h-[90vh]">
          <div>
            <Image
              src={i.path}
              alt={i.name}
              width={9999}
              height={9999}
              className="max-h-[60vh] w-auto head-image"
            />
            <Transition
              appear
              show
              enter="duration-200"
              enterFrom="opacity-0 translate-y-2"
              enterTo="opacity-100 translate-y-0"
            >
              <H2 className="text-red text-right">{i.name}</H2>
            </Transition>
          </div>
        </section>
        <Transition
          appear
          show
          enter="duration-100 delay-300"
          enterFrom="opacity-0 translate-y-2"
          enterTo="opacity-100 translate-y-0"
        >
          <section className="w-full max-w-lg m-auto -translate-y-5">
            <p className="mb-2 text-sm opacity-75 text-right">
              από{" "}
              <Link
                href={
                  "https://logotexnikes-diadromes.gr/redirect?link=" +
                  i.bio_link +
                  "&from=" +
                  window.location.href
                }
                target="_blank"
                className="underline"
              >
                Βιβλιοnet
              </Link>
            </p>
            <p dangerouslySetInnerHTML={{ __html: i.bio }}></p>
          </section>
        </Transition>
      </div>
    );
  }
}
