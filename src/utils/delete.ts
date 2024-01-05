import { doc, deleteDoc } from "firebase/firestore";
import { Creation } from "./types";
import { db, storage } from "./firebase";
import { deleteObject, ref } from "firebase/storage";

export default function deletefunc(i: Creation) {
  return new Promise(async (resolve, reject) => {
    if (!i.files) {
      try {
        await deleteDoc(doc(db, "creations", i.id)).catch((e) => reject(e));
        resolve("deleted");
      } catch (e) {
        reject(e);
      }
    } else {
      i.files.forEach(async (file: any, index: number) => {
        deleteObject(ref(storage, file)).catch((error: any) => {
          console.error(`error deleting ${file} ${error}`);
          reject(error);
        });
        if (i.files.length - 1 === index) {
          await deleteDoc(doc(db, "creations", i.id)).catch((e) => reject(e));
          resolve("deleted");
        }
      });
    }
  });
}
