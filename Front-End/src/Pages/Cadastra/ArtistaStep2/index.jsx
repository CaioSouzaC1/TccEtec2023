import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

import Button from "../../../Components/Button/Button";
import InputText from "../../../Components/InputText";
import selectValue from "../../../Utils/MyFunctions/selectValue";
import successFy from "../../../Utils/Toastify/successFy";
import errorFy from "../../../Utils/Toastify/errorFy";
import warnFy from "../../../Utils/Toastify/warnFy";
import putImask from "../../../Utils/MyFunctions/putImask";
import cpfValidate from "../../../Utils/MyFunctions/cpfValidate";
import setValueNull from "../../../Utils/MyFunctions/setValueNull";
import ButtonBack from "../../../Components/ButtonBack";
import arrayReplace from "../../../Utils/MyFunctions/arrayReplace";
import ThePageText from "../../../Components/ThePageText";
import {
  Note,
  User,
  UserCircle,
  UserCirclePlus,
  UserFocus,
  WhatsappLogo,
} from "phosphor-react";
import { API_URL } from "../../../Utils/Admin";
import Stepper from "../../../Components/Stepper";
import InputCheckbox from "../../../Components/InputCheckbox";

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

    whatsApp = arrayReplace(["-", "(", ")", " "], "", whatsApp);
    cpf = arrayReplace(["-", ".", "."], "", cpf);
    if (!cpfValid) {
      errorFy("Este Cpf não é válido...");
      setValueNull(".cpf");
    } else if (state != null) {
      try {
        let createArt = await fetch(`${API_URL}/createAcc`, {
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
        const resCreateArt = await createArt.json();
        if (createArt.status === 200) {
          successFy("Conta Criada! Redirecionando... ", 2100);
          sessionStorage.setItem("VoiceJwt", resCreateArt);
          setTimeout(() => {
            navigate("/feed");
          }, 3000);
        } else {
          errorFy("Tivemos um erro ao criar sua conta");
        }
      } catch (err) {
        console.log(err);
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
      <section className="flex flex-wrap mt-8">
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-black md:pr-8 mb-4">
            Não perca tempo, junte-se a nós e desbloqueie seu potencial
            artístico hoje mesmo!
          </h1>
          <h2 className="font-regular text-xl mb-8 md:pr-8">
            Maximize seu potencial como artista ao criar uma conta em nossa
            plataforma. Aqui, você terá acesso a uma ampla rede de donos de
            estabelecimentos de entretenimento em todo o país, prontos para
            descobrir novos talentos. Através da nossa plataforma, você poderá
            marcar shows e eventos, expandir sua base de fãs e obter maior
            visibilidade no cenário do entretenimento.
          </h2>
        </div>
        <form className="Form items-center w-full md:w-1/2" onSubmit={sendForm}>
          <div className="flex flex-wrap w-full justify-center gap-12">
            <Stepper
              icon={<UserCircle size={24} weight="bold" />}
              text="Etapa 1"
            />

            <Stepper
              icon={<UserCirclePlus size={24} weight="bold" />}
              text="Etapa 2"
              on={true}
            />
          </div>
          <div className="flex justify-center items-center">
            <User
              size={22}
              weight="bold"
              className="text-white mb-4 ml-2 mr-4"
            />
            <InputText
              class="Nome"
              label="Nome"
              placeholder="Seu nome"
            ></InputText>
          </div>
          <div className="flex justify-center items-center">
            <UserFocus
              size={22}
              weight="bold"
              className="text-white mb-4 ml-2 mr-4"
            />
            <InputText
              class="NomeArtistico"
              label="Nome Artistico"
              placeholder="Seu Nome Artistico"
            ></InputText>
          </div>
          <div className="flex justify-center items-center">
            <Note
              size={22}
              weight="bold"
              className="text-white mb-4 ml-2 mr-4"
            />
            <InputText
              class="cpf"
              label="CPF"
              placeholder="Seu CPF"
              min="11"
            ></InputText>
          </div>
          <div className="flex justify-center items-center">
            <WhatsappLogo
              size={22}
              weight="bold"
              className="text-white mb-4 ml-2 mr-4"
            />
            <InputText
              class="whatsApp"
              label="WhatsApp"
              placeholder="Seu whatsApp"
              min="10"
            ></InputText>
          </div>
          <div className="flex items-center justify-center">
            <InputCheckbox required={true} />
            <p className="text-sm pl-4">
              Eu concordo com os{" "}
              <a
                className="font-bold"
                href="/termos-de-uso"
                target="_blank"
                rel="noopener noreferrer"
              >
                termos de uso
              </a>
              .
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Button text="Enviar"></Button>
          </div>
          <ToastContainer />
        </form>
      </section>

      <div className="flex justify-center gap-2">
        <Link to={"../login"}>
          <Button text="Já possuo conta!"></Button>
        </Link>
        <ButtonBack />
      </div>
    </>
  );
};
export default CreateAccArtistaStepTwo;
