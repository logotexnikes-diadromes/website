"use client";
import Button from "@/components/button";
import { H2 } from "@/components/typography";
import Link from "next/link";

export default function Page() {
  return (
    <div className="grid mx-10 min-h-screen text-center">
      <div className="place-self-center -mt-32">
        <img draggable={false} src="/assets/not-found.gif" alt="" />
        <H2>Η σελίδα δεν βρέθηκε</H2>
        <div className="flex space-x-3 w-fit m-auto">
          <Link href={"/"}>
            <Button>Αρχική</Button>
          </Link>
          <div>
            {history.length > 1 && (
              <Button onClick={() => history.back()}>Πίσω</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
