"use client";
import { H3 } from "./typography";
import bookbusters from "@/app/assets/bookbusters.png";
import mousiko from "@/app/assets/mousiko.webp";
import ptolemaida from "@/app/assets/Ptolemaida_library.png";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

export default function Organisers() {
  const organisers = [
    {
      text: "δημοτική βιβλιοθήκη Πτολεμαΐδας",
      image: ptolemaida,
    },
    {
      text: "διεύθυνση Α/θμιας, Β/θμιας διεύθυνσης νομού Κοζάνης",
    },
    {
      text: "σχολική βιβλιοθήκη bookbusters.",
      image: bookbusters,
      link: "https://bookbusters.gr",
    },
    {
      text: "σχολική βιβλιοθήκη του 5ου γυμνασίου Πτολεμαΐδας",
    },
    {
      text: "μουσικό σχολείο Πτολεμαΐδας",
      image: mousiko,
    },
    {
      text: "θεατρική αναζήτηση",
    },
  ];
  const [opacity, setOpacity] = useState(0);
  const [image, setImage] = useState<StaticImageData>(bookbusters);
  return (
    <>
      <Image
        src={image}
        alt="img"
        width={500}
        height={500}
        style={{ opacity: opacity }}
        className={`right-5 translate-y-52 duration-300 rounded-3xl box-border ease-linear absolute [transform: translate(-50%, -50%)] -z-10 object-cover w-2/3 max-w-sm`}
      />
      {organisers.map((organiser, key) => (
        <div
          onClick={() => {
            if (organiser.link) {
              window.open(organiser.link);
            }
          }}
          className={`w-fit my-4 group ${organiser.link && " cursor-pointer "} `}
          key={key}
          onMouseEnter={() => {
            if (organiser.image) {
              setImage(organiser.image);
              setOpacity(100);
            }
          }}
          onMouseLeave={() => {
            setOpacity(0);
          }}
        >
          <H3 className="opacity-50 duration-300 hover:opacity-100">
            {organiser.text}
          </H3>
          <div className="border-b border-b-black-50" />
        </div>
      ))}
    </>
  );
}
