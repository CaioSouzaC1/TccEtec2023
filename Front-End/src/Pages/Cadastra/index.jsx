import { Link } from "react-router-dom";

import Button from "../../Components/Button/Button";
import ButtonBack from "../../Components/ButtonBack";
import ButtonCadArt from "../../Components/ButtonCadArt";
import ThePageText from "../../Components/ThePageText";
import ButtonCadEstab from "../../Components/ButtonCadEstab";

const Cadastra = () => {
  return (
    <>
    <div>
      <ThePageText text="Desejo me cadastrar como:" />

      <div className="mt-20 flex flex-col items-center gap-3 justify-center">
        <Link to={"../cadastra/artista/etapa/1"}>
        <ButtonCadArt />
        </Link>
        
        <Link to={"../cadastra/estabelecimento/etapa/1"}>
        <ButtonCadEstab text="Estabelecimento"></ButtonCadEstab>
        </Link>
        
        <ButtonBack />
      </div>
      
    </div>
    </>
  );
};

export default Cadastra;
