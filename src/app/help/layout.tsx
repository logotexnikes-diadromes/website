"use client";

import { Gradient } from "@/components/gradient";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  const url = usePathname().split("/help")[1];
  useEffect(() => {
    const gradient: any = new Gradient();
    gradient.initGradient("#gradient-canvas");
  });
  const words = "Δεν σας βοήθησε και πολύ;".split(" ");
  return (
    <div>
      {url !== "" && (
        <div className="border-b border-black-50 flex sm:px-10 px-6 py-1 sticky top-[60px] -mt-2 max-sm:top-[85px] bg-white">
          <Link href={"/help"} className="w-8 h-8 opacity-100 p-0.5">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
            >
              <defs>
                <style>
                  {`
      .b {
        fill: none;
        stroke: #000;
        stroke-miterlimit: 10;
        stroke-width: 4px;
      }`}
                </style>
              </defs>
              <line
                className="b"
                x1="142.82"
                y1="25.39"
                x2="57.18"
                y2="100.16"
              />
              <line
                className="b"
                x1="57.18"
                y1="99.84"
                x2="142.82"
                y2="174.61"
              />
            </svg>
          </Link>
          <p className="opacity-50 self-center ml-2">{url}</p>
        </div>
      )}
      <div className="sm:mx-10 mx-6 lg:w-2/3 min-h-screen">
        {children}
        {url !== "" && (
          <>
            <style global jsx>
              {`
                #gradient-canvas {
                  --gradient-color-1: #bb4430;
                  --gradient-color-2: #1b1b3a;
                  --gradient-color-3: #1b1b3a;
                  --gradient-color-4: #bb4430;
                }
              `}
            </style>
            <div className="relative h-96 w-full p-10 group grid mb-20 mt-20">
              <canvas
                id="gradient-canvas"
                className={`w-full absolute top-0 left-0 h-full rounded-lg`}
                data-transition-in
                data-js-darken-top
              ></canvas>
              <div className="place-self-center w-full">
                <div>
                  {words.map((word: string, key: number) => (
                    <span
                      key={key}
                      className="[font-size:_clamp(30px,5vw,40px)] bg-white text-purple relative"
                    >
                      {word + " "}
                    </span>
                  ))}
                </div>
                <Link
                  href={"/contact?to=technical"}
                  target="_blank"
                  className="bg-white relative font-medium mt-2"
                >
                  Απευθυνθείτε στο τεχνικό μας τμήμα
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
