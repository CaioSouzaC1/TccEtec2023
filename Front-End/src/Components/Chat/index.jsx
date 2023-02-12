import "firebase/auth";
import "firebase/firestore";
import {
  doc,
  getDocs,
  collection,
  setDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { app, auth, storage, db } from "../../Utils/Firebase/Firebase";
import { useState } from "react";
import generateDocId from "../../Utils/MyFunctions/generateDocId";
import { useEffect } from "react";
import ChatRoom from "../ChatRoom";

const Chat = (props) => {
  const [chatText, setChatText] = useState("Carregando Status");
  const [chatRoomStatus, setChatRoomStatus] = useState(false);
  const [showChatRoom, setShowChatRoom] = useState(false);
  const [chatId, setChatId] = useState(
    generateDocId(props.viewer, props.visualized)
  );
  const colRef = collection(db, "chats");
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

      const queryChat01 = query(
        colRef,
        where("User1", "==", `${props.viewerType}:${props.viewer}`),
        where("User2", "==", `${props.visualizedType}:${props.visualized}`)
      );

      const queryChat02 = query(
        colRef,
        where("User1", "==", `${props.visualizedType}:${props.visualized}`),
        where("User2", "==", `${props.viewerType}:${props.viewer}`)
      );

      const resultQuery01 = await getDocs(queryChat01);
      const resultQuery02 = await getDocs(queryChat02);

      if (resultQuery01.docs.length != 0) {
        setChatId(resultQuery01.docs[0].id);
      }

      if (resultQuery02.docs.length != 0) {
        setChatId(resultQuery02.docs[0].id);
      }

      if (resultQuery01.docs.length == 0 && resultQuery02.docs.length == 0) {
        await setDoc(docChatRoomRef, {
          User1: `${props.viewerType}:${props.viewer}`,
          User2: `${props.visualizedType}:${props.visualized}`,
          timestamp: Date.now(),
          messages: [],
        });
      }
      setChatText("Abrir Chat");
      setShowChatRoom(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    verifyChatRoomStatus();
  });

  return (
    <>
      {" "}
      <button onClick={getDocsTensor}>{chatText}</button>
      {showChatRoom && (
        <ChatRoom
          chatId={chatId}
          user={props.viewer}
          type={props.viewerType}
          visualized={props.visualized}
          visualizedType={props.visualizedType}
        />
      )}
    </>
  );
};

export default Chat;
