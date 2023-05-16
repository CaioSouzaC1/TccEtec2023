import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../Utils/Firebase/Firebase";
import { useEffect, useState } from "react";
import Loader from "../../Components/Loader";
import EventImages from "../../Components/EventImages";
import styles from "./styles.module.css";
import {
  CalendarCheck,
  Clock,
  MapPin,
  MapPinLine,
  WhatsappLogo,
  HouseLine,
  UserCircle,
  User,
  Confetti,
} from "phosphor-react";
import ButtonBack from "../../Components/ButtonBack";
import { API_URL } from "../../Utils/Admin";
import { Buffer } from "buffer";

const Event = () => {
  let { id } = useParams();
  const [eventData, setEventData] = useState(false);

  useEffect(() => {
    verifyEventData();
  }, []);

  const verifyEventData = async () => {
    const docSnap = await getDoc(eventDocRef);

    const tempData = docSnap.data();
    let pubId = "";
    let pubIdProposer = "";
    if (tempData.event_order == "Artists") {
      pubId = tempData.accepter.split(":")[1];
      pubIdProposer = tempData.proposer.split(":")[1];
    } else {
      pubId = tempData.proposer.split(":")[1];
      pubIdProposer = tempData.accepter.split(":")[1];
    }

    const accepterPubId = await (
      await fetch(`${API_URL}/Id-to-pubId`, {
        headers: new Headers({
          Authorization: `${Buffer.from(`${pubId}`).toString("base64")}`,
        }),
      })
    ).json();

    const proposerPubId = await (
      await fetch(`${API_URL}/Id-to-pubId`, {
        headers: new Headers({
          Authorization: `${Buffer.from(`${pubIdProposer}`).toString(
            "base64"
          )}`,
        }),
      })
    ).json();

    const establishmentsData = await (
      await fetch(`${API_URL}/estabelecimento/${accepterPubId.pubId}`, {
        headers: new Headers({
          Authorization: `${Buffer.from(`${pubId}`).toString("base64")}`,
        }),
      })
    ).json();

    const artistData = await (
      await fetch(`${API_URL}/artista/${proposerPubId.pubId}`, {
        headers: new Headers({
          Authorization: `${Buffer.from(`${pubIdProposer}`).toString(
            "base64"
          )}`,
        }),
      })
    ).json();

    const concatenedObjs = new Object();
    concatenedObjs.firebase = tempData;
    concatenedObjs.sqliteEstablishment = establishmentsData;
    concatenedObjs.sqliteArtist = artistData;

    setEventData(concatenedObjs);
  };

  const eventDocRef = doc(db, "events", id);

  if (!eventData) {
    return (
      <div className="min-h-70-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <section className="w-full mx-auto md:w-2/3 my-4 bg-gradient-to-t from-s-black via-f-black to-f-black py-4 px-2 rounded-lg">
        {eventData && (
          <div className={`${styles.eventData} w-full mx-auto`}>
            <EventImages
              order={eventData.firebase.event_order}
              accepter={eventData.firebase.accepter}
              proposer={eventData.firebase.proposer}
            />
            <span>
              <h4 className="text-2xl font-bold my-2 uppercase text-center">
                {eventData.firebase.event_name}
              </h4>
              <h5 className="text-xl mt-4 font-bold">
                Dados do estabelecimento:
              </h5>
              <ul>
                <li className="text-xl uppercase">
                  <HouseLine
                    className="inline pr-2 mr-2
                    border-r-2
                    border-s-red"
                    size={28}
                  />
                  {eventData.sqliteEstablishment.name}
                </li>
                <li className="text-xl">
                  <WhatsappLogo
                    className="inline pr-2 mr-2
                    border-r-2
                    border-s-red"
                    size={28}
                  />
                  {eventData.sqliteEstablishment.whatsApp}
                </li>
                <li className="text-xl">
                  <MapPin
                    className="inline pr-2 mr-2 border-r-2 border-s-red"
                    size={28}
                  />
                  {eventData.sqliteEstablishment.cidade},{" "}
                  {eventData.sqliteEstablishment.bairro}
                </li>
                <li className="text-xl">
                  <MapPinLine
                    className="inline pr-2 mr-2 border-r-2 border-s-red"
                    size={28}
                  />
                  {eventData.sqliteEstablishment.logradouro},{" "}
                  {eventData.sqliteEstablishment.numEnd}
                </li>
              </ul>

              <h5 className="text-xl mt-4 font-bold">Dados do artista:</h5>
              <ul>
                <li className="text-xl uppercase">
                  <UserCircle
                    className="inline pr-2 mr-2
                    border-r-2
                    border-s-red"
                    size={28}
                  />
                  {eventData.sqliteArtist.nameArt}
                </li>
                <li className="text-xl uppercase">
                  <User
                    className="inline pr-2 mr-2 border-r-2 border-s-red"
                    size={28}
                  />
                  {eventData.sqliteArtist.name}
                </li>
              </ul>

              <h5 className="flex justify-around flex-wrap font-bold mt-8">
                <div className="flex w-3/7 justify-center items-center">
                  <Confetti size={18} weight="bold" />
                  {eventData.firebase.event_type}
                </div>
                <div className="flex w-2/7 justify-center items-center">
                  <CalendarCheck size={18} weight="bold" />
                  {new Date(eventData.firebase.event_data).toLocaleDateString(
                    "pt-BR",
                    {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                      timeZone: "America/Sao_Paulo",
                    }
                  )}
                </div>
                <div className="flex w-2/7 justify-center items-center">
                  <Clock size={18} weight="bold" />
                  {eventData.firebase.init_hour}
                </div>
                <span className="h-1 rounded-3xl bg-s-red w-full mx-auto mt-1">
                  {" "}
                </span>
                <p className="text-sm font-normal mt-4">
                  Evento criado em :{" "}
                  {new Date(eventData.firebase.timestamp).toLocaleDateString(
                    "pt-BR",
                    {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                      timeZone: "America/Sao_Paulo",
                    }
                  )}
                </p>
              </h5>
            </span>
          </div>
        )}
      </section>
      <div className="text-center">
        <ButtonBack />
      </div>
    </>
  );
};

export default Event;
