import "swiper/css";
import "swiper/css/effect-cards";
import Rotater from "../../Components/Rotater";
import { Gear, Leaf, LockKey } from "phosphor-react";

const Objective = () => {
  return (
    <section className="flex flex-wrap min-h-70-screen">
      <h1 className=" w-full font-normal text-2xl p-4 text-center">
        Nosso objetivo é criar uma rede social para artistas e donos de
        estabelecimentos de entretenimento que seja:
      </h1>

      <ul className="w-full flex flex-wrap my-4">
        <li className="w-full md:w-1/3">
          <Rotater
            icon={<Leaf size={32} weight="bold" />}
            text="Fácil de usar"
          ></Rotater>
        </li>
        <li className="w-full md:w-1/3">
          <Rotater
            icon={<LockKey size={32} weight="bold" />}
            text="Segura"
          ></Rotater>
        </li>
        <li className="w-full md:w-1/3">
          <Rotater
            icon={<Gear size={32} weight="bold" />}
            text="Eficiente"
          ></Rotater>
        </li>
      </ul>

      <h2 className=" w-full font-light text-xl p-4 text-center">
        Queremos ajudar a conectar artistas com oportunidades de shows,
        festivais e eventos, enquanto também oferecemos aos proprietários de
        estabelecimentos de entretenimento uma maneira fácil de encontrar
        talentos e expandir sua rede de contatos. Esperamos ser uma plataforma
        útil para todos aqueles que trabalham no mundo dos eventos, tornando a
        vida dos artistas e empresários de entretenimento mais conectada.
      </h2>
    </section>
  );
};
export default Objective;
