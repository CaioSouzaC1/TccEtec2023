import { useContext, useEffect, useRef, useState } from "react";
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
import { UserContext } from "../../Contexts/User";
import BackgroundColors from "../../Utils/Arrays/BackgroundColors";
import {
  AddressBook,
  Compass,
  Envelope,
  IdentificationBadge,
  Info,
  Link,
  MapPin,
  MapPinLine,
  MapTrifold,
  Pencil,
  WhatsappLogo,
} from "phosphor-react";
import styles from "./Profile.module.css";
const MyProfile = () => {
  const [userDatas, setUserDatas] = useState(false);
  const [userType, setUserType] = useState(false);
  const [cpfState, setCpfState] = useState(false);
  const [cnpjState, setCnpjState] = useState(false);
  const [imageState, setImageState] = useState(true);

  const randomColor = Math.floor(Math.random() * BackgroundColors.length);

  const navigate = useNavigate();

  const format = (stringDate) => {
    const date = new Date(stringDate);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("pt-BR", options);
    return formattedDate;
  };

  const copyProfileLink = (link) => {
    navigator.clipboard.writeText(link);
    if (navigator.clipboard.writeText(link)) {
      successFy("Link Copiado!", 1000);
    }
  };

  const { auth, user, type } = useContext(UserContext);
  if (auth === false) {
    navigate("/login", {
      state: {
        isAuth: false,
      },
    });
  }

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
      <div
        className={`${BackgroundColors[randomColor]} w-full h-40 rounded-t-lg flex mt-4`}
      ></div>

      {userType === "Artist" && (
        <>
          <div className="flex flex-wrap bg-s-black relative rounded-b-lg mb-8">
            <div className="mt-[-96px] pb-2 text-left w-full md:w-2/6">
              <ProfileImage
                state={imageState}
                name={userDatas.name}
                pubId={userDatas.pubId}
                type={"Artists"}
              />
              <label className="cursor-pointer" htmlFor="profileImageInput">
                <Pencil
                  className={`rounded-full p-2 bg-f-black hover:bg-s-gray ${styles.pencil} transition-all`}
                  size={40}
                  weight="bold"
                />
              </label>
              <input
                id="profileImageInput"
                className="profileImage hidden"
                type="file"
                accept="image/*"
                onChange={setProfileImageEstablishments}
              />
            </div>
            <div className="text-center pb-2 md:text-left w-full md:w-4/6 flex items-center">
              <h2 className="font-bold mx-2 md:mx-0 my-4 md:my-0 text-3xl clamp-2">
                {userDatas.nameArt},{" "}
                <span className="text-2xl font-normal">{userDatas.name}.</span>
              </h2>
            </div>
          </div>

          <br />

          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2">
              <h2 className="font-bold text-2xl">
                Minhas informações{" "}
                <Info className="inline" weight="bold" size={22} />{" "}
              </h2>
              <ul>
                <li className="text-xl">
                  <Envelope
                    className="inline pr-2 mr-2 border-r-2 border-s-red"
                    weight="bold"
                    size={28}
                  />
                  {userDatas.email}
                </li>
                <li className="text-xl">
                  <WhatsappLogo
                    className="inline pr-2 mr-2
                    border-r-2
                    border-s-red"
                    weight="bold"
                    size={28}
                  />
                  {userDatas.whatsApp}
                </li>
                <li className="text-xl">
                  <IdentificationBadge
                    className="inline pr-2 mr-2 border-r-2 border-s-red"
                    weight="bold"
                    size={28}
                  />
                  {userDatas.nameArt}
                </li>
                <li className="text-xl">
                  <AddressBook
                    className="inline pr-2 mr-2 border-r-2 border-s-red"
                    weight="bold"
                    size={28}
                  />
                  {userDatas.name}
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2"></div>
          </div>

          <p
            className="cursor-pointer font-light my-4 py-4 px-2 rounded-lg hover:bg-f-gray active:bg-f-gray bg-s-black inline-block"
            onClick={() =>
              copyProfileLink(
                `http://127.0.0.1:5173/artista/${userDatas.pubId}`
              )
            }
          >
            Compartilhar Perfil{" "}
            <Link className="inline" weight="light" size={18} />
          </p>

          <p className="text-sm">
            {userDatas && `Conta Criada em ${format(userDatas.createdAt)}`}
          </p>

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
          <div className="flex flex-wrap bg-s-black relative rounded-b-lg mb-8">
            <div className="mt-[-96px] pb-2 text-left w-full md:w-2/6">
              <ProfileImage
                state={imageState}
                name={userDatas.name}
                pubId={userDatas.pubId}
                type={"Establishment"}
              />
              <label className="cursor-pointer" htmlFor="profileImageInput">
                <Pencil
                  className={`rounded-full p-2 bg-f-black hover:bg-s-gray ${styles.pencil} transition-all`}
                  size={40}
                  weight="bold"
                />
              </label>
              <input
                id="profileImageInput"
                className="profileImage hidden"
                type="file"
                accept="image/*"
                onChange={setProfileImageEstablishments}
              />
            </div>
            <div className="text-center pb-2 md:text-left w-full md:w-4/6 flex items-center">
              <h2 className="font-bold mx-2 md:mx-0 my-4 md:my-0 text-3xl clamp-2">
                {userDatas.name}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2">
              <h2 className="font-bold text-2xl">
                Minhas informações{" "}
                <Info className="inline" weight="bold" size={22} />{" "}
              </h2>
              <ul>
                <li className="text-xl">
                  <Envelope
                    className="inline pr-2 mr-2 border-r-2 border-s-red"
                    weight="bold"
                    size={28}
                  />
                  {userDatas.email}
                </li>
                <li className="text-xl">
                  <WhatsappLogo
                    className="inline pr-2 mr-2
                    border-r-2
                    border-s-red"
                    weight="bold"
                    size={28}
                  />
                  {userDatas.whatsApp}
                </li>
                <li className="text-xl">
                  <Compass
                    className="inline pr-2 mr-2 border-r-2 border-s-red"
                    weight="bold"
                    size={28}
                  />
                  {userDatas.cep}
                </li>
                <li className="text-xl">
                  <MapPinLine
                    className="inline pr-2 mr-2 border-r-2 border-s-red"
                    weight="bold"
                    size={28}
                  />
                  {userDatas.cidade}
                </li>
                <li className="text-xl">
                  <MapTrifold
                    className="inline pr-2 mr-2 border-r-2 border-s-red"
                    weight="bold"
                    size={28}
                  />
                  {userDatas.bairro}
                </li>
                <li className="text-xl">
                  <MapPin
                    className="inline pr-2 mr-2 border-r-2 border-s-red"
                    weight="bold"
                    size={28}
                  />
                  {userDatas.logradouro}, {userDatas.numEnd}
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2"></div>
          </div>

          <p
            className="cursor-pointer font-light my-4 py-4 px-2 rounded-lg hover:bg-f-gray active:bg-f-gray bg-s-black inline-block"
            onClick={() =>
              copyProfileLink(
                `http://127.0.0.1:5173/estabelecimento/${userDatas.pubId}`
              )
            }
          >
            Compartilhar Perfil{" "}
            <Link className="inline" weight="light" size={18} />
          </p>
          <p className="text-sm">
            {userDatas && `Conta Criada em ${format(userDatas.createdAt)}`}
          </p>
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
