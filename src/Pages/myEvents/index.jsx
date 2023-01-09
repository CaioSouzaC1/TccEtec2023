import { useEffect, useState } from "react";
import verifyJwt from "../../utils/security/verifyJwt";
import { Link, useNavigate } from "react-router-dom";
import errorFy from "../../utils/toastify/errorFy";
import infoFy from "../../utils/toastify/infoFy";
import ButtonBack from "../../Components/ButtonBack";
import Button from "../../Components/Button/Button";

const MyEvents = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState(false);

  useEffect(() => {
    verifyAuth();
    getMyEvents();
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
          Authorization: `${btoa(`${await (await verifyJwt()).user}`)}`,
        }),
      });
      if (getEvents.status === 200) {
        getEvents = await getEvents.json();
        setEvents(getEvents);
      } else if (getEvents.status === 404) {
        infoFy("Você não possui nenhuma possibilade de evento ainda :(");
      }
    } catch (err) {
      errorFy(err);
    }
  };

  return (
    <>
      <h1>Meus Eventos</h1>

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
    </>
  );
};

export default MyEvents;
