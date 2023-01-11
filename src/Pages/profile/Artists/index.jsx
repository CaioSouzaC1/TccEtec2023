import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import errorFy from "../../../utils/toastify/errorFy";
import { ToastContainer } from "react-toastify";
import ButtonBack from "../../../Components/ButtonBack";
import ThePageText from "../../../Components/ThePageText";

const ProfileArtists = () => {
  const [artInfo, setArtInfo] = useState(false);
  let { id } = useParams();
  useEffect(() => {
    getArtInfo();
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
      <>
        <h1>{artInfo && <ThePageText text="Perfil do Artista" />}</h1>
        <h2>{artInfo && artInfo.name}</h2>
        <h4>{artInfo && `Email:${artInfo.email}`}</h4>
        <h4>{artInfo && `WhatsApp:${artInfo.whatsApp}`}</h4>
        <h6>{artInfo && `Conta Criada em:${artInfo.createdAt}`}</h6>
        <h2>{artInfo == false && `Artista não encontrado`}</h2>
      </>
      <ToastContainer />
      <ButtonBack />
    </>
  );
};

export default ProfileArtists;
