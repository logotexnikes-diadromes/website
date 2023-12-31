import { Detail, H1, H3 } from "@/components/typography";
import Image from "next/image";
export default function Page() {
  return (
    <section className="sm:mx-10 mx-6">
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
            src={"/authors/1.jpg"}
            width={9999}
            height={9999}
          />{" "}
          <div>
            <H3>{"Άλκη Ζέη"}</H3>
          </div>
        </div>
        <div className="flex space-x-5 border-y my-3 p-3 border-y-black-50 w-full">
          <div className="mr-0 ml-auto items-end flex">
            <H3>{"Ζωρζ Σαρή"}</H3>
          </div>
          <Image
            className="w-2/5 aspect-square object-cover mr-0 ml-auto"
            alt={"Ζωρζ Σαρή"}
            src={"/authors/6.jpg"}
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
            src={"/authors/5.jpg"}
            width={9999}
            height={9999}
          />{" "}
          <div>
            <H3>{"Αλεξάνδρα Μητσιάλη"}</H3>
          </div>
        </div>
        <div className="flex space-x-5 border-y my-3 p-3 border-y-black-50 w-full">
          <div className="mr-0 ml-auto items-end flex text-right">
            <H3 className="max-sm:text-lg">{"Λότη Πέτροβιτς Ανδρουτσοπούλου"}</H3>
          </div>
          <Image
            className="w-2/5 aspect-square object-cover mr-0 ml-auto"
            alt={"Λότη Πέτροβιτς Ανδρουτσοπούλου"}
            src={"/authors/4.jpg"}
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
            src={"/authors/2.webp"}
            width={9999}
            height={9999}
          />{" "}
          <div>
            <H3>{"Αγγελική Δαρλάση"}</H3>
          </div>
        </div>
        <div className="flex space-x-5 border-y my-3 p-3 border-y-black-50 w-full">
          <div className="mr-0 ml-auto items-end flex text-right">
            <H3>{"Κέλλυ Ματάθια Κόβο"}</H3>
          </div>
          <Image
            className="w-2/5 aspect-square object-cover mr-0 ml-auto"
            alt={"Κέλλυ Ματάθια Κόβο"}
            src={"/authors/3.jpg"}
            width={9999}
            height={9999}
          />{" "}
        </div>
      </div>
    </section>
  );
}
