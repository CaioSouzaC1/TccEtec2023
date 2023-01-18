import { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.css";
import verifyJwt from "../../Utils/Security/verifyJwt";
import { useNavigate } from "react-router-dom";
import ButtonBack from "../../Components/ButtonBack";
import errorFy from "../../Utils/Toastify/errorFy";
import ThePageText from "../../Components/ThePageText";
import { Buffer } from "buffer";
import Modal from "../../Components/Modal";
import InputText from "../../Components/InputText";
import selectValue from "../../Utils/MyFunctions/selectValue";
import successFy from "../../Utils/Toastify/successFy";
import { ToastContainer } from "react-toastify";
import ButtonLogout from "../../Components/ButtonLogout";
import stoningData from "../../Utils/MyFunctions/stoningData";
import selectInput from "../../Utils/MyFunctions/selectInput";
import ProfileImage from "../../Components/ProfileImage";

const MyProfile = () => {
  const [userDatas, setUserDatas] = useState(false);
  const [userType, setUserType] = useState(false);
  const [cpfState, setCpfState] = useState(false);
  const [cnpjState, setCnpjState] = useState(false);
  const [imageState, setImageState] = useState(true);
  const navigate = useNavigate();

  const getInfoData = async () => {
    try {
      if (await (await verifyJwt()).auth) {
        let user = await (await verifyJwt()).user;
        let userData = await (
          await fetch(`http://127.0.0.1:3333/getInfo`, {
            headers: new Headers({
              Authorization: `${Buffer.from(`${user}`).toString("base64")}`,
            }),
          })
        ).json();
        setUserDatas(userData.data);

        if (userData.type == "Establishment") {
          setUserType("Establishment");
          setCnpjState(userData.data.cnpj);
        } else if (userData.type == "Artist") {
          setCpfState(userData.data.cpf);
          setUserType("Artist");
        }
      } else {
        navigate("/login", {
          state: {
            isAuth: false,
          },
        });
      }
    } catch (err) {
      console.log(err);
      errorFy(err);
    }
  };

  const stateRef = useRef(null);
  useEffect(() => {
    if (stateRef.current === null) {
      stateRef.current = true;
      getInfoData();
    }
  }, []);

  const AttProfileArtist = async () => {
    let user = false;
    if (await (await verifyJwt()).auth) {
      user = await (await verifyJwt()).user;
    }
    try {
      let ArtistAttAcc = await fetch("http://127.0.0.1:3333/ArtistUpdateAcc", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user,
          name: selectValue(".nameModal"),
          nameArt: selectValue(".nameArtModal"),
          email: selectValue(".emailModal"),
          whatsApp: Number(selectValue(".whatsAppModal")),
          cpf: cpfState,
        }),
      });
      if (ArtistAttAcc.status === 200) {
        successFy("Perfil Atualizado");
        ArtistAttAcc = await ArtistAttAcc.json();
        setUserDatas(ArtistAttAcc);
      } else {
        errorFy("Erro na Atualização do Perfil");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const AttProfileEstablishment = async () => {
    let user = false;
    if (await (await verifyJwt()).auth) {
      user = await (await verifyJwt()).user;
    }
    try {
      let ArtistAttAcc = await fetch(
        "http://127.0.0.1:3333/EstableshimentUpdateAcc",
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user,
            name: selectValue(".nameModal"),
            cep: selectValue(".cepModal"),
            email: selectValue(".emailModal"),
            whatsApp: selectValue(".whatsAppModal"),
            cidade: selectValue(".cidadeModal"),
            logradouro: selectValue(".logradouroModal"),
            bairro: selectValue(".bairroModal"),
            numEnd: selectValue(".numEndModal"),
            cnpj: cnpjState,
          }),
        }
      );
      if (ArtistAttAcc.status === 200) {
        successFy("Perfil Atualizado");
        ArtistAttAcc = await ArtistAttAcc.json();
        setUserDatas(ArtistAttAcc);
      } else {
        errorFy("Erro na Atualização do Perfil");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setProfileImage = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0], userDatas.pubId);
      await fetch("http://localhost:3333/updateProfileImage", {
        method: "POST",
        body: formData,
      });
      setImageState(!imageState);
      selectInput(".profileImage").value = "";
      successFy("Imagem Atualizada", 1500);
    } catch (err) {
      console.log(err);
    }
  };

  const setProfileImageEstablishments = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0], userDatas.pubId);
      await fetch("http://localhost:3333/updateProfileImageEstableshiment", {
        method: "POST",
        body: formData,
      });
      setImageState(!imageState);
      selectInput(".profileImage").value = "";
      successFy("Imagem Atualizada", 1500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ThePageText
        text={`Meu Perfil - ${
          userType == "Artist" ? "Artista" : "Estabelecimento"
        }`}
      />

      {userType === "Artist" && (
        <>
          <ProfileImage
            state={imageState}
            name={userDatas.name}
            pubId={userDatas.pubId}
            type={"Artists"}
          />
          <input
            className="profileImage"
            type="file"
            accept="image/*"
            onChange={setProfileImage}
          />
          <br />
          <h4>{userDatas.name}</h4>
          <h4>{userDatas.nameArt}</h4>
          <h4>{`Email:${userDatas.email}`}</h4>
          <h4>{`WhatsApp:${userDatas.whatsApp}`}</h4>
          <h4>{`Cpf:${userDatas.cpf}`}</h4>
          <h4>{`${stoningData(userDatas.createdAt, "Conta Criada em:")}`}</h4>
          <br />
          <a
            href={`http://127.0.0.1:5173/artista/${userDatas.pubId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Compartilhar perfil
          </a>
          <br />
          <Modal title="Atualizar Perfil" callback={AttProfileArtist}>
            {userDatas && (
              <>
                <form>
                  <InputText
                    placeholder={userDatas.name}
                    label={"Nome"}
                    value={userDatas.name}
                    class={"nameModal"}
                  />
                  <br />
                  <InputText
                    placeholder={userDatas.nameArt}
                    label={"Nome Artístico"}
                    value={userDatas.nameArt}
                    class={"nameArtModal"}
                  />
                  <br />
                  <InputText
                    placeholder={userDatas.email}
                    label={"Email"}
                    value={userDatas.email}
                    class={"emailModal"}
                  />
                  <br />
                  <InputText
                    placeholder={userDatas.whatsApp}
                    label={"WhatsApp"}
                    value={userDatas.whatsApp}
                    class={"whatsAppModal"}
                  />
                  <br />
                </form>
              </>
            )}
          </Modal>
          <br />
        </>
      )}

      {userType === "Establishment" && (
        <>
          <ProfileImage
            state={imageState}
            name={userDatas.name}
            pubId={userDatas.pubId}
            type={"Establishment"}
          />

          <input
            className="profileImage"
            type="file"
            accept="image/*"
            onChange={setProfileImageEstablishments}
          />

          <h2>{userDatas.name}</h2>
          <h4>{`Email:${userDatas.email}`}</h4>
          <h4>{`WhatsApp:${userDatas.whatsApp}`}</h4>
          <h4>{`Cep:${userDatas.cep}`}</h4>
          <h4>{`Logradouro:${userDatas.logradouro}`}</h4>
          <h4>{`Bairro:${userDatas.bairro}`}</h4>
          <h4>{`Cidade:${userDatas.cidade}`}</h4>
          <a
            href={`http://127.0.0.1:5173/estabelecimento/${userDatas.pubId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Compartilhar perfil
          </a>
          <h6>{userDatas && `Conta Criada em:${userDatas.createdAt}`}</h6>
          <br />
          <Modal title="Atualizar Perfil" callback={AttProfileEstablishment}>
            {userDatas && (
              <>
                <form>
                  <InputText
                    placeholder={userDatas.name}
                    label={"Nome"}
                    value={userDatas.name}
                    class={"nameModal"}
                  />
                  <br />
                  <InputText
                    placeholder={userDatas.email}
                    label={"Email"}
                    value={userDatas.email}
                    class={"emailModal"}
                  />
                  <br />
                  <InputText
                    placeholder={userDatas.whatsApp}
                    label={"WhatsApp"}
                    value={userDatas.whatsApp}
                    class={"whatsAppModal"}
                  />
                  <br />
                  <InputText
                    placeholder={userDatas.cep}
                    label={"Cep"}
                    value={userDatas.cep}
                    class={"cepModal"}
                  />
                  <br />
                  <InputText
                    placeholder={userDatas.cidade}
                    label={"Cidade"}
                    value={userDatas.cidade}
                    class={"cidadeModal"}
                  />
                  <br />
                  <InputText
                    placeholder={userDatas.bairro}
                    label={"Bairro"}
                    value={userDatas.bairro}
                    class={"bairroModal"}
                  />
                  <br />
                  <InputText
                    placeholder={userDatas.logradouro}
                    label={"Logradouro"}
                    value={userDatas.logradouro}
                    class={"logradouroModal"}
                  />
                  <br />
                  <InputText
                    placeholder={userDatas.numEnd}
                    label={"Número de Endereço"}
                    value={userDatas.numEnd}
                    class={"numEndModal"}
                  />
                  <br />
                </form>
              </>
            )}
          </Modal>
        </>
      )}

      <ButtonBack />
      <br />
      <ButtonLogout />
      <ToastContainer />
    </>
  );
};

export default MyProfile;
