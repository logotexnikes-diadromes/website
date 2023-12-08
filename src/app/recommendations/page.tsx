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
    {
      author: "Προτεινόμενες δραστηριότητες",
      month: "",
      items: [
        "Δημιουργία αναγνωστικών ημερολογίων",
        "Συνανάγνωση κειμένων",
        "Ανταλλαγή αναγνωστικών εμπειριών",
        "Δημιουργία graphic short story",
        "Σύνθεση λογοτεχνικού αναλογίου",
        "Ηχογράφηση επιλεγμένων κειμένων",
        "Δραματοποίηση επιλεγμένων σκηνών από το λογοτεχνικό έργο συγγραφέων",
      ],
    },
  ];
  return (
    <>
      <section className="mx-10">
        <H1>Προτάσεις</H1>
        <Detail className="mb-8">(βιβλίων και δραστηριοτήτων)</Detail>
        {reccomendations.map((i, key) => (
          <div className="h-fit mb-5 text-right" key={key}>
            <div className="em top-32 text-left flex">
              <H3>{i.author}</H3>
              <Detail className="my-auto ml-3">{i.month}</Detail>
            </div>
            {i.items.map((i, key) => (
              <H2
                className={`border-y border-y-black-50 bg-white py-3 my-2 book cursor-default relative z-[${key}]`}
                key={key}
              >
                {i}
              </H2>
            ))}
          </div>
        ))}
      </section>
    </>
  );
}
