import { useEffect, useState } from "react";
import errorFy from "../../../utils/toastify/errorFy";
import { useNavigate } from "react-router-dom";

const Ultimos = () => {
  const navigate = useNavigate();
  const [lasts, setLasts] = useState([]);
  const getLasts = async () => {
    try {
      let ultimos = await fetch(
        "http://127.0.0.1:3333/estabelecimentos/ultimos"
      );

      if (ultimos.status === 200) {
        ultimos = await ultimos.json();
        setLasts(ultimos);
      } else if (ultimos.status === 401) {
        errorFy("Você precisa estar logado para continuar");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
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
      <h1>Últimos Estabelecimentos</h1>
      <ul>
        {lasts.map((place) => {
          return <li key={place.id}>{place.name}</li>;
        })}
      </ul>
    </>
  );
};

export default Ultimos;
