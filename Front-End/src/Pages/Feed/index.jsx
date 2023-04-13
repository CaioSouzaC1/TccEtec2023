import { useEffect, useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import ButtonLogout from "../../Components/ButtonLogout";
import ProfileImage from "../../Components/ProfileImage";
import { UserContext } from "../../Contexts/User";
import { API_URL } from "../../Utils/Admin";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import styles from "./styles.module.css";
import { db } from "../../Utils/Firebase/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  CalendarCheck,
  Clock,
  Compass,
  MapPinLine,
  MapTrifold,
} from "phosphor-react";

import EventImages from "../../Components/EventImages";
const Feed = () => {
  const [lastPlacesState, setLastPlacesState] = useState(false);
  const [events, setEvents] = useState(false);
  const stateRef = useRef(null);
  const navigate = useNavigate();
  const { auth, user, type } = useContext(UserContext);
  if (auth === false) {
    navigate("/login", {
      state: {
        isAuth: false,
      },
    });
  }

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const lastPlaces = async () => {
    try {
      let ultimos = await fetch(`${API_URL}/estabelecimentos/ultimos`);

      if (ultimos.status === 200) {
        ultimos = await ultimos.json();
        setLastPlacesState(ultimos);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (stateRef.current === null) {
      stateRef.current = true;
      lastPlaces();
      renderEvents();
    }
  }, []);

  const renderEvents = async () => {
    const colRef = collection(db, "events");

    const dateTime = new Date().getTime();
    const eventsQuery = query(
      colRef,
      where("event_data", ">=", dateTime),
      where("status", "==", 201)
    );
    const resultQuery01 = await getDocs(eventsQuery);
    if (resultQuery01.docs < 1) {
      return;
    }

    setEvents(resultQuery01.docs);
    return;
  };

  return (
    <>
      <h2 className="text-2xl font-bold my-8">
        10 últimos estabelecimentos cadastrados
      </h2>
      {lastPlacesState && (
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="lastPlaces"
        >
          {lastPlacesState.map((e) => {
            return (
              <SwiperSlide key={e.pubId}>
                <Link to={`/estabelecimento/${e.pubId}`}>
                  <div
                    className={`p-2 my-4 mx-auto ${styles.card} bg-s-black hover:brightness-125 rounded-3xl`}
                  >
                    <div className="flex flex-wrap items-center mt-4">
                      <div className="w-full md:w-1/2">
                        <ProfileImage
                          fixFeed={styles.fixFeed}
                          className="h-40 w-40 max-w-[10em] min-h-[10em]"
                          name={e.name}
                          pubId={e.pubId}
                          type={"Establishment"}
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        <ul>
                          <li className="text-xl">
                            <Compass
                              className="inline pr-2 mr-2 border-r-2 border-s-red"
                              size={26}
                            />
                            {e.cidade}
                          </li>
                          <li className="text-xl">
                            <MapPinLine
                              className="inline pr-2 mr-2 border-r-2 border-s-red"
                              size={26}
                            />
                            {e.bairro}
                          </li>
                          <li className="text-xl">
                            <MapTrifold
                              className="inline pr-2 mr-2 border-r-2 border-s-red"
                              size={26}
                            />
                            {e.logradouro}, {e.numEnd}
                          </li>
                        </ul>
                      </div>
                      <span className="h-1 rounded-3xl bg-s-red w-4/5 mx-auto mt-4">
                        {" "}
                      </span>
                      <div className="w-full mt-4">
                        <h3 className="font-bold text-2xl text-center mb-4">
                          {e.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
          <div className={`${styles.autoplayProgress}`} slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      )}
      <br />
      <section className="flex flex-wrap">
        {events && (
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mt-8 mb-4">
              Eventos Confirmados
            </h2>
            <ul className="flex flex-wrap">
              {events &&
                events.map((e) => {
                  const data = e.data();
                  return (
                    <li
                      key={e._document.key.path.segments[6]}
                      className={`w-full md:w-1/2 2xl:1/3 cursor-pointer p-2`}
                    >
                      <Link to={`/eventos/${e._document.key.path.segments[6]}`}>
                        <div className={`${styles.Eventcard}`}>
                          <div
                            className={`${styles.Eventcard2} p-4 w-full text-center`}
                          >
                            <EventImages
                              order={data.event_order}
                              accepter={data.accepter}
                              proposer={data.proposer}
                            />
                            <h4 className="text-xl font-bold my-2 uppercase">
                              {data.event_name}
                            </h4>
                            <h5 className="text-lg font-regular mb-2">
                              {data.event_type}
                            </h5>
                            <h5 className="flex justify-around flex-wrap font-bold">
                              <div className="flex w-1/2 justify-center items-center">
                                <CalendarCheck size={18} weight="bold" />
                                {new Date(data.event_data).toLocaleDateString(
                                  "pt-BR",
                                  {
                                    day: "numeric",
                                    month: "numeric",
                                    year: "numeric",
                                    timeZone: "America/Sao_Paulo",
                                  }
                                )}
                              </div>
                              <div className="flex w-1/2 justify-center items-center">
                                <Clock size={18} weight="bold" />
                                {data.init_hour}
                              </div>
                              <span className="h-1 rounded-3xl bg-s-red w-full mx-auto mt-1">
                                {" "}
                              </span>
                              <p className="text-xs font-thin mt-4">
                                Evento criado em :{" "}
                                {new Date(data.timestamp).toLocaleDateString(
                                  "pt-BR",
                                  {
                                    day: "numeric",
                                    month: "numeric",
                                    year: "numeric",
                                    timeZone: "America/Sao_Paulo",
                                  }
                                )}
                              </p>
                            </h5>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mt-8 mb-4 pl-4">
            Artistas mais vistos
          </h2>
        </div>
      </section>
      <Link to="/meus-eventos">
        <Button text="Meus Eventos"></Button>
      </Link>
      <br />
      <ButtonLogout />
    </>
  );
};
export default Feed;
