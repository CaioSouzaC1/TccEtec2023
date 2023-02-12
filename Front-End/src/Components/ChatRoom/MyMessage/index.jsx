import { useEffect, useRef } from "react";
import { Buffer } from "buffer";
import ProfileImage from "../../ProfileImage";
import { useState } from "react";
import ChatImage from "../../ChatImage";

const MyMessage = (props) => {
  const [pubIdToImage, setPubIdToImage] = useState(false);
  const stateRef = useRef(null);

  useEffect(() => {
    if (stateRef.current === null) {
      stateRef.current = true;
      getUserImage();
    }
  }, []);
  const getUserImage = async () => {
    const IdToPubId = await (
      await fetch("http://127.0.0.1:3333/Id-to-pubId", {
        headers: new Headers({
          Authorization: `${Buffer.from(`${props.user}`).toString("base64")}`,
        }),
      })
    ).json();

    setPubIdToImage(IdToPubId.pubId);
  };
  return (
    <div className="flex items-center mb-6 mt-6 text-right ">
      <div className="flex-1 rounded-lg">
        <p className="text-sm text-f-gray mr-4">{props.text}</p>
      </div>
      {pubIdToImage ? (
        <ChatImage
          pubId={pubIdToImage}
          type={props.type}
          name="!"
          wah={"8"}
          wahm={"0"}
        />
      ) : (
        <img
          className="w-8 h-8 rounded-full ml-4"
          src="https://via.placeholder.com/150"
          alt="Avatar"
        />
      )}
    </div>
  );
};
export default MyMessage;
