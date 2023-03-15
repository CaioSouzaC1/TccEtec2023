import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXeQruMdNAocLrCHQV0kiOxNyB_Vqs6e4",
  authDomain: "tccetec2023-6b3a9.firebaseapp.com",
  projectId: "tccetec2023-6b3a9",
  storageBucket: "tccetec2023-6b3a9.appspot.com",
  messagingSenderId: "323450035153",
  appId: "1:323450035153:web:822d5c43ba63dce680def0",
  measurementId: "G-96B343PYQ8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
