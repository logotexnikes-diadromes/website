"use client";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default async function getschools(id: string): Promise<String[] | null> {
  const querySnapshot = await getDoc(doc(db, "users", id));
  if (querySnapshot.exists()) {
    if (querySnapshot.data().schools[0]) {
      return querySnapshot.data().schools;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
