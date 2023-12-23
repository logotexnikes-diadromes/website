import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export default async function getschools(id: string): Promise<String[] | null> {
  return new Promise(async (resolve, reject) => {
    try {
      const querySnapshot = await getDoc(doc(db, "users", id));
      if (querySnapshot.exists()) {
        if (querySnapshot.data().schools[0]) {
          resolve(querySnapshot.data().schools);
        } else {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}
