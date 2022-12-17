import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const successFy = (message, time) => {
  const theTime = time != null ? time : 4000;
  return toast.success(`${message}`, {
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

export default successFy;
