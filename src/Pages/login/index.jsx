import { ToastContainer } from "react-toastify";
import Button from "../../Components/Button/Button";
import InputText from "../../Components/InputText";
import selectValue from "../../utils/selectValue";
import errorFy from "../../utils/toastify/errorFy";
import styles from "./login.module.css";
import successFy from "../../utils/toastify/successFy";
import { Link, useLocation, useNavigate } from "react-router-dom";
import infoFy from "../../utils/toastify/infoFy";

const Login = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  //Todo, state renderizando 4x
  if (state.isAuth === false) {
    errorFy("Você precisa estar logado para acessar essa página");
    setTimeout(() => {
      infoFy("Efetue o login");
    }, 500);
  }

  const sendForm = async (e) => {
    e.preventDefault();

    try {
      let login = await fetch("http://127.0.0.1:3333/login", {
        headers: new Headers({
          Authorization: `Basic ${btoa(
            `${selectValue(".keyLogin")}:${selectValue(".passLogin")}`
          )}`,
        }),
      });

      if (login.status === 401) {
        throw new Error(401);
      } else if (login.status === 200) {
        successFy("Bem vindo!", 2500);
        login = await login.json();
        sessionStorage.setItem("VoiceJwt", login.token);
        sessionStorage.setItem("VoiceName", login.userData.name);
        setTimeout(() => {
          navigate("/estabelecimentos/ultimos");
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
      <h1>Login</h1>
      <form className="Form" onSubmit={sendForm}>
        <InputText
          class="keyLogin"
          label="Email ou WhatsApp"
          placeholder="Email ou WhatsApp"
        ></InputText>
        <br />

        <InputText
          class="passLogin"
          label="Senha"
          placeholder="Senha"
          min="8"
        ></InputText>
        <br />
        <Button text="Logar"></Button>

        <ToastContainer />
      </form>

      <Link to={"../cadastra/artista/etapa/1"}>
        <Button text="Criar conta"></Button>
      </Link>
    </>
  );
};
export default Login;
