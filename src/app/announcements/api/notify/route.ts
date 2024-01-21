import Announcement from "@/components/email/announcement";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Resend } from "resend";
const secret = process.env.WEBHOOK_API_KEY!;
const resend = new Resend(process.env.RESEND_API_KEY);

const recipeients = [
  "strat.ileris@gmail.com",
  "gasterva@gmail.com",
  "sofiakalmanidou@gmail.com",
  "alexmitsiali@gmail.com",
  "logotexnikes.diadromes@gmail.com",
  "ninasaoulidou@gmail.com",
  "alopoudi@gmail.com",
  "elenpom1979@gmail.com",
  "efipapadi69@gmail.com",
  "pol.tsirka@gmail.com",
  "eirsaul@gmail.com",
  "elena.lamp@gmail.com",
  "alexandraouroumi@gmail.com",
  "matsoukadina@gmail.com",
  "theodora.alexopoulou@gmail.com",
  "sagiadastefi@gmail.com",
  "frngniki@gmail.com",
  "tmorfop@gmail.com",
  "olgief@gmail.com",
];

export async function POST(req: Request) {
  const headersList = headers();
  const signature = headersList.get("Authorization");
  const { title, _createdAt, content } = await req.json();
  if (secret === signature) {
    if (content && _createdAt && content) {
      resend.emails.send({
        from: "Λογοτεχνικές διαδρομές <no-reply@logotexnikes-diadromes.gr>",
        bcc: recipeients,
        to: "info@logotexnikes-diadromes.gr",
        reply_to: "info@logotexnikes-diadromes.gr",
        subject: `Ανακοίνωση: ${title}`,
        react: Announcement(title, _createdAt, JSON.stringify(content)),
      });
      return NextResponse.json({ message: "Notified all users", ok: true });
    } else {
      return NextResponse.json(
        {
          message: "Bad request! Missing fields.",
          ok: false,
        },
        { status: 400 }
      );
    }
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
