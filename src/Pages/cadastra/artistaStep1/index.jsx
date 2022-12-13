import Button from "../../../Components/Button/Button";
import InputText from "../../../Components/InputText";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateAccArtistaStepOne = () => {
  const [emailsRows, setEmailsRows] = useState(2);

  const emailValidation = async (event) => {
    event.preventDefault();
    const selectInput = (seletor) => {
      return document.querySelector(`form.Form ${seletor}`).value;
    };
    const email = selectInput(" .Email");

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
  if (emailsRows == 1) {
    console.log("email já cadastrado");
  } else {
    console.log("email ainda não cadastrado");
    // navigate("/cadastra/artista/etapa/2");
  }

  return (
    <>
      <form className="Form" onSubmit={emailValidation}>
        <InputText
          class="Email"
          label="Email"
          placeholder="Seu Email"
        ></InputText>
        <br />
        <InputText
          class="Senha"
          label="Senha"
          placeholder="Sua Senha"
        ></InputText>
        <br />
        <InputText
          class="Confirma Senha"
          label="Confirma Senha"
          placeholder="Confirme sua senha"
        ></InputText>
        <br />

        <Button text="Avançar"></Button>
      </form>
    </>
  );
};
export default CreateAccArtistaStepOne;
