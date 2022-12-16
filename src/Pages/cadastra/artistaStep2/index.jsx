import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../../Components/Button/Button";
import InputText from "../../../Components/InputText";
import selectValue from "../../../utils/selectValue";
import selectInput from "../../../utils/selectInput";
import { useEffect, useState } from "react";

const CreateAccArtistaStepTwo = () => {
  const [invalidNavigate, setInvalidNavigate] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    IMask(selectInput(".cpf"), {
      mask: "000.000.000-00",
    });
    IMask(selectInput(".Nome"), {
      mask: /^[a-zA-Zà-úÀ-Ú ]{0,35}$/,
    });
    IMask(selectInput(".NomeArtistico"), {
      mask: /^[a-zA-Zà-úÀ-Ú0-9 !@#\$%\^\&*\)\(+=._-]{0,35}$/g,
    });
    IMask(selectInput(".whatsApp"), {
      mask: "(00)00000-0000",
    });
  }, []);

  const errorNotify = () => {
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
  };

  const { state } = useLocation();
  const sendForm = async (event) => {
    event.preventDefault();

    const nome = selectValue(".Nome");
    const nomeArt = selectValue(".NomeArtistico");
    const cpf = selectValue(".cpf");
    const whatsApp = selectValue(".whatsApp");

    if (!state === null) {
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
            cpf: cpf,
            email: state.email,
            pass: state.pass,
            whatsApp: whatsApp,
          }),
        });

        if (createArt.status === 200) {
          toast.success("Conta Criada! Redirecionando... ", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          errorNotify();
        }
      } catch (err) {
        errorNotify();
      }
    } else {
      toast.warn("Você está pulando uma etapa..", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        toast.warn("Redirecionando para a etapa 1", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }, 1500);
      setTimeout(() => {
        navigate("/cadastra/artista/etapa/1");
      }, 5000);
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
        <InputText class="cpf" label="CPF" placeholder="Seu CPF"></InputText>
        <br />
        <InputText
          class="whatsApp"
          label="WhatsApp"
          placeholder="Seu whatsApp"
        ></InputText>
        <br />
        <Button text="Enviar"></Button>
        <ToastContainer />
      </form>
    </>
  );
};
export default CreateAccArtistaStepTwo;
