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
import ThePageText from "../../Components/ThePageText";
import { Buffer } from "buffer";

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
      let login = await fetch("http://127.0.0.1:3333/login", {
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
      if (err == "Error: 401") {
        errorFy("Email ou senha inválidos");
      } else {
        errorFy("Erro na Aplicação, tente mais tarde...");
      }
    }
  };

  return (
    <>
      <ThePageText text="Login" />
      <form className="Form" onSubmit={sendForm}>
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
        <Button text="Logar"></Button>
      </form>
      <ToastContainer />
      <Link to={"../cadastra/"}>
        <Button text="Criar conta"></Button>
      </Link>
      <br />
      <ButtonBack />
    </>
  );
};
export default Login;
