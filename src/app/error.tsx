"use client";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { H1 } from "@/components/typography";
import Button from "@/components/button";
import Link from "next/link";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
    Sentry.showReportDialog({
      labelClose: "Κλείσιμο",
      labelName: "oνομα",
      labelSubmit: "Υποβολή συμβάντος",
      title: "Αντιμετωπίζουμε ένα πρόβλημα",
      labelComments: "Τι συνεβη;",
      successMessage: "Λάβαμε το μήνυμά σας. Ευχαριστούμε!",
      subtitle2: "Αν θέλετε να βοηθήσετε μπορείτε να μας πείτε τι έγινε.",
      subtitle: "Η ομάδα μας έχει ειδοποιηθεί.",
      dsn: "https://4eee13a429c3404b52252f5e666823cd@o4506485106016256.ingest.sentry.io/4506485107261440",
    });
  }, [error]);

  return (
    <div className="sm:mx-10 mx-6 min-h-screen grid place-items-center">
      <div className="relative bottom-12">
        <img
          draggable={false}
          src="/assets/not-found.gif"
          alt=""
          className="w-full max-w-md"
        />
        <H1 className="text-purple">Σφάλμα!</H1>
        <Link href={"/"}>
          <Button className="mt-2">Αρχική</Button>
        </Link>
      </div>
    </div>
  );
}
