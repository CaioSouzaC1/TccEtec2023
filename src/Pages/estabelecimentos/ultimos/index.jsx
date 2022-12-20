import { useEffect, useState } from "react";
import errorFy from "../../../utils/toastify/errorFy";
import { useNavigate } from "react-router-dom";
import verifyJwt from "../../../utils/security/verifyJwt";

const Ultimos = () => {
  const navigate = useNavigate();
  const [lasts, setLasts] = useState([]);
  const [nameUser, setNameUser] = useState(false);
  const getLasts = async () => {
    try {
      let ultimos = await fetch(
        "http://127.0.0.1:3333/estabelecimentos/ultimos"
      );
      let isAuth = await (await verifyJwt()).auth;
      if (isAuth) {
        setNameUser(sessionStorage.getItem("VoiceName"));
        ultimos = await ultimos.json();
        setLasts(ultimos);
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
    getLasts();
  }, []);

  return (
    <>
      <h1>{nameUser && `Olá ${nameUser}`}</h1>
      <h3>Últimos Estabelecimentos</h3>
      <ul>
        {lasts.map((place) => {
          return <li key={place.id}>{place.name}</li>;
        })}
      </ul>
    </>
  );
};

export default Ultimos;
