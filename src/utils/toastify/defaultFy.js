import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultFy = (message, time) => {
  const theTime = time != null ? time : 4000;
  return toast(`${message}`, {
    position: "top-right",
    autoClose: theTime,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export default defaultFy;
