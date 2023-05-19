import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import InputText from "../../../Components/InputText";
import Button from "../../../Components/Button/Button";
import putImask from "../../../Utils/MyFunctions/putImask";
import selectInput from "../../../Utils/MyFunctions/selectInput";
import cnpjValidate from "../../../Utils/MyFunctions/cnpjValidate";
import selectValue from "../../../Utils/MyFunctions/selectValue";
import warnFy from "../../../Utils/Toastify/warnFy";
import ButtonBack from "../../../Components/ButtonBack";
import ThePageText from "../../../Components/ThePageText";
import {
  Buildings,
  GlobeHemisphereWest,
  Note,
  User,
  UserCircle,
  UserCirclePlus,
  WhatsappLogo,
} from "phosphor-react";
import Stepper from "../../../Components/Stepper";

const CreateAccEstableshimentStepTwo = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    putImask(".Cnpj", "00.000.000/0000-00");
    putImask(".NomeResponsavel", /^[a-zA-Zà-úÀ-Ú ]{0,35}$/);
    putImask(".nomeEstabelecimento", /^[a-zA-Zà-úÀ-Ú0-9 ]{0,35}$/);
    putImask(".whatsApp", "(00) 00000-0000");
    // const validCnpj = selectInput(".Cnpj").addEventListener("blur", () => {
    //   cnpjValidate(selectValue(".Cnpj"));

    //   console.log(validCnpj);
    // });
  }, []);

  const sendStepThree = (e) => {
    e.preventDefault();
    if (state == null) {
      warnFy("Você está pulando uma etapa");
      setTimeout(() => {
        navigate("/cadastra/estabelecimento/etapa/1");
      }, 3000);
    } else {
      navigate("/cadastra/estabelecimento/etapa/3", {
        state: {
          email: state.email,
          pass: state.pass,
          nomeResponsavel: selectValue(".NomeResponsavel"),
          Cnpj: selectValue(".Cnpj"),
          whatsApp: selectValue(".whatsApp"),
          nomeEstabelecimento: selectValue(".nomeEstabelecimento"),
        },
      });
    }
  };
  return (
    <>
      <section className="flex flex-wrap mt-8">
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-black md:pr-8 my-4">
            Simplifique o processo de agendamento de shows e eventos em seu
            estabelecimento.
          </h1>
          <h2 className="font-regular text-xl mb-8 md:pr-8">
            Com nossa plataforma, você pode marcar, agendar e cancelar eventos
            de forma rápida e descomplicada. Economize tempo e esforço ao
            gerenciar sua programação, mantendo tudo organizado em um só lugar.
          </h2>
        </div>

        <form
          className="Form items-center w-full md:w-1/2"
          onSubmit={sendStepThree}
        >
          <div className="flex flex-wrap w-full justify-center gap-12">
            <Stepper
              icon={<UserCircle size={24} weight="bold" />}
              text="Etapa 1"
            />
            <Stepper
              icon={<GlobeHemisphereWest size={24} weight="bold" />}
              text="Etapa 2"
              on={true}
            />
            <Stepper
              icon={<UserCirclePlus size={24} weight="bold" />}
              text="Etapa 3"
            />
          </div>
          <div className="flex justify-center items-center">
            <User
              size={22}
              weight="bold"
              className="text-white mb-4 ml-2 mr-4"
            />
            <InputText
              class="NomeResponsavel"
              label="Nome do Responsável"
              placeholder="Seu Nome"
              min="10"
            ></InputText>
          </div>
          <div className="flex justify-center items-center">
            <Note
              size={22}
              weight="bold"
              className="text-white mb-4 ml-2 mr-4"
            />
            <InputText
              class="Cnpj"
              label="CNPJ"
              placeholder="00-0000-0000/0000-00"
              min="14"
              max="20"
            ></InputText>
          </div>
          <div className="flex justify-center items-center">
            <WhatsappLogo
              size={22}
              weight="bold"
              className="text-white mb-4 ml-2 mr-4"
            />
            <InputText
              class="whatsApp"
              label="WhatsApp"
              placeholder="Seu whatsApp"
              min="10"
            ></InputText>
          </div>
          <div className="flex justify-center items-center">
            <Buildings
              size={22}
              weight="bold"
              className="text-white mb-4 ml-2 mr-4"
            />
            <InputText
              class="nomeEstabelecimento"
              label="Nome do Estabelecimento"
              placeholder="Nome do Estabelecimento"
            ></InputText>
          </div>
          <div
            style={{ width: `calc(100% - ${42}px)` }}
            className="flex flex-col items-center ml-auto"
          >
            <Button full={true} text="Avançar"></Button>
          </div>
          <ToastContainer />
        </form>
      </section>
      <div className="flex justify-center gap-8 my-4">
        <Link to={"../login"}>
          <Button text="Já possuo conta!"></Button>
        </Link>
        <ButtonBack />
      </div>
    </>
  );
};

export default CreateAccEstableshimentStepTwo;
