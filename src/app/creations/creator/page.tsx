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
import get from "@/utils/get";
import { Badge } from "@/components/ui/badge";
import deletefunc from "@/utils/delete";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { FirebaseError } from "@firebase/util";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Creation[] | null>(null);
  useEffect(() => {
    get()
      .then((res: any) => {
        setData(res);
        setLoading(false);
      })
      .catch((e: FirebaseError) => {
        setLoading(false);
        toast.error(`Σφάλμα: ${e.name}`);
        console.error(e);
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
                <AlertDialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="absolute top-2 right-2 z-10">
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
                        <AlertDialogTrigger className="flex w-full">
                          <TrashIcon className="mr-2 h-5 w-5" />
                          <span>Διαγραφή</span>
                        </AlertDialogTrigger>
                      </DropdownMenuItem>{" "}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <CardTitle className="mb-1 leading-8">
                    {creation.title}
                  </CardTitle>
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
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Είστε απόλυτα σίγουροι;
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Η δημιουργία <i>{creation.title}</i> και όλα τα αρχεία
                        που σχετίζονται μαζί της θα διαγραφούν οριστικά!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Άκυρο</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          toast.loading("Διαγραφή...");
                          deletefunc(creation)
                            .then(() => {
                              toast.dismiss();
                              toast.success("Η δημιουργία διαγράφηκε");
                            })
                            .catch((e) => {
                              toast.dismiss();
                              console.error(e);
                              toast.error(
                                "Σφάλμα δεν μπορέσαμε να διαγράψουμε την δημιουργία σας. Επικοινωνήστε με την υποστήριξη."
                              );
                            });
                        }}
                      >
                        Διαγραφή
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </Card>
            ))}
          </div>
        );
      }
    }
  }
  return (
    <div className="space-y-5 sm:mx-10 mx-6">
      <section>
        <div className="flex items-center space-x-2 relative">
          <TypographyH3>Οι δημιουργίες μου</TypographyH3>
          <Link href={"creator/add"} className="absolute right-0">
            <Button className="px-4 rounded-full ">
              <Plus className="mr-2" /> Προσθήκη
            </Button>
          </Link>
        </div>
        <div className="mb-8" />
        {loader()}
      </section>
    </div>
  );
}
