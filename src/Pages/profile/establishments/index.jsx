import { useEffect, useState } from "react";
import errorFy from "../../../utils/toastify/errorFy";
import { useParams } from "react-router-dom";

const ProfileEstablishments = () => {
  let { id } = useParams();
  const [estableshimentData, setEstableshimentData] = useState(false);
  useEffect(() => {
    getEstablishmentsInfo();
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
        console.log(EstablishmentsData);
        setEstableshimentData(EstablishmentsData);
      }
    } catch (err) {
      console.error(err);
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
    </>
  );
};

export default ProfileEstablishments;
