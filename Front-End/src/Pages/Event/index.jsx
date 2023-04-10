import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../Utils/Firebase/Firebase";
import { useEffect, useState } from "react";
import Loader from "../../Components/Loader";

const Event = () => {
  let { id } = useParams();
  const [eventData, setEventData] = useState(false);
  // const queryChat01 = query(
  //   colRef,
  //   where("User1", "==", `${props.viewerType}:${props.viewer}`),
  //   where("User2", "==", `${props.visualizedType}:${props.visualized}`)
  // );

  useEffect(() => {
    verifyEventData();
  }, []);

  console.log(eventData);

  const verifyEventData = async () => {
    const docSnap = await getDoc(eventDocRef);
    setEventData(docSnap.data());
  };

  const eventDocRef = doc(db, "events", id);

  if (!eventData) {
    return <Loader />;
  }

  return (
    <section>
      {eventData && (
        <>
          <h1>{eventData.event_name}</h1>
          <h2>{eventData.event_type}</h2>
          <h2>{eventData.init_hour}</h2>
        </>
      )}
    </section>
  );
};

export default Event;
