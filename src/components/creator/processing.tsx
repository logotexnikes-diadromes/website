import { UserInfo, signOut } from "firebase/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { auth } from "@/utils/firebase";

export default function Processing({ user }: { user: UserInfo }) {
  return (
    <div className="grid place-items-center h-[80vh]">
      <Card>
        <CardHeader>
          <CardTitle>Έχουμε λάβει την αίτησή σας</CardTitle>
          <CardDescription>
            Για να μπορείτε να προσθέσετε περιεχόμενο πρέπει να γίνει αποδεκτό
            το αίτημά σας.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex drop-shadow-md rounded-md border p-5">
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
            <Button
              className="mr-0 ml-auto max-md:hidden"
              onClick={() => {
                signOut(auth);
                window.location.reload();
              }}
            >
              Αποσύνδεση
            </Button>
          </div>
        </CardContent>
        <CardFooter className="md:hidden">
          <Button
            onClick={() => {
              signOut(auth);
              window.location.reload();
            }}
          >
            Αποσύνδεση
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
