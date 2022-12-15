import Button from "../../../Components/Button/Button";
import InputText from "../../../Components/InputText";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import selectValue from "../../../utils/selectValue";
import setValueNull from "../../../utils/setValueNull";
import selectInput from "../../../utils/selectInput";
import IMask from "imask";

const CreateAccArtistaStepOne = () => {
  const [emailsRows, setEmailsRows] = useState(false);

  useEffect(() => {
    // IMask(selectInput(".Senha"), {
    //   mask: /^.{0,24}$/,
    // });
    // IMask(selectInput(".ConfirmaSenha"), {
    //   mask: /^.{0,24}$/,
    // });
  }, []);

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
      console.log(err);
    }
  };
  const navigate = useNavigate();
  const notifyEmailAlreadCadastred = () =>
    toast.warn("Email Já cadastrado", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const notifyPassNotEquals = () =>
    toast.error("As senhas não coincidem", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  //

  useEffect(() => {
    const PassEquals = selectValue(".Senha") === selectValue(".ConfirmaSenha");
    if (!PassEquals) {
      notifyPassNotEquals();
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
