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
              <div className="w-full md:w-3/4">
                <h2 className="my-4 font-bold text-3xl text-center md:text-left pr-0 md:pr-2">
                  Conecte-se com artistas e donos de estabelecimentos de
                  entretenimento em todo o país.
                </h2>
                <h2 className="my-4 font-bold text-xl text-center md:text-left pr-0 md:pr-2">
                  Encontre novas oportunidades de shows e eventos.
                </h2>
              </div>
              <div className="w-full md:w-1/4">
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
              <div className="w-full md:w-3/4">
                <h2 className="my-4 font-bold text-3xl text-center md:text-left pr-0 md:pl-2">
                  Uma plataforma segura e eficiente para artistas e donos de
                  estabelecimentos de entretenimento.
                </h2>
                <h2 className="my-4 font-bold text-xl text-center md:text-left pr-0 md:pl-2">
                  Crie um perfil para mostrar seu trabalho e suas habilidades.
                </h2>
              </div>
              <div className="w-full md:w-1/4">
                <img
                  src="/Peeps/vinicius_perfil.svg"
                  className="person mx-auto"
                  alt="Usuário da plataforma Voice."
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col-reverse md:flex-row flex-wrap bg-s-black rounded-lg p-4 mt-4 justify-center items-center">
              <div className="w-full md:w-1/4 block">
                <img
                  src="/Peeps/bia_perfil.svg"
                  className="person mx-auto"
                  alt="Usuário da plataforma Voice."
                />
              </div>
              <div className="w-full md:w-3/4">
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
              <div className="w-full md:w-1/4 hidden md:block">
                <img
                  src="/Peeps/pedro_perfil.svg"
                  className="person mx-auto"
                  alt="Usuário da plataforma Voice."
                />
              </div>
              <div className="w-full md:w-2/4">
                <h2 className="my-4 font-bold text-3xl text-center pr-0 md:pl-2 md:pr-2">
                  Interaja com outros usuários no chat.
                </h2>
                <h2 className="my-4 font-bold text-xl text-center pr-0 md:pl-2 md:pr-2">
                  Marque, agende e cancele eventos de forma simples e rápida.
                </h2>
              </div>
              <div className="w-full md:w-1/4">
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
      <section className="my-4">
        <div className="flex flex-wrap justify-center">
          <h2 className="font-bold w-full mt-4 mb-6 text-2xl text-center">
            Como acesso a plataforma?
          </h2>

          <div className="w-full md:w-2/3 mx-auto flex flex-wrap">
            <Link className="w-full md:w-1/2" to={"/login"}>
              <div
                className={`p-4 my-4 mx-auto ${styles.card} bg-s-black hover:brightness-125 rounded-3xl`}
              >
                <h3 className="font-light text-xl text-center mb-4">
                  Já tenho uma conta!
                </h3>
                <img
                  className="mx-auto person"
                  src="/Peeps/amanda_perfil.svg"
                  alt="Usuário plataforma Voice, com conta."
                />
                <h4 className="font-light text-md py-4 text-center uppercase">
                  Fazer login
                </h4>
              </div>
            </Link>
            <Link className="w-full md:w-1/2" to={"/cadastra"}>
              <div
                className={`p-4 my-4 mx-auto ${styles.card} bg-s-black hover:brightness-125 rounded-3xl`}
              >
                <h3 className="font-light text-xl text-center mb-4">
                  Ainda não tenho conta.
                </h3>
                <img
                  className="mx-auto person"
                  src="/Peeps/leticia_perfil.svg"
                  alt="Usuário plataforma Voice, com conta."
                />
                <h4 className="font-light text-md py-4 text-center uppercase">
                  Criar acesso
                </h4>
              </div>
            </Link>
          </div>
          <div className="w-full md:w-1/3 mx-auto py-4 text-center">
            <h4 className="font-bold text-lg">Texto de Apoio</h4>
            <p className="font-light text-sm mt-4 px-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              bibendum tincidunt convallis. Mauris consequat, lacus ac posuere
              hendrerit, quam orci hendrerit dolor, a gravida risus sapien vel
              massa. Integer mollis, lacus vitae dignissim ullamcorper, sapien
              mauris auctor quam, sed consectetur nunc justo in nisi.
            </p>
            <p className="font-light text-sm mt-4 px-4">
              lacus ac posuere hendrerit, quam orci hendrerit dolor, a gravida
              risus sapien vel massa. Integer mollis, lacus vitae dignissim
              ullamcorper, sapien mauris auctor quam, sed consectetur nunc justo
              in nisi.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;
