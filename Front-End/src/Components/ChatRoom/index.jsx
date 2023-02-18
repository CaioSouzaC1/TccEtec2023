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
import { CalendarPlus, PaperPlaneRight } from "phosphor-react";
import NewModal from "../NewModal";

const ChatRoom = (props) => {
  const chatDocId = props.chatId;
  const [data, setData] = useState(doc(db, "chats", chatDocId));
  const stateRef = useRef(null);
  const colRef = collection(db, "chats");
  const chatContainerRef = useRef(null);
  const [modalEvent, setModalEvent] = useState(false);

  useEffect(
    () =>
      onSnapshot(doc(db, "chats", chatDocId), (snapshot) =>
        setData(snapshot.data())
      ),
    []
  );

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [data]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const userChatRet = doc(colRef, chatDocId);
      const message = selectValue("#chatInput");
      const timestamp = new Date().getTime();
      await updateDoc(userChatRet, {
        messages: arrayUnion(
          `${props.type}:${props.user}:#:${message}:#:${timestamp}`
        ),
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

      <main ref={chatContainerRef} className="p-4 overflow-y-scroll h-3/4 ">
        {renderMessages()}
      </main>

      <div className="p-4 bg-s-black">
        <form
          onSubmit={handleSubmit}
          className="rounded-xl overflow-hidden flex flex-wrap justify-between"
        >
          <div
            onClick={() => setModalEvent(true)}
            className="p-2 border border-f-red hover:bg-s-red rounded-full text-white bg-s-gray transition-all cursor-pointer"
          >
            <CalendarPlus size={24} />
          </div>
          <input
            id="chatInput"
            required
            className="w-4/6 sm:w-5/6 md:w-4/6 p-2 border placeholder:text-white focus:placeholder:text-f-red bg-s-black border-white focus:border-s-red focus:outline-none focus:shadow-outline rounded-md"
            type="text"
            placeholder="Digite uma mensagem"
          />
          <button className="p-2 border border-f-red hover:bg-s-red rounded-full text-white bg-s-gray transition-all cursor-pointer">
            <PaperPlaneRight size={24} />
          </button>
        </form>

        <NewModal show={modalEvent} callback={setModalEvent}>
          <form>
            <h3 className="text-xl font-semibold">Propor um evento?</h3>
          </form>
        </NewModal>
      </div>
    </div>
  );
};

export default ChatRoom;
