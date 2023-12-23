"use client";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { H2, H3 } from "@/components/typography";
import Link from "next/link";
import Button from "@/components/button";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { PlayIcon } from "@vidstack/react/icons";
import { Dialog, Transition } from "@headlessui/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
interface Creation {
  title: string;
  description: string;
  school: string;
  createdAt: Date;
  spotify: string;
  youtube: string;
  fileURLS: string[];
  createdBy: string;
}
interface dimensions {
  width: number;
  height: number;
}

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Creation | null>(null);
  const [exists, setExists] = useState<boolean>(true);
  const [screen, setScreen] = useState<dimensions | null>(null);
  const [content, setContent] = useState<any>();
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    setScreen({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    const docRef = doc(db, "creations", decodeURI(params.id));
    getDoc(docRef).then((r) => {
      if (r.exists()) {
        setData(r.data() as Creation);
      } else {
        setData({});
        setExists(false);
      }
    });
  }, []);

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
            width={screen?.width}
            height={screen?.height}
            src={file}
            alt=""
            onClick={() => {
              setIsOpen(true);
              setContent(
                <Image
                  width={screen?.width}
                  height={screen?.height}
                  src={file}
                  alt=""
                  className=" max-h-[80vh] w-auto"
                />
              );
            }}
            className="object-cover h-16 hover:h-20 duration-300 ease-out w-full"
          />
        );
      }
    } else if (video.includes(filetype)) {
      return (
        <>
          <MediaPlayer src={file} autoplay>
            <PlayIcon size={20} />
            <MediaProvider />
          </MediaPlayer>
        </>
      );
    } else if (sound.includes(filetype)) {
      return <iframe className="h-5/6 w-full" src={file}></iframe>;
    } else {
      return (
        <div className="flex px-10 border-y border-black-50 py-3 hover:py-5 duration-300 ease-out w-full">
          <H3>Αρχείο {filetype}</H3>
          <Link href={file} target="_blank" className="mr-0 ml-auto">
            <Button>Λήψη</Button>
          </Link>
        </div>
      );
    }
  }
  function date(date: Date) {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();
    return day + "/" + month + "/" + year;
  }
  return (
    <div className="min-h-screen">
      {data &&
        (exists ? (
          <>
            <>
              <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-20" onClose={closeModal}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black/75" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-5">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="shadow-xl h-fit transition-all">
                          {content}
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
              <div className="grid min-h-[65vh]">
                <div className="place-self-center md:w-2/3 mb-8 mx-10">
                  <H2 className="text-red">{data.title}</H2>
                  <div className="flex space-x-3">
                    <p className="opacity-50">{data.school}</p>
                    <p>|</p>
                    <p className="opacity-50">{date(data.createdAt)}</p>
                  </div>
                  <div className="mb-5 mt-2 border-b border-b-black" />
                  <p>{data.description}</p>
                </div>
              </div>
              <section className="h-[85vh]">
                <H3 className="mb- px-10 border-b py-3 border-black-50 mb-5">
                  Συλλογή
                </H3>
                {data.youtube && (
                  <div className="px-10 border-y border-black-50 py-3 hover:py-5 duration-300 ease-out w-full">
                    <Link href={data.youtube}>
                      <H3>Youtube</H3>
                    </Link>
                  </div>
                )}
                {data.spotify && (
                  <div
                    onClick={() => {
                      setIsOpen(true);
                      setContent(
                        <iframe
                          className="w-[80vw] max-w-md h-auto"
                          src={data.spotify}
                        ></iframe>
                      );
                    }}
                    className="px-10 border-y border-black-50 py-3 hover:py-5 duration-300 ease-out w-full"
                  >
                    <H3>Spotify</H3>
                  </div>
                )}
                {data.fileURLS &&
                  data.fileURLS.map((i, key) => (
                    <Media key={key} file={i} screen={screen!} />
                  ))}
              </section>
            </>
          </>
        ) : (
          <div className="mx-10">δεν υπάρχει :/</div>
        ))}
    </div>
  );
}
