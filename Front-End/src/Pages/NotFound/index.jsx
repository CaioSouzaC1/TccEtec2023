import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import ButtonBack from "../../Components/ButtonBack";

const NotFound = () => {
  return (
    <section className="min-h-70-screen my-auto">
      <div className="flex flex-wrap flex-col-reverse md:flex-row justify-center my-4">
        <div className="w-full md:w-1/2 my-4 flex justify-center">
          <img
            className="max-h-[10em] md:max-h-[20em] person ml-0 hover:ml-8 transition-all"
            src="/Peeps/pedro_404.svg"
            alt="Pedro Surpreso"
          />
        </div>
        <div className="flex flex-col items-center justify-evenly w-full md:w-1/2">
          <h1 className="font-extrabold text-8xl mb-4">404</h1>
          <h2 className="font-semibold text-lg text-center w-full md:w-4/5 mb-0">
            <span className="text-3xl">Oops!</span> Parece que você se perdeu.
            Que tal voltar à página inicial e tentar novamente?
          </h2>
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-center md:justify-end">
        <div className="text-center ml-0 w-full md:w-1/2 my-2 md:my-0">
          <Link className="" to={"/"}>
            <Button text=" Ir para a Home" />
          </Link>
        </div>
        <div className="w-full text-center md:w-1/2 my-2 md:my-0">
          <ButtonBack />
        </div>
      </div>
    </section>
  );
};
export default NotFound;
