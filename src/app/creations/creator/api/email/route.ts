import AdmitUser from "@/components/email/admin";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import * as admin from "firebase-admin";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

export async function GET() {
  return NextResponse.json(
    "Επικοινωνήστε μαζί μας στο info@logotexnikes-diadromes.gr"
  );
}
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = getFirestore();

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req: Request) {
  const { token } = await req.json();
  if (token) {
    const decoded = await getAuth().verifyIdToken(token);
    const ref = db.collection("users").doc(decoded.uid);
    const querySnapshot = await ref.get();
    if (querySnapshot.exists) {
      if (querySnapshot.data()!.reqEmail) {
        return NextResponse.json({
          message: "Έχουμε ήδη λάβει την αίτησή σας",
        });
      } else {
        const userdata = querySnapshot.data()!;
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        const date = dd + "/" + mm + "/" + yyyy;
        resend.emails
          .send({
            from: "Λογοτεχνικές διαδρομές <no-reply@logotexnikes-diadromes.gr>",
            to: ["strat.ileris@gmail.com", "logotexnikes.diadromes@gmail.com"],
            subject: `${
              userdata.name
                ? `${userdata.name} αίτηση`
                : `${userdata.email} αίτηση`
            }`,
            react: AdmitUser(
              {
                email: userdata.email,
                name: userdata.name,
                photoURL: userdata.photoURL,
              },
              date
            ),
          })
          .then(async () => {
            await ref.update({
              reqEmail: FieldValue.serverTimestamp(),
            });
          });
        return NextResponse.json({
          message: "Έχουμε ειδοποιηθεί για την αίτησή σας",
        });
      }
    } else {
      return NextResponse.json(
        {
          message: "Δεν μπορέσαμε να επαληθεύσουμε την ταυτότητά σας.",
        },
        { status: 401 }
      );
    }
  } else {
    return NextResponse.json(
      {
        message: "Δεν έχετε παρέχει αρκετές πληροφορίες για να συνεχίσουμε",
      },
      { status: 400 }
    );
  }
}
