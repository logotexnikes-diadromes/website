import { H1 } from "@/components/typography";
import { Metadata } from "next";
import Link from "next/link";
const links = [
  {
    url: "https://www.alkizei.com",
    name: "Η επίσημη ιστοσελίδα για τη συγγραφέα Άλκη Ζέη",

    description:
      "Η επίσημη ιστοσελίδα για τη συγγραφέα Άλκη Ζέη. Εργοβιογραφικά στοιχεία, κριτικές, συνεντεύξεις.",
  },
  {
    url: "https://www.zorzsari.gr",
    name: "Ζωρζ Σαρή | zorzsari.gr",

    description: "Το επίσημο site για τη ζωή και το έργο της Ζωρζ Σαρή.",
  },

  {
    url: "https://www.patakis.gr",
    name: "ΕΚΔΟΣΕΙΣ ΠΑΤΑΚΗ",

    description:
      "Βιβλία από τους σημαντικότερους Έλληνες και ξένους συγγραφείς. Νέοι & κλασικοί. Βραβευμένα βιβλία για παιδιά, εφήβους και ενήλικες: Βρες το επόμενο αγαπημένο σου βιβλίο από τις εκδόσεις Πατάκη.",
  },
  {
    url: "https://www.metaixmio.gr",
    name: "Εκδόσεις Μεταίχμιο - Βιβλία, eBooks, Παιδικά Βιβλία",

    description:
      "Οι εκδόσεις ΜΕΤΑΙΧΜΙΟ είναι ένας πολυσυλλεκτικός εκδοτικός οίκος που εκδίδει ένα ευρύ φάσμα βιβλίων, ικανοποιώντας τις διαφορετικές και ποικίλες προτιμήσεις των αναγνωστών κάθε ηλικίας.",
  },
  {
    url: "https://www.elniplex.com/",
    name: "To Elniplex | Elniplex",
    favicon:
      "https://www.elniplex.com/wp-content/uploads/2023/08/favicon-16x16-1.png",
    description: "",
  },
];
export const metadata: Metadata = {
  title: "Χρήσιμοι Σύνδεσμοι | Λογοτεχνικές Διαδρομές",
};
export default function Page() {
  return (
    <div className="grid place-items-center sm:mx-10 mx-6 min-h-[80vh]">
      <div className="">
        <div
          className="rounded-full w-full h-12 mb-12 flex items-center px-5 max-w-xl"
          style={{ boxShadow: "0 2px 5px 1px rgba(64, 60, 67, 0.16)" }}
        >
          <svg
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 mr-2 opacity-50"
          >
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
          </svg>
          <input
            className="focus:outline-none w-full"
            defaultValue={"Χρήσιμοι σύνδεσμοι"}
          ></input>
          <svg
            className="w-6 mr-2"
            focusable="false"
            viewBox="0 0 192 192"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect fill="none" height="192" width="192"></rect>
            <g>
              <circle fill="#34a853" cx="144.07" cy="144" r="16"></circle>
              <circle fill="#4285f4" cx="96.07" cy="104" r="24"></circle>
              <path
                fill="#ea4335"
                d="M24,135.2c0,18.11,14.69,32.8,32.8,32.8H96v-16l-40.1-0.1c-8.8,0-15.9-8.19-15.9-17.9v-18H24V135.2z"
              ></path>
              <path
                fill="#fbbc05"
                d="M168,72.8c0-18.11-14.69-32.8-32.8-32.8H116l20,16c8.8,0,16,8.29,16,18v30h16V72.8z"
              ></path>
              <path
                fill="#4285f4"
                d="M112,24l-32,0L68,40H56.8C38.69,40,24,54.69,24,72.8V92h16V74c0-9.71,7.2-18,16-18h80L112,24z"
              ></path>
            </g>
          </svg>
          <svg
            className="w-6 mr-2 ml-3"
            focusable="false"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#4285f4"
              d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z"
            ></path>
            <path fill="#34a853" d="m11 18.08h2v3.92h-2z"></path>
            <path
              fill="#fbbc05"
              d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z"
            ></path>
            <path
              fill="#ea4335"
              d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z"
            ></path>
          </svg>
        </div>
        <div className="w-full grid gap-5">
          {links.map((i, key) => (
            <div className="grid max-w-xl" key={key}>
              <div className="flex items-center">
                <img
                  src={i.favicon ? i.favicon : i.url + "/favicon.ico"}
                  className="aspect-square w-6 bg-[#f1f3f4] p-1 rounded-full mr-2 "
                />
                <div>
                  <p className="text-xs">
                    {i.url.replace("https://www.", "").split("/")[0]}
                  </p>
                  <p className="text-[9px]">{i.url}</p>
                </div>
              </div>
              <Link
                target="_blank"
                href={
                  "https://logotexnikes-diadromes.gr/redirect?link=" +
                  i.url +
                  "&from=" +
                  window.location.href
                }
                className="text-[#6616b6] mt-1 hover:underline"
              >
                {i.name}
              </Link>
              <p className="text-xs">{i.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
