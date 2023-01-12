import { useEffect, useRef, useState } from "react";
import verifyJwt from "../../utils/security/verifyJwt";
import { Link, useNavigate } from "react-router-dom";
import errorFy from "../../utils/toastify/errorFy";
import infoFy from "../../utils/toastify/infoFy";
import ButtonBack from "../../Components/ButtonBack";
import Button from "../../Components/Button/Button";
import ThePageText from "../../Components/ThePageText";
import { Buffer } from "buffer";
import warnFy from "../../utils/toastify/warnFy";
import { ToastContainer } from "react-toastify";
import successFy from "../../utils/toastify/successFy";

const MyEvents = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState(false);

  const stateRef = useRef(null);
  const [haveEvent, setHaveEvent] = useState(undefined);
  useEffect(() => {
    if (stateRef.current === null) {
      stateRef.current = true;
      verifyAuth();
      getMyEvents();
    }
  }, []);

  const verifyAuth = async () => {
    let isAuth = await (await verifyJwt()).auth;
    if (!isAuth) {
      navigate("/login", {
        state: {
          isAuth: false,
        },
      });
    }
  };

  const getMyEvents = async () => {
    try {
      let getEvents = await fetch("http://127.0.0.1:3333/meus-eventos", {
        headers: new Headers({
          Authorization: `${Buffer.from(
            `${await (await verifyJwt()).user}`
          ).toString("base64")}`,
        }),
      });

      if (getEvents.status === 200) {
        getEvents = await getEvents.json();
        setEvents(getEvents);
      } else if (getEvents.status === 404) {
        setHaveEvent(false);
        setTimeout(() => {
          infoFy("Relaxa. Logo você terá!", 3000);
        }, 500);
      }
    } catch (err) {
      errorFy(err);
    }
  };

  return (
    <>
      <ThePageText text="Meus Eventos" />

      {haveEvent === false && <div>Você ainda não tem eventos marcados</div>}

      {events && (
        <>
          <h3>Eventos Solicitados:</h3>
          <ul>
            {events.map((e) => {
              return (
                <li key={e.id}>
                  <span>{e.eventName} - </span>
                  <span>id: {e.id} - </span>

                  <span>{e.eventStatus}</span>
                  <br />
                  <strong>Dados do Solicitante:</strong>
                  <span>{e.ArtistData.nameArt} - </span>
                  <span>Conta Criada em:{e.ArtistData.createdAt} </span>

                  <Link to={`/artista/${e.ArtistData.pubId}`}>
                    <Button text="Vizualizar Perfil"></Button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
      <ButtonBack />
      <ToastContainer />
    </>
  );
};

export default MyEvents;
