"use client";
import { H1, H2, H3 } from "@/components/typography";
import { getAnnouncements } from "../../../sanity/sanity-utils";
import "./style.css";
import { useEffect, useState } from "react";
//@ts-ignore
import BlockContent from "@sanity/block-content-to-react";
import Image from "next/image";
interface Announcement {
  title: string;
  content: any;
  image: string;
  _id: string;
  slug: string;
  _createdAt: Date;
  alt: string;
}
interface dimensions {
  width: number;
  height: number;
}

export default function Page() {
  const [screen, setScreen] = useState<dimensions | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[] | null>(
    null
  );
  useEffect(() => {
    setScreen({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    getAnnouncements().then((r) => {
      setAnnouncements(r);
    });
  }, []);
  function date(date: Date) {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();
    return day + "/" + month + "/" + year;
  }
  return (
    <section className="mx-10 min-h-screen">
      <H1 className="mb-8">Ανακοινώσεις</H1>
      <div className="">
        {announcements &&
          announcements.map((i: Announcement, key: number) => (
            <article
              className={`group border-y border-y-black-50 bg-white py-3 my-2 book relative z-[${key}]`}
              key={key}
            >
              {i.image && (
                <Image
                  className="group-hover:mb-5 w-auto group-hover:opacity-100 group-hover:max-h-[33vh] max-h-0 opacity-0 duration-1000 delay-300"
                  src={i.image}
                  alt={i.alt}
                  width={screen?.width}
                  height={screen?.height}
                />
              )}
              <H3>{i.title}</H3>
              <p className="opacity-50 ml-1">{date(i._createdAt)}</p>
              <BlockContent blocks={i.content} />
            </article>
          ))}
      </div>
    </section>
  );
}
