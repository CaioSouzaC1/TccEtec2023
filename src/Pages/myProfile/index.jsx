import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import verifyJwt from "../../utils/security/verifyJwt";
import { useNavigate } from "react-router-dom";
import ButtonBack from "../../Components/ButtonBack";
import errorFy from "../../utils/toastify/errorFy";

const MyProfile = () => {
  const [userDatas, setUserDatas] = useState(false);
  const [userType, setUserType] = useState(false);
  const navigate = useNavigate();
  const ArtistProfile = async () => {
    try {
      if (await (await verifyJwt()).auth) {
        let user = await (await verifyJwt()).user;
        let userData = await (
          await fetch(`http://127.0.0.1:3333/getInfo/${user}`)
        ).json();
        console.log(userData);
        setUserDatas(userData.data);
        if (userData.type == "Establishment") {
          setUserType("Establishment");
        } else if (userData.type == "Artist") [setUserType("Artist")];
      } else {
        navigate("/login", {
          state: {
            isAuth: false,
          },
        });
      }
    } catch (err) {
      errorFy(err);
    }
  };

  useEffect(() => {
    ArtistProfile();
  }, []);

  if (userType == "Artist") {
    return (
      <>
        <h1>Meu Perfil - Artista</h1>
        <h2>{userDatas && userDatas.name}</h2>
        <h4>{userDatas && `Email:${userDatas.email}`}</h4>
        <h4>{userDatas && `WhatsApp:${userDatas.whatsApp}`}</h4>
        <h4>{userDatas && `Cpf:${userDatas.cpf}`}</h4>
        <h6>{userDatas && `Conta Criada em:${userDatas.createdAt}`}</h6>
        <a
          href={`http://127.0.0.1:5173/artista/${userDatas.pubId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Compartilhar perfil
        </a>
        <br />
        <ButtonBack />
      </>
    );
  }

  if (userType == "Establishment") {
    return (
      <>
        <h1>Meu Perfil - Estabelecimento</h1>
        <h2>{userDatas && userDatas.name}</h2>
        <h4>{userDatas && `Email:${userDatas.email}`}</h4>
        <h4>{userDatas && `WhatsApp:${userDatas.whatsApp}`}</h4>
        <h4>{userDatas && `Cep:${userDatas.cep}`}</h4>
        <h4>{userDatas && `Logradouro:${userDatas.logradouro}`}</h4>
        <h4>{userDatas && `Bairro:${userDatas.bairro}`}</h4>
        <h4>{userDatas && `Cidade:${userDatas.cidade}`}</h4>
        <a
          href={`http://127.0.0.1:5173/estabelecimento/${userDatas.pubId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Compartilhar perfil
        </a>
        <h6>{userDatas && `Conta Criada em:${userDatas.createdAt}`}</h6>
        <br />
        <ButtonBack />
      </>
    );
  }
};

export default MyProfile;
