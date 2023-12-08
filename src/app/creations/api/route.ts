import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const encoded = searchParams.get("id");
  if (!encoded) {
    const querySnapshot = await getDocs(collection(db, "creations"));
    const creations: any = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data = { ...data, id: doc.id };
      creations.push(data);
    });
    if (creations) {
      return NextResponse.json(creations);
    } else {
      return NextResponse.json({ exists: false });
    }
  } else {
    const id = decodeURI(encoded);
    const docRef = doc(db, "creations", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return NextResponse.json(docSnap.data());
    } else {
      return NextResponse.json({ notfound: true });
    }
  }
}
