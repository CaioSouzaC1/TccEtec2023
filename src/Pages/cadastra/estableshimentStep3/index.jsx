import { useLocation } from "react-router-dom";
import InputText from "../../../Components/InputText";
import { ToastContainer } from "react-toastify";
import Button from "../../../Components/Button/Button";
import { useEffect } from "react";
import selectInput from "../../../utils/selectInput";
import selectValue from "../../../utils/selectValue";
import putImask from "../../../utils/putImask";
import errorFy from "../../../utils/toastify/errorFy";

const CreateAccEstableshimentStepThree = () => {
  const { state } = useLocation();
  console.log(state);

  useEffect(() => {
    putImask(".Cep", "00000-000");
    selectInput(".Cep").addEventListener("blur", async () => {
      try {
        const cepData = await (
          await fetch(`https://viacep.com.br/ws/${selectValue(".Cep")}/json/`)
        ).json();
        selectInput(".rua").value = cepData.logradouro;
        selectInput(".bairro").value = cepData.bairro;
        selectInput(".cidade").value = cepData.localidade;
      } catch (err) {
        errorFy("Cep Inválido");
      }
    });
  }, []);

  const sendForm = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <h1>Estabelecimento Step 3</h1>
      <form className="Form" onSubmit={sendForm}>
        <InputText
          class="Cep"
          label="CEP"
          min="8"
          placeholder="00000-000"
        ></InputText>
        <br />
        <InputText class="numero" label="Número" placeholder="178"></InputText>
        <br />
        <InputText
          class="rua"
          label="Rua"
          placeholder="Rua Getúlio Vargas"
        ></InputText>
        <br />
        <InputText
          class="bairro"
          label="Bairro"
          placeholder="Jardim Paraiso"
        ></InputText>
        <br />
        <InputText
          class="cidade"
          label="Cidade"
          placeholder="São Paulo"
        ></InputText>
        <br />
        <Button text="Enviar"></Button>
      </form>
      <ToastContainer />
    </>
  );
};

export default CreateAccEstableshimentStepThree;
