import { useEffect, useRef, useState } from "react";
import errorFy from "../../../Utils/Toastify/errorFy";
import { useNavigate, useParams } from "react-router-dom";
import ButtonBack from "../../../Components/ButtonBack";
import verifyJwt from "../../../Utils/Security/verifyJwt";
import Button from "../../../Components/Button/Button";
import successFy from "../../../Utils/Toastify/successFy";
import infoFy from "../../../Utils/Toastify/infoFy";
import { ToastContainer } from "react-toastify";
import ThePageText from "../../../Components/ThePageText";

const ProfileEstablishments = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [estableshimentData, setEstableshimentData] = useState(false);
  const [eventButton, setEventButton] = useState(false);
  const stateRef = useRef(null);

  useEffect(() => {
    if (stateRef.current === null) {
      stateRef.current = true;
      getEstablishmentsInfo();
      renderEventButton();
    }
  }, []);

  const getEstablishmentsInfo = async () => {
    try {
      let EstablishmentsData = await fetch(
        `http://127.0.0.1:3333/estabelecimento/${id}`
      );
      if (EstablishmentsData.status !== 200) {
        errorFy("Estabelecimento não encontrado");
      } else {
        EstablishmentsData = await EstablishmentsData.json();
        setEstableshimentData(EstablishmentsData);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const createEvent = async () => {
    const objVerify = await verifyJwt();
    try {
      let eventCreated = await fetch(
        "http://127.0.0.1:3333/ArtistCreateEvent",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idArtist: objVerify.user,
            idEstablishment: id,
          }),
        }
      );
      if (eventCreated.status == 200) {
        eventCreated = await eventCreated.json();
        successFy(
          `Solicitação criada, possível evento id: ${eventCreated}`,
          6100
        );
        infoFy(
          "Assim que o Estabelecimento aceitar a possibilidade, o chat estará disponível",
          6100
        );
        setTimeout(() => {
          navigate("/feed");
        }, 7000);
      }
    } catch (err) {
      errorFy(err);
    }
  };
  const renderEventButton = async () => {
    const objVerify = await verifyJwt();
    if (objVerify.auth) {
      if (objVerify.type == "artist") {
        setEventButton(true);
      }
    }
  };

  return (
    <>
      {estableshimentData && <ThePageText text="Perfil do Estabelecimento" />}

      <h2>{estableshimentData && estableshimentData.name}</h2>
      <h4>{estableshimentData && `Email:${estableshimentData.email}`}</h4>
      <h4>{estableshimentData && `WhatsApp:${estableshimentData.whatsApp}`}</h4>
      <h6>
        {estableshimentData &&
          `Conta Criada em:${estableshimentData.createdAt}`}
      </h6>
      <h2>{estableshimentData == false && `Estabelecimento não encontrado`}</h2>

      {eventButton && (
        <button onClick={createEvent}>Quero me apresentar aqui</button>
      )}

      <br />
      <br />
      <ButtonBack />
      <ToastContainer />
    </>
  );
};

export default ProfileEstablishments;
