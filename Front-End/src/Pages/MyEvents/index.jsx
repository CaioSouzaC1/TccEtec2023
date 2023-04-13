import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonBack from "../../Components/ButtonBack";
import ThePageText from "../../Components/ThePageText";
import { ToastContainer } from "react-toastify";
import { UserContext } from "../../Contexts/User";
import { getDocs, collection, query, where } from "firebase/firestore";
import { app, auth, storage, db } from "../../Utils/Firebase/Firebase";

const MyEvents = () => {
  const navigate = useNavigate();
  const { auth, user, type } = useContext(UserContext);
  if (auth === false) {
    navigate("/login", {
      state: {
        isAuth: false,
      },
    });
  }
  const [eventsAsProposerState, setEventsAsProposerState] = useState(false);
  const [eventsAsAccepterState, setEventsAsAccepterState] = useState(false);

  useEffect(() => {
    getEventsData();
  }, []);

  const getEventsData = async () => {
    const colRef = collection(db, "events");

    const queryAccepter = query(
      colRef,
      where("accepter", "==", `${type}:${user}`)
    );
    const queryProposer = query(
      colRef,
      where("proposer", "==", `${type}:${user}`)
    );
    const eventsAsProposer = await getDocs(queryProposer);

    const eventsAsAccepter = await getDocs(queryAccepter);
    if (eventsAsProposer.docs.length != 0) {
      setEventsAsProposerState(eventsAsProposer.docs);
    }

    console.log(eventsAsProposer.docs.length != 0);
    console.log(eventsAsAccepter.docs.length != 0);

    if (eventsAsAccepter.docs.length != 0) {
      setEventsAsAccepterState(eventsAsAccepter.docs);
    }
  };

  useEffect(() => {
    console.log(eventsAsProposerState);
    console.log(eventsAsAccepterState);
  }, [eventsAsProposerState, eventsAsAccepterState]);

  return (
    <>
      <section>
        <ThePageText text="Meus Eventos" />
        <ButtonBack />
        <ToastContainer />
      </section>
    </>
  );
};

export default MyEvents;
