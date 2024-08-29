"use client";
import { Detail, H1, H2, H3 } from "@/components/typography";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      const books = gsap.utils.toArray(".book");
      books.forEach((book: any) => {
        gsap.from(book, {
          scrollTrigger: {
            scrub: true,
            start: "top 90%",
            end: "top 70%",
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
        <div className="py-8">
          <H1>Αναγνωστικές προτάσεις</H1>
          <Detail className="mb-8">(βιβλίων και δραστηριοτήτων)</Detail>
        </div>
        {reccomendations.map((i, key) => (
          <div className="h-fit mb-5" key={key}>
            <div className="em top-32 flex mt-10">
              <H3 className="text-red">{i.author}</H3>
              <Detail className="my-auto ml-3">{i.month}</Detail>
            </div>
            {i.items.map((ii, ikey) => (
              <H3
                className={` border-black-50 bg-white py-3 my-2 ${
                  key == 0 ? ikey !== 0 && "book" : "book"
                } cursor-default relative border-b max-md:text-right`}
                key={key}
              >
                {ii}
              </H3>
            ))}
          </div>
        ))}

        <div className="h-fit mb-5">
          <div className="em top-32 flex">
            <H3 className="text-red mt-8">{activities.author}</H3>
          </div>
          {activities.items.map((i, key) => (
            <H3
              className={`border-b border-black-50 bg-white py-3 my-2 book cursor-default relative z-[${key}] max-md:text-right`}
              key={key}
            >
              {i}
            </H3>
          ))}
        </div>
      </section>
    </>
  );
}
