import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

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
  const auth = getAuth(app);

  const [signInWithEmailAndPassword, userSign, loadingSign, errorSign] =
    useSignInWithEmailAndPassword(auth);

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const getDocsTensor = async () => {
    try {
      const login = signInWithEmailAndPassword(
        "viniciusgay@gmail.com",
        "testPass"
      );
      console.log(login);
    } catch (err) {
      console.log(err);
    }
  };

  const criar = async (e, p) => {
    try {
      const cria = await createUserWithEmailAndPassword(e, p);
      console.log(cria);
    } catch (err) {
      console.log(err);
    }
  };

  const logar = async (e, p) => {
    try {
      const logi = await signInWithEmailAndPassword(e, p);
      console.log(logi);
      const res = await getDoc(doc(db, "messages", "RuwwfunJDhCnr3VgRK6j"));
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  // return;

  return (
    <>
      <br />
      <button onClick={() => criar("maisteste@gmail.com", "testPass")}>
        {" "}
        Register
      </button>
      <br />
      <button onClick={() => logar("maisteste@gmail.com", "testPass")}>
        {" "}
        Login
      </button>
    </>
  );

  // return <button onClick={() => getDocsTensor()}> GetDocs</button>;
};

export default Chat;
