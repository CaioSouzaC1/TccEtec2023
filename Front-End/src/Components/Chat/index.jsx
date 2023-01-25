import "firebase/auth";
import "firebase/firestore";
import { doc, getDocs, collection, setDoc, getDoc } from "firebase/firestore";
import { app, auth, storage, db } from "../../Utils/Firebase/Firebase";
import { useState } from "react";

const Chat = (props) => {
  const [chatText, setChatText] = useState("Iniciar Chat");
  const getDocsTensor = async () => {
    // const colRef = collection(db, "chats");
    // try {
    //   const docsSnapTwo = await getDocs(colRef);
    //   docsSnapTwo.forEach((doc) => {
    //     console.log(doc.data());
    //   });
    // } catch (err) {
    //   console.log(err);
    // }

    const docRef = doc(db, "usersChat", `${props.viewerType}:${props.viewer}`);
    try {
      const docSnap = await getDoc(docRef);
      if (!docSnap.data()) {
        await setDoc(docRef, {
          id: props.viewer,
          timestamp: Date.now(),
          // TESTE: [
          //   { data: "data", datadois: "dataDois" },
          //   { data: "data", datatres: "datatres" },
          // ],
        });
      }
    } catch (err) {
      console.log(err);
    }

    // try {
    //   await setDoc(doc(db, "users", `${type}:${user}`), {
    //     id: user,
    //     timestamp: Date.now(),
    //     // TESTE: [
    //     //   { data: "data", datadois: "dataDois" },
    //     //   { data: "data", datatres: "datatres" },
    //     // ],
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return <button onClick={getDocsTensor}>{chatText}</button>;
};

export default Chat;
