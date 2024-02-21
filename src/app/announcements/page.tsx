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
interface dimensions {
  width: number;
  height: number;
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
    <section className="sm:mx-10 mx-6 min-h-screen">
      <H1 className="mb-8">Ανακοινώσεις</H1>

      <div>
        {announcements &&
          announcements.map((i: Announcement, key: number) => (
            <article
              className={`border-black-50 bg-white min-h-[70vh] grid place-items-center  mb-12 rounded-lg`}
              key={key}
            >
              <div className="w-full px-6">
                <div className="pr-3 mr-3 w-96 space-y-1 mb-8">
                  <H3 className="text-red">{i.title}</H3>
                  <p className="opacity-50">{date(i._createdAt)}</p>
                </div>
                <BlockContent blocks={i.content} />
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
