import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import errorFy from "../../../Utils/Toastify/errorFy";
import { ToastContainer } from "react-toastify";
import ButtonBack from "../../../Components/ButtonBack";
import ProfileImage from "../../../Components/ProfileImage";
import verifyJwt from "../../../Utils/Security/verifyJwt";
import { Buffer } from "buffer";
import Chat from "../../../Components/Chat";
import BackgroundColors from "../../../Utils/Arrays/BackgroundColors";
import { Clock, Envelope, Info, WhatsappLogo } from "phosphor-react";
import { API_URL } from "../../../Utils/Admin";

const ProfileArtists = () => {
  const [artInfo, setArtInfo] = useState(false);
  const [viewer, setViewer] = useState(false);
  const [viewerType, setViewerType] = useState(false);
  const [visualized, setVisualized] = useState(false);
  const stateRef = useRef(null);
  let { id } = useParams();
  useEffect(() => {
    if (stateRef.current === null) {
      stateRef.current = true;
      getArtInfo();
      renderEventButton();
    }
  }, []);

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

  const randomColor = Math.floor(Math.random() * BackgroundColors.length);

  const getArtInfo = async () => {
    try {
      let artData = await fetch(`${API_URL}/artista/${id}`);
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

  const renderEventButton = async () => {
    const { status, auth, user, type } = await verifyJwt();
    if (auth) {
      const pubIdToId = await (
        await fetch(`${API_URL}/pubId-to-Id`, {
          headers: new Headers({
            Authorization: `${Buffer.from(`${id}`).toString("base64")}`,
          }),
        })
      ).json();
      setVisualized(pubIdToId.id);
      setViewer(user);
      setViewerType(type);
    }
  };

  return (
    <>
      <div className="fix-height">
        {artInfo && (
          <>
            <div
              className={`${BackgroundColors[randomColor]} w-full h-40 rounded-t-lg flex mt-4`}
            ></div>

            <div className="flex flex-wrap bg-s-black relative rounded-b-lg mb-8">
              <div className="mt-[-96px] pb-2 text-left w-full md:w-2/6">
                <ProfileImage
                  size={3}
                  name={artInfo.name}
                  pubId={id}
                  type={"Artists"}
                />
              </div>
              <div className="text-center pb-2 md:text-left w-full md:w-4/6 flex items-center justify-center md:justify-start">
                <h2 className="font-bold mx-2 md:mx-0 my-4 md:my-0 text-3xl clamp-2">
                  {artInfo.name}
                </h2>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2">
                <h2 className="font-bold text-2xl">
                  Informações de contato{" "}
                  <Info className="inline" weight="bold" size={22} />{" "}
                </h2>
                <ul>
                  <li className="text-xl">
                    <Envelope
                      className="inline pr-2 mr-2 border-r-2 border-s-red"
                      size={28}
                    />
                    {artInfo.name}
                  </li>
                  <li className="text-xl">
                    <WhatsappLogo
                      className="inline pr-2 mr-2
                    border-r-2
                    border-s-red"
                      size={28}
                    />
                    {artInfo.whatsApp}
                  </li>
                  <li className="text-xl">
                    <Clock
                      className="inline pr-2 mr-2
                    border-r-2
                    border-s-red"
                      size={28}
                    />
                    Conta criada em {format(artInfo.createdAt)}
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2"></div>
            </div>
          </>
        )}
        <h2>{artInfo == false && `Artista não encontrado`}</h2>

        {viewer && viewerType && (
          <>
            <Chat
              viewer={viewer}
              viewerType={viewerType}
              visualized={visualized}
              visualizedType="artist"
            />
            <br />
          </>
        )}

        <br />
        <br />
        <ToastContainer />
        <ButtonBack />
      </div>
    </>
  );
};

export default ProfileArtists;
