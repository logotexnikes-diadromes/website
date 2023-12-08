import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { auth } = await req.json();
  const q = query(
    collection(db, "creations"),
    where("createdBy", "==", auth.currentUser.uid)
  );
  const querySnapshot = await getDocs(q);
  const creations: any = [];
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    console.log("data");
    data = { ...data, id: doc.id };
    creations.push(data);
  });
  console.log(creations)
  return NextResponse.json(creations);
}
