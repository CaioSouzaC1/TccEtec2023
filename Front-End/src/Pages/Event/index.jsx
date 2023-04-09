import { useParams } from "react-router-dom";

const Event = () => {
  let { id } = useParams();
  return <section>interna do evento, evento: {id}</section>;
};

export default Event;
