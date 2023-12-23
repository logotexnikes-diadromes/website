import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebase";

export default async function get() {
  return new Promise(async (resolve, reject) => {
    if (auth.currentUser) {
      const q = query(
        collection(db, "creations"),
        where("createdBy", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const creations: any = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data = { ...data, id: doc.id };
        creations.push(data);
      });
      resolve(creations);
    } else {
      reject("Δεν μπορούμε να επαλθεύσουμε την ταυτότητά σας");
    }
  });
}