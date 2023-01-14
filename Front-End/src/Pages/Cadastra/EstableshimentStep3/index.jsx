import { useLocation, useNavigate } from "react-router-dom";
import InputText from "../../../Components/InputText";
import { ToastContainer } from "react-toastify";
import Button from "../../../Components/Button/Button";
import { useEffect } from "react";
import selectInput from "../../../Utils/MyFunctions/selectInput";
import selectValue from "../../../Utils/MyFunctions/selectValue";
import putImask from "../../../Utils/MyFunctions/putImask";
import errorFy from "../../../Utils/Toastify/errorFy";
import ButtonBack from "../../../Components/ButtonBack";
import successFy from "../../../Utils/Toastify/successFy";
import ThePageText from "../../../Components/ThePageText";

const CreateAccEstableshimentStepThree = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

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

  const sendForm = async (e) => {
    e.preventDefault();
    if (state == null) {
      warnFy("Você está pulando uma etapa");
      setTimeout(() => {
        navigate("/cadastra/estabelecimento/etapa/1");
      }, 3000);
    } else {
      try {
        let createAccEstableshiment = await fetch(
          "http://127.0.0.1:3333/createAccEstableshiment",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: state.email,
              pass: state.pass,
              nomeResponsavel: state.nomeResponsavel,
              cnpj: state.Cnpj,
              whatsApp: state.whatsApp,
              name: state.nomeEstabelecimento,
              cep: selectValue(".Cep"),
              numEnd: selectValue(".numero"),
              logradouro: selectValue(".rua"),
              bairro: selectValue(".bairro"),
              cidade: selectValue(".cidade"),
            }),
          }
        );
        if (createAccEstableshiment.status === 200) {
          successFy("Conta Criada! Redirecionando... ", 2100);
          createAccEstableshiment = await createAccEstableshiment.json();
          sessionStorage.setItem("VoiceJwt", createAccEstableshiment);
          setTimeout(() => {
            navigate("/feed");
          }, 3000);
        }
      } catch (err) {
        errorFy(err);
      }
    }
  };
  return (
    <>
      <ThePageText text="Estabelecimento Etapa 3" />
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
          label="Logradouro"
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
      <ButtonBack />
    </>
  );
};

export default CreateAccEstableshimentStepThree;
