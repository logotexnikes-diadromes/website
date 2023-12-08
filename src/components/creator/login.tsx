import { signInWithPopup } from "firebase/auth";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { auth, provider } from "@/utils/firebase";

export default function Login() {
  return (
    <div className="grid place-items-center h-[80vh]">
      <Card>
        <CardHeader>
          <CardTitle>Συνδεθείτε</CardTitle>
          <CardDescription>
            Για να χρησιμοποιήσετε την πλατφόρμα πρέπει να είστε
            συμμετέχουσα/οντας εκπαιδευτικός.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => signInWithPopup(auth, provider)}>
            Είσοδος
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
