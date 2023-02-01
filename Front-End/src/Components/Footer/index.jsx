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
    <footer>
      <div className="flex flex-row flex-wrap">
        <div className="w-full md:w-1/2 lg:w-1/4 my-6 text-center">
          <p className="text-2xl font-bold">Voice</p>{" "}
          <p className="w-4/5 mx-auto my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            magna nunc, sodales a vestibulum a, interdum ac nibh.
          </p>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 my-6 text-center">
          <p className="text-xl font-bold mb-3">Links Rápidos</p>
          <Link
            to={"/"}
            className="flex items-center justify-center w-3/4 mx-auto"
          >
            <HouseLine size={22} className="mx-2" />
            <p className="my-2">Home</p>
          </Link>
          <Link
            to={"/"}
            className="flex items-center justify-center w-3/4 mx-auto"
          >
            <HouseLine size={22} className="mx-2" />
            <p className="my-2">Home</p>
          </Link>
          <Link
            to={"/"}
            className="flex items-center justify-center w-3/4 mx-auto"
          >
            <HouseLine size={22} className="mx-2" />
            <p className="my-2">Home</p>
          </Link>
          <Link
            to={"/"}
            className="flex items-center justify-center w-3/4 mx-auto"
          >
            <HouseLine size={22} className="mx-2" />
            <p className="my-2">Home</p>
          </Link>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 my-6 text-center">
          <p className="text-xl font-bold mb-3">Meios de contato</p>
          <p className="my-2">Etec Cruzeiro - SP</p>
          <Link
            to={"/"}
            className="flex items-center justify-center w-3/4 mx-auto"
          >
            <WhatsappLogo size={22} className="mx-2" />
            <p className="my-2">(12) 99887-6655 </p>
          </Link>
          <p className="my-2">contato@voice.com.br</p>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 my-6 text-center">
          <p className="text-xl font-bold mb-3">Newsletter</p>
          <form id="newsletter" onSubmit={subNewsletter}>
            <p className="w-4/5 mx-auto my-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <InputText
              type={"email"}
              class="textNewsletter"
              label="Email"
              placeholder="Email"
            />
            <Button text="Cadastrar"></Button>
          </form>
        </div>
      </div>
      <div className="h-0.5 w-full bg-f-gray my-2"></div>
      <div className="w-full flex flex-wrap flex-row">
        <div className="w-full md:w-3/5 py-2 px-1 text-center md:text-left">
          Voice copyright &copy;2023. Todos os direitos reservados!
        </div>
        <div className="w-full md:w-2/5 flex flex-row py-2 mb-4">
          <FacebookLogo size={24} className="w-1/4" />
          <TwitterLogo size={24} className="w-1/4" />
          <InstagramLogo size={24} className="w-1/4" />
          <LinkedinLogo size={24} className="w-1/4" />
        </div>
      </div>
      <ToastContainer />
    </footer>
  );
};

export default Footer;
