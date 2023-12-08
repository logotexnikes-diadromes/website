import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "./firebase";

export default function download(file: string) {
  getDownloadURL(ref(storage, file))
    .then((url) => {
      return url;
    })
    .catch((error) => {
      return "";
    });
}
