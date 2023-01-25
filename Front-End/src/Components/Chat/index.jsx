import "firebase/auth";
import "firebase/firestore";
import { doc, getDocs, collection, setDoc, getDoc } from "firebase/firestore";
import { app, auth, storage, db } from "../../Utils/Firebase/Firebase";
import { useEffect } from "react";
import verifyJwt from "../../Utils/Security/verifyJwt";

const Chat = () => {
  useEffect(() => {
    getDocsTensor();
  });

  const getDocsTensor = async () => {
    const { status, auth, user, type } = await verifyJwt();

    // const colRef = collection(db, "chats");
    // try {
    //   const docsSnapTwo = await getDocs(colRef);
    //   docsSnapTwo.forEach((doc) => {
    //     console.log(doc.data());
    //   });
    // } catch (err) {
    //   console.log(err);
    // }

    const docRef = doc(db, "chats", `${type}:${user}`);
    try {
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
    } catch (err) {
      console.log(err);
    }

    try {
      await setDoc(doc(db, "chats", `${type}:${user}`), {
        nome: "NomeDoUsuário",
        outra: "INFO",
        timestamp: Date.now(),
        TESTE: [
          { data: "data", datadois: "dataDois" },
          { data: "data", datatres: "datatres" },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };

  return;
};

export default Chat;
