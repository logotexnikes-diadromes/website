import Announcement from "@/components/email/announcement";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Resend } from "resend";
const secret = process.env.WEBHOOK_API_KEY!;
const resend = new Resend(process.env.RESEND_API_KEY);
interface Contact {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
  unsubscribed: boolean;
}
export async function POST(req: Request) {
  const headersList = headers();
  const signature = headersList.get("Authorization");
  const { title, _createdAt, content } = await req.json();
  if (secret === signature) {
    if (content && _createdAt && content) {
      const rawcontacts = await resend.contacts.list({
        audience_id: "fe2e215f-4afa-411d-9542-22d101c729e5",
      });
      let sub_contacts: string[] = [];
      //@ts-ignore
      const contacts: Contact[] =  rawcontacts.data.data;
      contacts.forEach((c) => {
        
        if (!c.unsubscribed) {
          sub_contacts.push(c.email);
        }
      });
      resend.emails.send({
        from: "Λογοτεχνικές διαδρομές <no-reply@logotexnikes-diadromes.gr>",
        to: sub_contacts,
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
