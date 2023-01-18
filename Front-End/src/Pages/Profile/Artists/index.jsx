import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import errorFy from "../../../Utils/Toastify/errorFy";
import { ToastContainer } from "react-toastify";
import ButtonBack from "../../../Components/ButtonBack";
import ThePageText from "../../../Components/ThePageText";
import stoningData from "../../../Utils/MyFunctions/stoningData";

const ProfileArtists = () => {
  const [artInfo, setArtInfo] = useState(false);
  const stateRef = useRef(null);
  let { id } = useParams();
  useEffect(() => {
    if (stateRef.current === null) {
      stateRef.current = true;
      getArtInfo();
    }
  }, []);

  const getArtInfo = async () => {
    try {
      let artData = await fetch(`http://127.0.0.1:3333/artista/${id}`);
      if (artData.status !== 200) {
        errorFy("Usuário não encontrado");
      } else {
        artData = await artData.json();
        setArtInfo(artData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {artInfo && (
        <>
          <ThePageText text="Perfil do Artista" />
          <ProfileImage
            size={3}
            name={artInfo.name}
            pubId={id}
            type={"Artists"}
          />
          <h2>{artInfo.name}</h2>
          <h2>{artInfo.email}</h2>
          <h2>{artInfo.whatsApp}</h2>
          <h2>{stoningData(artInfo.createdAt, "Conta Criada em:")}</h2>
        </>
      )}
      <h2>{artInfo == false && `Artista não encontrado`}</h2>

      <ToastContainer />
      <ButtonBack />
    </>
  );
};

export default ProfileArtists;
