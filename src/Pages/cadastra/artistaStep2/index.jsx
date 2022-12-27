import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Button from "../../../Components/Button/Button";
import InputText from "../../../Components/InputText";
import selectValue from "../../../utils/selectValue";
import { useEffect } from "react";
import successFy from "../../../utils/toastify/successFy";
import errorFy from "../../../utils/toastify/errorFy";
import warnFy from "../../../utils/toastify/warnFy";
import putImask from "../../../utils/putImask";
import cpfValidate from "../../../utils/cpfValidate";
import setValueNull from "../../../utils/setValueNull";

const CreateAccArtistaStepTwo = () => {
  //To Do: Não deixar o form enviável após o envio

  const navigate = useNavigate();

  useEffect(() => {
    putImask(".cpf", "000.000.000-00");
    putImask(".Nome", /^[a-zA-Zà-úÀ-Ú ]{0,35}$/);
    putImask(".NomeArtistico", /^[a-zA-Zà-úÀ-Ú ]{0,35}$/);
    putImask(".whatsApp", "(00) 00000-0000");
  }, []);

  const { state } = useLocation();
  const sendForm = async (event) => {
    event.preventDefault();

    const nome = selectValue(".Nome");
    const nomeArt = selectValue(".NomeArtistico");
    let cpf = selectValue(".cpf");
    const cpfValid = cpfValidate(cpf);
    let whatsApp = selectValue(".whatsApp");

    //Trocar essa merda por um regex barato
    whatsApp = whatsApp.replace("-", "");
    whatsApp = whatsApp.replace("(", "");
    whatsApp = whatsApp.replace(")", "");
    whatsApp = whatsApp.replace(" ", "");
    cpf = cpf.replace(".", "");
    cpf = cpf.replace(".", "");
    cpf = cpf.replace("-", "");
    console.log(whatsApp);
    console.log(cpf);
    if (!cpfValid) {
      errorFy("Este Cpf não é válido...");
      setValueNull(".cpf");
    } else if (state != null) {
      try {
        const createArt = await fetch("http://127.0.0.1:3333/createAcc", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nome,
            nameArt: nomeArt,
            cpf: Number(cpf),
            email: state.email,
            pass: state.pass,
            whatsApp: Number(whatsApp),
          }),
        });

        if (createArt.status === 200) {
          successFy("Conta Criada! Redirecionando... ");
          setTimeout(() => {
            navigate("/login/");
          }, 3000);
        } else {
          errorFy("Tivemos um erro ao criar sua conta");
        }
      } catch (err) {
        errorFy("Erro na Requisição!");
      }
    } else {
      warnFy("Você está pulando uma etapa..");
      setTimeout(() => {
        warnFy("Redirecionando para a etapa 1");
      }, 1000);
      setTimeout(() => {
        navigate("/cadastra/artista/etapa/1");
      }, 4000);
    }
  };

  return (
    <>
      <h1>Etapa 2</h1>
      <form className="Form" onSubmit={sendForm}>
        <InputText class="Nome" label="Nome" placeholder="Seu nome"></InputText>
        <br />
        <InputText
          class="NomeArtistico"
          label="NomeArtistico"
          placeholder="Seu Nome Artistico"
        ></InputText>
        <br />
        <InputText
          class="cpf"
          label="CPF"
          placeholder="Seu CPF"
          min="11"
        ></InputText>
        <br />
        <InputText
          class="whatsApp"
          label="WhatsApp"
          placeholder="Seu whatsApp"
          min="10"
        ></InputText>
        <br />
        <Button text="Enviar"></Button>
        <ToastContainer />
      </form>
    </>
  );
};
export default CreateAccArtistaStepTwo;
