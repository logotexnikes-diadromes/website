import { signInWithPopup } from "firebase/auth";
import Button from "../button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { auth, provider } from "@/utils/firebase";
import Link from "next/link";

export default function Login() {
  return (
    <div className="grid place-items-center h-[80vh] relative">
      <div className="border border-black-50 p-5 w-full max-w-md">
        <CardTitle className="mb-3">Κλειδωμένο</CardTitle>
        <CardDescription className="mb-2">
          Για να χρησιμοποιήσετε την πλατφόρμα πρέπει να είστε
          συμμετέχουσα/οντας εκπαιδευτικός.
        </CardDescription>
        <Button
          onClick={() =>
            signInWithPopup(auth, provider).catch((e) => console.error(e))
          }
        >
          Σύνδεση
        </Button>
      </div>
    </div>
  );
}
