import { useEffect, useState } from "react";
import styles from "./ArtistProfile.module.css";
import verifyJwt from "../../../utils/security/verifyJwt";
import { useNavigate } from "react-router-dom";

const MyProfArtist = () => {
  const [userDatas, setUserDatas] = useState(false);
  const navigate = useNavigate();
  const ArtistProfile = async () => {
    try {
      let isAuth = await (await verifyJwt()).auth;
      if (isAuth) {
        let user = await (await verifyJwt()).user;
        let userData = await (
          await fetch(`http://127.0.0.1:3333/getArtistsInfo/${user}`)
        ).json();
        setUserDatas(userData);
      } else {
        navigate("/login", {
          state: {
            isAuth: false,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    ArtistProfile();
  }, []);

  return (
    <>
      <h1>Meu Perfil</h1>
      <h2>{userDatas && userDatas.name}</h2>
      <h4>{userDatas && `Email:${userDatas.email}`}</h4>
      <h4>{userDatas && `WhatsApp:${userDatas.whatsApp}`}</h4>
      <h4>{userDatas && `Cpf:${userDatas.cpf}`}</h4>
      <h6>{userDatas && `Conta Criada em:${userDatas.createdAt}`}</h6>
    </>
  );
};

export default MyProfArtist;
