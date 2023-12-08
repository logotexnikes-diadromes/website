"use client";
import Button from "@/components/button";
import { H2, H3 } from "@/components/typography";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { PlayIcon } from "@vidstack/react/icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import {
  MediaControlBar,
  MediaController,
  MediaMuteButton,
  MediaPlayButton,
  MediaFullscreenButton,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
interface Creation {
  title: string;
  description: string;
  school: string;
  createdAt: string;
  spotify: string;
  youtube: string;
  fileURLS: string[];
  createdBy: string;
}
interface dimensions {
  width: number;
  height: number;
}

function Media({ file, screen }: { file: string; screen: dimensions }) {
  const clr = file.split("?")[0].split(".");
  const filetype = clr[clr.length - 1];
  const image = ["jpg", "png", "webp", "avif", "gif", "jpeg"];
  const video = ["mp4", "mov", "avi", "wmv", "flv", "webm"];
  const sound = ["mp3", "aac", "ogg", "flac", "alac", "wav"];
  if (image.includes(filetype)) {
    if (screen) {
      return (
        <Image
          src={file}
          alt="image"
          width={screen?.width}
          height={screen?.width}
          className="max-h-[80vh] object-contain"
        ></Image>
      );
    }
  } else if (video.includes(filetype)) {
    return (
      <>
        <MediaPlayer src={file}>
          <PlayIcon size={20} />
          <MediaProvider />
        </MediaPlayer>
      </>
    );
  } else if (filetype.endsWith("pdf")) {
    return <iframe className="h-5/6 w-full" src={file}></iframe>;
  } else if (sound.includes(filetype)) {
    return <iframe className="h-5/6 w-full" src={file}></iframe>;
  } else {
    return (
      <div className="border border-black-50 p-5 max-w-xl m-auto">
        <H3>Αρχείο {filetype}</H3>
        <Link href={file} target="_blank" className="mt-2">
          <Button>Λήψη</Button>
        </Link>
      </div>
    );
  }
}

export default function CreationView({ data }: { data: Creation }) {
  const [screen, setScreen] = useState<dimensions | null>(null);

  useEffect(() => {
    setScreen({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  return (
    <div>
      <div className="md:w-2/3 mb-8">
        <H2>{data.title}</H2>
        <div className="flex space-x-3">
          <p className="opacity-50">{data.school}</p>
          <p>|</p>
          <p className="opacity-50">{data.createdAt}</p>
        </div>
        <div className="mb-8 mt-2 border-b border-b-black" />
        <p>{data.description}</p>
      </div>
      <section className="space-y-5">
        {data.spotify && (
          <section className="border">
            <iframe
              style={{ borderRadius: 12 }}
              src={data.spotify}
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="place-self-center max-w-xl shadow-xl shadow-black-50"
            ></iframe>
          </section>
        )}
        {data.youtube && (
          <section className="grid w-full card">
            <LiteYouTubeEmbed
              wrapperClass="max-w-xl "
              id={data.youtube.split("?v=")[1]}
              title={data.title}
            />
          </section>
        )}
        {data.fileURLS &&
          data.fileURLS.map((i, key) => (
            <section key={key} className="flex w-full items-center card">
              <Media file={i} screen={screen!} />
            </section>
          ))}
      </section>
    </div>
  );
}
