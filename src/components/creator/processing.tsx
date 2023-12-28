import { UserInfo, signOut } from "firebase/auth";
import { CardDescription, CardTitle } from "../ui/card";
import Image from "next/image";
import Button from "../button";
import { auth } from "@/utils/firebase";
import { Envelope, X } from "./svgs";
import * as Tooltip from "@radix-ui/react-tooltip";



export default function Processing({
  user,
  notified,
}: {
  user: UserInfo;
  notified: { state: "wait" | "ok" | "error"; message: string };
}) {
  return (
    <div className="grid place-items-center h-[80vh]">
      <div className="border border-black-50 p-5 w-full max-w-md">
        <CardTitle className="mb-3">Επεξεργασία αιτήματος</CardTitle>
        <CardDescription className="mb-2">
          Το αιτημά σας θα επεξεργαστεί όσο το δυνατό πιο γρήγορα!
        </CardDescription>
        <div className="flex border border-black-50 p-3">
          <Image
            alt={"εικόνα προφίλ του/ της" + user.displayName}
            src={
              user.photoURL
                ? user.photoURL
                : "https://via.placeholder.com/40x40"
            }
            width={50}
            height={50}
            className="rounded-full w-12 h-12"
          />{" "}
          <div className="ml-3">
            <h1 className="text-xl font-medium">{user.displayName}</h1>
            <p className="text-sm">{user.email}</p>
          </div>
        </div>
        <div className="flex">
          <Button
            className="mt-1"
            onClick={() => {
              signOut(auth);
              window.location.reload();
            }}
          >
            Αποσύνδεση
          </Button>
          <Tooltip.Provider>
            <Tooltip.Root delayDuration={0}>
              <style>{`.TooltipContent {
  transform-origin: top center;
  animation: scaleIn 0.2s;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}`}</style>
              <Tooltip.Trigger asChild>
                <div className="mr-0 ml-auto relative w-8 h-8 border border-black-50 mt-1 cursor-help">
                  <span
                    className={`p-1 absolute top-0 left-0 right-0 m-auto h-full flex items-center
                          ${
                            notified.state === "ok"
                              ? "opacity-100"
                              : "translate-x-2 opacity-0"
                          }
                          duration-1000
                          `}
                  >
                    <Envelope />
                  </span>
                  <span
                    className={`absolute top-0 left-0 right-0  text-center h-full flex items-center p-1
              ${
                notified.state === "error"
                  ? "opacity-100"
                  : "translate-x-2 opacity-0"
              }
              duration-1000
              `}
                  >
                    <X />
                  </span>
                  <span
                    className={`absolute top-0 left-0 right-0 m-auto text-sm text-center
              ${
                notified.state === "wait"
                  ? "opacity-100"
                  : "-translate-x-2 opacity-0"
              }
              duration-300
              `}
                  >
                    ...
                  </span>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="TooltipContent bg-white border border-black-50 p-2 text-xs max-w-[200px] mt-1"
                  sideOffset={-100}
                >
                  {notified.message}
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
      </div>
    </div>
  );
}
