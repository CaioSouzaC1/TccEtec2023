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
  GlobeHemisphereWest,
  MapPin,
  MapPinLine,
  MapTrifold,
  NumberCircleTwo,
  Signpost,
  TagChevron,
  UserCircle,
  UserCirclePlus,
} from "phosphor-react";
import { API_URL } from "../../../Utils/Admin";
import Stepper from "../../../Components/Stepper";

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

        if (cepData.erro == true) {
          errorFy("Cep Inválido");
          return;
        }

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
      <div className="fix-height">
        <section className="flex flex-wrap mt-8">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-black md:pr-8 my-4">
              Amplie sua rede de contatos no mundo do entretenimento ao criar
              uma conta conosco.
            </h1>
            <h2 className="font-regular text-xl mb-8 md:pr-8">
              Conecte-se com artistas talentosos, promotores de eventos e outros
              donos de estabelecimentos. Expanda suas possibilidades de
              parcerias e colaborações, e esteja sempre atualizado sobre as
              tendências e novidades do setor. Aproveite essa oportunidade para
              fortalecer sua presença e tornar seu estabelecimento um destino
              musical imperdível.
            </h2>
          </div>

          <form
            className="Form items-center w-full md:w-1/2"
            onSubmit={sendForm}
          >
            <div className="flex flex-wrap w-full justify-center gap-12">
              <Stepper
                icon={<UserCircle size={24} weight="bold" />}
                text="Etapa 1"
              />
              <Stepper
                icon={<GlobeHemisphereWest size={24} weight="bold" />}
                text="Etapa 2"
              />
              <Stepper
                icon={<UserCirclePlus size={24} weight="bold" />}
                text="Etapa 3"
                on={true}
              />
            </div>
            <div className="flex gap-3">
              <div className="w-60 flex justify-center items-center">
                <MapPin
                  size={22}
                  weight="bold"
                  className="text-white mb-4 ml-2 mr-4"
                />
                <InputText
                  class="Cep"
                  label="CEP"
                  min="8"
                  placeholder="00000-000"
                ></InputText>
              </div>
              <div className="w-32 flex justify-center items-center">
                <NumberCircleTwo
                  size={22}
                  weight="bold"
                  className="text-white mb-4 ml-2 mr-4"
                />
                <InputText
                  class="numero"
                  label="Número"
                  placeholder="178"
                ></InputText>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Signpost
                size={22}
                weight="bold"
                className="text-white mb-4 ml-2 mr-4"
              />
              <InputText
                class="rua"
                label="Logradouro"
                placeholder="Rua Getúlio Vargas"
              ></InputText>
            </div>
            <div className="flex justify-center items-center">
              <MapPinLine
                size={22}
                weight="bold"
                className="text-white mb-4 ml-2 mr-4"
              />
              <InputText
                class="bairro"
                label="Bairro"
                placeholder="Jardim Paraiso"
              ></InputText>
            </div>
            <div className="flex justify-center items-center">
              <MapTrifold
                size={22}
                weight="bold"
                className="text-white mb-4 ml-2 mr-4"
              />
              <InputText
                class="cidade"
                label="Cidade"
                placeholder="São Paulo"
              ></InputText>
            </div>
            <div
              style={{ width: `calc(100% - ${42}px)` }}
              className="flex flex-col items-center ml-auto"
            >
              <Button full={true} text="Criar conta"></Button>
            </div>
            <ToastContainer />
          </form>
        </section>
        <div className="flex justify-center gap-8 my-4">
          <Link to={"../login"}>
            <Button text="Já possuo conta!"></Button>
          </Link>
          <ButtonBack />
        </div>
      </div>
    </>
  );
};

export default CreateAccEstableshimentStepThree;
