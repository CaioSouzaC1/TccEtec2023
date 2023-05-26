import { ToastContainer } from "react-toastify";
import Button from "../../Components/Button/Button";
import InputText from "../../Components/InputText";
import selectValue from "../../Utils/MyFunctions/selectValue";
import errorFy from "../../Utils/Toastify/errorFy";
import styles from "./login.module.css";
import successFy from "../../Utils/Toastify/successFy";
import { Link, useLocation, useNavigate } from "react-router-dom";
import infoFy from "../../Utils/Toastify/infoFy";
import { useEffect, useRef } from "react";
import ButtonBack from "../../Components/ButtonBack";
import { Buffer } from "buffer";
import { API_URL } from "../../Utils/Admin";

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const stateRef = useRef(null);

  useEffect(() => {
    if (state && state.isAuth === false) {
      if (stateRef.current === null) {
        stateRef.current = true;
        errorFy("Você precisa estar logado para acessar essa página");
        setTimeout(() => {
          infoFy("Efetue o login");
        }, 500);
      }
    }
  }, []);

  const sendForm = async (e) => {
    e.preventDefault();

    try {
      let login = await fetch(`${API_URL}/login`, {
        headers: new Headers({
          Authorization: `Basic ${Buffer.from(
            `${selectValue(".keyLogin")}:${selectValue(".passLogin")}`
          ).toString("base64")}`,
        }),
      });

      if (login.status === 401) {
        throw new Error(401);
      } else if (login.status === 200) {
        successFy("Bem vindo!", 1100);
        login = await login.json();
        sessionStorage.setItem("VoiceJwt", login.token);
        setTimeout(() => {
          navigate("/feed");
        }, 2000);
      }
    } catch (err) {
      // console.log(err);
      if (err == "Error: 401") {
        errorFy("Email ou senha inválidos");
      } else {
        errorFy("Erro na Aplicação, tente mais tarde...");
      }
    }
  };

  return (
    <>
      <div className="fix-height">
        <section className="text-center">
          <h1 className="text-3xl font-bold mb-8 md:mb-12 mt-4">
            Feliz em te ver novamente!
          </h1>
          <div className="flex flex-wrap text-center flex-col-reverse md:flex-row">
            <div className="w-full md:w-1/2 flex flex-wrap justify-center my-8 md:my-0">
              <img
                className="max-h-[10em] md:max-h-[20em] person"
                src="/Peeps/amanda_sentado.svg"
                alt="Amanda Sentada"
              />
              <img
                className="max-h-[10em] md:max-h-[20em] person"
                src="/Peeps/pedro_sentado.svg"
                alt="Pedro Sentado"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col">
              <form
                className="Form w-full md:w-4/5 mx-auto bg-s-gray p-4 rounded-2xl h-full flex flex-col justify-around"
                onSubmit={sendForm}
              >
                <legend className="font-bold text-left text-lg mb-4">
                  Login
                </legend>
                <InputText
                  class="keyLogin"
                  label="Email"
                  placeholder="Email"
                ></InputText>
                <br />

                <InputText
                  class="passLogin"
                  label="Senha"
                  placeholder="Senha"
                  type="password"
                  min="8"
                ></InputText>
                <br />
                <Button text="Entrar"></Button>
              </form>
            </div>
          </div>
          <div className="w-full flex flex-wrap my-4 flex-col-reverse md:flex-row">
            <div className="w-full md:w-1/2 text-center flex items-center justify-center mt-4 md:mt-0">
              <ButtonBack />
            </div>
            <div className="w-full md:w-1/2 mb-4 md:my-0">
              <div className="flex items-center justify-center mt-2 flex-col">
                <Link to={"../cadastra/"}>
                  <h2 className="text-md font-semibold">
                    Ainda não tem conta?
                  </h2>
                </Link>
                <Link to={"../cadastra/"}>
                  <Button text="Criar conta"></Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer />
      </div>
    </>
  );
};
export default Login;
