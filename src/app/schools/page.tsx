"use client";
import { Gradient } from "@/components/gradient";
import { H1, H2, H3 } from "@/components/typography";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";
const schools = [
  "13ο Νηπιαγωγείο Πτολ/δας",
  "17ο Νηπιαγωγείο Πτολ/δας",
  "Το σπιτάκι των θαυμάτων",
  "Νηπιαγωγείο Δρεπάνου",
  "Ουράνιο Τόξο",
  "2ο Νηπιαγωγείο Πτολ/δας",
  "9ο Νηπιαγωγείο Πτολ/δας",
  "Λέσχη ανάγνωσης BookAdventures",
  "1o Δημοτικό Μουρικίου",
  "2ο Δημοτικό Ευόσμου",
  "2ο Δημοτικό Μουρικίου",
  "12ο Δημοτικό Κοζάνης",
  "Δημοτικό Χ.Μεγδάνης Κοζάνης",
  "10ο Δημοτικό Πτολ/δας",
  "2ο Δημοτικό Αρκαλοχωρίου",
  "5ο Δημοτικό Γαλατσίου",
  "1ο Δημοτικό Σκιάθου",
  "1ο Πρότυπο Θες/νίκης",
  "5ο Γυμνάσιο Πτολεμαΐδας",
  "3ο Γυμνάσιο Αμαρουσίου",
  "1ο Γυμνάσιο Πτολεμαΐδας",
  "Γυμνάσιο Τήνου",
  "Γυμνάσιο Ανατολικού",
  "1ο Γυμνάσιο Θες/νίκης",
  "Κολλέγιο Ρόδου",
  "Μουσικό σχολείο",
  "Θεατρική αναζήτηση/ Δραματοποίηση",
];
export default function Page() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      const books = gsap.utils.toArray(".school");
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
  return (
    <>
      <section className="sm:mx-10 mx-6">
        <div className="py-24">
          <H1>Σχολεία του δικτύου</H1>
        </div>

        {schools.map((i, key) => (
          <H3
            className={`border-black-50 bg-white py-3 my-2 school cursor-default relative border-b max-md:text-right`}
            key={key}
          >
            {i}
          </H3>
        ))}
      </section>
    </>
  );
}
