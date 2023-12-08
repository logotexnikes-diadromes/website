import { Detail, H1, H2, H3 } from "@/components/typography";
import alkizei from "@/app/assets/authors/alkizei.jpg";
import zorzsari from "@/app/assets/authors/Zorz_Sari.jpg";
import mitsiali from "@/app/assets/authors/mitsiali.jpg";
import loti from "@/app/assets/authors/loti.jpg";
import darlasi from "@/app/assets/authors/darlasi.webp";
import covo from "@/app/assets/authors/Kelly-Covo-foto.jpg";
import Image from "next/image";
export default function Page() {
  return (
    <section className="mx-10">
      <H1>Συγγραφείς</H1>
      <p className="max-lg:w-full w-1/2 mb-8">
        Οι «Λογοτεχνικές διαδρομές στην ιστορία» ξεκινούν τον Οκτώβριο και
        εκτυλίσσονται σε δύο κύκλους. Ο πρώτος κύκλος αποτελεί ένα αφιέρωμα σε
        δύο σημαντικές μορφές της σύγχρονης ελληνικής λογοτεχνίας, την Άλκη Ζέη
        και την Ζωρζ Σαρή, με αφορμή τα 100 χρόνια από τη γέννηση τους και
        ολοκληρώνεται με τη λήξη του 2023. Ο δεύτερος κύκλος αποτελεί τη
        μετάβαση σε βραβευμένες σύγχρονες συγγραφείς που αναδεικνύουν την
        ιστορία μέσα από την λογοτεχνία τους, κινούμενες στην ίδια ιστοριογραμμή
        όπου περπάτησαν λογοτεχνικά η Άλκη Ζέη και η Ζωρζ Σαρή.
      </p>
      <Detail>Α&apos; κύκλος</Detail>
      <div className="lg:flex w-full">
        <div className="flex space-x-5 border-y my-3 p-3 border-y-black-50 w-full">
          <Image
            className="w-2/5 aspect-square object-cover"
            alt={"Άλκη Ζέη"}
            src={alkizei}
            width={9999}
            height={9999}
          />{" "}
          <div>
            <H2>{"Άλκη Ζέη"}</H2>
          </div>
        </div>
        <div className="flex space-x-5 border-y my-3 p-3 border-y-black-50 w-full">
          <div className="mr-0 ml-auto items-end flex">
            <H2>{"Ζωρζ Σαρή"}</H2>
          </div>
          <Image
            className="w-2/5 aspect-square object-cover mr-0 ml-auto"
            alt={"Ζωρζ Σαρή"}
            src={zorzsari}
            width={9999}
            height={9999}
          />{" "}
        </div>
      </div>
      <Detail>B &apos; κύκλος</Detail>
      <div className="lg:flex w-full">
        <div className="flex space-x-5 border-y my-3 p-3 border-y-black-50 w-full">
          <Image
            className="w-2/5 aspect-square object-cover"
            alt={"Αλεξάνδρα Μητσιάλη"}
            src={mitsiali}
            width={9999}
            height={9999}
          />{" "}
          <div>
            <H2>{"Αλεξάνδρα Μητσιάλη"}</H2>
          </div>
        </div>
        <div className="flex space-x-5 border-y my-3 p-3 border-y-black-50 w-full">
          <div className="mr-0 ml-auto items-end flex text-right">
            <H2>{"Λότη Πέτροβιτς Ανδρουτσοπούλου"}</H2>
          </div>
          <Image
            className="w-2/5 aspect-square object-cover mr-0 ml-auto"
            alt={"Λότη Πέτροβιτς Ανδρουτσοπούλου"}
            src={loti}
            width={9999}
            height={9999}
          />{" "}
        </div>
      </div>
      <div className="lg:flex w-full">
        <div className="flex space-x-5 border-y my-3 p-3 border-y-black-50 w-full">
          <Image
            className="w-2/5 aspect-square object-cover"
            alt={"Αγγελική Δαρλάση"}
            src={darlasi}
            width={9999}
            height={9999}
          />{" "}
          <div>
            <H2>{"Αγγελική Δαρλάση"}</H2>
          </div>
        </div>
        <div className="flex space-x-5 border-y my-3 p-3 border-y-black-50 w-full">
          <div className="mr-0 ml-auto items-end flex text-right">
            <H2>{"Κέλλυ Ματάθια Κόβο"}</H2>
          </div>
          <Image
            className="w-2/5 aspect-square object-cover mr-0 ml-auto"
            alt={"Κέλλυ Ματάθια Κόβο"}
            src={covo}
            width={9999}
            height={9999}
          />{" "}
        </div>
      </div>
    </section>
  );
}
