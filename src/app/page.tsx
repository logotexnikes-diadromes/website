//@ts-nocheck
"use client";
import { useEffect, useRef } from "react";
import { H1, H3 } from "@/components/typography";
import { Gradient } from "@/components/gradient";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import styles from "./style.module.scss";
// import { motion, useScroll, useTransform } from "framer-motion";

const organisers = [
  "δημοτική βιβλιοθήκη Πτολεμαΐδας",
  "διεύθυνση Α/θμιας, Β/θμιας διεύθυνσης νομού Κοζάνης",
  "σχολική βιβλιοθήκη bookbusters",
  "σχολική βιβλιοθήκη του 5ου γυμνασίου Πτολεμαΐδας",
  "μουσικό σχολείο Πτολεμαΐδας",
  "θεατρική αναζήτηση",
];
// const paragraph = `Βασικός στόχος του ετήσιου προγράμματος φιλαναγνωσίας, είναι η
// δημιουργία ενός λογοτεχνικού ιστού με κέντρο τη νεώτερη ιστορία της
// Ελλάδας (κατοχή –δικτατορία-πολυτεχνείο) που θα επιδιώξει να φέρει τα
// παιδιά σε επαφή με τη μνήμη και την ιστορία, όπως την κατέγραψαν μέσα
// στο έργο τους σημαντικές συγγραφείς της ελληνικής λογοτεχνίας για
// παιδιά και νέους.`;
// const words = paragraph.split(" ");
export default function Home() {
  // const container = useRef(null);

  // const { scrollYProgress } = useScroll({
  //   target: container,
  //   offset: ["start 0.5", "start 0.001"],
  // });
  useEffect(() => {
    const gradient: any = new Gradient();
    gradient.initGradient("#gradient-canvas");
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to("#gradient-canvas", {
        scrollTrigger: {
          trigger: ".hero",
          scrub: true,
          start: "top top",
          end: "bottom top",
        },
        width: "60%",
        height: "60vh",
        marginTop: "10vh",
        borderRadius: "20px",
      });
      gsap.to(".mix-blend-difference", {
        scrollTrigger: {
          trigger: ".hero",
          scrub: true,
          start: "top top",
          end: "bottom top",
        },
        y: -400,
      });
      gsap.to(".organisers", {
        scrollTrigger: {
          trigger: ".organisers",
          scrub: 3,
          start: "top 70%",
          end: "top top",
        },
        y: -300,
      });
      const oItems = gsap.utils.toArray(".o-item");
      oItems.forEach((i, key) => {
        //@ts-ignore
        gsap.from(i, {
          scrollTrigger: {
            trigger: ".organisers",
            start: "top bottom",
          },
          delay: key / 15,
          duration: 0.2,
          x: -200,
          opacity: 0,
        });
      });
      gsap.from("body", {
        scrollTrigger: {
          trigger: ".hero",
          start: "bottom 20%",
          end: "bottom top",
          scrub: true,
        },
        backgroundColor: "#1b1b3a",
      });
      // gsap.to(".paragraph", {
      //   scrollTrigger: {
      //     trigger: ".paragraph",
      //     start: "top 25%",
      //     end: "top -50%",
      //     scrub: true,
      //   },
      //   y: 200,
      // });
    });
    return () => {
      ctx.revert();
    };
  }, []);

  return (
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
      <div className="h-[200vh]">
        <section className="-mt-5 hero sm:px-10 px-6 sticky top-10">
          <div className="min-h-screen grid place-items-center">
            <div className="text-slate-500 mix-blend-difference">
              <h1 className="[font-size:_clamp(25px,6vw,90px)] leading-tight w-full logotex">
                Λογοτεχνικές διαδρομές στην ιστορία
              </h1>
              <H3 className="opacity-75 w-full ethsio">
                ετήσιο πρόγραμμα φιλαναγνωσίας
              </H3>
            </div>
          </div>
          <canvas
            id="gradient-canvas"
            className="absolute top-0 right-0 left-0 h-screen w-screen m-auto -z-10"
            data-transition-in
            data-js-darken-top
          />
        </section>
      </div>
      <section className="min-h-[50vh] sm:mx-10 mx-6 organisers ">
        <H1 className="o-item">Οργανωτές</H1>
        {organisers.map((organiser, i) => (
          <H3
            key={i}
            className="opacity-50 duration-300 hover:opacity-100 o-item"
          >
            {organiser}
          </H3>
        ))}{" "}
      </section>
      {/* <section className="sm:mx-10 mx-6 mb-96 lg:w-1/2 paragraph">
        <p ref={container} className={styles.paragraph}>
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </section> */}
    </>
  );
}

// const Word = ({ children, progress, range }) => {
//   const amount = range[1] - range[0];

//   const step = amount / children.length;

//   return (
//     <span className={styles.word}>
//       {children.split("").map((char, i) => {
//         const start = range[0] + i * step;

//         const end = range[0] + (i + 1) * step;

//         return (
//           <Char key={`c_${i}`} progress={progress} range={[start, end]}>
//             {char}
//           </Char>
//         );
//       })}
//     </span>
//   );
// };
// const Char = ({ children, progress, range }) => {
//   const opacity = useTransform(progress, range, [0, 1]);

//   return (
//     <span>
//       <span className={styles.shadow}>{children}</span>

//       <motion.span style={{ opacity: opacity }}>{children}</motion.span>
//     </span>
//   );
// };
