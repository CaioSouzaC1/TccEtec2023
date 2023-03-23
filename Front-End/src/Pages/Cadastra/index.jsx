import { Link } from "react-router-dom";
import ButtonCadastra from "../../Components/ButtonCadastra";
import { Buildings, Confetti } from "phosphor-react";

const Cadastra = () => {
  return (
    <>
      <section className="flex flex-wrap mt-4">
        <h1 className="font-bold text-3xl mb-4 w-full text-center">
          Como você deseja se cadastrar?
        </h1>
        <div className="w-full md:w-1/2 text-center">
          <img
            className="max-h-[20em] person transition-all hover:pl-16 mx-auto pl-8 mt-4 hidden md:block"
            src="/Peeps/bia-sentado.svg"
            alt="Como você deseja se cadastrar"
          />
        </div>
        <div className="w-full md:w-1/2 mt-4 flex flex-col justify-center items-center">
          <Link className="w-full" to={"../cadastra/artista/etapa/1"}>
            <ButtonCadastra text="Artista" icon={<Confetti size={50} />} />
          </Link>

          <Link className="w-full" to={"../cadastra/estabelecimento/etapa/1"}>
            <ButtonCadastra
              text="Estabelecimento"
              icon={<Buildings size={50} />}
            />
          </Link>
        </div>
        {/* <ThePageText text="Desejo me cadastrar como:" />

      <div className="mt-20 flex flex-col items-center gap-3 justify-center">
 
        
        <ButtonBack />
      </div> */}
      </section>
    </>
  );
};

export default Cadastra;
