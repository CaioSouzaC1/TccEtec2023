import { ToastContainer } from "react-toastify";
import Button from "../../Components/Button/Button";
import InputText from "../../Components/InputText";
import selectValue from "../../utils/selectValue";
import errorFy from "../../utils/toastify/errorFy";
import styles from "./login.module.css";
import successFy from "../../utils/toastify/successFy";

const Login = () => {
  const sendForm = async (e) => {
    e.preventDefault();

    try {
      const login = await (
        await fetch("http://127.0.0.1:3333/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: selectValue(".keyLogin"),
            pass: selectValue(".passLogin"),
          }),
        })
      ).json();
      console.log(login.userData);
      if (login.userData == null) {
        errorFy("Email ou senha inválidos");
      } else {
        successFy("Bem vindo!");
      }
    } catch (err) {
      console.log(err);
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
    </>
  );
};
export default Login;
