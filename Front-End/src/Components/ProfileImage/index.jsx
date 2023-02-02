import { useEffect } from "react";
import { useState } from "react";
import BackgroundColors from "../../Utils/Arrays/BackgroundColors";
const ProfileImage = (props) => {
  const randomColor = Math.floor(Math.random() * BackgroundColors.length);

  const [image, setImage] = useState(false);
  const widthAndHeight = props.wah ? props.wah : 48;
  const widthAndHeightMax = props.wahm ? props.wahm : 12;
  const getImage = async () => {
    if (props.type == "Establishment") {
      try {
        const img = await fetch(`
          http://localhost:3333/Establishments/EstablishmentProfileImage-${props.pubId}.jpg`);

        setImage(img);
      } catch (err) {
        console.log(err);
      }
    }
    if (props.type == "Artists") {
      try {
        const img = await fetch(`
          http://localhost:3333/Artists/ArtistProfileImage-${props.pubId}.jpg`);

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
          className={`rounded-full object-cover bg-cover m-auto h-${widthAndHeight} w-${widthAndHeight} max-w-[${widthAndHeightMax}em] min-h-[${widthAndHeightMax}em]`}
          src={image.url}
          alt=""
        />
      )}
      {!image ||
        (image.status == 404 && (
          <div
            className={`rounded-full object-cover bg-cover m-auto h-${widthAndHeight} w-${widthAndHeight} max-w-[${widthAndHeightMax}em] min-h-[${widthAndHeightMax}em]`}
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
