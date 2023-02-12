import React, { useEffect, useRef, useState } from "react";
import OtherUserMessage from "./OtherUserMessage";
import MyMessage from "./MyMessage";
import {
  collection,
  getDocs,
  where,
  query,
  updateDoc,
  arrayUnion,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../Utils/Firebase/Firebase";
import selectValue from "../../Utils/MyFunctions/selectValue";
import setValueNull from "../../Utils/MyFunctions/setValueNull";

const ChatRoom = (props) => {
  const chatDocId = props.chatId;
  const [data, setData] = useState(doc(db, "chats", chatDocId));
  const stateRef = useRef(null);
  const colRef = collection(db, "chats");

  useEffect(
    () =>
      onSnapshot(doc(db, "chats", chatDocId), (snapshot) =>
        setData(snapshot.data())
      ),
    []
  );

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const userChatRet = doc(colRef, chatDocId);
      const message = selectValue("#chatInput");
      await updateDoc(userChatRet, {
        messages: arrayUnion(`${props.type}:${props.user}:#:${message}`),
      });
      setValueNull("#chatInput");
    } catch (err) {
      console.log(err);
    }
  };

  const renderMessages = () => {
    if (!data) {
      return <p>Carregando</p>;
    }
    try {
      return data.messages.map((e, i) => {
        const splitData = e.split(":#:");

        if (splitData[0] == `${props.type}:${props.user}`) {
          return (
            <MyMessage
              key={`Key${i}`}
              text={`${splitData[1]}`}
              type={props.type}
              user={props.user}
            />
          );
        }
        if (splitData[0] == `${props.visualizedType}:${props.visualized}`) {
          return (
            <OtherUserMessage
              key={`Key${i}`}
              text={`${splitData[1]}`}
              type={props.visualizedType}
              user={props.visualized}
            />
          );
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="md:max-w-sm mx-auto w-full h-screen flex flex-col justify-center">
      <div className="text-center p-4 bg-s-black text-f-red ">
        <h1 className="text-2xl font-bold">Chat Room</h1>
      </div>

      <main className="p-4 overflow-y-scroll h-3/4">{renderMessages()}</main>

      <div className="p-4 bg-s-black">
        <form onSubmit={handleSubmit} className="rounded-xl overflow-hidden">
          <input
            id="chatInput"
            className="w-4/5 p-2 border border-f-black"
            type="text"
            placeholder="Digite uma mensagem"
          />
          <button className="w-1/5 p-2 bg-f-black text-white">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
