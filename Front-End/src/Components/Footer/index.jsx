import {
  FacebookLogo,
  HouseLine,
  InstagramLogo,
  LinkedinLogo,
  TwitterLogo,
  WhatsappLogo,
} from "phosphor-react";
import { Link } from "react-router-dom";
import InputText from "../InputText";
import Button from "../Button/Button";
import selectValue from "../../Utils/MyFunctions/selectValue";
import setValueNull from "../../Utils/MyFunctions/setValueNull";
import { ToastContainer } from "react-toastify";

const Footer = () => {
  const subNewsletter = (e) => {
    e.preventDefault();
    const emailNewsletter = selectValue(".textNewsletter");
    console.log(emailNewsletter);
    setValueNull(".textNewsletter");
  };

  return (
    <footer className="main_footer flex m-0 items-end py-2 md:py-4">
      <div className="container mx-auto">
        <div className="w-full flex flex-wrap flex-row items-center">
          <div className="flex w-full md:w-4/5 mx-4 md:mx-0 justify-center md:justify-start">
            <div className="flex flex-row flex-wrap text-center md:text-left items-center justify-center md:justify-start">
              <img
                src="../../../public/Logo/logodm.png"
                className="max-h-14"
                alt="Voice Logo"
              />
              <h1 className="text-white font-bold">Voice</h1>
              <span className="mx-4">Todos os direitos reservados!</span>
            </div>
          </div>
          <div className="w-full md:w-1/5 flex flex-row my-2">
            <a
              className="w-1/3 text-center hover:text-gray-500"
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-f-black max-w-[38px] rounded-full w-3/4 mx-auto">
                <FacebookLogo className="mx-auto py-2" size={38} />
              </div>
            </a>

            <a
              className="w-1/3 text-center hover:text-gray-500"
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-f-black max-w-[38px] rounded-full w-3/4 mx-auto">
                <TwitterLogo className="mx-auto py-2" size={38} />
              </div>
            </a>
            <a
              className="w-1/3 text-center hover:text-gray-500"
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-f-black max-w-[38px] rounded-full w-3/4 mx-auto">
                <InstagramLogo className="mx-auto py-2" size={38} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
