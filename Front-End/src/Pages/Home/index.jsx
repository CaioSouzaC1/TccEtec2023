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
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="homeSwiper"
        >
          <SwiperSlide>
            <div>
              <h2 className="my-4 font-bold text-xl text-center md:text-left">
                Conecte-se com artistas e donos de estabelecimentos de
                entretenimento em todo o país.
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <h2 className="my-4 font-bold text-xl text-center md:text-left">
              Encontre novas oportunidades de shows e eventos.
            </h2>
          </SwiperSlide>
          <SwiperSlide>
            <h2 className="my-4 font-bold text-xl text-center md:text-left">
              Amplie sua rede de contatos no mundo da música.
            </h2>
          </SwiperSlide>
          <SwiperSlide>
            <h2 className="my-4 font-bold text-xl text-center md:text-left">
              Crie um perfil para mostrar seu trabalho e suas habilidades.
            </h2>
          </SwiperSlide>
          <SwiperSlide>
            <h2 className="my-4 font-bold text-xl text-center md:text-left">
              Uma plataforma segura e eficiente para artistas e donos de
              estabelecimentos de entretenimento.
            </h2>
          </SwiperSlide>
          <SwiperSlide>
            <h2 className="my-4 font-bold text-xl text-center md:text-left">
              Descubra novos talentos e oportunidades de negócios.
            </h2>
          </SwiperSlide>
          <SwiperSlide>
            <h2 className="my-4 font-bold text-xl text-center md:text-left">
              Agende shows e eventos com facilidade e eficiência.
            </h2>
          </SwiperSlide>
          <SwiperSlide>
            <h2 className="my-4 font-bold text-xl text-center md:text-left">
              Conecte-se com a comunidade musical e expanda seu alcance.
            </h2>
          </SwiperSlide>
        </Swiper>
      </div>
      <ThePageText text="Home Page"></ThePageText>
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
