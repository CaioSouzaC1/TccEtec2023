import { useEffect, useState } from "react";
import { db } from "../../Utils/Firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { CheckCircle, HandPointing, Warning } from "phosphor-react";

const EventsListItem = (props) => {
  const eventDocRef = doc(db, "events", props.fireId);

  const [eventState, setEventState] = useState(false);

  const verifyEventData = async () => {
    const docSnap = await getDoc(eventDocRef);
    setEventState(docSnap.data());
  };

  useEffect(() => {
    verifyEventData();
  }, []);

  const renderStatus = (status) => {
    if (status === 201) {
      return (
        <p className="text-f-green font-bold text-xl flex items-center justify-center">
          Confirmado <CheckCircle className="inline" size={24} weight="bold" />
        </p>
      );
    }

    if (status === 401 || status === 402) {
      return (
        <p className="text-f-red font-bold text-xl flex items-center justify-center">
          Cancelado/Declinado{" "}
          <Warning className="inline" size={24} weight="bold" />
        </p>
      );
    }

    if (status === 0) {
      return (
        <p className="text-amber-400 font-bold text-xl flex items-center justify-center">
          Não confirmado <Warning className="inline" size={20} weight="bold" />
        </p>
      );
    }
  };

  console.log(eventState);

  if (!eventState) {
    return <Loader />;
  }

  return (
    <>
      {eventState && (
        <li className="my-4 bg-gradient-to-r from-s-black via-s-black to-f-black py-4 hover:to-s-black hover:via-f-black transition-all rounded-lg text-center">
          <Link to={`/eventos/${props.fireId}`}>
            <p className="font-bold text-lg">{eventState.event_name}</p>
            {renderStatus(eventState.status)}
            <p className="font-bold text-lg mt-4">
              Ver mais detalhes{" "}
              <HandPointing className="inline" weight="fill" size={24} />
            </p>
          </Link>
        </li>
      )}
    </>
  );
};

export default EventsListItem;
