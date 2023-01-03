import { useEffect, useState } from "react";
import errorFy from "../../../utils/toastify/errorFy";
import { useNavigate, useParams } from "react-router-dom";
import ButtonBack from "../../../Components/ButtonBack";
import verifyJwt from "../../../utils/security/verifyJwt";
import Button from "../../../Components/Button/Button";
import successFy from "../../../utils/toastify/successFy";
import infoFy from "../../../utils/toastify/infoFy";
import { ToastContainer } from "react-toastify";

const ProfileEstablishments = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [estableshimentData, setEstableshimentData] = useState(false);
  const [eventButton, setEventButton] = useState(false);

  useEffect(() => {
    getEstablishmentsInfo();
    renderEventButton();
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
      <h1>{estableshimentData && "Estabelecimento Profile"}</h1>
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
