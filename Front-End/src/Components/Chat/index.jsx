import "firebase/auth";
import "firebase/firestore";
import { doc, getDocs, collection, setDoc } from "firebase/firestore";

import { app, auth, storage, db } from "../../Utils/Firebase/Firebase";
import { useEffect } from "react";

const Chat = () => {
  useEffect(() => {
    getDocsTensor();
  });

  const getDocsTensor = async () => {
    const colRef = collection(db, "messages");
    // try {
    //   const docsSnapTwo = await getDocs(colRef);
    //   docsSnapTwo.forEach((doc) => {
    //     console.log(doc);
    //     console.log(doc.data());
    //   });
    // } catch (err) {
    //   console.log(err);
    // }

    try {
      await setDoc(doc(db, "chats", "CombinedId"), {
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
