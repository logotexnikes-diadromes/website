import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import defaultUser from "@/app/assets/Default_pfp.png";
import { UserInfo, signOut } from "firebase/auth";
import { HelpCircle, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/utils/firebase";
import { TypographyH4 } from "@/components/ui/typography";
import { Fragment, useEffect, useState } from "react";
import { UserIcon } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import getschools from "@/utils/getschools";
import Link from "next/link";
import toast from "react-hot-toast";
export default function User({ user }: { user: UserInfo }) {
  let [isOpen, setIsOpen] = useState(false);
  const [schools, setSchools] = useState<String[]>();
  useEffect(() => {
    if (auth.currentUser?.uid) {
      getschools(auth.currentUser?.uid)
        .then((schools) => {
          if (schools !== null) {
            setSchools(schools);
          } else {
            setSchools(["Κανένα σχολείο"]);
          }
        })
        .catch(() => toast.error("Σφάλμα! "));
    } else {
      setSchools(["ERROR NO_USERID"]);
    }
  }, []);
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-5">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transition-all">
                  <div
                    className={
                      "bg-white border max-w-[500px] w-full relative z-20 rounded-lg"
                    }
                  >
                    <CardHeader>
                      <CardTitle>Προφίλ</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex  border p-5 rounded-lg">
                        {auth.currentUser && auth.currentUser.photoURL ? (
                          <Image
                            alt={
                              "εικόνα προφίλ του/ της" +
                              auth.currentUser!.displayName
                            }
                            src={auth.currentUser.photoURL}
                            width={50}
                            height={50}
                            className="rounded-full w-12 h-12"
                          />
                        ) : (
                          <p>error</p>
                        )}
                        <div className="ml-3">
                          <h1 className="text-xl font-medium">
                            {auth.currentUser?.displayName}
                          </h1>
                          <p className="text-sm">{auth.currentUser?.email}</p>
                        </div>
                      </div>{" "}
                      <div className="mt-5" />
                      <div
                        className={` delay-75 duration-300 ${
                          !schools ? "h-0 opacity-0" : "h-fit opacity-100"
                        }`}
                      >
                        <span className="opacity-75">
                          <TypographyH4>
                            {schools && schools.length > 1
                              ? "Σχολεία:"
                              : "Σχολείo:"}{" "}
                          </TypographyH4>
                        </span>
                        <div className="mt-2">
                          {schools &&
                            schools.map((school, index) => (
                              <span
                                className="mr-2 mb-2 mt-0.5 p-2 text-sm font-medium inline-block select-none bg-slate-100 rounded-md"
                                key={index}
                              >
                                {school}
                              </span>
                            ))}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            alt={"εικόνα προφίλ του/ της" + user.displayName}
            src={user.photoURL ? user.photoURL : defaultUser}
            width={40}
            height={40}
            className="rounded-full"
          />{" "}
        </DropdownMenuTrigger>
        <DropdownMenuContent className={" w-52 relative right-10 bottom-2"}>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setIsOpen(true)}>
              <UserIcon className="mr-2 h-5 w-5" />
              <span>Προφίλ</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link className="flex" href={"/help"}>
                <HelpCircle className="mr-2 h-5 w-5" />
                <span>Βοήθεια</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              signOut(auth);
              window.location.reload();
            }}
          >
            <LogOut className="mr-2 h-5 w-5" />
            <span>Αποσύνδεση</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
