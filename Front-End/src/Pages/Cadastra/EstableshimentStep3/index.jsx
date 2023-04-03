import { Link, useLocation, useNavigate } from "react-router-dom";
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
import {
  MapPin,
  MapPinLine,
  MapTrifold,
  Signpost,
  TagChevron,
} from "phosphor-react";
import { API_URL } from "../../../Utils/Admin";

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
          `${API_URL}/createAccEstableshiment`,
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
      <div className="flex justify-center gap-3">
        <div className="w-24 h-1 bg-[#ededed] rounded-lg"></div>
        <div className="w-24 h-1 bg-[#ededed] rounded-lg"></div>
        <div className="w-24 h-1 bg-red-600 rounded-lg"></div>
      </div>

      <form className="Form mt-10 items-center" onSubmit={sendForm}>
        <div className="flex gap-3">
          <div className="w-60 flex justify-center items-center">
            <MapPin size={30} className="mb-4 text-red-600" />
            <InputText
              class="Cep"
              label="CEP"
              min="8"
              placeholder="00000-000"
            ></InputText>
          </div>
          <div className="w-32 flex justify-center items-center">
            <TagChevron size={30} className="mb-4 text-red-600" />
            <InputText
              class="numero"
              label="Número"
              placeholder="178"
            ></InputText>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Signpost size={30} className="mb-4 text-red-600" />
          <InputText
            class="rua"
            label="Logradouro"
            placeholder="Rua Getúlio Vargas"
          ></InputText>
        </div>
        <div className="flex justify-center items-center">
          <MapPinLine size={30} className="mb-4 text-red-600" />
          <InputText
            class="bairro"
            label="Bairro"
            placeholder="Jardim Paraiso"
          ></InputText>
        </div>
        <div className="flex justify-center items-center">
          <MapTrifold size={30} className="mb-4 text-red-600" />
          <InputText
            class="cidade"
            label="Cidade"
            placeholder="São Paulo"
          ></InputText>
        </div>
        <div className="flex flex-col items-center">
          <Button text="Enviar"></Button>
        </div>
        <ToastContainer />
      </form>
      <div className="flex justify-center gap-2">
        <Link to={"../login"}>
          <Button text="Já tenho conta!"></Button>
        </Link>
        <ButtonBack />
      </div>
    </>
  );
};

export default CreateAccEstableshimentStepThree;
