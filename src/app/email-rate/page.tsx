import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { H3 } from "@/components/typography";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    uid: string;
    rating: string;
  };
}) {
  if (searchParams?.uid && searchParams?.rating) {
    const uid = searchParams.uid;
    const rating = searchParams.rating;
    const res = await postRating(uid, rating);
    // chack if int
    if (typeof res === "string") {
      if (parseInt(rating) >= 4) {
        return (
          <div className="min-h-screen grid place-items-center sm:mx-10 mx-6">
            <div className="max-w-md p-5 border border-black-50">
              <H3 className="text-red mb-3">Ευχαριστούμε!</H3>
              <p>
                {res}, η βαθμολογία σας{" "}
                <span className="text-red">{searchParams.rating}</span> έχει
                καταχωρηθεί. Χαιρόμαστε που είχατε μια ευχάριστη εμπειρία με την
                πλατφόμα.
              </p>
            </div>
          </div>
        );
      } else {
        return (
          <div className="min-h-screen grid place-items-center sm:mx-10 mx-6">
            <div className="max-w-md p-5 border border-black-50">
              <H3 className="text-red mb-3">Ευχαριστούμε για τα σχόλιά σας</H3>
              <p>
                Θα μας βοηθούσε να ακούσουμε τι σας παρότρυνε σε αυτή τη
                βαθμολογία, μπορείτε πάντα να μας στείλετε τις παρατηρήσεις σας
                στο{" "}
                <Link
                  href={"mailto:support@logotexnikes-diadromes.gr"}
                  className="text-red "
                >
                  support@logotexnikes-diadromes.gr
                </Link>
              </p>
            </div>
          </div>
        );
      }
    } else {
      return <Error />;
    }
  } else {
    return <Error />;
  }
}

function Error() {
  return (
    <div className="min-h-screen grid place-items-center sm:mx-10 mx-6">
      <div className="max-w-md p-5 border border-black-50">
        <H3 className="text-red mb-3">Προέκυψε ένα σφάλμα</H3>
        <p>Βαθμολογίστε μας απαντώντας στο email που σας έχει αποσταλεί.</p>
      </div>
    </div>
  );
}

const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY?.toString() as string;

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(key)),
  });
}
const db = getFirestore();

async function postRating(uid: string, rating: string) {
  const ref = db.collection("users").doc(uid);
  const querySnapshot = await ref.get();
  if (querySnapshot.exists) {
    await ref.update({
      rating: rating,
    });
    return querySnapshot.data()!.name;
  }
  return false;
}
