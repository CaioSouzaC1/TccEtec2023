import { ToastContainer } from "react-toastify";
import InputText from "../../../Components/InputText";
import Button from "../../../Components/Button/Button";
import selectValue from "../../../utils/selectValue";
import setValueNull from "../../../utils/setValueNull";
import errorFy from "../../../utils/toastify/errorFy";
import { useEffect, useState } from "react";
import warnFy from "../../../utils/toastify/warnFy";
import { useNavigate } from "react-router-dom";
import ButtonBack from "../../../Components/ButtonBack";
import ThePageText from "../../../Components/ThePageText";
import { Buffer } from "buffer";

const CreateAccEstableshimentStepOne = () => {
  const [emailState, SetEmailState] = useState(false);
  const navigate = useNavigate();

  const validateEmail = async (e) => {
    e.preventDefault();
    const email = selectValue(".Email");
    try {
      let emailRow = await fetch(
        "http://127.0.0.1:3333/validateEmailEstableshiment",
        {
          headers: new Headers({
            Authorization: `Basic ${Buffer.from(`${email}`).toString(
              "base64"
            )}`,
          }),
        }
      );
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
      <form className="Form" onSubmit={validateEmail}>
        <InputText
          type="email"
          class="Email"
          label="Email"
          placeholder="Seu Email"
        ></InputText>
        <br />
        <InputText
          type="password"
          class="Senha"
          label="Senha"
          placeholder="Sua Senha"
          min="8"
          max="24"
        ></InputText>
        <br />
        <InputText
          type="password"
          class="ConfirmaSenha"
          label="Confirma Senha"
          placeholder="Confirme sua senha"
          min="8"
          max="24"
        ></InputText>
        <br />
        <Button text="Avançar"></Button>
        <ToastContainer />
      </form>
      <ButtonBack />
    </>
  );
};

export default CreateAccEstableshimentStepOne;
