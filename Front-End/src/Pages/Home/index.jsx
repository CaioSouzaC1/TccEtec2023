import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import ThePageText from "../../Components/ThePageText";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";

const Home = () => {
  return (
    <section>
      <div className="mt-6">
        <Swiper
          pagination={{
            type: "progressbar",
          }}
          navigation={true}
          autoHeight={true}
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="homeSwiper"
        >
          <SwiperSlide>
            <div className="flex flex-row flex-wrap bg-s-black rounded-lg p-4 mt-4 justify-center items-center md:flex-row-reverse">
              <div className="w-1/1 md:w-3/4">
                <h2 className="my-4 font-bold text-3xl text-center md:text-left pr-0 md:pr-2">
                  Conecte-se com artistas e donos de estabelecimentos de
                  entretenimento em todo o país.
                </h2>
                <h2 className="my-4 font-bold text-xl text-center md:text-left pr-0 md:pr-2">
                  Encontre novas oportunidades de shows e eventos.
                </h2>
              </div>
              <div className="w-1/1 md:w-1/4">
                <img
                  src="/Peeps/pedro_perfil.svg"
                  className="person mx-auto"
                  alt="Usuário da plataforma Voice."
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-row flex-wrap bg-s-black rounded-lg p-4 mt-4 justify-center items-center">
              <div className="w-1/1 md:w-3/4">
                <h2 className="my-4 font-bold text-3xl text-center md:text-left pr-0 md:pl-2">
                  Uma plataforma segura e eficiente para artistas e donos de
                  estabelecimentos de entretenimento.
                </h2>
                <h2 className="my-4 font-bold text-xl text-center md:text-left pr-0 md:pl-2">
                  Crie um perfil para mostrar seu trabalho e suas habilidades.
                </h2>
              </div>
              <div className="w-1/1 md:w-1/4">
                <img
                  src="/Peeps/vinicius_perfil.svg"
                  className="person mx-auto"
                  alt="Usuário da plataforma Voice."
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-row flex-wrap bg-s-black rounded-lg p-4 mt-4 justify-center items-center">
              <div className="w-1/1 md:w-1/4 hidden md:block">
                <img
                  src="/Peeps/bia_perfil.svg"
                  className="person mx-auto"
                  alt="Usuário da plataforma Voice."
                />
              </div>
              <div className="w-1/1 md:w-3/4">
                <h2 className="my-4 font-bold text-3xl text-center md:text-left pr-0 md:pl-2 md:pr-2">
                  Descubra novos talentos e oportunidades de negócios.
                </h2>
                <h2 className="my-4 font-bold text-xl text-center md:text-left pr-0 md:pl-2 md:pr-2">
                  Conecte-se com a comunidade e expanda seu alcance.
                </h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-row flex-wrap bg-s-black rounded-lg p-4 mt-4 justify-center items-center">
              <div className="w-1/1 md:w-1/4 hidden md:block">
                <img
                  src="/Peeps/pedro_perfil.svg"
                  className="person mx-auto"
                  alt="Usuário da plataforma Voice."
                />
              </div>
              <div className="w-1/1 md:w-2/4">
                <h2 className="my-4 font-bold text-3xl text-center pr-0 md:pl-2 md:pr-2">
                  Interaja com outros usuários no chat.
                </h2>
                <h2 className="my-4 font-bold text-xl text-center pr-0 md:pl-2 md:pr-2">
                  Marque, agende e cancele eventos de forma simples e rápida.
                </h2>
              </div>
              <div className="w-1/1 md:w-1/4">
                <img
                  src="/Peeps/vinicius_perfil.svg"
                  className="person mx-auto"
                  alt="Usuário da plataforma Voice."
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <Link to={"cadastra"}>
        <Button text="Criar conta"></Button>
      </Link>
      <br />
      <Link to={"/login"}>
        <Button text="Login"></Button>
      </Link>
    </section>
  );
};

export default Home;
