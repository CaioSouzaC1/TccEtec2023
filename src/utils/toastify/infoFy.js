import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const infoFy = (message, time) => {
  const theTime = time != null ? time : 4000;
  return toast.warn(`${message}`, {
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

export default infoFy;
