import { signInWithPopup } from "firebase/auth";
import Button from "../button";
import { CardDescription, CardTitle } from "../ui/card";
import { auth, provider } from "@/utils/firebase";

export default function Login() {
  return (
    <div className="grid place-items-center max-sm:p-5 h-[80vh] relative">
      <div className="border border-black-50 p-5 w-full max-w-md">
        <CardTitle className="mb-2">Κλειδωμένο</CardTitle>
        <CardDescription>
          Για να χρησιμοποιήσετε την πλατφόρμα πρέπει να είστε
          συμμετέχουσα/οντας εκπαιδευτικός.
        </CardDescription>
        <div className="w-full flex">
          <Button
          className="ml-auto mt-5"
            onClick={() =>
              signInWithPopup(auth, provider).catch((e) => console.error(e))
            }
          >
            Σύνδεση με Google
          </Button>
        </div>
      </div>
    </div>
  );
}
