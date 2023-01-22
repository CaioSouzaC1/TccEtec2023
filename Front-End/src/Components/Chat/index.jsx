import "firebase/auth";
import "firebase/firestore";
import { doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { collection, setDoc } from "firebase/firestore";
import { app, auth, storage, db } from "../../Utils/Firebase/Firebase";
import { useEffect } from "react";

const Chat = () => {
  // const [signInWithEmailAndPassword, userSign, loadingSign, errorSign] =
  //   useSignInWithEmailAndPassword(auth);

  // const [createUserWithEmailAndPassword, user, loading, error] =
  //   useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    getDocsTensor();
  });

  const getDocsTensor = async () => {
    console.log(db);
    try {
      // const docRef = doc(db, "chats", "idTeste");
      // const docSnap = await getDoc(docRef);
      const colRef = collection(db, "chats");
      const docsSnapTwo = await getDocs(colRef);
      docsSnapTwo.forEach((doc) => {
        console.log(doc.data());
      });
      // console.log(docRef);
      // console.log(docSnap);
    } catch (err) {
      console.log(err);
    }
  };

  // const criar = async (e, p) => {
  //   try {
  //     const cria = await createUserWithEmailAndPassword(e, p);
  //     console.log(cria);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const logar = async (e, p) => {
  //   try {
  //     const docRef = doc(db, "messages", "RuwwfunJDhCnr3VgRK6j");
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       console.log("Document data:", docSnap.data());
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //     }

  //     // const citiesRef = collection(db, "messages");
  //     // console.log(citiesRef);
  //     // const logi = await signInWithEmailAndPassword(e, p);
  //     // console.log(logi);
  //     const res = await getDoc(doc(db, "messages", "RuwwfunJDhCnr3VgRK6j"));
  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return;

  // return (
  //   <>
  //     <br />
  //     <button onClick={() => criar("maisteste@gmail.com", "testPass")}>
  //       {" "}
  //       Register
  //     </button>
  //     <br />
  //     <button onClick={() => logar("maisteste@gmail.com", "testPass")}>
  //       {" "}
  //       Login
  //     </button>
  //   </>
  // );

  // return <button onClick={() => getDocsTensor()}> GetDocs</button>;
};

export default Chat;
