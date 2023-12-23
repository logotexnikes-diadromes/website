// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnCDK8ErjOO-RCXFBg6Zk_v-WzmvqyihE",
  authDomain: "fireapp-9dd9d.firebaseapp.com",
  projectId: "fireapp-9dd9d",
  storageBucket: "fireapp-9dd9d.appspot.com",
  messagingSenderId: "962928843236",
  appId: "1:962928843236:web:4450f64cbb4d9cc551cff1",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider().addScope("email");
