"use client";
import { H1, H3 } from "@/components/typography";
import { Gradient } from "@/components/gradient";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Organisers from "@/components/organisers";
export default function Home() {
  useEffect(() => {
    const gradient: any = new Gradient();
    gradient.initGradient("#gradient-canvas");
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to("#gradient-canvas", {
        scrollTrigger: {
          trigger: "#gradient-canvas",
          scrub: true,
          start: "bottom center",
          end: "bottom top",
        },
        scale: 0.8,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="mx-10">
      <style global jsx>
        {`
          #gradient-canvas {
            width: 100%;
            height: 100%;
            --gradient-color-1: #bb4430;
            --gradient-color-2: #1b1b3a;
            --gradient-color-3: #1b1b3a;
            --gradient-color-4: #bb4430;
          }
        `}
      </style>
      <section className="left-0 grid w-full h-screen place-items-center -mt-5  ">
        <h1 className="[font-size:_clamp(35px,6vw,90px)] leading-tight w-2/3 mix-blend-difference text-slate-500">
          Λογοτεχνικές διαδρομές στην ιστορία
        </h1>
        <H3 className="opacity-75">ετήσιο πρόγραμμα φιλαναγνωσίας</H3>
        <canvas
          id="gradient-canvas"
          className="absolute top-0 left-0 max-h-screen w-full -z-10"
          data-transition-in
          data-js-darken-top
        />
      </section>
      <section className="h-screen">
        <H1>Οργανωτές</H1>
        <Organisers />
      </section>
    </div>
  );
}
