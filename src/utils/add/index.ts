import { Add } from "@/utils/types";
import { auth, db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import slugify from "slugify";
import { v1 } from "uuid";

export default function Add(data: Add, files: FileList | null) {
  return new Promise(async (resolve) => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    const yy = today.getFullYear().toString().substring(2, 4);
    const date = mm + "/" + dd + "/" + yyyy;
    slugify.extend([
      { "«": "" },
      { "»": "" },
      { '"': "" },
      { "'": "" },
      { ";": "" },
      { "?": "" },
      { "/": "" },
    ]);
    const id = dd + "-" + mm + "-" + yy + slugify(data.title) + "-" + v1();
    if (!files) {
      setDoc(doc(db, "creations", `${id}`), {
        title: data.title,
        description: data.description,
        school: data.school,
        spotify: data.spotify ? data.spotify : "",
        youtube: data.youtube ? data.youtube : "",
        createdBy: auth.currentUser?.uid,
        createdAt: date,
      });
      resolve("created");
    } else {
      let filelocs: string[] = [];
      let fileUrls: string[] = [];
      Array.from(files).forEach(async (file: any) => {
        const loc = `${auth.currentUser?.uid}/${id}_${file.name}`;
        const storageRef = ref(storage, loc);
        uploadBytes(storageRef, file).then(() => {
          filelocs.push(loc);
          getDownloadURL(storageRef).then((url) => {
            fileUrls.push(url);
            if (fileUrls.length === files.length) {
              setDoc(doc(db, "creations", `${id}`), {
                title: data.title,
                description: data.description,
                school: data.school,
                spotify: data.spotify ? data.spotify : "",
                youtube: data.youtube ? data.youtube : "",
                createdBy: auth.currentUser?.uid,
                createdAt: date,
                files: filelocs,
                fileURLS: fileUrls,
              });
              resolve("created");
            }
          });
        });
      });
    }
  });
}
