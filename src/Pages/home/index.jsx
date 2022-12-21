import styles from "./home.module.css";
import Text from "../../Components/text";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";

const Home = () => {
  return (
    <>
      <Text size={25} text="Home Page"></Text>
      <Link to={"cadastra/artista/etapa/1"}>
        <Button text="Criar Artista"></Button>
      </Link>
      <br />
      <Link to={"/login"}>
        <Button text="Login"></Button>
      </Link>
    </>
  );
};

export default Home;
