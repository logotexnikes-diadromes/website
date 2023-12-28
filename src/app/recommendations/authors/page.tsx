"use client";
import { Detail, H1, H2, H3, H3Small } from "@/components/typography";
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
      <section>
        <H1 className="sm:mx-10 mx-6">Αναγνωστικές προτάσεις</H1>
        <Detail className="mb-8 sm:mx-10 mx-6">
          (συγγραφέων του προγράμματος)
        </Detail>
        {reccomendations.map((i, key) => (
          <div key={key} className={`border-b  border-black-50 px-10 py-3`}>
            <div>
              <H3 className="inline-block">{i.author}</H3>
              <H3 className="opacity-50 inline-block"> προτείνει:</H3>
            </div>
            {i.items.map((i, ikey) => (
              <H3Small className="inline-block" key={ikey}>
                {ikey !== 0 && " | "}
                {i}
              </H3Small>
            ))}
          </div>
        ))}
      </section>
    </>
  );
}
