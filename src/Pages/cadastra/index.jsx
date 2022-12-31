import styles from "./cadastra.module.css";
import Text from "../../Components/text";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";

const Cadastra = () => {
  return (
    <>
      <h1>Opções de Cadastro</h1>
      <Link to={"../cadastra/artista/etapa/1"}>
        <Button text="Artista"></Button>
      </Link>
      <br />
      <Link to={"../cadastra/estabelecimento/etapa/1"}>
        <Button text="Estabelecimento"></Button>
      </Link>
    </>
  );
};

export default Cadastra;
