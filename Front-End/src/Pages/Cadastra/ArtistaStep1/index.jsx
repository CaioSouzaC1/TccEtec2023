import Button from "../../../Components/Button/Button";
import InputText from "../../../Components/InputText";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import selectValue from "../../../Utils/MyFunctions/selectValue";
import setValueNull from "../../../Utils/MyFunctions/setValueNull";
import errorFy from "../../../Utils/Toastify/errorFy";
import warnFy from "../../../Utils/Toastify/warnFy";
import ButtonBack from "../../../Components/ButtonBack";
import ThePageText from "../../../Components/ThePageText";
import ButtonAdvance from "../../../Components/ButtonAdvance";
import { API_URL } from "../../../Utils/Admin";

import { Envelope, Key } from "phosphor-react";

const CreateAccArtistaStepOne = () => {
  const [emailsRows, setEmailsRows] = useState(false);

  const emailValidation = async (event) => {
    event.preventDefault();
    const email = selectValue(".Email");
    try {
      const emailRows = await (
        await fetch(`${API_URL}/validateEmail`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        })
      ).json();
      setEmailsRows(emailRows.emails);
    } catch (err) {
      errorFy("Erro na Requisição!");
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    const PassEquals = selectValue(".Senha") === selectValue(".ConfirmaSenha");
    if (!PassEquals) {
      errorFy("As Senhas não coincidem");
      setValueNull(".Senha");
      setValueNull(".ConfirmaSenha");
      setEmailsRows(false);
    }
    if (emailsRows === 0 && PassEquals) {
      navigate("/cadastra/artista/etapa/2", {
        state: {
          email: selectValue(".Email"),
          pass: selectValue(".Senha"),
        },
      });
    }
    if (emailsRows === 1) {
      setValueNull(".Email");
      warnFy("Email Já cadastrado");
      setEmailsRows(false);
    }
  }, [emailsRows]);

  return (
    <>
      <ThePageText text="Artista Etapa 1" />
      <div className="flex justify-center gap-3">
        <div className="w-24 h-1 bg-red-600 rounded-lg"></div>
        <div className="w-24 h-1 bg-[#ededed] rounded-lg"></div>
      </div>
      <form className="Form mt-10 items-center" onSubmit={emailValidation}>
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
          <ButtonAdvance text="Avançar"></ButtonAdvance>
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
export default CreateAccArtistaStepOne;
