import { Detail, H1 } from "@/components/typography";
import Image from "next/image";
import pataki from "@/app/assets/pataki.webp";
import metaixmio from "@/app/assets/metaixmio.png";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen group">
      <div className="sm:mx-10 mx-6">
        <H1 className="mb-8">Επικοινωνία</H1>
        <div>
          <Detail>Υπεύθυνες προγράμματος</Detail>
          <Link
            href={"mailto:info@logotexnikes-diadromes.gr"}
            className="text-red"
          >
            info@logotexnikes-diadromes.gr
          </Link>
        </div>
        <div className="mt-5">
          <Detail>Τεχνική υποστήριξη</Detail>
          <Link
            href={"mailto:support@logotexnikes-diadromes.gr"}
            className="text-red"
          >
            support@logotexnikes-diadromes.gr
          </Link>
        </div>
        <div className="mt-5">
          <Detail>Δηλώσεις συμμετοχής και πληροφορίες</Detail>
          <p className="text-sm -mt-0.5 mb-1 opacity-50">
            Δημοτική Βιβλιοθήκη Πτολεμαΐδας - Σοφία Καλμανίδου
          </p>
          <Link href={"tel:2463055179"} className="text-red">
            2463055179
          </Link>
        </div>
        <div className="mt-5">
          <Detail>Αίτηση συμμετοχής</Detail>
          <Link href={"/docs/aithsh_symmetoxhs.docx"} className="text-red">
            Λήψη
          </Link>
        </div>
      </div>

      <Detail className="mt-10 sm:mx-10 mx-5 mb-2">Υποστήριξη</Detail>
      <section className="border-y border-black-50 py-3 sm:px-10 px-6 w-full grid sm:grid-cols-2">
        <Image
          src={metaixmio}
          alt="Εκδόσεις Μεταίχμιο"
          width={200}
          className="max-w-[200px] max-h-[80px] object-contain my-auto max-sm:m-auto"
        />
        <Image
          src={pataki}
          alt="Εκδόσεις Πατάκη"
          width={200}
          className="max-w-[200px] max-h-[80px] object-contain max-sm:m-auto"
        />
      </section>
    </div>
  );
}
