import { Link } from "react-router-dom";

import Button from "../../Components/Button/Button";
import ButtonBack from "../../Components/ButtonBack";
import ThePageText from "../../Components/ThePageText";

const Cadastra = () => {
  return (
    <>
      <ThePageText text="Opções de Cadastro" />
      <Link to={"../cadastra/artista/etapa/1"}>
        <Button text="Artista"></Button>
      </Link>
      <br />
      <Link to={"../cadastra/estabelecimento/etapa/1"}>
        <Button text="Estabelecimento"></Button>
      </Link>
      <br />
      <ButtonBack />
    </>
  );
};

export default Cadastra;
