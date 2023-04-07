import { useEffect, useRef } from "react";
import { Buffer } from "buffer";
import ProfileImage from "../../ProfileImage";
import { useState } from "react";
import ChatImage from "../../ChatImage";
import { API_URL } from "../../../Utils/Admin";

const OtherUserMessage = (props) => {
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
      await fetch(`${API_URL}/Id-to-pubId`, {
        headers: new Headers({
          Authorization: `${Buffer.from(`${props.user}`).toString("base64")}`,
        }),
      })
    ).json();

    setPubIdToImage(IdToPubId.pubId);
  };

  return (
    <div className="flex items-center mb-6 mt-6">
      {pubIdToImage ? (
        <div className="mr-4">
          <ChatImage
            pubId={pubIdToImage}
            type={props.type}
            name="!"
            wah={"8"}
            wahm={"0"}
          />
        </div>
      ) : (
        <img
          className="w-8 h-8 rounded-full ml-4"
          src="https://via.placeholder.com/150"
          alt="Avatar"
        />
      )}
      <div className="flex-1">
        <p className="text-sm text-white">{props.text}</p>
      </div>
    </div>
  );
};

export default OtherUserMessage;
