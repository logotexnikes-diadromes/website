import { Add } from "@/utils/types";
import { auth, db, storage } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import slugify from "@sindresorhus/slugify";

export default function Add(data: Add, files: FileList | null) {
  return new Promise(async (resolve, reject) => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    const date = dd + "/" + mm + "/" + yyyy;
    let clearSpotifyUrl = "";
    if (data.spotify) {
      try {
        clearSpotifyUrl = data.spotify.split(`src="`)[1].split(`"`)[0];
      } catch {
        reject("Λάθος σύνδεσμος spotify");
      }
    }
    if (auth.currentUser) {
      const id = slugify(
        data.title + "-" + data.school + "-" + today.getMilliseconds()
      );
      if (!files) {
        setDoc(doc(db, "creations", id), {
          title: data.title,
          description: data.description,
          school: data.school,
          spotify: clearSpotifyUrl,
          youtube: data.youtube ? data.youtube : "",
          createdBy: auth.currentUser?.uid,
          createdAt: date,
        }).catch((e) => {
          reject(e);
        });
        resolve("created");
      } else {
        let filelocs: string[] = [];
        let fileUrls: string[] = [];
        Array.from(files).forEach(async (file: any) => {
          const loc = `${auth.currentUser?.uid}/${id}_${file.name}`;
          const storageRef = ref(storage, loc);
          uploadBytes(storageRef, file)
            .then(() => {
              filelocs.push(loc);
              getDownloadURL(storageRef).then((url) => {
                fileUrls.push(url);
                if (fileUrls.length === files.length) {
                  setDoc(doc(db, "creations", id), {
                    title: data.title,
                    description: data.description,
                    school: data.school,
                    spotify: clearSpotifyUrl,
                    youtube: data.youtube ? data.youtube : "",
                    createdBy: auth.currentUser?.uid,
                    createdAt: date,
                    files: filelocs,
                    fileURLS: fileUrls,
                  }).catch((e) => {
                    reject(e);
                  });
                  resolve("created");
                }
              });
            })
            .catch((e) => {
              reject(e);
            });
        });
      }
    } else {
      reject("Δεν μπορούμε να επαλθεύσουμε την ταυτότητά σας");
    }
  });
}
