"use client";
import { H1, H3 } from "@/components/typography";
import { getAnnouncements } from "../../../sanity/sanity-utils";
import "./style.css";
import { useEffect, useState } from "react";
//@ts-ignore
import BlockContent from "@sanity/block-content-to-react";
interface Announcement {
  title: string;
  content: any;
  image: string;
  _id: string;
  slug: string;
  _createdAt: Date;
  alt: string;
}

export default function Page() {
  const [announcements, setAnnouncements] = useState<Announcement[] | null>(
    null
  );
  useEffect(() => {
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
    <>
      <div className="py-24">
        <H1 className="mb-8 sm:mx-10 mx-6">Ανακοινώσεις</H1>
      </div>

      <div>
        {announcements &&
          announcements.map((i: Announcement, key: number) => (
            <article
              className={`border-black/20 py-10 sm:px-10 px-6 bg-white border-b ${key == 0 && "border-t"} `}
              key={key}
            >
              <div className="space-y-1 mb-8">
                <p className="opacity-50 text-sm ml-3">{date(i._createdAt)}</p>
                <H3 className="text-red">{i.title}</H3>
              </div>
              <div className="max-w-[90vw] max-md:text-sm">
                <BlockContent blocks={i.content} />
              </div>
            </article>
          ))}
      </div>
    </>
  );
}
