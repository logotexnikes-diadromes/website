import { doc, deleteDoc } from "firebase/firestore";
import { Creation } from "./types";
import { db } from "./firebase";
import { deleteObject } from "firebase/storage";

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
        deleteObject(file)
          .then(async () => {
            if (i.files.length === index) {
              await deleteDoc(doc(db, "creations", i.id)).catch((e) =>
                reject(e)
              );
              resolve("deleted");
            }
          })
          .catch((error: any) => {
            console.error(`error deleting ${file} ${error}`);
            reject(error);
          });
      });
    }
  });
}
