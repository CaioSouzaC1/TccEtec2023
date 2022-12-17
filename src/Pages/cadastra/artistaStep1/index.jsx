import Button from "../../../Components/Button/Button";
import InputText from "../../../Components/InputText";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import selectValue from "../../../utils/selectValue";
import setValueNull from "../../../utils/setValueNull";
import errorFy from "../../../utils/toastify/errorFy";
import warnFy from "../../../utils/toastify/warnFy";

const CreateAccArtistaStepOne = () => {
  const [emailsRows, setEmailsRows] = useState(false);

  const emailValidation = async (event) => {
    event.preventDefault();
    const email = selectValue(".Email");
    try {
      const emailRows = await (
        await fetch("http://127.0.0.1:3333/validateEmail", {
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
  const notifyEmailAlreadCadastred = () => {
    warnFy("Email Já cadastrado");
  };

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
      notifyEmailAlreadCadastred();
      setEmailsRows(false);
    }
  }, [emailsRows]);

  return (
    <>
      <h1>Etapa 1</h1>
      <form className="Form" onSubmit={emailValidation}>
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
    </>
  );
};
export default CreateAccArtistaStepOne;