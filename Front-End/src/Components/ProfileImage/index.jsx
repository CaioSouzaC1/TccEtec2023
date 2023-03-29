import { useEffect } from "react";
import { useState } from "react";
import BackgroundColors from "../../Utils/Arrays/BackgroundColors";
import { API_URL } from "../../Utils/Admin";

const ProfileImage = (props) => {
  const randomColor = Math.floor(Math.random() * BackgroundColors.length);

  const [image, setImage] = useState(false);

  const getImage = async () => {
    if (props.type == "Establishment") {
      try {
        const img = await fetch(
          `${API_URL}/establishments/EstablishmentProfileImage-${props.pubId}.jpg`
        );

        setImage(img);
      } catch (err) {
        console.log(err);
      }
    }
    if (props.type == "Artists") {
      try {
        const img = await fetch(
          `${API_URL}/artists/ArtistProfileImage-${props.pubId}.jpg`
        );

        setImage(img);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    setImage(false);
    getImage();
  }, [props.state]);

  return (
    <>
      {image && image.status == 200 && (
        <img
          className={`rounded-full object-cover bg-cover ${
            props.mxauto === false ? "" : "m-auto"
          } h-48 w-48 max-w-[12em] min-h-[12em]`}
          src={image.url}
          alt=""
        />
      )}
      {!image ||
        (image.status == 404 && (
          <div
            className={`rounded-full object-cover bg-cover ${
              props.mxauto === false ? "" : "m-auto"
            } h-48 w-48 max-w-[12em] min-h-[12em]`}
          >
            <div
              className={`${BackgroundColors[randomColor]} h-full rounded-full flex justify-center items-center text-4xl font-semibold`}
            >
              {" "}
              {props.name[0]}
            </div>
          </div>
        ))}
    </>
  );
};

export default ProfileImage;
