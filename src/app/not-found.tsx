"use client";
import Button from "@/components/button";
import { H2 } from "@/components/typography";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="grid sm:mx-10 mx-6 min-h-screen text-center">
      <div className="place-self-center -mt-32">
        <img draggable={false} src="/assets/not-found.gif" alt="" />
        <H2>Η σελίδα δεν βρέθηκε</H2>
      </div>
    </div>
  );
}
