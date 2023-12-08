"use client";
import { H1, H3, H3Small } from "@/components/typography";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { PlayIcon } from "@vidstack/react/icons";
import Button from "@/components/button";
import Link from "next/link";
interface Creation {
  title: string;
  fileURLS: string[];
  spotify: string;
  youtube: string;
  school: string;
  description: string;
  id: string;
  createdAt: Date;
}
interface dimensions {
  width: number;
  height: number;
}
export default function Page() {
  const [exists, setExists] = useState<boolean>(true);
  const [creations, setCreations] = useState<Creation[] | null>(null);
  const [screen, setScreen] = useState<dimensions | null>(null);
  useEffect(() => {
    setScreen({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    fetch("/creations/api").then(async (r) => {
      const res = await r.json();
      if (res.exists) {
        setExists(false);
      } else {
        setCreations(res);
      }
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
    <div className="mx-10 min-h-screen">
      <H1 className="mb-8">Δημιουγίες</H1>
      <div className="grid max-sm:grid-cols-1 grid-cols-2 lg:grid-cols-3 gap-1">
        {exists ? (
          creations &&
          creations.map((i) => (
            <div className="border border-black-50 p-3 my-1 h-full flex flex-col">
              <div className="flex">
                <H3Small>{i.title}</H3Small>
                <p className="opacity-50 ml-1">{date(i.createdAt)}</p>
              </div>
              <p className="opacity-50 ml-1">{i.school}</p>
              <Link href={"/creations/" + i.id} className="mt-auto mb-0 self-end">
                <Button>Περισσότερα</Button>
              </Link>
            </div>
          ))
        ) : (
          <>καμία ακόμα :/</>
        )}
      </div>
    </div>
  );
}
