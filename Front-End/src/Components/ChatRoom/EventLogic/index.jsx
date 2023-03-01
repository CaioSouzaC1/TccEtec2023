import { doc, getDoc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import { eventTypes } from "../../../Utils/Admin";
import { db } from "../../../Utils/Firebase/Firebase";
import selectValue from "../../../Utils/MyFunctions/selectValue";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import successFy from "../../../Utils/Toastify/successFy";
const EventLogic = (props) => {
  const today = new Date().toISOString().slice(0, 10);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 60);

  const eventDocRef = doc(db, "events", props.chatId);

  const [eventState, setEventState] = useState(false);

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

  useEffect(() => {
    console.log(eventState);
  }, [eventState]);

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
      });
    }
    successFy("Evento Proposto, agora é esperar a outra parte aceitar!");
    props.callback(false);
  };

  const editEvent = () => {};

  if (!eventState)
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

  if (eventState) {
    return (
      <>
        <form onSubmit={editEvent}>
          <h3 className="text-xl font-semibold m-0">
            Dados do evento proposto:
          </h3>

          <label className="block py-2 mt-2 cursor-pointer" htmlFor="eventDate">
            Data:
          </label>
          <input
            disabled
            id="eventDate"
            className="w-full bg-f-black py-2 mb-2 focus:outline-none active:outline-none focus:shadow-outline border border-s-red rounded-md hover:border-f-red transition-all"
            type="date"
            value={eventState.event_data}
          />
          <label className="block py-2 mt-2 cursor-pointer" htmlFor="eventHour">
            Horário de inicio:
          </label>
          <input
            disabled
            id="eventHour"
            className="w-full bg-f-black py-2 mb-2 focus:outline-none active:outline-none focus:shadow-outline border border-s-red rounded-md hover:border-f-red transition-all"
            type="time"
            value={eventState.init_hour}
          />
          <label className="block py-2 mt-2 cursor-pointer" htmlFor="eventType">
            Tipo:
          </label>
          <input
            type="text"
            disabled
            className="w-full bg-f-black py-2 mb-2 rounded-md cursor-pointer focus:outline-none border border-s-red hover:border-f-red"
            id="eventType"
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
            disabled
            placeholder="Título"
            value={eventState.event_name}
            className="w-full bg-f-black py-2 mb-2 rounded-md cursor-pointer focus:outline-none border border-s-red hover:border-f-red"
          />
          {/* <button
            className="bg-emerald-500 text-white hover:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full mt-4 ease-linear transition-all duration-150"
            type="submit"
          >
            Enviar
          </button> */}
        </form>
      </>
    );
  }
};

export default EventLogic;
