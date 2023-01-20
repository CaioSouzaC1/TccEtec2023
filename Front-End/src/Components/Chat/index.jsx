import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useIdToken } from "react-firebase-hooks/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

const Chat = () => {
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

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  //   const auth = app.auth();
  const auth = getAuth(app);

  const login = () => {
    signInWithEmailAndPassword(auth, "test@test.com", "password");
  };

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(
        "viniciusgay@gmail.com",
        "testPass"
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return;

  // return (
  //   <button
  //     onClick={() =>
  //       createUserWithEmailAndPassword("viniciusgayteste@gmail.com", "testPass")
  //     }
  //   >
  //     {" "}
  //     Register
  //   </button>
  // );
};

export default Chat;
