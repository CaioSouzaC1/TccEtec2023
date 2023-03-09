import {
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { eventTypes } from "../../../Utils/Admin";
import { db } from "../../../Utils/Firebase/Firebase";
import selectValue from "../../../Utils/MyFunctions/selectValue";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import successFy from "../../../Utils/Toastify/successFy";
import verifyJwt from "../../../Utils/Security/verifyJwt";
import errorFy from "../../../Utils/Toastify/errorFy";
import infoFy from "../../../Utils/Toastify/infoFy";
import { Confetti, MaskSad } from "phosphor-react";
const EventLogic = (props) => {
  const today = new Date().toISOString().slice(0, 10);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 60);
  const [userDataByJwt, setUserDataByJwt] = useState(false);

  useEffect(() => {
    verifyJwt().then((res) => {
      setUserDataByJwt(res);
    });
  }, []);

  const eventDocRef = doc(db, "events", props.chatId);

  const [eventState, setEventState] = useState(false);
  // const userTIData = `${type}:${user}`;

  const verifyEventData = async () => {
    const docSnap = await getDoc(eventDocRef);
    setEventState(docSnap.data());
  };

  useEffect(() => {
    verifyEventData();
  }, []);

  useEffect(
    () => onSnapshot(eventDocRef, (snapshot) => setEventState(snapshot.data())),
    []
  );

  // useEffect(() => {
  //   console.log(eventState);
  // }, [eventState]);

  const logic = async (e) => {
    e.preventDefault();

    const docSnap = await getDoc(eventDocRef);
    if (!docSnap.data()) {
      await setDoc(eventDocRef, {
        timestamp: Date.now(),
        event_data: selectValue("#eventDate"),
        init_hour: selectValue("#eventHour"),
        event_type: selectValue("#eventType"),
        event_name: selectValue("#eventTitle"),
        proposer: props.userTI,
        accecpter: props.otherTI,
        status: 0,
      });
    }
    props.callback(false);
    successFy("Evento Proposto, agora é esperar a outra parte aceitar!");
  };

  const editEvent = async () => {
    try {
      await updateDoc(eventDocRef, {
        event_data: selectValue("#eventDate"),
        init_hour: selectValue("#eventHour"),
        event_type: selectValue("#eventType"),
        event_name: selectValue("#eventTitle"),
      });
    } catch (err) {
      errorFy(err.message);
      return;
    }
    props.callback(false);
    successFy("Evento Editado!");
  };

  const deleteEvent = async (close) => {
    try {
      await deleteDoc(eventDocRef);
    } catch (err) {
      errorFy(err.message);
      return;
    }
    props.callback(close);
    infoFy("Evento Deletado. Fique a vontade para propor outro!");
  };

  const acceptEvent = async () => {
    try {
      await updateDoc(eventDocRef, {
        status: 201,
      });
    } catch (err) {
      errorFy(err.message);
      return;
    }
    props.callback(false);
    successFy("Evento aceito!");
  };

  const denyEvent = async () => {
    try {
      await updateDoc(eventDocRef, {
        status: 401,
      });
    } catch (err) {
      errorFy(err.message);
      return;
    }
    props.callback(false);
    infoFy("Evento Recusado!");
  };

  const cancelEvent = async () => {
    try {
      await updateDoc(eventDocRef, {
        status: 402,
      });
    } catch (err) {
      errorFy(err.message);
      return;
    }
    props.callback(false);
    infoFy("Evento Cancelado!");
  };

  if (eventState === false)
    return (
      <>
        <h4>Carregando...</h4>
      </>
    );

  if (eventState === undefined)
    return (
      <>
        <form onSubmit={logic}>
          <h3 className="text-xl font-semibold m-0">Propor um evento?</h3>

          <label className="block py-2 mt-2 cursor-pointer" htmlFor="eventDate">
            Data:
          </label>
          <input
            required
            id="eventDate"
            className="w-full bg-f-black py-2 mb-2 focus:outline-none active:outline-none focus:shadow-outline border border-s-red rounded-md hover:border-f-red transition-all"
            type="date"
            defaultValue={today}
            min={today}
            max={maxDate.toISOString().slice(0, 10)}
          />
          <label className="block py-2 mt-2 cursor-pointer" htmlFor="eventHour">
            Horário de inicio:
          </label>
          <input
            required
            id="eventHour"
            className="w-full bg-f-black py-2 mb-2 focus:outline-none active:outline-none focus:shadow-outline border border-s-red rounded-md hover:border-f-red transition-all"
            type="time"
            min={today}
            max={maxDate.toISOString().slice(0, 10)}
          />
          <label className="block py-2 mt-2 cursor-pointer" htmlFor="eventType">
            Tipo:
          </label>
          <select
            required
            className="w-full bg-f-black py-2 mb-2 rounded-md cursor-pointer focus:outline-none border border-s-red hover:border-f-red"
            name=""
            id="eventType"
          >
            {eventTypes.map((e) => {
              return (
                <option key={e} value={e}>
                  {e}
                </option>
              );
            })}
          </select>
          <label
            className="block py-2 mt-2 cursor-pointer"
            htmlFor="eventTitle"
          >
            Nome:
          </label>
          <input
            id="eventTitle"
            type="text"
            required
            min={8}
            max={64}
            placeholder="Título"
            className="w-full bg-f-black py-2 mb-2 rounded-md cursor-pointer focus:outline-none border border-s-red hover:border-f-red"
          />
          <button
            className="bg-emerald-500 text-white hover:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full mt-4 ease-linear transition-all duration-150"
            type="submit"
          >
            Enviar
          </button>
        </form>
        <ToastContainer />
      </>
    );

  if (
    eventState &&
    eventState.status != 401 &&
    eventState.status != 402 &&
    eventState.status != 201 &&
    eventState.proposer === `${userDataByJwt.type}:${userDataByJwt.user}`
  ) {
    return (
      <>
        <form>
          <h3 className="text-xl font-semibold m-0">
            Dados do evento proposto:
          </h3>
          <label className="block py-2 mt-2 cursor-pointer" htmlFor="eventDate">
            Data:
          </label>
          <input
            id="eventDate"
            className="w-full bg-f-black py-2 mb-2 focus:outline-none active:outline-none focus:shadow-outline border border-s-red rounded-md hover:border-f-red transition-all"
            type="date"
            defaultValue={eventState.event_data}
          />
          <label className="block py-2 mt-2 cursor-pointer" htmlFor="eventHour">
            Horário de inicio:
          </label>
          <input
            id="eventHour"
            className="w-full bg-f-black py-2 mb-2 focus:outline-none active:outline-none focus:shadow-outline border border-s-red rounded-md hover:border-f-red transition-all"
            type="time"
            defaultValue={eventState.init_hour}
          />
          <label className="block py-2 mt-2 cursor-pointer" htmlFor="eventType">
            Tipo:
          </label>
          <input
            type="text"
            className="w-full bg-f-black py-2 mb-2 rounded-md cursor-pointer focus:outline-none border border-s-red hover:border-f-red"
            id="eventType"
            defaultValue={eventState.event_type}
          />

          <label
            className="block py-2 mt-2 cursor-pointer"
            htmlFor="eventTitle"
          >
            Nome:
          </label>
          <input
            id="eventTitle"
            type="text"
            placeholder="Título"
            defaultValue={eventState.event_name}
            className="w-full bg-f-black py-2 mb-2 rounded-md cursor-pointer focus:outline-none border border-s-red hover:border-f-red"
          />
          <div className="flex">
            <button
              className="bg-yellow-400 text-f-gray mr-2 hover:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-1/2 mt-4 ease-linear transition-all duration-150"
              type="button"
              onClick={editEvent}
            >
              Editar
            </button>
            <button
              className="bg-red-600 text-white ml-2 hover:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-1/2 mt-4 ease-linear transition-all duration-150"
              type="button"
              onClick={() => deleteEvent(false)}
            >
              Deletar
            </button>
          </div>
        </form>
      </>
    );
  }

  if (
    eventState &&
    eventState.status != 401 &&
    eventState.status != 402 &&
    eventState.status != 201 &&
    eventState.accecpter === `${userDataByJwt.type}:${userDataByJwt.user}`
  ) {
    return (
      <>
        <form>
          <h3 className="text-xl font-semibold m-0">
            Propuseram o seguinte evento:
          </h3>
          <label className="block py-2 mt-2 cursor-pointer" htmlFor="eventDate">
            Data:
          </label>
          <input
            id="eventDate"
            className="w-full bg-f-black py-2 mb-2 focus:outline-none active:outline-none focus:shadow-outline border border-s-red rounded-md hover:border-f-red transition-all"
            type="date"
            disabled
            value={eventState.event_data}
          />
          <label className="block py-2 mt-2 cursor-pointer" htmlFor="eventHour">
            Horário de inicio:
          </label>
          <input
            id="eventHour"
            className="w-full bg-f-black py-2 mb-2 focus:outline-none active:outline-none focus:shadow-outline border border-s-red rounded-md hover:border-f-red transition-all"
            type="time"
            disabled
            value={eventState.init_hour}
          />
          <label className="block py-2 mt-2 cursor-pointer" htmlFor="eventType">
            Tipo:
          </label>
          <input
            type="text"
            className="w-full bg-f-black py-2 mb-2 rounded-md cursor-pointer focus:outline-none border border-s-red hover:border-f-red"
            id="eventType"
            disabled
            value={eventState.event_type}
          />

          <label
            className="block py-2 mt-2 cursor-pointer"
            htmlFor="eventTitle"
          >
            Nome:
          </label>
          <input
            id="eventTitle"
            type="text"
            placeholder="Título"
            disabled
            value={eventState.event_name}
            className="w-full bg-f-black py-2 mb-2 rounded-md cursor-pointer focus:outline-none border border-s-red hover:border-f-red"
          />
          <div className="flex">
            <button
              className="bg-emerald-500 text-white hover:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-1/2 mt-4 ease-linear transition-all duration-150"
              type="button"
              onClick={acceptEvent}
            >
              Aceitar
            </button>
            <button
              className="bg-red-600 text-white ml-2 hover:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-1/2 mt-4 ease-linear transition-all duration-150"
              type="button"
              onClick={denyEvent}
            >
              Recusar
            </button>
          </div>
        </form>
      </>
    );
  }

  if (eventState && eventState.status === 401) {
    return (
      <>
        <form>
          <h3 className="text-xl font-semibold m-0">
            O Evento anterior foi recusado!
          </h3>
          <br />
          <h4 className="text-md font-semibold m-0">
            Delete este evento para propor outro.{" "}
          </h4>

          <div className="flex">
            <button
              className="bg-red-600 text-white ml-2 hover:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full mt-4 ease-linear transition-all duration-150"
              type="button"
              onClick={() => deleteEvent(false)}
            >
              Deletar
            </button>
          </div>
        </form>
      </>
    );
  }

  if (eventState && eventState.status === 201) {
    return (
      <>
        <form className="text-center">
          <h3 className="text-xl font-semibold m-0">
            O Evento foi aceito, tudo certo!
          </h3>
          <div className="flex w-full items-center justify-center mt-2 mb-2">
            <h4 className="text-md font-semibold mt-2 mb-2">
              A divulgação é por nossa conta!{" "}
            </h4>
            <Confetti size={22} />
          </div>
          <h5 className="text-sm mt-8 font-normal">
            Algum emprevisto? Cancele o evento.
          </h5>
          <div className="flex">
            <button
              className="bg-red-600 text-white ml-2 hover:bg-red-700 uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full mt-4 ease-linear transition-all duration-150 font-normal"
              type="button"
              onClick={cancelEvent}
            >
              Cancelar Evento
            </button>
          </div>
        </form>
      </>
    );
  }

  if (
    eventState &&
    eventState.status === 402 &&
    eventState.proposer === `${userDataByJwt.type}:${userDataByJwt.user}`
  ) {
    return (
      <>
        <form className="text-center">
          <h3 className="text-xl font-semibold m-0">
            O Evento infelizmente foi cancelado.
          </h3>

          <h5 className="text-sm mt-8 font-normal">
            Por gentileza, delete o evento para propror outro.
          </h5>
          <div className="flex">
            <button
              className="bg-red-600 text-white ml-2 hover:bg-red-700 uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full mt-4 ease-linear transition-all duration-150 font-normal"
              type="button"
              onClick={() => deleteEvent(true)}
            >
              Deletar
            </button>
          </div>
        </form>
      </>
    );
  }

  if (
    eventState &&
    eventState.status === 402 &&
    eventState.accecpter === `${userDataByJwt.type}:${userDataByJwt.user}`
  ) {
    return (
      <>
        <form className="text-center">
          <h3 className="text-xl font-semibold m-0">
            Você teve de cancelar o evento.
          </h3>
          <MaskSad size={22} />
          <h5 className="text-sm mt-8 font-normal">
            Por conta disso, solicitamos a outra parte que deletasse o mesmo.
          </h5>
        </form>
      </>
    );
  }
};

export default EventLogic;
