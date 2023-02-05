import React, { useEffect, useState } from "react";
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
} from "firebase/firestore";
import { app, auth, storage, db } from "../../Utils/Firebase/Firebase";
import selectValue from "../../Utils/MyFunctions/selectValue";
import setValueNull from "../../Utils/MyFunctions/setValueNull";

const ChatRoom = (props) => {
  const [chatDocId, setChatDocId] = useState(false);
  const [chatData, setChatData] = useState(false);
  const colRef = collection(db, "chats");

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

  const getMessages = async () => {
    try {
      const docsSnapTwo = query(
        colRef,
        where("User1", "==", `${props.type}:${props.user}`),
        where("User2", "==", `${props.visualizedType}:${props.visualized}`)
      );

      const querySnapshot = await getDocs(docsSnapTwo);
      querySnapshot.forEach((doc) => {
        setChatDocId(doc.id);
        setChatData(doc.data());
      });
    } catch (err) {
      console.log(err);
    }
  };

  const testeFunc = () => {
    if (!chatData) {
      return;
    }
    return chatData.messages.map((e) => {
      const splitData = e.split(":#:");

      if (splitData[0] == `${props.type}:${props.user}`) {
        return (
          <MyMessage
            text={`${splitData[1]}`}
            type={props.type}
            user={props.user}
          />
        );
      }
    });
  };

  useEffect(() => {
    getMessages();
  });

  return (
    <div className="md:max-w-sm mx-auto w-full h-screen flex flex-col justify-center">
      <div className="text-center p-4 bg-s-black text-f-red ">
        <h1 className="text-2xl font-bold">Chat Room</h1>
      </div>

      <main className="p-4 overflow-y-scroll h-3/4">
        {testeFunc()}
        {/* <MyMessage
          text={"Messagge Content"}
          type={props.type}
          user={props.user}
        />
        <OtherUserMessage></OtherUserMessage> */}
      </main>

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
