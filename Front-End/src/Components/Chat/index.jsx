import "firebase/auth";
import "firebase/firestore";
import { doc, getDocs, collection, setDoc, getDoc } from "firebase/firestore";
import { app, auth, storage, db } from "../../Utils/Firebase/Firebase";
import { useState } from "react";
import generateDocId from "../../Utils/MyFunctions/generateDocId";
import { useEffect } from "react";

const Chat = (props) => {
  const [chatText, setChatText] = useState("Carregando Status");
  const [chatRoomStatus, setChatRoomStatus] = useState(false);

  const docUserChatRef = doc(
    db,
    "usersChat",
    `${props.viewerType}:${props.viewer}`
  );
  const docChatRoomRef = doc(
    db,
    "chats",
    generateDocId(props.viewer, props.visualized)
  );

  const verifyChatRoomStatus = async () => {
    const docSnap = await getDoc(docChatRoomRef);
    if (docSnap.data()) {
      setChatText("Abrir Chat");
    } else {
      setChatText("Iniciar Chat");
    }
  };

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

    try {
      const docSnap = await getDoc(docUserChatRef);
      if (!docSnap.data()) {
        await setDoc(docUserChatRef, {
          id: props.viewer,
          timestamp: Date.now(),
          // TESTE: [
          //   { data: "data", datadois: "dataDois" },
          //   { data: "data", datatres: "datatres" },
          // ],
        });
      }

      const docChatRoom = await getDoc(docChatRoomRef);
      if (!docChatRoom.data()) {
        await setDoc(docChatRoomRef, {
          User1: `${props.viewerType}:${props.viewer}`,
          User2: `${props.visualizedType}:${props.visualized}`,
          timestamp: Date.now(),
          messages: [],
        });
      }
      setChatText("Abrir Chat");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    verifyChatRoomStatus();
  });

  return <button onClick={getDocsTensor}>{chatText}</button>;
};

export default Chat;
