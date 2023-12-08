"use client";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="fixed w-full h-full top-0 left-0 z-40">
      <Link
        href={"/"}
        className="fixed bottom-3 left-3 z-50 bg-[#25324c] rounded-sm p-1"
      >
        <ChevronLeft className="text-[#b0c9fa]" />
      </Link>
      <NextStudio config={config} />
    </div>
  );
}
