"use client";
import { Roboto } from "next/font/google";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/utils/firebase";
import { useEffect, useState } from "react";
import User from "@/components/creator/user";
import { UserInfo } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import Processing from "@/components/creator/processing";
import Login from "@/components/creator/login";

const font = Roboto({
  weight: ["300", "400", "500"],
  variable: "--font-roboto",
  subsets: ["latin", "greek"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  const date = mm + "/" + dd + "/" + yyyy;

  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserInfo | undefined>(undefined);
  const [authorised, setAuthorised] = useState<boolean>(false);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userdb = docSnap.data();
          setUser(user);
          if (userdb.authorised) {
            setAuthorised(true);
            setLoading(false);
          } else {
            setAuthorised(false);
            setLoading(false);
          }
        } else {
          setUser(user);
          setAuthorised(false);
          setLoading(false);
          await setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            email: user.email,
            createdAt: date,
            authorised: false,
            photoURL: user.photoURL,
            schools: [],
          });
        }
      }
      setLoading(false);
    });
  }, []);

  function body() {
    if (loading) {
      return (
        <div className="w-full h-[80vh]">
          <Skeleton className="w-full max-w-sm h-10" />
          <Skeleton className="w-full h-64 mt-8" />
          <Skeleton className="w-full h-14 fixed bottom-0 left-0 rounded-none" />
        </div>
      );
    } else {
      if (user) {
        if (authorised) {
          return (
            <div className={` ${font.variable} `}>
              <header className="py-2 border-t border-t-black-50 flex fixed bottom-0 left-0 w-full px-10 bg-white">
                <span className="w-2/3 max-w-[300px] my-auto font-medium">
                  Διαχείριση περιεχομένου
                </span>
                <div className="mr-0 ml-auto my-auto">
                  <User user={user} font={font} />
                </div>
              </header>
              {children}
            </div>
          );
        } else {
          return <Processing user={user} />;
        }
      } else {
        return <Login />;
      }
    }
  }
  return <div className={font.className + " mx-10"}>{body()}<div className="pb-[100vh]"/></div>;
}
