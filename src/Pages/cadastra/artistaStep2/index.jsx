import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../../Components/Button/Button";
import InputText from "../../../Components/InputText";
import selectValue from "../../../utils/selectValue";

const CreateAccArtistaStepTwo = () => {
  const { state } = useLocation();
  const sendForm = async (event) => {
    event.preventDefault();

    const nome = selectValue(".Nome");
    const nomeArt = selectValue(".NomeArtistico");
    const cpf = selectValue(".cpf");
    const whatsApp = selectValue(".whatsApp");

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
      console.log(createArt.status);

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
      }
    } catch (err) {
      console.log(err);
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
