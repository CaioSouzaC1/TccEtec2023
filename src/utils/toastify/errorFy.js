import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const errorFy = (message, time) => {
  const theTime = time != null ? time : 4000;
  return toast.error(`${message}`, {
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

export default errorFy;
