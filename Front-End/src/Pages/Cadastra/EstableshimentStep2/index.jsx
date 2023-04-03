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
import { Buildings, Note, User, WhatsappLogo } from "phosphor-react";

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
      <ThePageText text="Estabelecimento Etapa 2" />
      <div className="flex justify-center gap-3">
        <div className="w-24 h-1 bg-[#ededed] rounded-lg"></div>
        <div className="w-24 h-1 bg-red-600 rounded-lg"></div>
        <div className="w-24 h-1 bg-[#ededed] rounded-lg"></div>
      </div>
      <form className="Form mt-10 items-center" onSubmit={sendStepThree}>
        <div className="flex justify-center items-center">
          <User size={30} className="mb-4 text-red-600" />
          <InputText
            class="NomeResponsavel"
            label="Nome do Responsável"
            placeholder="Seu Nome"
            min="10"
          ></InputText>
        </div>
        <div className="flex justify-center items-center">
          <Note size={30} className="mb-4 text-red-600" />
          <InputText
            class="Cnpj"
            label="CNPJ"
            placeholder="00-0000-0000/0000-00"
            min="14"
            max="20"
          ></InputText>
        </div>
        <div className="flex justify-center items-center">
          <WhatsappLogo size={30} className="mb-4 text-red-600" />
          <InputText
            class="whatsApp"
            label="WhatsApp"
            placeholder="Seu whatsApp"
            min="10"
          ></InputText>
        </div>
        <div className="flex justify-center items-center">
          <Buildings size={30} className="mb-4 text-red-600" />
          <InputText
            class="nomeEstabelecimento"
            label="Nome do Estabelecimento"
            placeholder="Nome do Estabelecimento"
          ></InputText>
        </div>
        <div className="flex flex-col items-center">
          <Button text="Enviar"></Button>
        </div>
        <ToastContainer />
      </form>
      <div className="flex justify-center gap-3">
        <Link>
          <Button text="Já tenho conta!"></Button>
        </Link>
        <ButtonBack />
      </div>
    </>
  );
};

export default CreateAccEstableshimentStepTwo;
