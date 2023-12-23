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
      <div className="lg:grid grid-cols-2">
        {announcements &&
          announcements.map((i: Announcement, key: number) => (
            <article
              className={`border-black-50 bg-white py-3 my-2 border-b group border-y-black-50 book relative z-[${key}]`}
              key={key}
            >
              <H3>{i.title}</H3>
              <p className="opacity-50 ml-1">{date(i._createdAt)}</p>
              <BlockContent blocks={i.content} />
            </article>
          ))}
      </div>
    </section>
  );
}
