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
import ButtonAdvance from "../../../Components/ButtonAdvance";
import { Note, User, UserFocus, WhatsappLogo } from "phosphor-react";
import { API_URL } from "../../../Utils/Admin";

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
      <ThePageText text="Artista Etapa 2" />

      <div className="flex justify-center gap-3">
        <div className="w-24 h-1 bg-[#ededed] rounded-lg"></div>
        <div className="w-24 h-1 bg-red-600  rounded-lg"></div>
      </div>

      <form className="Form mt-10 items-center" onSubmit={sendForm}>
        <div className="flex justify-center items-center">
          <User size={30} className="mb-4 text-red-600" />
          <InputText
            class="Nome"
            label="Nome"
            placeholder="Seu nome"
          ></InputText>
        </div>
        <div className="flex justify-center items-center">
          <UserFocus size={30} className="mb-4 text-red-600" />
          <InputText
            class="NomeArtistico"
            label="Nome Artistico"
            placeholder="Seu Nome Artistico"
          ></InputText>
        </div>
        <div className="flex justify-center items-center">
          <WhatsappLogo size={30} className="mb-4 text-red-600" />
          <InputText
            class="cpf"
            label="CPF"
            placeholder="Seu CPF"
            min="11"
          ></InputText>
        </div>
        <div className="flex justify-center items-center">
          <Note size={30} className="mb-4 text-red-600" />
          <InputText
            class="whatsApp"
            label="WhatsApp"
            placeholder="Seu whatsApp"
            min="10"
          ></InputText>
        </div>
        <div className="flex flex-col items-center">
          <ButtonAdvance text="Enviar"></ButtonAdvance>
        </div>
        <ToastContainer />
      </form>
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
