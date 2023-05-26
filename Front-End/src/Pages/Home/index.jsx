import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";

const Home = () => {
  return (
    <section className="fix-height">
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

          <div className="w-full lg:w-2/3 mx-auto flex flex-wrap">
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
          <div className="w-full lg:w-1/3 mx-auto py-4 text-center">
            <h4 className="font-bold text-lg">
              Por que escolher nossa plataforma?
            </h4>
            <p className="font-light text-sm mt-4 px-4">
              Você é um artista ou dono de estabelecimento de entretenimento?
              Sabemos que pode ser difícil encontrar novas oportunidades para
              shows e eventos. É por isso que criamos uma plataforma que permite
              conectar artistas e estabelecimentos de todo o país. Com apenas
              alguns cliques, você pode ampliar sua rede de contatos, descobrir
              novas oportunidades e expandir sua carreira.
            </p>

            <p className="font-light text-sm mt-4 px-4">
              Além disso, nossa plataforma é segura e eficiente, garantindo uma
              experiência positiva para todos os usuários. Junte-se a nós e faça
              parte da comunidade de artistas e estabelecimentos de
              entretenimento mais vibrante do país!.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;
