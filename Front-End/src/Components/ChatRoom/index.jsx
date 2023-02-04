import React, { useEffect, useState } from "react";
import OtherUserMessage from "./OtherUserMessage";
import MyMessage from "./MyMessage";
import { collection, getDocs, getDoc, where, query } from "firebase/firestore";
import { app, auth, storage, db } from "../../Utils/Firebase/Firebase";

const ChatRoom = (props) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(message);
  };

  const getMessages = async () => {
    const colRef = collection(db, "chats");
    try {
      const docsSnapTwo = query(
        colRef,
        where("User1", "==", `${props.type}:${props.user}`),
        where("User2", "==", `${props.visualizedType}:${props.visualized}`)
      );

      const querySnapshot = await getDocs(docsSnapTwo);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
      // docsSnapTwo.forEach((doc) => {
      //   console.log(doc.data());
      // });
    } catch (err) {
      console.log(err);
    }
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
            className="w-4/5 p-2 border border-f-black"
            type="text"
            placeholder="Digite uma mensagem"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="w-1/5 p-2 bg-f-black text-white">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
