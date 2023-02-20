import { eventTypes } from "../../../Utils/Admin";
const EventLogic = () => {
  const today = new Date().toISOString().slice(0, 10);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 60);

  return (
    <form className="">
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
        Hora:
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
          return <option value={e}>{e}</option>;
        })}
      </select>
      <label className="block py-2 mt-2 cursor-pointer" htmlFor="eventTitle">
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
    </form>
  );
};

export default EventLogic;
