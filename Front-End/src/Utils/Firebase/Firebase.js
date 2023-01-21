import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEfbTWapNGUN-yuAVLLvwMKOwGRc8lYZk",
  authDomain: "tcc2023cruzeiro.firebaseapp.com",
  databaseURL: "https://tcc2023cruzeiro-default-rtdb.firebaseio.com",
  projectId: "tcc2023cruzeiro",
  storageBucket: "tcc2023cruzeiro.appspot.com",
  messagingSenderId: "705280448175",
  appId: "1:705280448175:web:989f81673c86875a12665a",
  measurementId: "G-34V4Y62504",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
