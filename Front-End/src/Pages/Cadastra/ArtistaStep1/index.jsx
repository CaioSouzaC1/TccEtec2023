import Button from "../../../Components/Button/Button";
import InputText from "../../../Components/InputText";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import selectValue from "../../../Utils/MyFunctions/selectValue";
import setValueNull from "../../../Utils/MyFunctions/setValueNull";
import errorFy from "../../../Utils/Toastify/errorFy";
import warnFy from "../../../Utils/Toastify/warnFy";
import ButtonBack from "../../../Components/ButtonBack";
import { API_URL } from "../../../Utils/Admin";
import { Envelope, Key, UserCircle, UserCirclePlus } from "phosphor-react";
import Stepper from "../../../Components/Stepper";

const CreateAccArtistaStepOne = () => {
  const [emailsRows, setEmailsRows] = useState(false);

  const emailValidation = async (event) => {
    event.preventDefault();
    const email = selectValue(".Email");
    try {
      const emailRows = await (
        await fetch(`${API_URL}/validateEmail`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        })
      ).json();
      setEmailsRows(emailRows.emails);
    } catch (err) {
      errorFy("Erro na Requisição!");
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    const PassEquals = selectValue(".Senha") === selectValue(".ConfirmaSenha");
    if (!PassEquals) {
      errorFy("As Senhas não coincidem");
      setValueNull(".Senha");
      setValueNull(".ConfirmaSenha");
      setEmailsRows(false);
    }
    if (emailsRows === 0 && PassEquals) {
      navigate("/cadastra/artista/etapa/2", {
        state: {
          email: selectValue(".Email"),
          pass: selectValue(".Senha"),
        },
      });
    }
    if (emailsRows === 1) {
      setValueNull(".Email");
      warnFy("Email Já cadastrado");
      setEmailsRows(false);
    }
  }, [emailsRows]);

  return (
    <>
      <div className="fix-height">
        <section className="flex flex-wrap mt-8">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-black md:pr-8 my-4">
              Descubra um mundo de oportunidades musicais ao criar sua conta
              conosco.
            </h1>
            <h2 className="font-regular text-xl mb-8 md:pr-8">
              Conecte-se com donos de estabelecimentos de entretenimento, agende
              shows e eventos, amplie sua visibilidade e alcance novos fãs.
              Nossa plataforma oferece as ferramentas necessárias para
              impulsionar sua carreira artística e expandir suas conexões no
              mundo da música.
            </h2>
          </div>

          <form
            className="Form items-center w-full md:w-1/2"
            onSubmit={emailValidation}
          >
            <div className="flex flex-wrap w-full justify-center gap-12">
              <Stepper
                icon={<UserCircle size={24} weight="bold" />}
                text="Etapa 1"
                on={true}
              />

              <Stepper
                icon={<UserCirclePlus size={24} weight="bold" />}
                text="Etapa 2"
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
            <Button full={true} text="Já possuo conta!"></Button>
          </Link>
          <ButtonBack />
        </div>
      </div>
    </>
  );
};
export default CreateAccArtistaStepOne;
