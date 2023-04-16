import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonBack from "../../Components/ButtonBack";
import ThePageText from "../../Components/ThePageText";
import { ToastContainer } from "react-toastify";
import { getDocs, collection, query, where } from "firebase/firestore";
import { app, auth, storage, db } from "../../Utils/Firebase/Firebase";
import verifyJwt from "../../Utils/Security/verifyJwt";
import EventsListItem from "../../Components/EventsListItem";

const MyEvents = () => {
  const navigate = useNavigate();

  const [authInfo, setAuthInfo] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [typeInfo, setTypeInfo] = useState(false);
  const [sup, setSup] = useState(false);
  const stateRef = useRef(null);
  const [eventsAsProposerState, setEventsAsProposerState] = useState(false);
  const [eventsAsAccepterState, setEventsAsAccepterState] = useState(false);
  const getAuth = async () => {
    const { status, auth, user, type } = await verifyJwt();
    setSup(!sup);
    setAuthInfo(auth);
    setUserInfo(user);
    setTypeInfo(type);
  };
  useEffect(() => {
    if (stateRef.current === null) {
      stateRef.current = true;
      getAuth();
    }
  }, []);

  if (auth === false) {
    navigate("/login", {
      state: {
        isAuth: false,
      },
    });
  }

  useEffect(() => {
    getEventsData();
  }, [sup]);

  const getEventsData = async () => {
    const colRef = collection(db, "events");

    const queryAccepter = query(
      colRef,
      where("accepter", "==", `${typeInfo}:${userInfo}`)
    );
    const queryProposer = query(
      colRef,
      where("proposer", "==", `${typeInfo}:${userInfo}`)
    );
    const eventsAsProposer = await getDocs(queryProposer);

    const eventsAsAccepter = await getDocs(queryAccepter);
    if (eventsAsProposer.docs.length != 0) {
      setEventsAsProposerState(eventsAsProposer.docs);
    }

    if (eventsAsAccepter.docs.length != 0) {
      setEventsAsAccepterState(eventsAsAccepter.docs);
    }
  };

  return (
    <div className="min-h-70-screen">
      <ThePageText text="Meus Eventos" />
      <section className="flex flex-wrap text-center">
        <div className="w-full md:w-1/2">
          <h4 className="font-bold text-xl">Propostos por teceiros</h4>
          {eventsAsAccepterState && (
            <ul className="px-4 flex flex-col bg-s-black">
              {eventsAsAccepterState.map((e) => {
                return <EventsListItem fireId={e.id} key={e.id} />;
              })}
            </ul>
          )}
        </div>

        <div className="w-full md:w-1/2">
          <h4 className="font-bold text-xl">Propostos por mim</h4>
          {eventsAsProposerState && (
            <ul className="px-4 flex flex-col">
              {eventsAsProposerState.map((e) => {
                return <EventsListItem fireId={e.id} key={e.id} />;
              })}
            </ul>
          )}
        </div>

        <div className="w-full">
          <ButtonBack />
        </div>
        <ToastContainer />
      </section>
    </div>
  );
};

export default MyEvents;
