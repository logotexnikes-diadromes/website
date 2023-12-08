"use client";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Creation } from "@/utils/types";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH3 } from "@/components/ui/typography";
import Link from "next/link";
import { Fullscreen, MoreVertical, Plus, TrashIcon } from "lucide-react";
import "./globals.css";
import get from "@/utils/get";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Creation[] | null>(null);
  useEffect(() => {
    get().then((res: any) => {
      setData(res);
      setLoading(false);
    });
  }, []);
  function loader() {
    if (loading) {
      return (
        <div className="w-full h-[80vh]">
          <div className="mb-10" />
          <Skeleton className="w-full h-64 mt-8" />
        </div>
      );
    } else {
      if (data) {
        return (
          <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-3">
            {data.map((creation, key) => (
              <Card key={key} className="p-5 w-full relative">
                <DropdownMenu>
                  <DropdownMenuTrigger className="absolute top-7 right-7 z-10">
                    <Button className="p-2" variant={"secondary"}>
                      <MoreVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className={`font-roboto`}>
                    <DropdownMenuItem>
                      <Link
                        href={`/creations/${creation.id}`}
                        className="flex w-full"
                      >
                        <Fullscreen className="mr-2 h-5 w-5" />
                        Προβολή
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <TrashIcon className="mr-2 h-5 w-5" />
                      <span>Διαγραφή</span>
                    </DropdownMenuItem>{" "}
                  </DropdownMenuContent>
                </DropdownMenu>

                <CardTitle className="mb-1">{creation.title}</CardTitle>
                <CardDescription className="space-y-1 space-x-1">
                  {creation.files && (
                    <Badge variant={"secondary"}>
                      {creation.files.length}{" "}
                      {creation.files.length === 1 ? "αρχείο" : "αρχεία"}
                    </Badge>
                  )}
                  {creation.spotify !== "" && (
                    <Link
                      href={creation.spotify}
                      target="_blank"
                      className="inline-block"
                    >
                      <Badge variant={"secondary"}>spotify</Badge>
                    </Link>
                  )}
                  {creation.youtube !== "" && (
                    <Link
                      href={creation.youtube}
                      target="_blank"
                      className="inline-block"
                    >
                      <Badge variant={"secondary"}>youtube</Badge>
                    </Link>
                  )}
                </CardDescription>
              </Card>
            ))}
          </div>
        );
      }
    }
  }
  return (
    <div className="space-y-5">
      <section>
        <div className="flex items-center space-x-2 relative">
          <TypographyH3>Δημιουργίες</TypographyH3>
          <Link href={"creator/add"} className="absolute right-0">
            <Button className="p-2 rounded-full ">
              <Plus />
            </Button>
          </Link>
        </div>
        <div className="mb-8" />
        {loader()}
      </section>
    </div>
  );
}
