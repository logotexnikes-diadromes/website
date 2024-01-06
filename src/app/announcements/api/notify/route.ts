// pages/api/hook.js
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const secret = process.env.WEBHOOK_API_KEY!;
const resend = new Resend(process.env.RESEND_API_KEY);
const recipeients = [
  "strat.ileris@gmail.com",
  //   "gasterva@gmail.com",
  //   "sofiakalmanidou@gmail.com",
  //   "alexmitsiali@gmail.com",
];

export async function POST(req: Request) {
  console.log("secret:     " + secret);
  const headersList = headers();
  const signature = headersList.get("Authorization");
  console.log("request-secret:     " + secret);
  const body = await req.json();
  if (secret === signature) {
    resend.emails.send({
      from: "Λογοτεχνικές διαδρομές <no-reply@logotexnikes-diadromes.gr>",
      to: recipeients,
      subject: `τεστ`, 
      // react: AdmitUser(
      //   {
      //     email: userdata.email,
      //     name: userdata.name,
      //     photoURL: userdata.photoURL,
      //   },
      //   date
      // ),
      text: JSON.stringify(body),
    });
    return NextResponse.json({ message: "Notified all users", ok: true });
  } else {
    return NextResponse.json(
      {
        message: "Failed to authosize you!",
        ok: false,
      },
      { status: 401 }
    );
  }
}

async function readBody(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}
