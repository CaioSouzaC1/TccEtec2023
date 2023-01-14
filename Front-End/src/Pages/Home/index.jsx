import styles from "./home.module.css";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import ThePageText from "../../Components/ThePageText";

const Home = () => {
  return (
    <>
      <ThePageText text="Home Page"></ThePageText>
      <Link to={"cadastra"}>
        <Button text="Criar conta"></Button>
      </Link>
      <br />
      <Link to={"/login"}>
        <Button text="Login"></Button>
      </Link>
    </>
  );
};

export default Home;
