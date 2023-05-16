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
import { ChatTeardropDots } from "phosphor-react";
import Loader from "../Loader";

const Chat = (props) => {
  const [chatText, setChatText] = useState("Carregando Status");
  const [chatRoomStatus, setChatRoomStatus] = useState(false);
  const [showChatRoom, setShowChatRoom] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

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
      setShowLoader(true);
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
      setShowLoader(false);
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
      <button
        className="flex rounded-lg bg-s-black items-center p-4"
        onClick={getDocsTensor}
      >
        <ChatTeardropDots className="inline" size={32} />
        <p className="font-bold ml-2">{chatText}</p>
      </button>
      {showChatRoom && (
        <ChatRoom
          chatId={chatId}
          user={props.viewer}
          type={props.viewerType}
          visualized={props.visualized}
          visualizedType={props.visualizedType}
        />
      )}
      {showLoader && (
        <div className="mt-4">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Chat;
