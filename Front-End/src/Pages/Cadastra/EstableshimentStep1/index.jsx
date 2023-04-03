import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import InputText from "../../../Components/InputText";
import Button from "../../../Components/Button/Button";
import selectValue from "../../../Utils/MyFunctions/selectValue";
import setValueNull from "../../../Utils/MyFunctions/setValueNull";
import errorFy from "../../../Utils/Toastify/errorFy";
import warnFy from "../../../Utils/Toastify/warnFy";
import ButtonBack from "../../../Components/ButtonBack";
import ThePageText from "../../../Components/ThePageText";
import { Envelope, Key } from "phosphor-react";
import { API_URL } from "../../../Utils/Admin";

const CreateAccEstableshimentStepOne = () => {
  const [emailState, SetEmailState] = useState(false);
  const navigate = useNavigate();

  const validateEmail = async (e) => {
    e.preventDefault();
    const email = selectValue(".Email");
    try {
      let emailRow = await fetch(`${API_URL}/validateEmailEstableshiment`, {
        headers: new Headers({
          Authorization: `Basic ${Buffer.from(`${email}`).toString("base64")}`,
        }),
      });
      if (emailRow.status == 200) {
        emailRow = await emailRow.json();
        SetEmailState(emailRow.emails);
      } else {
        errorFy("Error validating email");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const PassEquals = selectValue(".Senha") === selectValue(".ConfirmaSenha");
    if (!PassEquals) {
      errorFy("As Senhas não coincidem");
      setValueNull(".Senha");
      setValueNull(".ConfirmaSenha");
      SetEmailState(false);
    }

    if (emailState > 0) {
      warnFy("Email já cadastrado");
      setValueNull(".Email");
      SetEmailState(false);
    }

    if (PassEquals && emailState === 0) {
      navigate("/cadastra/estabelecimento/etapa/2", {
        state: {
          email: selectValue(".Email"),
          pass: selectValue(".Senha"),
        },
      });
    }
  }, [emailState]);

  return (
    <>
      <ThePageText text="Estabelecimento Etapa 1" />
      <div className="flex justify-center gap-3">
        <div className="w-24 h-1 bg-red-600 rounded-lg"></div>
        <div className="w-24 h-1 bg-[#ededed] rounded-lg"></div>
        <div className="w-24 h-1 bg-[#ededed] rounded-lg"></div>
      </div>
      <form className="Form mt-10 items-center" onSubmit={validateEmail}>
        <div className="flex justify-center items-center">
          <Envelope size={30} className="mb-4 text-red-600" />
          <InputText
            type="email"
            class="Email"
            label="Email"
            placeholder="Seu Email"
          ></InputText>
        </div>
        <div className="flex justify-center items-center">
          <Key size={30} className="mb-4 text-red-600" />
          <InputText
            type="password"
            class="Senha"
            label="Senha"
            placeholder="Sua Senha"
            min="8"
            max="24"
          ></InputText>
        </div>
        <div className="flex justify-center items-center">
          <Key size={30} className="mb-4 text-red-600" />
          <InputText
            type="password"
            class="ConfirmaSenha"
            label="Confirma Senha"
            placeholder="Confirme sua senha"
            min="8"
            max="24"
          ></InputText>
        </div>
        <div className="flex flex-col items-center">
          <Button text="Avançar"></Button>
        </div>
        <ToastContainer />
      </form>
      <div className="flex justify-center gap-2">
        <Link to={"../login"}>
          <Button text="Já possuo conta!"></Button>
        </Link>
        <ButtonBack />
      </div>
    </>
  );
};

export default CreateAccEstableshimentStepOne;
