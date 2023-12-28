"use client";
import { Detail, H1, H2, H3 } from "@/components/typography";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { Gradient } from "@/components/gradient";
import Link from "next/link";

export default function Page() {
  useEffect(() => {
    const gradient: any = new Gradient();
    gradient.initGradient("#gradient-canvas");
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      const books = gsap.utils.toArray(".book");
      books.forEach((book: any) => {
        gsap.from(book, {
          scrollTrigger: {
            scrub: true,
            start: "top 80%",
            end: "top 50%",
            trigger: book,
          },
          opacity: 0,
          bottom: 100,
        });
      });
    });
    return () => ctx.revert();
  }, []);
  const reccomendations = [
    {
      author: "Άλκη Ζέη",
      month: "Οκτώβριος",
      items: [
        "Ο μεγάλος περίπατος του Πέτρου",
        "Η μωβ ομπρέλα",
        "Κοντά στις ράγες",
      ],
    },
    {
      author: "Zωρζ Σαρή",
      month: "Νοέμβριος",
      items: ["Όταν ο ήλιος", "Γενέθλια", "Κόκκινη κλωστή δεμένη"],
    },
    {
      author: "Άλκη Ζέη-Ζωρζ Σαρή",
      month: "Δεκέμβριος",
      items: ["Ε.Π."],
    },
    {
      author: "Κέλλυ Ματάθια Κόβο",
      month: "Ιανουάριος",
      items: ["Τα κίτρινα καπέλα"],
    },
    {
      author: "Λότη Πέτροβιτς Ανδρουτσοπούλου",
      month: "Φεβρουάριος",
      items: ["Ο καιρός της σοκολάτας", "Τραγούδι για τρεις"],
    },
    {
      author: "Αλεξάνδρα Μητσιάλη",
      month: "Μάρτιος",
      items: ["Οι ξυπόλυτοι ήρωες", "Ο βραχοπόλεμος", "Ημέρες που δακρύζουν"],
    },
    {
      author: "Αγγελική Δαρλάση",
      month: "Απρίλιος",
      items: ["Όταν έφυγαν τ΄αγάλματα 20 Απριλίου"],
    },
  ];
  const activities = {
    author: "Προτεινόμενες δραστηριότητες",
    items: [
      "Δημιουργία αναγνωστικών ημερολογίων",
      "Συνανάγνωση κειμένων",
      "Ανταλλαγή αναγνωστικών εμπειριών",
      "Δημιουργία graphic short story",
      "Σύνθεση λογοτεχνικού αναλογίου",
      "Ηχογράφηση επιλεγμένων κειμένων",
      "Δραματοποίηση επιλεγμένων σκηνών από το λογοτεχνικό έργο συγγραφέων",
      "Podcasts",
    ],
  };
  const words =
    "Οι αναγνωστικές προτάσεις των συγραφέων του προγράμματος.".split(" ");

  return (
    <>
      <section className="sm:mx-10 mx-6">
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
        <H1>Αναγνωστικές προτάσεις</H1>
        <Detail className="mb-8">(βιβλίων και δραστηριοτήτων)</Detail>
        <Link
          href={"/recommendations/authors"}
          className="relative h-96 w-full p-5 group grid mb-20"
        >
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
                  className=" [font-size:_clamp(30px,5vw,40px)] bg-white text-purple relative"
                >
                  {word + " "}
                </span>
              ))}
            </div>
            <button className="bg-white relative font-medium mt-2">
              Περισσότερα...
            </button>
          </div>
        </Link>
        {reccomendations.map((i, key) => (
          <div className="h-fit mb-5" key={key}>
            <div className="em top-32 flex mt-10">
              <H3 className="text-red">{i.author}</H3>
              <Detail className="my-auto ml-3">{i.month}</Detail>
            </div>
            {i.items.map((ii, ikey) => (
              <H2
                className={` border-black-50 bg-white py-3 my-2 ${
                  key == 0 ? ikey !== 0 && "book" : "book"
                } cursor-default relative border-b`}
                key={key}
              >
                {ii}
              </H2>
            ))}
          </div>
        ))}

        <div className="h-fit mb-5">
          <div className="em top-32 flex">
            <H3 className="text-red mt-8">{activities.author}</H3>
          </div>
          {activities.items.map((i, key) => (
            <H2
              className={`border-b border-black-50 bg-white py-3 my-2 book cursor-default relative z-[${key}]`}
              key={key}
            >
              {i}
            </H2>
          ))}
        </div>
      </section>
    </>
  );
}
