import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import InputText from "../../../Components/InputText";
import Button from "../../../Components/Button/Button";
import selectValue from "../../../Utils/MyFunctions/selectValue";
import setValueNull from "../../../Utils/MyFunctions/setValueNull";
import errorFy from "../../../Utils/Toastify/errorFy";
import warnFy from "../../../Utils/Toastify/warnFy";
import ButtonBack from "../../../Components/ButtonBack";
import ThePageText from "../../../Components/ThePageText";
import {
  Envelope,
  GlobeHemisphereWest,
  Key,
  UserCircle,
  UserCirclePlus,
} from "phosphor-react";
import { API_URL } from "../../../Utils/Admin";
import Stepper from "../../../Components/Stepper";

const CreateAccEstableshimentStepOne = () => {
  const [emailState, SetEmailState] = useState(false);
  const navigate = useNavigate();

  const validateEmail = async (e) => {
    e.preventDefault();
    const email = selectValue(".Email");
    try {
      let emailRow = await fetch(`${API_URL}/validateEmailEstableshiment`, {
        headers: new Headers({
          Authorization: `Basic ${Buffer.from(`${email}`).toString("base64")}`,
        }),
      });
      if (emailRow.status == 200) {
        emailRow = await emailRow.json();
        SetEmailState(emailRow.emails);
      } else {
        errorFy("Error validating email");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const PassEquals = selectValue(".Senha") === selectValue(".ConfirmaSenha");
    if (!PassEquals) {
      errorFy("As Senhas não coincidem");
      setValueNull(".Senha");
      setValueNull(".ConfirmaSenha");
      SetEmailState(false);
    }

    if (emailState > 0) {
      warnFy("Email já cadastrado");
      setValueNull(".Email");
      SetEmailState(false);
    }

    if (PassEquals && emailState === 0) {
      navigate("/cadastra/estabelecimento/etapa/2", {
        state: {
          email: selectValue(".Email"),
          pass: selectValue(".Senha"),
        },
      });
    }
  }, [emailState]);

  return (
    <>
      <div className="fix-height">
        <section className="flex flex-wrap mt-8">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-black md:pr-8 my-4">
              Descubra artistas de diferentes estilos, prontos para encantar o
              público em seu estabelecimento.
            </h1>
            <h2 className="font-regular text-xl mb-8 md:pr-8">
              Abra as portas para uma variedade de talentos musicais ao criar
              uma conta em nossa plataforma. Encontre a combinação perfeita para
              os eventos que você planeja e ofereça experiências musicais únicas
              aos seus clientes.
            </h2>
          </div>

          <form
            className="Form items-center w-full md:w-1/2"
            onSubmit={validateEmail}
          >
            <div className="flex flex-wrap w-full justify-center gap-12">
              <Stepper
                icon={<UserCircle size={24} weight="bold" />}
                text="Etapa 1"
                on={true}
              />
              <Stepper
                icon={<GlobeHemisphereWest size={24} weight="bold" />}
                text="Etapa 2"
              />
              <Stepper
                icon={<UserCirclePlus size={24} weight="bold" />}
                text="Etapa 3"
              />
            </div>
            <div className="flex justify-center items-center">
              <Envelope
                size={22}
                weight="bold"
                className="text-white mb-4 ml-2 mr-4"
              />
              <InputText
                type="email"
                class="Email"
                label="Email"
                placeholder="Seu Email"
              ></InputText>
            </div>
            <div className="flex justify-center items-center">
              <Key
                size={22}
                weight="bold"
                className="text-white mb-4 ml-2 mr-4"
              />
              <InputText
                type="password"
                class="Senha"
                label="Senha"
                placeholder="Sua Senha"
                min="8"
                max="24"
              ></InputText>
            </div>
            <div className="flex justify-center items-center">
              <Key
                size={22}
                weight="bold"
                className="text-white mb-4 ml-2 mr-4"
              />
              <InputText
                type="password"
                class="ConfirmaSenha"
                label="Confirma Senha"
                placeholder="Confirme sua senha"
                min="8"
                max="24"
              ></InputText>
            </div>
            <div
              style={{ width: `calc(100% - ${42}px)` }}
              className="flex flex-col items-center ml-auto"
            >
              <Button full={true} text="Avançar"></Button>
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

export default CreateAccEstableshimentStepOne;
